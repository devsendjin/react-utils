import { Logger } from './utils/types';
import { Debug, debugImplelentation } from './ReactDebug';
import { LogDate, Dayjs } from './utils/date-logger';
declare global {
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
    const _debug: typeof debugImplelentation;
    interface Window {
        _debug: typeof debugImplelentation;
    }
}
export { Debug };
