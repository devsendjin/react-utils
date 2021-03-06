import React from 'react';
import { ReactJsonViewProps } from 'react-json-view';
import './Debug.overrides.scss';
declare type DebugProps = Partial<ReactJsonViewProps> & {
    data?: any;
    componentName?: string;
    collapsed?: boolean;
    isDefaultMinimized?: boolean;
    position?: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';
    style?: React.CSSProperties;
};
declare const Debug: React.FC<DebugProps>;
declare const debugImpl: (data: DebugProps['data'], restProps?: Omit<DebugProps, 'data'>) => ReturnType<React.FC<DebugProps>>;
declare global {
    const debug: typeof debugImpl;
    interface Window {
        debug: typeof debugImpl;
    }
}
export { Debug, debugImpl as debug };
