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

type LogWithLabel = (data: unknown[], label?: LoggerOptions['label']) => void;
const logWithLabel: LogWithLabel = (data, label) => {
  if (label) {
    console.log(`%c${label}`, 'color: green; font-size: 18px', ...data);
    return;
  }

  console.log(...data);
};

type LogImpl = (data: unknown[], options: Pick<LoggerOptions, 'label' | 'scopeName'>) => void;
const logImpl: LogImpl = (data: unknown[], { label, scopeName }): void => {
  if (scopeName) {
    scope(() => {
      logWithLabel(data, label);
    }, scopeName);
    return;
  }
  logWithLabel(data, label);
};

type Primitive = string | number | bigint | boolean | symbol | null | undefined;
type LoggerData = Primitive | Array<any> | Map<any, any> | {};
type LoggerOptions = {
  formatted?: boolean;
  excludeByKey?: string[];
  excludeByValue?: any[];
  excludeByType?: string[];
  label?: string;
  scopeName?: string;
  dividerChar?: string | number;
};

type Logger = (data: LoggerData, options?: LoggerOptions) => void;
export const l: Logger = (
  data,
  {
    formatted = true,
    excludeByKey = [],
    excludeByValue = [],
    excludeByType = [],
    label,
    scopeName,
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

export const dl: Logger = (data, options) => {
  l(data, { excludeByType: ['function'], ...options });
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
