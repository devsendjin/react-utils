import dayjs, { ConfigType } from 'dayjs';
import { getLabelName } from './logger';
import { LoggerLabelName } from './types';

type Dayjs = typeof dayjs;

type LogDateArgument = ConfigType;

enum LogDateFormats {
  FULL = 'YYYY-MM-DD HH:mm:ss',
  DATE = 'YYYY-MM-DD',
  TIME = 'HH:mm:ss',
  YEAR = 'YYYY',
  MONTH = 'MM',
  DAY = 'DD',
  HOURS = 'HH',
  MINUTES = 'mm',
  SECODS = 'ss',
}

type Autocompletable<TargetType, T extends string | number = string> = TargetType | (T & {});

type LogDateOptions = {
  label?: LoggerLabelName;
  format?: Autocompletable<LogDateFormats>;
  behavior?: 'log' | 'return';
};

type LogDate = ((date: LogDateArgument, options?: LogDateOptions) => string | void) & {
  formats: typeof LogDateFormats;
};

const logDate: LogDate = (date, { label, format = LogDateFormats.FULL, behavior = 'log' } = {}) => {
  const dateToLog = dayjs(date).format(format);
  const _label = label ? `${getLabelName(label)} ` : '';

  const logValue = `${_label}${dateToLog}`;

  if (behavior === 'return') return logValue;

  console.log(`${_label}${dateToLog}`);

  return;
};

logDate.formats = LogDateFormats;

const getDate: LogDate = (date, options) => {
  return logDate(date, { ...options, behavior: 'return' });
};

getDate.formats = LogDateFormats;

export type { LogDateArgument, LogDate, Dayjs };
export { logDate, getDate, dayjs };
