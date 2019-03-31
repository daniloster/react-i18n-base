#!/bin/bash
set -u

# Validating if it is a PR
if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo "- We are in a pull request, not releasing"
  exit 0
fi

export PACKAGE_NAME="$(cat package.json| grep "\"name\": \"" | awk '{print $2}' | cut -d \" -f 2)"

# Checking if it is a master commit with release attribute
if [[ $TRAVIS_BRANCH == 'master' ]]; then
  echo '** Setting github user'
  git config --global user.email "daniloster@gmail.com"
  git config --global user.name "Danilo Castro"
  git remote add gh-publish "https://${GIT_AUTH_TOKEN}@github.com/daniloster/${PACKAGE_NAME}.git"
  git fetch gh-publish
  git checkout master
  git rebase gh-publish/master

  echo '** Generating npm auth'
  echo "//registry.npmjs.org/:_authToken=${NPM_AUTH_TOKEN}" >> ~/.npmrc

  update_docs() {
    yarn run doc
    yarn run styleguide:build
    git add docs/ packages/
    git commit -m "[skip ci] [update-docs]"
    git push gh-publish master
  }

  confirm_bump() {
    echo "BUMPIN PACKAGE [$PACKAGE_NAME] TO [$NEW_VERSION]"
    ./get_bump_version.sh $NEW_VERSION
    git add package.json
    export COMMIT_VERSION_MESSAGE="[skip ci] v$NEW_VERSION"
    git commit -m $COMMIT_VERSION_MESSAGE
    LAST_COMMIT_FOR_TAGGING="$(git log --oneline --no-merges -n 1)" | awk '{print $1}'
    git tag -a v$NEW_VERSION $LAST_COMMIT_FOR_TAGGING -m $COMMIT_VERSION_MESSAGE
    git push --tags gh-publish master
  }

  # export TYPE_RELEASE="$(git log --no-merges -n 1 --pretty=%B | grep '\[release=' | awk '{print $1}')"
  export LAST_TAG="$(git describe --tags --abbrev=0)"
  export INITIAL_COMMIT="$(git rev-list HEAD | tail -n 1)"

  if [[ "$LAST_TAG" == "" ]]; then
      export FROM_VERSION="$INITIAL_COMMIT"
  elif
      export FROM_VERSION="$LAST_TAG"
  fi

  export COMMENTS="$(git log $FROM_VERSION..HEAD --oneline)"
  if [[ $COMMENTS == *"[release=major]"* ]]; then
    echo '** Releasing MAJOR'
    update_docs
    export NEW_VERSION="$(./get_bump_version.sh major)"
    confirm_bump
  elif [[ $COMMENTS == *"[release=minor]"* ]]; then
    echo '** Releasing MINOR'
    update_docs
    export NEW_VERSION="$(./get_bump_version.sh minor)"
    confirm_bump
  elif [[ $COMMENTS == *"[release=patch]"* ]]; then
    echo '** Releasing PATCH'
    update_docs
    export NEW_VERSION="$(./get_bump_version.sh patch)"
    confirm_bump
  else
    echo '** NOT RELEASED'
  fi

  # $(git log $INITIAL_COMMIT..HEAD --oneline | grep '\[release=patch\]' | awk '{print $0}')
  # export TYPE_RELEASE="$(git log --no-merges -n 1 --pretty=%B | grep '\[release=' | awk '{print $1}')"

fi