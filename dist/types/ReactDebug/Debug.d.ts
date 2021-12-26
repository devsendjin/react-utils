import React from 'react';
import './Debug.scss';
interface IDebugProps {
    data?: any;
    componentName?: string;
    trimmedStrings?: boolean;
    collapsed?: boolean;
    isDefaultMinimized?: boolean;
    position?: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';
    style?: React.CSSProperties;
}
declare const Debug: React.FC<IDebugProps>;
export { Debug };
