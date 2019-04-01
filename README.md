# react-i18n-base

Internationalise your app, extending config or factory new internationalised components.

[![NPM](https://img.shields.io/npm/v/react-i18n-base.svg?style=flat-square) ![NPM](https://img.shields.io/npm/dm/react-i18n-base.svg?style=flat-square)](https://www.npmjs.com/package/react-i18n-base)
[![Build Status](https://img.shields.io/travis/daniloster/react-i18n-base/master.svg?style=flat-square)](https://travis-ci.org/daniloster/react-i18n-base)

## Docs

- [Home Page](http://codeinbox.me/react-i18n-base/)
- [react-i18n-base](https://github.com/daniloster/react-i18n-base/blob/master/README.md)
- [react-i18n-base/API](https://github.com/daniloster/react-i18n-base/blob/master/API.md)

## Current core dependencies versions

- node: `^8.10.0 || ^9.10.0`
- yarn (version may be check at `package.json`)

## Peer dependencies

```js static
"prop-types": "^15.7.2",
"react": "^16.8.4",
"uuid": "^3.3.2"
```

## Getting started

Internationalise your app by creating your locale file. Use the `localise` function to convert your component to localised one and, then, wrap your app with the `I18nProvider`.

```sh static
npm install react-i18n-base
```

```sh static
yarn add react-i18n-base
```

### Dev code

Greeting

```jsx static
//----------------------------------------------//
// Creating LocalisedComponent
//----------------------------------------------//
import { localise, decorate } from 'react-i18n-base';

const Italic = ({ children }) => <i>{children}</i>;

const localeGreeting = {
  en: {
    greeting: 'Hi Guest!',
    message: decorate('You are <0>so</0> <1>Awesome</1>!'),
  },
  pt: {
    greeting: 'Oi Convidado!',
    message: decorate('<1>Você é</1> <0>tão</0> Fantástico!'),
  },
};

const Greeting = localise(localeGreeting)(({ i18n }) => (
  <div>
    <h2>{i18n.greeting}</h2>
    <div>{i18n.message('strong', Italic)}</div>
  </div>
));
```

LabelForm

```jsx static
const localeLabel = {
  en: {
    title: 'Creating label',
    description: 'Description',
    color: 'Color',
    errorMessage: decorate('<0>Error</0>: label has not been created successfully.'),
    successMessage: decorate('<0>Success</0>: label has been created successfully!'),
    button: 'Save',
  },
  pt: {
    title: 'Criando label',
    description: 'Descrição',
    color: 'Cor',
    errorMessage: decorate('<0>Erro</0>: label não foi criado com <1>sucesso</1>.'),
    successMessage: decorate('<0>Sucesso</0>: label foi criado com <1>sucesso</1>!'),
    button: 'Gravar',
  },
};
 *
const LabelForm = localise(localeLabel)(({ i18n, isError, isSuccess }) => (
  <div>
    <h2>{i18n.title}</h2>
    <form>
      <div>{i18n.description}</div>
      <input type="text" />
      <div>{i18n.color}</div>
      <input type="text" />
      {isError && (
        <div>
          {i18n.errorMessage(Italic, 'b')} // giving another perspective
        </div>
      )}
      {isSuccess && (
        <div>
          {i18n.successMessage(Italic, 'b')} // giving another perspective
        </div>
      )}
      <button type="submit">{i18n.button}</button>
    </form>
  </div>
));
```

App

```jsx static
//----------------------------------------------//
// Initialising the app
//----------------------------------------------//
import { I18nProvider } from 'react-i18n-base';

const App = () => (
  <div>
    {/* If only defaultLanguage is set, then, initialLanguage will be the defaultLanguage value  */}
    <I18nProvider defaultLanguage="en">
      <Greeting /> {/* it will get the correct i18n object */}
      <LabelForm isError />
      <LabelForm isSuccess />
    </I18nProvider>
    {/*
    // The elements below will always display in portuguese, unless
    // you have internal components change the locale by action or
    // by the setI18n function provided by I18nProvider.
    */}
    <I18nProvider defaultLanguage="en" initialLanguage="pt">
      <Greeting /> {/* it will get the correct i18n object */}
      <LabelForm isError />
      <LabelForm isSuccess />
    </I18nProvider>
  </div>
);
```

## Contributions rules

- Changes must be approved;
- Changes must have tests passing on Travis-CI;
- Changes must have coverage of 95% on Travis-CI for: statements, branches, functions and lines;
- Last commit message must have attribute `[release=major|minor|patch|no-release]`;
