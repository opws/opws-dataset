#! /usr/bin/env bash
set -eo pipefail

CI_DEPS_DIR="$HOME/ci-deps"

mkdir -p "$CI_DEPS_DIR"

# Update the validator if we have it cached
if [[ -e "$CI_DEPS_DIR/opws-validate" ]]; then
  cd "$CI_DEPS_DIR/opws-validate"
  git pull -f

else # Clone the validator and link it if we don't have it already
  git clone "https://github.com/opws/opws-validate.git" "$CI_DEPS_DIR/opws-validate"
  ln -s "$CI_DEPS_DIR/opws-validate/bin/opws-validate" "$HOME/bin/opws-validate"
fi

# Update the schemata if we have it cached
if [[ -e "$CI_DEPS_DIR/opws-schemata" ]]; then
  cd "$CI_DEPS_DIR/opws-schemata"
  git pull -f

else # Clone the schemata if we don't have it already
  git clone "https://github.com/opws/opws-schemata.git" "$CI_DEPS_DIR/opws-schemata"
fi

