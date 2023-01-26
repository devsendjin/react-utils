import dayjs, { ConfigType } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { getLabelName } from "./logger";
import { LoggerLabelName } from "./types";
import { Timezones } from "./constants";

dayjs.extend(utc);
dayjs.extend(timezone); // dependent on utc plugin

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

type Autocompletable<TargetType, T extends string | number = string> = TargetType | (T & {});

type LogDateOptions = {
  label?: LoggerLabelName;
  format?: Autocompletable<LogDateFormats>;
  behavior?: "log" | "return";
};

type LogDate = ((date: LogDateArgument, options?: LogDateOptions) => string | void) & {
  formats: typeof LogDateFormats;
  timezones: typeof Timezones;
};

const logDate: LogDate = (date, { label, format = LogDateFormats.FULL, behavior = "log" } = {}) => {
  const dateToLog = dayjs(date).format(format);
  const _label = label ? `${getLabelName(label)} ` : "";

  const logValue = `${_label}${dateToLog}`;

  if (behavior === "return") return logValue;

  console.log(`${_label}${dateToLog}`);

  return;
};

logDate.formats = LogDateFormats;
logDate.timezones = Timezones;

const getDate: LogDate = (date, options) => {
  return logDate(date, { ...options, behavior: "return" });
};

getDate.formats = LogDateFormats;
getDate.timezones = Timezones;

export type { LogDateArgument, LogDate, Dayjs };
export { logDate, getDate, dayjs };
