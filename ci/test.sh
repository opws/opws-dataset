#! /usr/bin/env bash
set -eo pipefail

CANDIDATE_BRANCH="$CIRCLE_BRANCH"
CANDIDATE_HASH="$CIRCLE_SHA1"

if [[ "$CANDIDATE_BRANCH" == "master" ]]; then
  # Always run full validation on merges to master, just to allay all doubts
  opws-validate profiles/* legacies/*

else # For pull requests etc
# Get the names of all added or modified files
# From this hash to refs/heads/master
# under the "profiles" and "legacies" directories
# and run the validator on them
git diff-tree --no-commit-id --name-only --no-renames --diff-filter=AM -r \
  "$CANDIDATE_HASH" master \
  profiles legacies | \
  xargs --no-run-if-empty opws-validate
fi
