import React from 'react';
import { localise, I18nProvider } from '../src';
import Greeting from '../test/helpers/Greeting';
import LabelForm from '../test/helpers/LabelForm';
import LanguagePicker from '../test/helpers/LanguagePicker';
import localeGreeting from '../test/helpers/Greeting.locale';
import localeLabelForm from '../test/helpers/LabelForm.locale';

const GreetingI18n = localise(localeGreeting)(Greeting);
const LabelFormI18n = localise(localeLabelForm)(LabelForm);

export default () => (
  <I18nProvider defaultLanguage="en" initialLanguage="en">
    <LanguagePicker />

    <GreetingI18n name="Leticia" />
    <LabelFormI18n hasError />
    <LabelFormI18n hasSucceed />
  </I18nProvider>
);
