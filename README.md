# React Animate Me

Basic package to build reusable animations.

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
"styled-components": "^4.1.3",
"prop-types": "^15.7.2",
"react": "^16.8.4",
"react-dom": "^16.8.4",
"uuid": "^3.3.2"
```

## Getting started

To start building your own animations, it is only required to consume the `Animate` component from this package.

Find below an example of how to build a FadeEffect and how to use it.

`FadeEffect.js`

```jsx static
import { createCustomAnimation } from 'react-i18n-base';

/**
 * Here is an example of keyframes where the state represents
 * the progress which can be set as [0-100]% or as keywords
 * (from, to), and the content is the styles applied to the
 * keyframe.
 * */
const FADE_PROGRESS = [
  {
    state: '0%',
    content: 'position: relative; opacity: 0;',
  },
  {
    state: '100%',
    content: 'opacity: 1;',
  },
];

function parseFadeEffect(props) {
  return {
    ...props,
    animationName: 'fadeIn',
    duration: 1,
  };
}

const FadeEffect = createCustomAnimation(parseFadeEffect, FADE_PROGRESS);

export default FadeEffect;

FadeEffect.defaultProps = {
  delay: 0,
  maxAnimations: 1,
};
```

`App.js`

```jsx static
import React from 'react';
import { render } from 'react-dom';
import FadeEffect from './FadeEffect';

// app
const div = document.createElement('div');

div.id = 'container';
div.style.backgroundColor = 'inherit';
div.style.width = '100vw';
div.style.height = '100vh';
document.body.style.margin = 0;

document.body.appendChild(div);

function SimpleContent(props) {
  const { title, children } = props;
  return (
    <div>
      <h1>{title}</h1>
      <p>{children}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <FadeEffect delay={0.3}>
        <SimpleContent title="Good morning">That is really good day</SimpleContent>
      </FadeEffect>
      <FadeEffect delay={0.6}>
        <SimpleContent title="Amazing evening">That is really an amazing evening</SimpleContent>
      </FadeEffect>
    </div>
  );
}

render(<App />, div);
```

## Contributions rules

- Changes must be approved;
- Changes must have tests passing on Travis-CI;
- Changes must have coverage of 95% on Travis-CI for: statements, branches, functions and lines;
- Last commit message must have attribute `[release=major|minor|patch|no-release]`;
