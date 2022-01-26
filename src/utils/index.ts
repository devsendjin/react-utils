declare global {
  const scope: TScope;
  const l: TL;
  interface Window {
    scope: TScope;
    l: TL;
  }
}

type TScope = (callback: any, scopeName?: string, options?: { divider?: boolean | string }) => void;
export const scope: TScope = (callback, scopeName = 'Scope', { divider = '' } = {}) => {
  if (divider) console.log(divider);
  console.group(scopeName);
  if (callback) callback();
  console.groupEnd();
};

/**
 * modified console.log
 * @param {Object} obj
 * @returns [string, any]
 */
type TL = (obj: any) => void;
export const l: TL = (obj) => {
  if (!obj || Array.isArray(obj)) {
    return console.log(obj);
  }

  const logArgs = Object.entries(obj).reduce((acc: any, [key, value], index) => {
    if (index === 0) {
      acc.push(`${key}: `, value);
    } else {
      acc.push(`\n${key}: `, value);
    }
    return acc;
  }, []);

  console.log(...logArgs);
};

window.scope = scope;
window.l = l;
