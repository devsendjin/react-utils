type LoggerScopeOptions = { nameStyle?: string };
export type ScopeLogger = (callback: () => void, name?: string, options?: LoggerScopeOptions) => void;

export type LogWithLabel = (data: unknown[], label?: LoggerScopeName) => void;

export type LogImpl = (
  data: unknown[],
  options: Pick<LoggerOptions, 'scope' | 'scopeCallback'> & { scopeOptions?: LoggerScopeOptions }
) => void;

type Primitive = string | number | bigint | boolean | symbol | null | undefined;
type LoggerData = Primitive | Array<any> | Map<any, any> | {};
export type LoggerScopeName = string | Function;

export type LoggerLabelName = string | Function;

type LoggerOptions = {
  // logger related params
  formatted?: boolean;
  alignToDivider?: boolean;
  excludeByKey?: string[];
  excludeByValue?: any[];
  excludeByType?: string[];
  dividerChar?: string;
  reversed?: boolean;
  label?: LoggerLabelName;

  // scope related params
  scope?: LoggerScopeName;
  scopeCallback?: ({ scopeName }: Partial<{ scopeName?: string }>) => void;
  scopeOptions?: LoggerScopeOptions;

  // core params
  debug?: boolean;
};

export type Logger = (data: LoggerData, options?: LoggerOptions) => void;
