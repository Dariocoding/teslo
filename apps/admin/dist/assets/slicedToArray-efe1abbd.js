import{a as c}from"./unsupportedIterableToArray-cf7d0cbd.js";function b(t){if(Array.isArray(t))return t}function s(t,r){var e=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(e!=null){var i,a,u,o,l=[],n=!0,f=!1;try{if(u=(e=e.call(t)).next,r===0){if(Object(e)!==e)return;n=!1}else for(;!(n=(i=u.call(e)).done)&&(l.push(i.value),l.length!==r);n=!0);}catch(y){f=!0,a=y}finally{try{if(!n&&e.return!=null&&(o=e.return(),Object(o)!==o))return}finally{if(f)throw a}}return l}}function m(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function h(t,r){return b(t)||s(t,r)||c(t,r)||m()}export{h as _};