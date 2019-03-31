### How to use it

For binding the component with set of translatioins

```html
import { decorate, localise } from 'react-i18n-base';
```

For providing the current locale across the app.

```html
import { I18nProvider, I18nContext } from 'react-i18n-base';
```

### Demo

```js static
import { decorate, I18nProvider, I18nContext, localise } from 'react-i18n-base';

import React from 'react';
import styled from 'styled-components';

const GreetingLocale = {
  en: {
    greeting: decorate('<1>Hi</1> <2>{0}</2>! You are <2>Awesome</2>.'),
  },
  pt: {
    greeting: decorate('<1>Oi</1> <2>{0}</2>! Voce e <2>Incrivel</2>.'),
  },
};

function Greeting({ i18n, name }) {
  return <div>i18n.greeting(name, 'i', 'strong')</div>;
}

const GreetingLocalised = localise(GreetingLocale)(Greeting);

const LanguagesLayout = styled.div`
  width: 70px;
  display: flex;
  justify-content: space-between;
`;

const Language = styled.button.attrs({ type: 'button' })`
  border: 0;
  background-color: transparent;
`;

const { useContext } = React;

export default function LanguagePicker() {
  const { setLanguage } = useContext(I18nContext);
  const setEnglish = () => {
    setLanguage('en');
  };
  const setPortugueseBr = () => {
    setLanguage('pt');
  };

  return (
    <LanguagesLayout>
      <Language data-lang="en" onClick={setEnglish}>
        EN
      </Language>
      <Language data-lang="pt" onClick={setPortugueseBr}>
        PT
      </Language>
    </LanguagesLayout>
  );
}

function WrappedComponent() {
  return (
    <I18nProvider defaultLanguage="en" initialLanguage="en">
      <LanguagePicker />
      <GreetingLocalised name="Leticia" />
    </I18nProvider>
  );
}

<WrappedComponent />;
```
