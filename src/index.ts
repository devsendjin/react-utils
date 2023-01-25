import { Logger } from './utils/types';
import { logger, excludeFunctionLogger } from './utils';
import { Debug, debugImplelentation } from './ReactDebug';

// react Debug component
window._debug = debugImplelentation;

// _debug utils
window._l = logger;
window._dl = excludeFunctionLogger;

declare global {
  // _debug utils
  const _l: Logger;
  const _dl: Logger;

  interface Window {
    _l: Logger;
    _dl: Logger;
  }

  // react Debug component
  const _debug: typeof debugImplelentation;
  interface Window {
    _debug: typeof debugImplelentation;
  }
}

export { Debug };
