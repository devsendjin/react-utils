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

  const maxKeyLength = maxLengthKeyName.length;

  const isExcludedType = (value: unknown) => excludeByType.includes(typeof value);
  const isExcludedKey = (key: string) => excludeByKey.some((excludedkey) => excludedkey === key);
  const isExcludedValue = (value: unknown) => excludeByValue.some((excludedValue) => excludedValue === value);

  const logArgsFromObj = Object.entries(data).reduce<unknown[]>((acc, [key, value], index) => {
    if (!isExcludedType(value) && !isExcludedKey(value) && !isExcludedValue(key)) {
      const withFirstElementLineBreak = index === 0;
      const firstLineBreakValue = withFirstElementLineBreak ? '' : '\n';

      if (reversed) {
        acc.push(firstLineBreakValue, value, ` ${dividerChar} ${key}`);
      } else {
        const keyName = formatted ? key.padEnd(maxKeyLength, ' ') : key;
        const _label = label ? `${getLabelName(label)} ` : '';
        acc.push(`${_label}${firstLineBreakValue}${keyName} ${dividerChar} `, value);
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

export { logger, excludeFunctionLogger };
