declare global {
    const scope: Scope;
    const l: TL;
    interface Window {
        scope: Scope;
        l: TL;
    }
}
declare type Scope = (callback: any, scopeName?: string, options?: {
    divider?: boolean | string;
}) => void;
export declare const scope: Scope;
/**
 * modified console.log
 * @param {Object} obj
 * @returns [string, any]
 */
declare type TL = (obj: any) => void;
export declare const l: TL;
export {};
