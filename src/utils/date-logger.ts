import dayjs, { ConfigType } from 'dayjs'
import { getLabelName } from './logger';
import { LoggerLabelName } from './types';

type Dayjs = typeof dayjs;

type LogDateArgument = ConfigType;

enum LogDateFormats {
  FULL = "YYYY-MM-DD HH:mm:ss",
  DATE = "YYYY-MM-DD",
  TIME = "HH:mm:ss",
  YEAR = "YYYY",
  MONTH = "MM",
  DAY = "DD",
  HOURS = "HH",
  MINUTES = "mm",
  SECODS = "ss",
}

type LogDateOptions = {
  label?: LoggerLabelName;
  format?: LogDateFormats;
  behavior?: 'log' | 'return'
}

type LogDate = (date: LogDateArgument, options?: LogDateOptions) => string | void;
type LogDateWithFormats = LogDate & Record<keyof typeof LogDateFormats, LogDateFormats>

const logDate: LogDate = (date, { label, format = LogDateFormats.FULL, behavior =  'log' } =  {}) => {
  const dateToLog = dayjs(date).format(format)
  const _label = label ? `${getLabelName(label)} ` : ''

  const logValue = `${_label}${dateToLog}`;

  if (behavior === 'return') return logValue;

  console.log(`${_label}${dateToLog}`);

  return;
}

const getDate: LogDate = (date, options) => {
  return logDate(date, {...options, behavior: 'return'})
}

const injectDateFormats = (func: LogDate) => {
  Object.entries(LogDateFormats).forEach(([key, value]) => {
    func[key] = value;
  })
}

injectDateFormats(logDate);
injectDateFormats(getDate);

const logDateWithFormats = logDate as LogDateWithFormats;
const getDateWithFormats = getDate as LogDateWithFormats;

export type { LogDateArgument, LogDateWithFormats, Dayjs }
export { logDateWithFormats, getDateWithFormats, getDate, dayjs }
