#!/usr/bin/env node
/* eslint-disable no-process-exit */
'use strict'

const os = require('os')
const debug = require('debug')('website-vulnerable-scan')
const { argv } = require('yargs')
const { Audit, RenderConsole, RenderJson, Utils } = require('../index')
const promptUrlInput = require('./prompt-url-input')

function detectEnvironment() {
  const isWindows = os.type() === 'Windows_NT'
  const isJson = !!argv.json
  const showProgressBar = !isJson && !isWindows

  return { isWindows, isJson, showProgressBar }
}

function getLighthouseOptions() {
  const lighthouseOpts = {}

  if (Utils.hasDevice(argv)) {
    lighthouseOpts.emulatedFormFactor = Utils.parseDevice(argv)
  }

  if (Utils.hasAuthentication(argv)) {
    lighthouseOpts.extraHeaders = Utils.parseAuthentication(argv)
  }

  const { chromePath } = argv
  const chromeOpts = chromePath ? { chromePath } : {}

  return { lighthouseOpts, chromeOpts }
}

;(async () => {
  try {
    const { isWindows, isJson, showProgressBar } = detectEnvironment()
    const url = await promptUrlInput(process.argv[2], isJson)
    const opts = getLighthouseOptions()

    if (isWindows && !isJson) {
      console.log('Please wait, scanning the website (can take up to a minute)...')
    }

    debug(`detecting isWindows: ${isWindows}`)
    debug(`detecting isJson: ${isJson}`)
    debug(`showing progress bar: ${isWindows}`)

    const audit = new Audit()

    const results = await audit.scanUrl(url, opts, showProgressBar)
    if (results.lhr.runtimeError) {
      throw new Error(results.lhr.runtimeError.message)
    }

    const renderer = isJson
      ? new RenderJson(results, argv.jsLib)
      : new RenderConsole(results, argv.jsLib)
    renderer.print()

    if (audit.hasVulnerabilities(results)) {
      process.exit(2)
    }

    process.exit(0)
  } catch (error) {
    const errorMessage =
      error.code === 'PROTOCOL_TIMEOUT'
        ? 'The request has timed out. Chrome is taking too long to respond.'
        : error.message
    console.error(`\nError: ${errorMessage}\n`)
    console.error('Usage:\n  website-vulnerable-scan https://www.google.com\n\n')
    process.exit(1)
  }
})()
