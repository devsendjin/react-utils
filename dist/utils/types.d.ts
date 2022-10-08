declare type LoggerScopeOptions = {
    nameStyle?: string;
};
export declare type ScopeLogger = (callback: any, name?: string, options?: LoggerScopeOptions) => void;
export declare type LogWithLabel = (data: unknown[], label?: LoggerScopeName) => void;
export declare type LogImpl = (data: unknown[], options: Pick<LoggerOptions, 'scope' | 'scopeCallback'> & {
    scopeOptions?: LoggerScopeOptions;
}) => void;
declare type Primitive = string | number | bigint | boolean | symbol | null | undefined;
declare type LoggerData = Primitive | Array<any> | Map<any, any> | {};
export declare type LoggerScopeName = string | Function;
declare type LoggerOptions = {
    formatted?: boolean;
    excludeByKey?: string[];
    excludeByValue?: any[];
    excludeByType?: string[];
    dividerChar?: string;
    reversed?: boolean;
    scope?: LoggerScopeName;
    scopeCallback?: ({ scopeName }: Partial<{
        scopeName?: string;
    }>) => void;
    scopeOptions?: LoggerScopeOptions;
    debug?: boolean;
};
export declare type Logger = (data: LoggerData, options?: LoggerOptions) => void;
export {};
