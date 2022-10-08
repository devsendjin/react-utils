import { Logger } from './utils/types';
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
