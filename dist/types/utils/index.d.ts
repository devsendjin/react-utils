declare type Scope = (callback: any, scopeName?: string, options?: {
    divider?: boolean | string;
}) => void;
export declare const scope: Scope;
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
export declare const l: Logger;
export declare const dl: Logger;
declare global {
    const scope: Scope;
    const l: Logger;
    const dl: Logger;
    interface Window {
        scope: Scope;
        l: Logger;
        dl: Logger;
    }
}
export {};
