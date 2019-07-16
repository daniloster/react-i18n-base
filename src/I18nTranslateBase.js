import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'mutation-helper';

const { useMemo } = React;
/**
 * Component to translate the content according to the path. Note, this is for internal used. When your component is localised, then, the component would receive `I18nTranslate` which only would require `path` and the optional `modifiers`.
 */
export default function I18nTranslateBase(props) {
  const { i18n, modifiers, path } = props;
  const localisedItem = useMemo(() => get(i18n, path), [i18n, path]);

  if (typeof localisedItem === 'function') {
    return <React.Fragment>{localisedItem(...modifiers)}</React.Fragment>;
  }

  return <React.Fragment>{localisedItem}</React.Fragment>;
}

I18nTranslateBase.propTypes = {
  /**
   * Translation object that resolves content based on path
   */
  i18n: PropTypes.shape({}).isRequired,
  /**
   * The list of tag modifiers
   */
  modifiers: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.func])),
  /**
   * The path to identify the content
   */
  path: PropTypes.string.isRequired,
};

I18nTranslateBase.defaultProps = {
  modifiers: [],
};
