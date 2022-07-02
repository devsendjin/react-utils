type Scope = (callback: any, scopeName?: string, options?: { divider?: boolean | string }) => void;

const scope: Scope = (callback, scopeName = 'Scope', { divider = '' } = {}) => {
  if (divider) console.log(divider);
  console.group(scopeName);
  if (callback) callback();
  console.groupEnd();
};

export type { Scope };
export { scope };
