import { Logger } from './utils/types';
import { logger, excludeFunctionLogger } from './utils';
import { Debug, debugImplelentation } from './ReactDebug';

// react Debug component
window.debug = debugImplelentation;

// debug utils
window.l = logger;
window.dl = excludeFunctionLogger;

declare global {
  // debug utils
  const l: Logger;
  const dl: Logger;

  interface Window {
    l: Logger;
    dl: Logger;
  }

  // react Debug component
  const debug: typeof debugImplelentation;
  interface Window {
    debug: typeof debugImplelentation;
  }
}

export { Debug };
