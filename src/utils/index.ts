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

type Primitive = string | number | bigint | boolean | symbol | null | undefined;

type TL = (data: Primitive | Array<any> | {}, options?: { formatted?: boolean }) => void;
export const l: TL = (data, { formatted = true } = {}) => {
  if (!data) {
    console.log(data);
    return;
  }

  if (Array.isArray(data)) {
    console.log('Array ⮕ ', data);
    return;
  }

  if (isPrimitive(data)) {
    console.log(data);
    return;
  }

  const maxLengthKeyName = Object.keys(data).reduce((a, b) => {
    return a.length > b.length ? a : b;
  }, '');

  const maxKeyLength = maxLengthKeyName.length;

  const logArgs = Object.entries(data).reduce((acc: any, [key, value], index) => {
    acc.push(`${index === 0 ? '' : '\n'}${formatted ? key.padEnd(maxKeyLength, ' ') : key} ⮕ `, value);
    return acc;
  }, []);

  console.log(...logArgs);
};

window.scope = scope;
window.l = l;

declare global {
  const scope: Scope;
  const l: TL;

  interface Window {
    scope: Scope;
    l: TL;
  }
}
