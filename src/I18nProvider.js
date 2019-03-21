import React from 'react';
import PropTypes from 'prop-types';
import I18nContext from './I18nContext';

const { useMemo, useState } = React;

/**
 * Provider for localization.
 */
export default function I18nProvider(props) {
  const { children, defaultLanguage, initialLanguage, onChangeLanguage } = props;
  const [language, setLanguage] = useState(initialLanguage || defaultLanguage);
  const $setLanguage = newLanguage => {
    setLanguage(newLanguage);
    onChangeLanguage(newLanguage);
  };
  const contextValue = useMemo(() => ({ defaultLanguage, language, setLanguage: $setLanguage }), [
    language,
  ]);

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
}

I18nProvider.propTypes = {
  /**
   * React node tree that expects the I18nProvider data.
   */
  children: PropTypes.node.isRequired,
  /**
   * Default language. It is also the initialLanguage when it is not provided.
   */
  defaultLanguage: PropTypes.string.isRequired,
  /**
   * Initial language.
   */
  initialLanguage: PropTypes.string,
  /**
   * Action to change the current language externally.
   */
  onChangeLanguage: PropTypes.func,
};

I18nProvider.defaultProps = {
  initialLanguage: null,
  onChangeLanguage: () => true,
};
