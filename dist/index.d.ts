import { Logger } from './utils/types';
import { Debug, debugImplelentation } from './ReactDebug';
import { LogDateWithFormats, Dayjs } from './utils/date-logger';
declare global {
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
    const _debug: typeof debugImplelentation;
    interface Window {
        _debug: typeof debugImplelentation;
    }
}
export { Debug };
