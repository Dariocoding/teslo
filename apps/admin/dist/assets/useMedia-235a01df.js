import{a as c}from"./index-5d060a31.js";function n(s){const[t,a]=c.useState(!1);return c.useEffect(()=>{const e=window.matchMedia(s);e.matches!==t&&a(e.matches);const r=()=>a(e.matches);return e.addListener(r),()=>e.removeListener(r)},[s,t]),t}export{n as u};