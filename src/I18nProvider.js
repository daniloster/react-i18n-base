import React from 'react';
import PropTypes from 'prop-types';
import I18nContext from './I18nContext';

const { useCallback, useMemo, useState } = React;

/**
 * Provider for localization.
 */
export default function I18nProvider(props) {
  const { children, defaultLanguage, initialLanguage, onChangeLanguage } = props;
  const [language, setLanguage] = useState(initialLanguage || defaultLanguage);
  const updateLanguage = useCallback(
    newLanguage => {
      setLanguage(newLanguage);
      onChangeLanguage(newLanguage);
    },
    [onChangeLanguage]
  );
  const contextValue = useMemo(() => ({ defaultLanguage, language, setLanguage: updateLanguage }), [
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
