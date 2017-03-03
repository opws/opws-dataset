#! /usr/bin/env bash
set -eo pipefail

if [[ -z "$CI" ]]; then
  echo "This doesn't appear to be a CI environment; exiting." >&2
  exit 1
fi

CI_DEPS_DIR="$HOME/ci-deps"

mkdir -p "$CI_DEPS_DIR"

clone-or-pull () {
  # Update the repo if we have it cached
  if [[ -e "$1" ]]; then
    cd "$1"
    git pull -f

  else # Clone the repo if we don't
    git clone "$2" "$1"
  fi
}

# Retrieve all dependencies
clone-or-pull "$CI_DEPS_DIR/opws-validate" "https://github.com/opws/opws-validate.git"
clone-or-pull "$CI_DEPS_DIR/opws-schemata" "https://github.com/opws/opws-schemata.git"

# Ensure validator's modules are installed
cd "$CI_DEPS_DIR/opws-validate" && npm install

# Link validator into our path
ln -s "$CI_DEPS_DIR/opws-validate/bin/opws-validate" "$HOME/bin/opws-validate"
