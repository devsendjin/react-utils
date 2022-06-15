declare type Scope = (callback: any, scopeName?: string, options?: {
    divider?: boolean | string;
}) => void;
export declare const scope: Scope;
declare type Primitive = string | number | bigint | boolean | symbol | null | undefined;
declare type TL = (data: Primitive | Array<any> | {}, options?: {
    formatted?: boolean;
    excludeByValue?: any[];
    excludeByType?: string[];
}) => void;
export declare const l: TL;
declare global {
    const scope: Scope;
    const l: TL;
    interface Window {
        scope: Scope;
        l: TL;
    }
}
export {};
