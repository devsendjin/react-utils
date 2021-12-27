import React from 'react';
import { ReactJsonViewProps } from 'react-json-view';
import './Debug.overrides.scss';
interface IDebugProps extends Partial<ReactJsonViewProps> {
    data?: any;
    componentName?: string;
    collapsed?: boolean;
    isDefaultMinimized?: boolean;
    position?: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';
    style?: any;
}
declare const Debug: React.FC<IDebugProps>;
export { Debug };
