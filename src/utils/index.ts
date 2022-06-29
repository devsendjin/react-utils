type Scope = (callback: any, scopeName?: string, options?: { divider?: boolean | string }) => void;
export const scope: Scope = (callback, scopeName = 'Scope', { divider = '' } = {}) => {
  if (divider) console.log(divider);
  console.group(scopeName);
  if (callback) callback();
  console.groupEnd();
};

const isPrimitive = (value: unknown): boolean => {
  const type = typeof value;
  return value == null || (type != 'object' && type != 'function');
};

const isMap = (value: any): value is Map<any, any> => {
  return ['clear', 'delete', 'entries', 'forEach', 'get', 'has', 'keys', 'set', 'size', 'values'].every(
    (v) => v in value
  );
};

const drawContextTitle = (label: LoggerLabel = ''): string => {
  return typeof label === 'function' ? label.name : label;
};

type LogWithLabel = (data: unknown[], label?: LoggerLabel) => void;
const logWithLabel: LogWithLabel = (data, label) => {
  if (label) {
    console.log(`%c${drawContextTitle(label)}`, 'color: green; font-size: 18px', ...data);
    return;
  }

  console.log(...data);
};

type LogImpl = (data: unknown[], options: { label: LoggerLabel } & Pick<LoggerOptions, 'scopeName'>) => void;
const logImpl: LogImpl = (data: unknown[], { label, scopeName }): void => {
  if (scopeName) {
    scope(() => {
      logWithLabel(data, label);
    }, drawContextTitle(scopeName));
    return;
  }
  logWithLabel(data, label);
};

type Primitive = string | number | bigint | boolean | symbol | null | undefined;
type LoggerData = Primitive | Array<any> | Map<any, any> | {};
type LoggerLabel = string | Function;
type LoggerOptions = {
  formatted?: boolean;
  excludeByKey?: string[];
  excludeByValue?: any[];
  excludeByType?: string[];
  scopeName?: LoggerLabel;
  dividerChar?: string | number;
};

type Logger = (data: LoggerData, label?: LoggerLabel, options?: LoggerOptions) => void;
export const l: Logger = (
  data,
  label = '',
  {
    formatted = true,
    excludeByKey = [],
    excludeByValue = [],
    excludeByType = [],
    scopeName = '',
    dividerChar = '⮕',
  } = {}
) => {
  const firstLineBreakInNonObject = label ? '\n' : '';
  if (!data) {
    logImpl([firstLineBreakInNonObject, data], { label, scopeName });
    return;
  }

  if (Array.isArray(data)) {
    logImpl([`${firstLineBreakInNonObject}Array ${dividerChar} `, data], { label, scopeName });
    return;
  }

  if (isPrimitive(data) || isMap(data)) {
    logImpl([firstLineBreakInNonObject, data], { label, scopeName });
    return;
  }

  const maxLengthKeyName = Object.keys(data).reduce((a, b) => {
    return a.length > b.length ? a : b;
  }, '');

  const maxKeyLength = maxLengthKeyName.length;

  const isValueOfType = (value: unknown) => excludeByType.includes(typeof value);
  const isSomeKeyEqualsTo = (key: string) => excludeByKey.some((excludedkey) => excludedkey === key);
  const isSomeValueEqualsTo = (value: unknown) => excludeByValue.some((excludedValue) => excludedValue === value);

  const logArgsFromObj = Object.entries(data).reduce<unknown[]>((acc, [key, value], index) => {
    if (!isValueOfType(value) && !isSomeValueEqualsTo(value) && !isSomeKeyEqualsTo(key)) {
      const withFirstElementLineBreak = index === 0 && !label;
      acc.push(
        `${withFirstElementLineBreak ? '' : '\n'}${formatted ? key.padEnd(maxKeyLength, ' ') : key} ${dividerChar} `,
        value
      );
    }
    return acc;
  }, []);

  logImpl(logArgsFromObj, { label, scopeName });
};

export const dl: Logger = (data, label, options) => {
  l(data, label, { excludeByType: ['function'], ...options });
};

export const setup = () => {
  window.scope = scope;
  window.l = l;
  window.dl = dl;
};

declare global {
  const scope: Scope;
  const l: Logger;
  const dl: Logger;

  interface Window {
    scope: Scope;
    l: Logger;
    dl: Logger;
  }
}
