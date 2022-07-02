declare type Primitive = string | number | bigint | boolean | symbol | null | undefined;
declare type LoggerData = Primitive | Array<any> | Map<any, any> | {};
declare type LoggerLabel = string | Function;
declare type LoggerOptions = {
    formatted?: boolean;
    excludeByKey?: string[];
    excludeByValue?: any[];
    excludeByType?: string[];
    scopeName?: LoggerLabel;
    dividerChar?: string | number;
};
declare type Logger = (data: LoggerData, label?: LoggerLabel, options?: LoggerOptions) => void;
declare const l: Logger;
declare const dl: Logger;
export type { Logger };
export { l, dl };
