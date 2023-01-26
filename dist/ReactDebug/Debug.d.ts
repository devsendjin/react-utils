import React from "react";
import { ReactJsonViewProps } from "react-json-view";
import "./Debug.overrides.scss";
declare type DebugProps = Partial<ReactJsonViewProps> & {
    data?: any;
    componentName?: string | Function;
    collapsed?: boolean;
    isDefaultMinimized?: boolean;
    position?: "top-left" | "top-right" | "bottom-right" | "bottom-left";
    style?: React.CSSProperties;
    showRenderCount?: boolean;
};
declare const Debug: React.FC<DebugProps>;
declare const debugImplelentation: (data: DebugProps["data"], restProps?: Omit<DebugProps, "data">) => ReturnType<React.FC<DebugProps>>;
export { Debug, debugImplelentation };
