import dayjs, { ConfigType } from 'dayjs';
import { LoggerLabelName } from './types';
import { Timezones } from './constants';
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
declare type Autocompletable<TargetType, T extends string | number = string> = TargetType | (T & {});
declare type LogDateOptions = {
    label?: LoggerLabelName;
    format?: Autocompletable<LogDateFormats>;
    behavior?: 'log' | 'return';
};
declare type LogDate = ((date: LogDateArgument, options?: LogDateOptions) => string | void) & {
    formats: typeof LogDateFormats;
    timezones: typeof Timezones;
};
declare const logDate: LogDate;
declare const getDate: LogDate;
export type { LogDateArgument, LogDate, Dayjs };
export { logDate, getDate, dayjs };
