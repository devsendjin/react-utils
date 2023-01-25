import dayjs, { ConfigType } from 'dayjs';
import { LoggerLabelName } from './types';
declare type Dayjs = typeof dayjs;
declare type LogDateArgument = ConfigType;
declare enum LogDateFormats {
    FULL = "YYYY-MM-DD HH:mm:ss",
    DATE = "YYYY-MM-DD",
    TIME = "HH:mm:ss",
    YEAR = "YYYY",
    MONTH = "MM",
    DAY = "DD",
    HOURS = "HH",
    MINUTES = "mm",
    SECODS = "ss"
}
declare type LogDateOptions = {
    label?: LoggerLabelName;
    format?: LogDateFormats;
    behavior?: 'log' | 'return';
};
declare type LogDate = (date: LogDateArgument, options?: LogDateOptions) => string | void;
declare type LogDateWithFormats = LogDate & Record<keyof typeof LogDateFormats, LogDateFormats>;
declare const getDate: LogDate;
declare const logDateWithFormats: LogDateWithFormats;
declare const getDateWithFormats: LogDateWithFormats;
export type { LogDateArgument, LogDateWithFormats, Dayjs };
export { logDateWithFormats, getDateWithFormats, getDate, dayjs };
