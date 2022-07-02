import { debugImpl } from './react/ReactDebug';
declare global {
    const debug: typeof debugImpl;
    interface Window {
        debug: typeof debugImpl;
    }
}
export { Debug, debugImpl as debug } from './react/ReactDebug';
