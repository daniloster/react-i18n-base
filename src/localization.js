import React from 'react';
import uuid from 'uuid/v4';
import I18nContext from './I18nContext';
import I18nTranslateBase from './I18nTranslateBase';

const { useCallback, useContext, useMemo } = React;

/**
 * Gets the specific translation according to the locale and defaultLocale
 * provided.
 * @param {string} language - current language set.
 * @param {object} localeData - map with language key for objects with key
 * for translation.
 * @returns {object}
 */
export function getI18n(defaultLanguage, language, localeData) {
  return localeData[language] || localeData[defaultLanguage];
}

/**
 * localise
 * Decorator that makes components consume the localization context.
 * @param {object} localeData - it is a map with key (international code: en, pt, fr).
 * @returns {function}
 * @public
 */
export function localise(localeData) {
  /**
   * Creates a wrapper class to obtain and pass down the internationalization metadata.
   * @param {React.Component} RawComponent - it is a react component that will consume the
   * localization data.
   * @returns {function}
   * @public
   */
  return RawComponent => {
    /* eslint-disable */
    let _localeData = localeData;
    /**
     * LocalisedComponent
     * Wraps the component into a LocalisedComponent which resolves the localization
     * based on data passed by context and props.
     * e.g.
     * ```
     * <LocalisedComponent />
     * ```
     */
    function LocalisedComponent(props) {
      /* eslint-enable */
      const i18nMetadata = useContext(I18nContext);
      const { defaultLanguage, language } = i18nMetadata;
      const i18n = useMemo(() => getI18n(defaultLanguage, language, _localeData), [
        defaultLanguage,
        language,
        _localeData,
      ]);
      const I18nTranslate = useCallback(
        ({ modifiers, path }) => (
          <I18nTranslateBase i18n={i18n} modifiers={modifiers} path={path} />
        ),
        [i18n]
      );

      return (
        <RawComponent
          {...props}
          i18n={i18n}
          i18nMetadata={i18nMetadata}
          I18nTranslate={I18nTranslate}
        />
      );
    }

    LocalisedComponent.extend = newLocaleData => {
      _localeData = {
        ..._localeData,
        ...newLocaleData,
      };
    };

    LocalisedComponent.factory = newLocaleData => {
      return localise({
        ..._localeData,
        ...newLocaleData,
      })(RawComponent);
    };

    return LocalisedComponent;
  };
}

// decorate

/**
 * Gets index for custom element referenced in the template
 * and according to the regex provided.
 * @param {string} template
 * @param {RegExp} regex
 */
function getIndex(template, regex) {
  return regex.test(template) ? Number(template.match(regex)[1]) : null;
}

/**
 * Interpolates list of elements into a string accordingly to its specified
 * position.
 * e.g.
 * text: "{0} will understand {2}"
 * args: ['You', ReactComponent<Ignored>, 'Me']
 * result: "You will understand Me"
 * @param {string|React.Component} text - it is the text to be interpolated
 * @param {array} args - it is the list of element to interpolate
 * @returns {string}
 */
function interpolateText(text, args) {
  if (!(typeof text === 'string')) {
    return text;
  }
  const regex = new RegExp(`\\{([0-${args.length - 1}])\\}`);
  let currentText = text;
  let index;
  /* eslint-disable */
  while ((index = getIndex(currentText, regex)) !== null) {
    /* eslint-enable */
    currentText = currentText.replace(new RegExp(`\\{${index}\\}`), args[index]);
  }
  return currentText;
}

function getPartialTextInterpolated(buildingExpression, RawComponent, index, args, uid) {
  const regex = new RegExp(`<${index}>(((\\w|\\W|\\s)(?!<${index}))+)<\\/${index}>`, 'i');

  const children = buildingExpression.match(regex);
  const hash = uuid();
  const partials = buildingExpression.replace(regex, hash).split(hash);
  if (children && children.length > 1 && partials.length === 2) {
    /* eslint-disable */
    return [
      ...interpolateComponents([partials[0]], RawComponent, index, args, uid),
      <RawComponent key={`${uid}:item-hashed-${hash}`}>{children[1]}</RawComponent>,
      ...interpolateComponents([partials[1]], RawComponent, index, args, uid),
    ];
    /* eslint-enable */
  }
  return buildingExpression;
}

/**
 * Interpolates list of decorators accordingly to its index reference in the
 * template provided as expression.
 * @param {array<string>} expression - it is the template sentence
 * @param {string|React.Component} RawComponent - it is a decorator, the wrapper
 * element positioned in the template according to its index.
 * @param {number} index - it is the Component index
 * @param {array<string|React.Component>} args - list of all decorators
 * @param {string} uid - reference id for the decoration group
 * @returns {array}
 */
function interpolateComponents(expression, RawComponent, index, args, uid) {
  const currentExpression = [...expression];
  let newExpression = [];
  let buildingExpression;
  while (currentExpression.length) {
    buildingExpression = interpolateText(currentExpression.shift(), args);
    if (buildingExpression === '') {
      /* eslint-disable */
      continue;
      /* eslint-enable */
    }
    if (typeof buildingExpression === 'string') {
      newExpression = newExpression.concat(
        getPartialTextInterpolated(buildingExpression, RawComponent, index, args, uid)
      );
    } else {
      newExpression = newExpression.concat(buildingExpression);
    }
    buildingExpression = '';
  }
  return newExpression;
}

/**
 * Creates a reduce function based on the interpolation of the Components
 * @param {array<string|React.Component>} args - list of all decorators
 * @param {string} uid - reference id for the decoration group
 * @returns {array}
 */
const createReduce = (args, uid) => (expression, RawComponent, index) =>
  interpolateComponents(expression, RawComponent, index, args, uid);

/**
 * Decorates a string converting into function that is able to replace
 * the <0>value</0> by <Component>value</Component>, creating an array
 * from the message. The components are replaced according to the
 * regarding its index.
 * @param {string} text - it is the message to decorate.
 * @returns {function}
 */
export function decorate(text) {
  const uid = uuid();
  /**
   * Decorates the string previously provided generating an array with
   * strings wrapped by component according to its index.
   * @param {arguments} args - it is the list of arguments
   * @returns {array}
   */
  return (...args) => {
    const reduce = createReduce([...args], uid);
    const decoratedItems = Array.from(args).reduce(reduce, [text]);
    const getContent = () =>
      decoratedItems.map((item, index) => {
        const key = `${uid}:item-${index}`;

        return <React.Fragment key={key}>{item}</React.Fragment>;
      });
    const content = useMemo(getContent, [...args, text]);

    return <React.Fragment>{content}</React.Fragment>;
  };
}

export default {
  decorate,
  localise,
};
