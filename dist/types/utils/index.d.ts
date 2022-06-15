declare type Scope = (callback: any, scopeName?: string, options?: {
    divider?: boolean | string;
}) => void;
export declare const scope: Scope;
declare type Primitive = string | number | bigint | boolean | symbol | null | undefined;
declare type Logger = (data: Primitive | Array<any> | {}, options?: {
    formatted?: boolean;
    excludeByValue?: any[];
    excludeByType?: string[];
}) => void;
export declare const l: Logger;
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
