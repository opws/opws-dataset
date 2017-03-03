#! /usr/bin/env bash
set -eo pipefail

if [[ -z "$CI" ]]; then
  echo "This doesn't appear to be a CI environment; exiting." >&2
  exit 1
fi

CANDIDATE_BRANCH="$CIRCLE_BRANCH"
CANDIDATE_HASH="$CIRCLE_SHA1"

# Always validate everything in CI
opws-validate profiles/* legacies/*
