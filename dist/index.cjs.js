'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var e=function(){return e=Object.assign||function(e){for(var o,n=1,t=arguments.length;n<t;n++)for(var r in o=arguments[n])Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r]);return e},e.apply(this,arguments)};function o(e,o,n){if(n||2===arguments.length)for(var t,r=0,c=o.length;r<c;r++)!t&&r in o||(t||(t=Array.prototype.slice.call(o,0,r)),t[r]=o[r]);return e.concat(t||Array.prototype.slice.call(o))}var n=function(e){return void 0===e&&(e=''),'function'==typeof e?e.name:e},t=function(e,t){t?console.log.apply(console,o(["%c".concat(n(t)),'color: green; font-size: 18px'],e,!1)):console.log.apply(console,e)},r=function(e,o){var r=o.label,c=o.scopeName;c?scope((function(){t(e,r)}),n(c)):t(e,r)},c=function(e,o,n){void 0===o&&(o='');var t=void 0===n?{}:n,c=t.formatted,i=void 0===c||c,l=t.excludeByKey,a=void 0===l?[]:l,u=t.excludeByValue,p=void 0===u?[]:u,s=t.excludeByType,f=void 0===s?[]:s,d=t.scopeName,y=void 0===d?'':d,v=t.dividerChar,b=void 0===v?'⮕':v,g=o?'\n':'';if(e)if(Array.isArray(e))r(["".concat(g,"Array ").concat(b," "),e],{label:o,scopeName:y});else if(h=typeof(O=e),null==O||'object'!=h&&'function'!=h||function(e){return['clear','delete','entries','forEach','get','has','keys','set','size','values'].every((function(o){return o in e}))}(e))r([g,e],{label:o,scopeName:y});else{var O,h,x=Object.keys(e).reduce((function(e,o){return e.length>o.length?e:o}),'').length,m=Object.entries(e).reduce((function(e,n,t){var r=n[0],c=n[1];if(!function(e){return f.includes(typeof e)}(c)&&!function(e){return p.some((function(o){return o===e}))}(c)&&!function(e){return a.some((function(o){return o===e}))}(r)){var l=0===t&&!o;e.push("".concat(l?'':'\n').concat(i?r.padEnd(x,' '):r," ").concat(b," "),c)}return e}),[]);r(m,{label:o,scopeName:y})}else r([g,e],{label:o,scopeName:y})},i=function(n,t,r){void 0===r&&(r={});var i=r.excludeByType,l=void 0===i?[]:i,a=function(e,o){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(n[t]=e[t]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(t=Object.getOwnPropertySymbols(e);r<t.length;r++)o.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(n[t[r]]=e[t[r]])}return n}(r,["excludeByType"]);c(n,t,e({excludeByType:o(['function'],l,!0)},a))},l=function(e,o,n){void 0===o&&(o='Scope');var t=(void 0===n?{}:n).divider,r=void 0===t?'':t;r&&console.log(r),console.group(o),e&&e(),console.groupEnd()};exports.dl=i,exports.l=c,exports.scope=l,exports.setup=function(){window.scope=l,window.l=c,window.dl=i};
//# sourceMappingURL=index.cjs.js.map
