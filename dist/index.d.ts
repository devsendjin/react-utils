import { Logger } from './utils/types';
import { Debug, debugImplelentation } from './ReactDebug';
declare global {
    const l: Logger;
    const dl: Logger;
    interface Window {
        l: Logger;
        dl: Logger;
    }
    const debug: typeof debugImplelentation;
    interface Window {
        debug: typeof debugImplelentation;
    }
}
export { Debug };
