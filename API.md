## react-i18n-base



[\`npm: react-i18n-base\`](https://www.npmjs.com/package/react-i18n-base)


### src/I18nProvider.js

#### I18nProvider

Provider for localization properties.

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**children** | node |  | :white_check_mark: | React node tree that expects the I18nProvider data.
**defaultLanguage** | string |  | :white_check_mark: | Default language.
**initialLanguage** | string | null | :x: | Current language.
**onChangeLanguage** | func | () => true | :x: | Action to change the current language externally.

