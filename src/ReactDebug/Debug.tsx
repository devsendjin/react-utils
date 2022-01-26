import React, { useState } from 'react';
import cn from 'classnames';
import ReactJson, { ReactJsonViewProps } from 'react-json-view';
import styles from './Debug.module.scss';
import './Debug.overrides.scss';

interface IDebugProps extends Partial<ReactJsonViewProps> {
  data?: any;
  componentName?: string;
  collapsed?: boolean;
  isDefaultMinimized?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';
  style?: any;
}

const Debug: React.FC<IDebugProps> = ({
  data,
  componentName = '',
  isDefaultMinimized = false,
  position = 'top-left', // top-right | bottom-right | top-left | bottom-left
  name = false,
  collapseStringsAfterLength = 30,
  collapsed = false,
  style = {},
  ...restJsonViewProps
}) => {
  const [isMinimized, setMinimize] = useState(isDefaultMinimized);
  const [isScrollbarVisible, setScrollbarVisibility] = useState(false);

  return (
    <div
      className={cn(
        'custom-debug',
        styles['custom-debug'],
        styles[`custom-debug--${position}`],
        isMinimized && styles['custom-debug--is-minimized'],
        (!isScrollbarVisible || isMinimized) && styles['custom-debug--is-scrollbar-hidden'],
        !!collapseStringsAfterLength && isMinimized && styles['custom-debug--is-strings-collapsed']
      )}
      onClick={() => isMinimized && setMinimize(false)}
      style={style}
    >
      <div className={styles['button-box']}>
        <button type="button" className={styles['button']} onClick={() => setMinimize(true)}>
          Hide panel
        </button>
        <button type="button" className={styles['button']} onClick={() => setScrollbarVisibility((prev) => !prev)}>
          Toggle scrollbar
        </button>
      </div>
      {componentName && (
        <>
          component: <span className={styles['title']}>{componentName}</span>
        </>
      )}

      <ReactJson
        src={data}
        name={name}
        theme="flat"
        iconStyle="square"
        indentWidth={4}
        collapseStringsAfterLength={collapseStringsAfterLength}
        collapsed={collapsed}
        onEdit={() => {}}
        onDelete={() => {}}
        {...restJsonViewProps}
      />
    </div>
  );
};

Debug.displayName = 'Debug';

export { Debug };
