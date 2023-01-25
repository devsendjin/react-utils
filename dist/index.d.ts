import { Logger } from './utils/types';
import { Debug, debugImplelentation } from './ReactDebug';
declare global {
    const _l: Logger;
    const _dl: Logger;
    interface Window {
        _l: Logger;
        _dl: Logger;
    }
    const _debug: typeof debugImplelentation;
    interface Window {
        _debug: typeof debugImplelentation;
    }
}
export { Debug };
