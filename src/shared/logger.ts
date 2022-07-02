import { isMap, isPrimitive } from './internal';

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
const l: Logger = (
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

// preset without 'function type'
const dl: Logger = (data, label, { excludeByType = [], ...restOptions } = {}) => {
  l(data, label, { excludeByType: ['function', ...excludeByType], ...restOptions });
};

export type { Logger };
export { l, dl };
