#! /usr/bin/env bash
set -eo pipefail

if [[ -z "$CI" ]]; then
  echo "This doesn't appear to be a CI environment; exiting." >&2
  exit 1
fi

CI_DEPS_DIR="$HOME/ci-deps"

mkdir -p "$CI_DEPS_DIR"

# Make empty file for the state of the deps (used when caching)
> "$CI_DEPS_DIR/DEPS_STATE"

clone-or-pull () {
  # Update the repo if we have it cached
  if [[ -e "$1" ]]; then
    cd "$1"
    git pull -f

  else # Clone the repo if we don't
    git clone "$2" "$1"
  fi

  # Write out the state of this repo
  echo "$1" >>"$CI_DEPS_DIR/DEPS_STATE"
  cd "$1"
  git show-ref >>"$CI_DEPS_DIR/DEPS_STATE"
}

# Retrieve all dependencies
clone-or-pull "$CI_DEPS_DIR/opws-validate" "https://github.com/opws/opws-validate.git"
clone-or-pull "$CI_DEPS_DIR/opws-schemata" "https://github.com/opws/opws-schemata.git"

# Ensure validator's modules are installed
cd "$CI_DEPS_DIR/opws-validate" && npm install

# Link validator into our path
# (it's assumed that $HOME/bin already exists and is in the PATH by default)
ln -s "$CI_DEPS_DIR/opws-validate/bin/opws-validate" "$HOME/bin/opws-validate"
