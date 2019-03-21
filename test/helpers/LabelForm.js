import React from 'react';
import PropTypes from 'prop-types';
import Italic from './Italic';

export default function LabelForm({ i18n, hasError, hasSucceed }) {
  return (
    <div>
      <h2>{i18n.title}</h2>
      <form>
        <div>{i18n.description}</div>
        <input type="text" />
        <div>{i18n.color}</div>
        <input type="text" />

        {hasError && <div style={{ color: 'red' }}>{i18n.errorMessage(Italic, 'b')}</div>}
        {hasSucceed && <div style={{ color: 'green' }}>{i18n.successMessage(Italic, 'b')}</div>}
        <button type="submit">{i18n.button}</button>
      </form>
    </div>
  );
}

LabelForm.propTypes = {
  i18n: PropTypes.shape({}).isRequired,
  hasError: PropTypes.bool,
  hasSucceed: PropTypes.bool,
};

LabelForm.defaultProps = {
  hasError: false,
  hasSucceed: false,
};
