declare global {
    const scope: TScope;
    const l: TL;
    interface Window {
        scope: TScope;
        l: TL;
    }
}
declare type TScope = (callback: any, scopeName?: string, options?: {
    divider?: boolean | string;
}) => void;
export declare const scope: TScope;
/**
 * modified console.log
 * @param {Object} obj
 * @returns [string, any]
 */
declare type TL = (obj: any) => void;
export declare const l: TL;
export {};
