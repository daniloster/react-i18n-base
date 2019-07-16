import React from 'react';
import Italic from './Italic';

export default ({ I18nTranslate, name }) => (
  <div>
    <h2>
      <I18nTranslate modifiers={[name, Italic]} path="greeting" />
    </h2>
    <div>
      <I18nTranslate modifiers={['strong']} path="message" />
    </div>
  </div>
);
