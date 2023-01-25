import { ScopeLogger, LoggerScopeName, LoggerLabelName, LogImpl, Logger } from './types';

const isPrimitive = (value: unknown): boolean => {
  const type = typeof value;
  return value == null || (type != 'object' && type != 'function');
};

const isMap = (value: any): value is Map<any, any> => value instanceof Map;
const isSet = (value: any): value is Set<any> => value instanceof Set;

const getScopeName = (context: LoggerScopeName = ''): string => {
  return typeof context === 'function' ? context.name : context;
};

const getLabelName = (context: LoggerLabelName): string => {
  return `[ ${getScopeName(context)} ]`;
};

const scopeLogger: ScopeLogger = (callback, name = 'Scope', { nameStyle } = {}) => {
  const consoleGroupArgs = nameStyle ? [`%c${name}`, nameStyle] : [name];
  if (nameStyle) {
    console.group(...consoleGroupArgs);
  } else {
    console.group(...consoleGroupArgs);
  }
  if (callback) callback();
  console.groupEnd();
};

const logImplementation: LogImpl = (data: unknown[], { scope, scopeCallback, scopeOptions }): void => {
  if (scope) {
    const scopeName = getScopeName(scope);

    scopeLogger(
      () => {
        console.log(...data);

        scopeCallback?.({ scopeName });
      },
      scopeName,
      scopeOptions
    );
    return;
  }

  console.log(...data);
};

const logger: Logger = (data, options = {}) => {
  const {
    formatted = true,
    alignToDivider = false,
    excludeByKey = [],
    excludeByValue = [],
    excludeByType = [],
    reversed = false,
    dividerChar = reversed ? '⬅' : '⮕',
    label,

    debug = false,

    scope = '',
    scopeCallback,
    scopeOptions,
  } = options;

  const sharedScopeLoggerParams = { scope, scopeCallback, scopeOptions };

  if (!data || Array.isArray(data) || isPrimitive(data) || isMap(data) || isSet(data)) {
    logImplementation([data], sharedScopeLoggerParams);
    return;
  }

  const maxLengthKeyName = Object.keys(data).reduce((a, b) => {
    return a.length > b.length ? a : b;
  }, '');

  // const maxLengthValueName = Object.values(data)
  //   .filter((v) => typeof v !== 'function')
  //   .reduce((a, b) => {
  //     return String(a).length > String(b).length ? a : b;
  //   }, '');

  // const minLengthKeyName = keys.reduce((a, b) => {
  //   return a.length < b.length ? a : b;
  // }, keys.length ? keys[0] : '');

  const maxKeyLength = maxLengthKeyName.length;

  const isExcludedType = (value: unknown) => excludeByType.includes(typeof value);
  const isExcludedKey = (key: string) => excludeByKey.some((excludedkey) => excludedkey === key);
  const isExcludedValue = (value: unknown) => excludeByValue.some((excludedValue) => excludedValue === value);

  let isFirstArgsElementPassed = false;
  const logArgsFromObj = Object.entries(data).reduce<unknown[]>((acc, [key, value]) => {
    if (!isExcludedType(value) && !isExcludedKey(value) && !isExcludedValue(key)) {
      const firstLineBreakValue = isFirstArgsElementPassed ? '\n' : '';
      isFirstArgsElementPassed = true;

      const _label = label ? (reversed ? ` ${getLabelName(label)}` : `${getLabelName(label)} `) : '';

      if (reversed) {
        acc.push(firstLineBreakValue, value, ` ${dividerChar} ${key}${_label}`);
      } else {
        const padMethod: typeof String.prototype.padEnd | typeof String.prototype.padStart = alignToDivider
          ? String.prototype.padStart.bind(key)
          : String.prototype.padEnd.bind(key);
        const keyName = formatted ? padMethod(maxKeyLength) : key;
        acc.push(firstLineBreakValue, `${_label}${keyName} ${dividerChar} `, value);
      }
    }
    return acc;
  }, []);

  if (debug) {
    logImplementation(logArgsFromObj, {
      scope,
      scopeCallback: (...scopeCallbackParams) => {
        logImplementation([{ options }], {
          scope: scope ? `[${scope}] debug info:` : 'Scope debug info',
          scopeOptions: { nameStyle: 'color: yellow;' },
        });
        scopeCallback?.(...scopeCallbackParams);
      },
      scopeOptions,
    });
  } else {
    logImplementation(logArgsFromObj, sharedScopeLoggerParams);
  }
};

const excludeFunctionLogger: Logger = (data, options) => {
  logger(data, { excludeByType: ['function'], ...options });
};

export { logger, excludeFunctionLogger, getLabelName };
