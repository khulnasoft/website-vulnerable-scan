#!/usr/bin/env sh
if [ "$#" -ne 0 ]
then
    npx website-vulnerable-scan "$@"
else
    npx website-vulnerable-scan "$SCAN_URL"
fi