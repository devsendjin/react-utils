declare type Scope = (callback: any, scopeName?: string, options?: {
    divider?: boolean | string;
}) => void;
declare const scope: Scope;
export type { Scope };
export { scope };
