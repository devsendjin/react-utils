import { Logger } from './utils/types';
import { logger, excludeFunctionLogger } from './utils/logger';
import { Debug, debugImplelentation } from './ReactDebug';
import { LogDateWithFormats, logDateWithFormats, getDateWithFormats, dayjs, Dayjs } from './utils/date-logger';

// react Debug component
window._debug = debugImplelentation;

// _debug utils
window._l = logger;
window._dl = excludeFunctionLogger;
window._ldate = logDateWithFormats;
window._gdate = getDateWithFormats;
window._dayjs = dayjs;

declare global {
  // _debug utils
  const _l: Logger;
  const _dl: Logger;

  const _ldate: LogDateWithFormats;
  const _gdate: LogDateWithFormats;
  const _dayjs: Dayjs;

  interface Window {
    _l: Logger;
    _dl: Logger;

    _ldate: LogDateWithFormats;
    _gdate: LogDateWithFormats;
    _dayjs: Dayjs;
  }

  // react Debug component
  const _debug: typeof debugImplelentation;
  interface Window {
    _debug: typeof debugImplelentation;
  }
}

export { Debug };
