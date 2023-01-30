import { Logger } from "./utils/types";
import { logger, excludeFunctionLogger } from "./utils/logger";
import { Debug, debugImplelentation } from "./ReactDebug";
import { logDate, getDate, dayjs, LogDate, Dayjs } from "./utils/date-logger";
import { useConsoleClear } from "./hooks/useConsoleClear";

// react hooks
window._useConsoleClear = useConsoleClear;

// react Debug component
window._debug = debugImplelentation;

// _debug utils
window._l = logger;
window._dl = excludeFunctionLogger;
window._ldate = logDate;
window._gdate = getDate;
window._dayjs = dayjs;

declare global {
  // _debug utils
  const _l: Logger;
  const _dl: Logger;

  const _ldate: LogDate;
  const _gdate: LogDate;
  const _dayjs: Dayjs;

  interface Window {
    _l: Logger;
    _dl: Logger;

    _ldate: LogDate;
    _gdate: LogDate;
    _dayjs: Dayjs;
  }

  // react Debug component
  const _debug: typeof debugImplelentation;
  interface Window {
    _debug: typeof debugImplelentation;
  }

  // react hooks
  const _useConsoleClear: typeof useConsoleClear;
  interface Window {
    _useConsoleClear: typeof useConsoleClear;
  }
}

export { Debug, useConsoleClear };
