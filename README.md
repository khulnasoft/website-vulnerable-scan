<p align="center"><h1 align="center">
  website-vulnerable-scan
</h1>

<p align="center">
  finds publicly known security vulnerabilities in a website's frontend JavaScript libraries
</p>

<p align="center">
  <a href="https://www.npmjs.org/package/website-vulnerable-scan"><img src="https://badgen.net/npm/v/website-vulnerable-scan" alt="npm version"/></a>
  <a href="https://www.npmjs.org/package/website-vulnerable-scan"><img src="https://badgen.net/npm/license/website-vulnerable-scan" alt="license"/></a>
  <a href="https://www.npmjs.org/package/website-vulnerable-scan"><img src="https://badgen.net/npm/dt/website-vulnerable-scan" alt="downloads"/></a>
  <a href="https://github.com/khulnasoft/website-vulnerable-scan/actions?workflow=CI"><img src="https://github.com/khulnasoft/website-vulnerable-scan/workflows/CI/badge.svg" alt="build"/></a>
  <a href="https://codecov.io/gh/khulnasoft/website-vulnerable-scan"><img src="https://badgen.net/codecov/c/github/khulnasoft/website-vulnerable-scan" alt="codecov"/></a>
  <a href="https://snyk.io/test/github/khulnasoft/website-vulnerable-scan"><img src="https://snyk.io/test/github/khulnasoft/website-vulnerable-scan/badge.svg" alt="Known Vulnerabilities"/></a>
  <a href="./SECURITY.md"><img src="https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg" alt="Responsible Disclosure Policy" /></a>
</p>

</p>


# About

Finds publicly known security vulnerabilities in a website's frontend JavaScript libraries.

# Usage

## Command line

Using Node.js's `npx` to run a one-off scan of a website:

```bash
npx website-vulnerable-scan https://example.com [--json] [--js-lib] [--mobile|--desktop] [--chromePath] [--cookie] [--token]
```

The CLI will gracefully handle cases where the URL to scan is missing by prompting you to enter it:

```bash
$ npx website-vulnerable-scan
Woops! You forgot to provide a URL of a website to scan.
? Please provide a URL to scan: › https://example.com
...
```

### Exit codes

If the CLI detects an error, it will terminate with an exit code different from 0.

Exit Code 0: Everything is fine. No vulnerabilities found.

Exit Code 1: An error happened during the execution. Check the logs for details.

Exit Code 2: Vulnerabilities were found. Check the logs for details.

## Docker

To build and run the container locally:

```bash
# Clone Repo:
git clone https://github.com/khulnasoft/website-vulnerable-scan.git

# Change to repo's cloned directory:
cd website-vulnerable-scan

# Build Image locally:
docker build --no-cache -t khulnasoft/website-vulnerable-scan:latest .

# Run container:
docker run --rm -e SCAN_URL="https://www.google.com/" khulnasoft/website-vulnerable-scan:latest
```

`SCAN_URL` is an environment variable and its value must be replaced with the desired URL during Docker run. Docker container will exit once the scan has been completed.

If you wish to provide command line arguments to `website-vulnerable-scan` and customize the run, such as providing `--json` or other supported arguments, you should omit the environment variable and provide the full command. Here is an example:

```
docker run --rm khulnasoft/website-vulnerable-scan:latest https://www.google.com --json
```

:warning: A modern version of Chrome is assumed to be available when using `website-vulnerable-scan`. It may not be safe to assume that this is satisfied automatically on some CI services. For example, [additional configuration](https://docs.travis-ci.com/user/chrome#selecting-a-chrome-version) is necessary for [Travis CI](https://travis-ci.com/).

# GitHub Action
Create .github/workflows/website-vulnerable-scan.yml with the url that you want scanned:

```yaml
name: Test site for publicly known js vulnerabilities

on: push
jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - name: Test for public javascript library vulnerabilities 
        uses: khulnasoft/website-vulnerable-scan@main
        with:
          scan-url: "https://yoursite.com"
```

# Install

You can install globally via:

```bash
npm install -g website-vulnerable-scan
```

# Contributing

Please consult [CONTRIBUTING](./CONTRIBUTING.md) for guidelines on contributing to this project.

# Author

**website-vulnerable-scan** © [KhulnaSoft DevSec](https://github.com/khulnasoft), Released under the [Apache-2.0](./LICENSE) License.