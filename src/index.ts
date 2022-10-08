import { Logger } from './utils/types';
import { logger, excludeFunctionLogger } from './utils';

window.l = logger;
window.dl = excludeFunctionLogger;

declare global {
  const l: Logger;
  const dl: Logger;

  interface Window {
    l: Logger;
    dl: Logger;
  }
}

export { logger, excludeFunctionLogger } from './utils';
export { Debug, debug } from './ReactDebug';
