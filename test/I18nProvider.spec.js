import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { DEFAULT_LANGUAGE_CONTEXT } from '../src/I18nContext';
import I18nProvider from '../src/I18nProvider';
import { localise } from '../src/localization';
import Greeting from './helpers/Greeting';
import LabelForm from './helpers/LabelForm';
import LanguagePicker from './helpers/LanguagePicker';
import localeGreeting from './helpers/Greeting.locale';
import localeLabelForm from './helpers/LabelForm.locale';

const GreetingI18n = localise(localeGreeting)(Greeting);
const LabelFormI18n = localise(localeLabelForm)(LabelForm);

describe('<I18nProvider />', () => {
  let element;

  function mountI18nProvider(props = {}) {
    if (element) {
      element.detach();
      document.body.innerHTML = '';
    }
    const container = document.createElement('div');
    document.body.appendChild(container);

    element = mount(
      <I18nProvider defaultLanguage="en" {...props}>
        <LanguagePicker />
        <GreetingI18n name="Leticia" />
        <LabelFormI18n hasError />
        <LabelFormI18n hasSucceed />
      </I18nProvider>,
      {
        attachTo: container,
      }
    );
  }

  function assertGreetings(locale) {
    const localeData = {
      en: {
        greeting: 'Hi Leticia',
        message: 'You are so Awesome!',
      },
      pt: {
        greeting: 'Oi Leticia',
        message: 'Você é tão Fantástico(a)!',
      },
    };
    const greeting = element.find(GreetingI18n);
    expect(greeting.text()).to.contains(localeData[locale].greeting);
    expect(greeting.text()).to.contains(localeData[locale].message);
  }

  function assertLabelForm(locale) {
    const localeData = {
      en: {
        title: 'Creating label',
        description: 'Description',
        color: 'Color',
        button: 'Save',
        errorMessage: 'Error : label has not been created successfully.',
        successMessage: '[INFO] Success : label has been created successfully!',
      },
      pt: {
        title: 'Criando label',
        description: 'Descrição',
        color: 'Cor',
        button: 'Gravar',
        errorMessage: 'Erro : label não foi criado com sucesso.',
        successMessage: '[INFO] Sucesso : label foi criado com sucesso!',
      },
    };
    const labelForm = element.find(LabelFormI18n);
    const labelFormFirst = labelForm.first();
    const labelFormLast = labelForm.last();
    expect(labelFormFirst.text()).to.contains(localeData[locale].title);
    expect(labelFormLast.text()).to.contains(localeData[locale].title);
    expect(labelFormFirst.text()).to.contains(localeData[locale].description);
    expect(labelFormLast.text()).to.contains(localeData[locale].description);
    expect(labelFormFirst.text()).to.contains(localeData[locale].color);
    expect(labelFormLast.text()).to.contains(localeData[locale].color);
    expect(labelFormFirst.find('button').text()).to.contains(localeData[locale].button);
    expect(labelFormLast.find('button').text()).to.contains(localeData[locale].button);
    expect(labelFormFirst.text()).to.contains(localeData[locale].errorMessage);
    expect(labelFormLast.text()).to.contains(localeData[locale].successMessage);
  }

  describe('DEFAULT_LANGUAGE_CONTEXT should have setLanguage as default', () => {
    it('Expect the setLanguage default method to return true', () => {
      expect(DEFAULT_LANGUAGE_CONTEXT.setLanguage()).to.be.eql(true);
    });
  });

  describe('I18nProvider change language in context', () => {
    it('Given the I18nProvider is english with localised components: (GreetingI18n, LabelFormI18n, LanguagePicker)', () => {
      mountI18nProvider();
    });
    it('When I change the language to portuguese', () => {
      element
        .find(LanguagePicker)
        .find('button[type="button"][data-lang="pt"]')
        .simulate('click');
      element.update();
    });
    it('Then the GreetingI18n should have sentences in portuguese', () => {
      assertGreetings('pt');
    });
    it('And the LabelFormI18n should have sentences in portuguese', () => {
      assertLabelForm('pt');
    });
  });

  describe('I18nProvider should trigger external actions', () => {
    const onChangeLanguage = sinon.spy();
    it('Given the I18nProvider is english with localised components: (GreetingI18n, LabelFormI18n, LanguagePicker)', () => {
      mountI18nProvider({ onChangeLanguage });
    });
    it('When I change the language to portuguese', () => {
      element
        .find(LanguagePicker)
        .find('button[data-lang="pt"]')
        .simulate('click');
    });
    it('Then the onChangeLanguage should be triggered', () => {
      expect(onChangeLanguage.calledOnce).to.be.eql(true);
      expect(onChangeLanguage.lastCall.args).to.be.eql(['pt']);
    });
  });

  describe('I18nProvider should display sentences in english', () => {
    it('Given the I18nProvider is english with localised components: (GreetingI18n, LabelFormI18n, LanguagePicker)', () => {
      mountI18nProvider();
    });
    it('Expect the GreetingI18n to have sentences in english', () => {
      assertGreetings('en');
    });
    it('And the LabelFormI18n to have sentences in english', () => {
      assertLabelForm('en');
    });
  });

  describe('I18nProvider should display sentences in portuguese', () => {
    it('Given the I18nProvider is portuguese with localised components: (GreetingI18n, LabelFormI18n, LanguagePicker)', () => {
      mountI18nProvider({ defaultLanguage: 'pt' });
    });
    it('Expect the GreetingI18n to have sentences in portuguese', () => {
      assertGreetings('pt');
    });
    it('And the LabelFormI18n to have sentences in portuguese', () => {
      assertLabelForm('pt');
    });
  });

  describe('I18nProvider should not change translations triggered by not interested props', () => {
    it('Given the I18nProvider is english with localised components: (GreetingI18n, LabelFormI18n, LanguagePicker)', () => {
      mountI18nProvider();
    });
    it('When I18nProvider gets not interested props', () => {
      element.setProps({
        house: 'I18nProvider',
      });
    });
    it('Then the messages should be the same', () => {
      assertGreetings('en');
      assertLabelForm('en');
    });
  });
});
