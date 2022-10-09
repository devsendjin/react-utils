import React, { useRef, useState } from 'react';
import cn from 'classnames';
import ReactJson, { ReactJsonViewProps } from 'react-json-view';
import styles from './Debug.module.scss';
import './Debug.overrides.scss';

type ComponentName = string | Function;
type DebugProps = Partial<ReactJsonViewProps> & {
  data?: any;
  componentName?: string | Function;
  collapsed?: boolean;
  isDefaultMinimized?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';
  style?: React.CSSProperties;
  showRenderCount?: boolean;
};

const getComponentName = (context: ComponentName): string => {
  return typeof context === 'function' ? context.name : context;
};

const Debug: React.FC<DebugProps> = ({
  data,
  componentName = '',
  isDefaultMinimized = false,
  position = 'top-right', // top-right | bottom-right | top-left | bottom-left
  name = null,
  collapseStringsAfterLength = 30,
  collapsed = false,
  showRenderCount = false,
  style,
  ...restJsonViewProps
}) => {
  const classNamePrefix = 'custom-debug';
  const componentNameValue = getComponentName(componentName);

  const [isMinimized, setMinimize] = useState(isDefaultMinimized);
  const [isScrollbarVisible, setScrollbarVisibility] = useState(false);
  const renderCount = useRef(0);
  renderCount.current++;

  return (
    <div
      className={cn(
        classNamePrefix,
        styles[classNamePrefix],
        styles[`${classNamePrefix}--${position}`],
        isMinimized && styles[`${classNamePrefix}--is-minimized`],
        (!isScrollbarVisible || isMinimized) && styles[`${classNamePrefix}--is-scrollbar-hidden`],
        !!collapseStringsAfterLength && isMinimized && styles[`${classNamePrefix}--is-strings-collapsed`]
      )}
      onClick={() => isMinimized && setMinimize(false)}
      style={style}
    >
      <div className={styles['row']}>
        <button type="button" className={styles['button']} onClick={() => setMinimize(true)}>
          Hide panel
        </button>
        <button type="button" className={styles['button']} onClick={() => setScrollbarVisibility((prev) => !prev)}>
          Toggle scrollbar
        </button>
      </div>
      {componentNameValue && (
        <div className={cn(styles['row'], styles['compoenent-name'])}>
          component:&nbsp;
          <span className={styles['text-bold']}>{componentNameValue}</span>
        </div>
      )}

      {showRenderCount && (
        <div className={cn(styles['row'], styles['render-count'])}>
          Render count:&nbsp;
          <span className={styles['text-bold']}>{renderCount.current}</span>
        </div>
      )}

      <ReactJson
        src={data ?? {}}
        name={name}
        theme="flat"
        iconStyle="square"
        indentWidth={4}
        collapseStringsAfterLength={collapseStringsAfterLength}
        collapsed={collapsed}
        {...restJsonViewProps}
      />
    </div>
  );
};

Debug.displayName = 'Debug';

const debugImplelentation = (
  data: DebugProps['data'],
  restProps: Omit<DebugProps, 'data'> = {}
): ReturnType<React.FC<DebugProps>> => {
  return <Debug data={data} {...restProps} />;
};

export { Debug, debugImplelentation };
