import React from 'react';

export const DEFAULT_LANGUAGE_CONTEXT = {
  language: 'en',
  setLanguage: () => true,
};

export default React.createContext(DEFAULT_LANGUAGE_CONTEXT);
