import { debugImpl } from './react/ReactDebug';

window.debug = debugImpl;

declare global {
  const debug: typeof debugImpl;
  interface Window {
    debug: typeof debugImpl;
  }
}

export { Debug, debugImpl as debug } from './react/ReactDebug';
