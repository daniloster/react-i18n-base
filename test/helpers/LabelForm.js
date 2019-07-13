import React from 'react';
import PropTypes from 'prop-types';
import Italic from './Italic';

export default function LabelForm({ i18n, I18nTranslate, hasError, hasSucceed }) {
  return (
    <div>
      <h2>{i18n.title}</h2>
      <form>
        <div>{i18n.description}</div>
        <input type="text" />
        <div>
          <I18nTranslate path="color" />
        </div>
        <input type="text" />

        {hasError && (
          <div style={{ color: 'red' }}>
            <I18nTranslate modifiers={[Italic, 'b']} path="message.error" />
          </div>
        )}
        {hasSucceed && (
          <div style={{ color: 'green' }}>
            <I18nTranslate modifiers={[Italic, 'b']} path="message.success" />
          </div>
        )}
        <button type="submit">{i18n.button}</button>
      </form>
    </div>
  );
}

LabelForm.propTypes = {
  hasError: PropTypes.bool,
  hasSucceed: PropTypes.bool,
  i18n: PropTypes.shape({}).isRequired,
  I18nTranslate: PropTypes.func.isRequired,
};

LabelForm.defaultProps = {
  hasError: false,
  hasSucceed: false,
};
