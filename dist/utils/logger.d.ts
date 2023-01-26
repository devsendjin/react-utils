import { LoggerLabelName, Logger } from "./types";
declare const getLabelName: (context: LoggerLabelName) => string;
declare const logger: Logger;
declare const excludeFunctionLogger: Logger;
export { logger, excludeFunctionLogger, getLabelName };
