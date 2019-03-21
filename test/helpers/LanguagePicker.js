import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import I18nContext from '../../src/I18nContext';

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

LanguagePicker.propTypes = {};
