declare const __DEV__: boolean;
declare const __PROD__: boolean;

// for images
declare module '*.jpeg' {
  const content: string
  export default content;
}
declare module '*.jpg' {
  const content: string
  export default content;
}
declare module '*.png' {
  const content: string
  export default content;
}
declare module '*.webp' {
  const content: string
  export default content;
}
declare module '*.avif' {
  const content: string
  export default content;
}
declare module '*.svg' {
  import React from 'react';

  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export { ReactComponent };

  const svgContent: string;
  export default svgContent;
}

// For CSS
declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// For SCSS
declare module '*.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
