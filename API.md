## react-i18n-base



[\`npm: react-i18n-base\`](https://www.npmjs.com/package/react-i18n-base)


### src/I18nProvider.js

#### I18nProvider

Provider for localization.

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**children** | node |  | :white_check_mark: | React node tree that expects the I18nProvider data.
**defaultLanguage** | string |  | :white_check_mark: | Default language. It is also the initialLanguage when it is not provided.
**initialLanguage** | string | null | :x: | Initial language.
**onChangeLanguage** | func | () => true | :x: | Action to change the current language externally.

### src/I18nTranslateBase.js

#### I18nTranslateBase

Component to translate the content according to the path. Note, this is for internal used. When your component is localised, then, the component would receive `I18nTranslate` which only would require `path` and the optional `modifiers`.

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**i18n** | shape |  | :white_check_mark: | Translation object that resolves content based on path
**modifiers** | arrayOf | [] | :x: | The list of tag modifiers
**path** | string |  | :white_check_mark: | The path to identify the content

