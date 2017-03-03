#! /usr/bin/env bash
set -eo pipefail

CANDIDATE_BRANCH="$CIRCLE_BRANCH"
CANDIDATE_HASH="$CIRCLE_SHA1"

# Always validate everything in CI
opws-validate profiles/* legacies/*
