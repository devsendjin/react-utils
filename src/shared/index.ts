import { l, dl, Logger } from './logger';
import { scope, Scope } from './scope';

const setup = () => {
  window.scope = scope;
  window.l = l;
  window.dl = dl;
};

declare global {
  const scope: Scope;
  const l: Logger;
  const dl: Logger;
  interface Window {
    scope: Scope;
    l: Logger;
    dl: Logger;
  }
}

export { l, dl, scope, setup };
