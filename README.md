# react-i18n-base

Internationalise your app, extending config or factory new internationalised components.

[![NPM](https://img.shields.io/npm/v/react-i18n-base.svg?style=flat-square) ![NPM](https://img.shields.io/npm/dm/react-i18n-base.svg?style=flat-square)](https://www.npmjs.com/package/react-i18n-base)
[![Build Status](https://img.shields.io/travis/daniloster/react-i18n-base/master.svg?style=flat-square)](https://travis-ci.org/daniloster/react-i18n-base) [![BCH compliance](https://bettercodehub.com/edge/badge/daniloster/react-i18n-base?branch=master)](https://bettercodehub.com/)

## Docs

- [react-i18n-base](https://github.com/daniloster/react-i18n-base/blob/master/README.md)
- [react-i18n-base/API](https://github.com/daniloster/react-i18n-base/blob/master/API.md)

## Current core dependencies versions

- node &<= 6.14.0
- npm &<= 3.10.10
- yarn (version may be check at `package.json`)

## Peer dependencies

```js static
"prop-types": "^15.7.2",
"react": "^16.8.4",
"uuid": "^3.3.2"
```

## Getting started

Internationalise your app by creating your locale file. Use the `localise` function to convert your component to localised one and, then, wrap your app with the `I18nProvider`.

## Contributions rules

- Changes must be approved;
- Changes must have tests passing on Travis-CI;
- Changes must have coverage of 95% on Travis-CI for: statements, branches, functions and lines;
- Last commit message must have attribute `[release=major|minor|patch|no-release]`;
