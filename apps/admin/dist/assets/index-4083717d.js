import{r as h,a as T,j as t,c as o,R as M}from"./index-3ba1a706.js";import{M as A,s as e}from"./index-afbcf810.js";import{C as D}from"./index-6ffea55d.js";import{m as q}from"./motion-d685a380.js";import"./index-6654b9c9.js";import"./index.esm-431b757e.js";function z(c){const a=h.useRef();return h.useEffect(()=>{function d(n){var r,i;if(!c||n.target===document.getElementsByTagName("html")[0]&&n.clientX>=document.documentElement.offsetWidth)return;let l=!1;a&&a.current&&((i=(r=a.current)==null?void 0:r.contains)!=null&&i.call(r,n.target))&&(l=!0),l||c()}return document.addEventListener("mousedown",d),()=>{document.removeEventListener("mousedown",d)}},[a,c]),a}const J=c=>{const{children:a,className:d,closable:n=!0,width:l=250,height:r=250,isOpen:i,onClose:u,closeTimeoutMS:w=300,placement:s="right",bodyOpenClassName:b,portalClassName:v,overlayClassName:x,title:m,footer:p,headerClass:N,footerClass:E,bodyClass:j,showBackdrop:g=!0,lockScroll:k=!0,shouldCloseOnOverlayClick:O=!0}=c,S=z(u),$=t.jsx(D,{onClick:u}),R=()=>{if(s==="left"||s==="right")return{dimensionClass:e.vertical,contentStyle:{width:l},motionStyle:{[s]:`-${l}${typeof l=="number"&&"px"}`}};if(s==="top"||s==="bottom")return{dimensionClass:e.horizontal,contentStyle:{height:r},motionStyle:{[s]:`-${r}${typeof r=="number"&&"px"}`}}},{dimensionClass:B,contentStyle:L,motionStyle:y}=R();return T.useEffect(()=>{const C=f=>{(f==null?void 0:f.key)==="Escape"&&u()};return document.addEventListener("keydown",C),()=>{document.removeEventListener("keydown",C)}},[i]),t.jsx(A,{shouldCloseOnEsc:!1,shouldCloseOnOverlayClick:O,className:{base:o("drawer-dario",d),afterOpen:"drawer-after-open",beforeClose:"drawer-before-close"},overlayClassName:{base:o(e["drawer-overlay"],x,!g&&"bg-transparent"),afterOpen:e["drawer-overlay-after-open"],beforeClose:e["drawer-overlay-before-close"]},portalClassName:o(v),bodyOpenClassName:o(e["drawer-open"],k&&e["drawer-lock-scroll"],b),ariaHideApp:!1,isOpen:i,closeTimeoutMS:w,children:t.jsxs(q.div,{ref:S,className:o(e["drawer-content"],B),style:L,initial:y,animate:{[s]:i?0:y[s]},children:[t.jsx(M,{isTrue:m||n,children:t.jsxs("div",{className:o(e["drawer-header"],N),children:[typeof m=="string"?t.jsx("h4",{children:m}):t.jsx("span",{children:m}),n&&$]})}),t.jsx("div",{className:o(e["drawer-body"],j),children:a}),p&&t.jsx("div",{className:o(e["drawer-footer"],E),children:p})]})})};export{J as default};
