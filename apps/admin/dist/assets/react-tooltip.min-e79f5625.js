import{r as p,a as ye,c as dt}from"./index-3ba1a706.js";const ge=Math.min,ce=Math.max,Ke=Math.round,Xe=Math.floor,re=e=>({x:e,y:e}),$t={left:"right",right:"left",bottom:"top",top:"bottom"},Bt={start:"end",end:"start"};function rt(e,t,n){return ce(e,ge(t,n))}function De(e,t){return typeof e=="function"?e(t):e}function ae(e){return e.split("-")[0]}function Pe(e){return e.split("-")[1]}function St(e){return e==="x"?"y":"x"}function st(e){return e==="y"?"height":"width"}function Ze(e){return["top","bottom"].includes(ae(e))?"y":"x"}function lt(e){return St(Ze(e))}function Wt(e,t,n){n===void 0&&(n=!1);const o=Pe(e),r=lt(e),i=st(r);let s=r==="x"?o===(n?"end":"start")?"right":"left":o==="start"?"bottom":"top";return t.reference[i]>t.floating[i]&&(s=Qe(s)),[s,Qe(s)]}function Ft(e){const t=Qe(e);return[it(e),t,it(t)]}function it(e){return e.replace(/start|end/g,t=>Bt[t])}function Ht(e,t,n){const o=["left","right"],r=["right","left"],i=["top","bottom"],s=["bottom","top"];switch(e){case"top":case"bottom":return n?t?r:o:t?o:r;case"left":case"right":return t?i:s;default:return[]}}function It(e,t,n,o){const r=Pe(e);let i=Ht(ae(e),n==="start",o);return r&&(i=i.map(s=>s+"-"+r),t&&(i=i.concat(i.map(it)))),i}function Qe(e){return e.replace(/left|right|bottom|top/g,t=>$t[t])}function Mt(e){return{top:0,right:0,bottom:0,left:0,...e}}function At(e){return typeof e!="number"?Mt(e):{top:e,right:e,bottom:e,left:e}}function Je(e){return{...e,top:e.y,left:e.x,right:e.x+e.width,bottom:e.y+e.height}}function pt(e,t,n){let{reference:o,floating:r}=e;const i=Ze(t),s=lt(t),l=st(s),c=ae(t),f=i==="y",h=o.x+o.width/2-r.width/2,m=o.y+o.height/2-r.height/2,v=o[l]/2-r[l]/2;let d;switch(c){case"top":d={x:h,y:o.y-r.height};break;case"bottom":d={x:h,y:o.y+o.height};break;case"right":d={x:o.x+o.width,y:m};break;case"left":d={x:o.x-r.width,y:m};break;default:d={x:o.x,y:o.y}}switch(Pe(t)){case"start":d[s]-=v*(n&&f?-1:1);break;case"end":d[s]+=v*(n&&f?-1:1);break}return d}const zt=async(e,t,n)=>{const{placement:o="bottom",strategy:r="absolute",middleware:i=[],platform:s}=n,l=i.filter(Boolean),c=await(s.isRTL==null?void 0:s.isRTL(t));let f=await s.getElementRects({reference:e,floating:t,strategy:r}),{x:h,y:m}=pt(f,o,c),v=o,d={},y=0;for(let w=0;w<l.length;w++){const{name:A,fn:g}=l[w],{x,y:_,data:O,reset:S}=await g({x:h,y:m,initialPlacement:o,placement:v,strategy:r,middlewareData:d,rects:f,platform:s,elements:{reference:e,floating:t}});if(h=x??h,m=_??m,d={...d,[A]:{...d[A],...O}},S&&y<=50){y++,typeof S=="object"&&(S.placement&&(v=S.placement),S.rects&&(f=S.rects===!0?await s.getElementRects({reference:e,floating:t,strategy:r}):S.rects),{x:h,y:m}=pt(f,v,c)),w=-1;continue}}return{x:h,y:m,placement:v,strategy:r,middlewareData:d}};async function _t(e,t){var n;t===void 0&&(t={});const{x:o,y:r,platform:i,rects:s,elements:l,strategy:c}=e,{boundary:f="clippingAncestors",rootBoundary:h="viewport",elementContext:m="floating",altBoundary:v=!1,padding:d=0}=De(t,e),y=At(d),A=l[v?m==="floating"?"reference":"floating":m],g=Je(await i.getClippingRect({element:(n=await(i.isElement==null?void 0:i.isElement(A)))==null||n?A:A.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(l.floating)),boundary:f,rootBoundary:h,strategy:c})),x=m==="floating"?{...s.floating,x:o,y:r}:s.reference,_=await(i.getOffsetParent==null?void 0:i.getOffsetParent(l.floating)),O=await(i.isElement==null?void 0:i.isElement(_))?await(i.getScale==null?void 0:i.getScale(_))||{x:1,y:1}:{x:1,y:1},S=Je(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({rect:x,offsetParent:_,strategy:c}):x);return{top:(g.top-S.top+y.top)/O.y,bottom:(S.bottom-g.bottom+y.bottom)/O.y,left:(g.left-S.left+y.left)/O.x,right:(S.right-g.right+y.right)/O.x}}const jt=e=>({name:"arrow",options:e,async fn(t){const{x:n,y:o,placement:r,rects:i,platform:s,elements:l}=t,{element:c,padding:f=0}=De(e,t)||{};if(c==null)return{};const h=At(f),m={x:n,y:o},v=lt(r),d=st(v),y=await s.getDimensions(c),w=v==="y",A=w?"top":"left",g=w?"bottom":"right",x=w?"clientHeight":"clientWidth",_=i.reference[d]+i.reference[v]-m[v]-i.floating[d],O=m[v]-i.reference[v],S=await(s.getOffsetParent==null?void 0:s.getOffsetParent(c));let k=S?S[x]:0;(!k||!await(s.isElement==null?void 0:s.isElement(S)))&&(k=l.floating[x]||i.floating[d]);const W=_/2-O/2,V=k/2-y[d]/2-1,Y=ge(h[A],V),D=ge(h[g],V),C=Y,F=k-y[d]-D,L=k/2-y[d]/2+W,R=rt(C,L,F),H=Pe(r)!=null&&L!=R&&i.reference[d]/2-(L<C?Y:D)-y[d]/2<0?L<C?C-L:F-L:0;return{[v]:m[v]-H,data:{[v]:R,centerOffset:L-R+H}}}}),qt=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var n;const{placement:o,middlewareData:r,rects:i,initialPlacement:s,platform:l,elements:c}=t,{mainAxis:f=!0,crossAxis:h=!0,fallbackPlacements:m,fallbackStrategy:v="bestFit",fallbackAxisSideDirection:d="none",flipAlignment:y=!0,...w}=De(e,t),A=ae(o),g=ae(s)===s,x=await(l.isRTL==null?void 0:l.isRTL(c.floating)),_=m||(g||!y?[Qe(s)]:Ft(s));!m&&d!=="none"&&_.push(...It(s,y,d,x));const O=[s,..._],S=await _t(t,w),k=[];let W=((n=r.flip)==null?void 0:n.overflows)||[];if(f&&k.push(S[A]),h){const C=Wt(o,i,x);k.push(S[C[0]],S[C[1]])}if(W=[...W,{placement:o,overflows:k}],!k.every(C=>C<=0)){var V,Y;const C=(((V=r.flip)==null?void 0:V.index)||0)+1,F=O[C];if(F)return{data:{index:C,overflows:W},reset:{placement:F}};let L=(Y=W.filter(R=>R.overflows[0]<=0).sort((R,N)=>R.overflows[1]-N.overflows[1])[0])==null?void 0:Y.placement;if(!L)switch(v){case"bestFit":{var D;const R=(D=W.map(N=>[N.placement,N.overflows.filter(H=>H>0).reduce((H,fe)=>H+fe,0)]).sort((N,H)=>N[1]-H[1])[0])==null?void 0:D[0];R&&(L=R);break}case"initialPlacement":L=s;break}if(o!==L)return{reset:{placement:L}}}return{}}}};async function Vt(e,t){const{placement:n,platform:o,elements:r}=e,i=await(o.isRTL==null?void 0:o.isRTL(r.floating)),s=ae(n),l=Pe(n),c=Ze(n)==="y",f=["left","top"].includes(s)?-1:1,h=i&&c?-1:1,m=De(t,e);let{mainAxis:v,crossAxis:d,alignmentAxis:y}=typeof m=="number"?{mainAxis:m,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...m};return l&&typeof y=="number"&&(d=l==="end"?y*-1:y),c?{x:d*h,y:v*f}:{x:v*f,y:d*h}}const Yt=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){const{x:n,y:o}=t,r=await Vt(t,e);return{x:n+r.x,y:o+r.y,data:r}}}},Xt=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){const{x:n,y:o,placement:r}=t,{mainAxis:i=!0,crossAxis:s=!1,limiter:l={fn:A=>{let{x:g,y:x}=A;return{x:g,y:x}}},...c}=De(e,t),f={x:n,y:o},h=await _t(t,c),m=Ze(ae(r)),v=St(m);let d=f[v],y=f[m];if(i){const A=v==="y"?"top":"left",g=v==="y"?"bottom":"right",x=d+h[A],_=d-h[g];d=rt(x,d,_)}if(s){const A=m==="y"?"top":"left",g=m==="y"?"bottom":"right",x=y+h[A],_=y-h[g];y=rt(x,y,_)}const w=l.fn({...t,[v]:d,[m]:y});return{...w,data:{x:w.x-n,y:w.y-o}}}}};function ie(e){return Rt(e)?(e.nodeName||"").toLowerCase():"#document"}function M(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function G(e){var t;return(t=(Rt(e)?e.ownerDocument:e.document)||window.document)==null?void 0:t.documentElement}function Rt(e){return e instanceof Node||e instanceof M(e).Node}function Z(e){return e instanceof Element||e instanceof M(e).Element}function Q(e){return e instanceof HTMLElement||e instanceof M(e).HTMLElement}function mt(e){return typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof M(e).ShadowRoot}function $e(e){const{overflow:t,overflowX:n,overflowY:o,display:r}=j(e);return/auto|scroll|overlay|hidden|clip/.test(t+o+n)&&!["inline","contents"].includes(r)}function Kt(e){return["table","td","th"].includes(ie(e))}function ct(e){const t=at(),n=j(e);return n.transform!=="none"||n.perspective!=="none"||(n.containerType?n.containerType!=="normal":!1)||!t&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!t&&(n.filter?n.filter!=="none":!1)||["transform","perspective","filter"].some(o=>(n.willChange||"").includes(o))||["paint","layout","strict","content"].some(o=>(n.contain||"").includes(o))}function Qt(e){let t=we(e);for(;Q(t)&&!Ge(t);){if(ct(t))return t;t=we(t)}return null}function at(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function Ge(e){return["html","body","#document"].includes(ie(e))}function j(e){return M(e).getComputedStyle(e)}function et(e){return Z(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.pageXOffset,scrollTop:e.pageYOffset}}function we(e){if(ie(e)==="html")return e;const t=e.assignedSlot||e.parentNode||mt(e)&&e.host||G(e);return mt(t)?t.host:t}function Tt(e){const t=we(e);return Ge(t)?e.ownerDocument?e.ownerDocument.body:e.body:Q(t)&&$e(t)?t:Tt(t)}function Ue(e,t){var n;t===void 0&&(t=[]);const o=Tt(e),r=o===((n=e.ownerDocument)==null?void 0:n.body),i=M(o);return r?t.concat(i,i.visualViewport||[],$e(o)?o:[]):t.concat(o,Ue(o))}function Ot(e){const t=j(e);let n=parseFloat(t.width)||0,o=parseFloat(t.height)||0;const r=Q(e),i=r?e.offsetWidth:n,s=r?e.offsetHeight:o,l=Ke(n)!==i||Ke(o)!==s;return l&&(n=i,o=s),{width:n,height:o,$:l}}function ut(e){return Z(e)?e:e.contextElement}function ve(e){const t=ut(e);if(!Q(t))return re(1);const n=t.getBoundingClientRect(),{width:o,height:r,$:i}=Ot(t);let s=(i?Ke(n.width):n.width)/o,l=(i?Ke(n.height):n.height)/r;return(!s||!Number.isFinite(s))&&(s=1),(!l||!Number.isFinite(l))&&(l=1),{x:s,y:l}}const Jt=re(0);function Lt(e){const t=M(e);return!at()||!t.visualViewport?Jt:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function Ut(e,t,n){return t===void 0&&(t=!1),!n||t&&n!==M(e)?!1:t}function ue(e,t,n,o){t===void 0&&(t=!1),n===void 0&&(n=!1);const r=e.getBoundingClientRect(),i=ut(e);let s=re(1);t&&(o?Z(o)&&(s=ve(o)):s=ve(e));const l=Ut(i,n,o)?Lt(i):re(0);let c=(r.left+l.x)/s.x,f=(r.top+l.y)/s.y,h=r.width/s.x,m=r.height/s.y;if(i){const v=M(i),d=o&&Z(o)?M(o):o;let y=v.frameElement;for(;y&&o&&d!==v;){const w=ve(y),A=y.getBoundingClientRect(),g=j(y),x=A.left+(y.clientLeft+parseFloat(g.paddingLeft))*w.x,_=A.top+(y.clientTop+parseFloat(g.paddingTop))*w.y;c*=w.x,f*=w.y,h*=w.x,m*=w.y,c+=x,f+=_,y=M(y).frameElement}}return Je({width:h,height:m,x:c,y:f})}function Zt(e){let{rect:t,offsetParent:n,strategy:o}=e;const r=Q(n),i=G(n);if(n===i)return t;let s={scrollLeft:0,scrollTop:0},l=re(1);const c=re(0);if((r||!r&&o!=="fixed")&&((ie(n)!=="body"||$e(i))&&(s=et(n)),Q(n))){const f=ue(n);l=ve(n),c.x=f.x+n.clientLeft,c.y=f.y+n.clientTop}return{width:t.width*l.x,height:t.height*l.y,x:t.x*l.x-s.scrollLeft*l.x+c.x,y:t.y*l.y-s.scrollTop*l.y+c.y}}function Gt(e){return Array.from(e.getClientRects())}function Ct(e){return ue(G(e)).left+et(e).scrollLeft}function eo(e){const t=G(e),n=et(e),o=e.ownerDocument.body,r=ce(t.scrollWidth,t.clientWidth,o.scrollWidth,o.clientWidth),i=ce(t.scrollHeight,t.clientHeight,o.scrollHeight,o.clientHeight);let s=-n.scrollLeft+Ct(e);const l=-n.scrollTop;return j(o).direction==="rtl"&&(s+=ce(t.clientWidth,o.clientWidth)-r),{width:r,height:i,x:s,y:l}}function to(e,t){const n=M(e),o=G(e),r=n.visualViewport;let i=o.clientWidth,s=o.clientHeight,l=0,c=0;if(r){i=r.width,s=r.height;const f=at();(!f||f&&t==="fixed")&&(l=r.offsetLeft,c=r.offsetTop)}return{width:i,height:s,x:l,y:c}}function oo(e,t){const n=ue(e,!0,t==="fixed"),o=n.top+e.clientTop,r=n.left+e.clientLeft,i=Q(e)?ve(e):re(1),s=e.clientWidth*i.x,l=e.clientHeight*i.y,c=r*i.x,f=o*i.y;return{width:s,height:l,x:c,y:f}}function ht(e,t,n){let o;if(t==="viewport")o=to(e,n);else if(t==="document")o=eo(G(e));else if(Z(t))o=oo(t,n);else{const r=Lt(e);o={...t,x:t.x-r.x,y:t.y-r.y}}return Je(o)}function kt(e,t){const n=we(e);return n===t||!Z(n)||Ge(n)?!1:j(n).position==="fixed"||kt(n,t)}function no(e,t){const n=t.get(e);if(n)return n;let o=Ue(e).filter(l=>Z(l)&&ie(l)!=="body"),r=null;const i=j(e).position==="fixed";let s=i?we(e):e;for(;Z(s)&&!Ge(s);){const l=j(s),c=ct(s);!c&&l.position==="fixed"&&(r=null),(i?!c&&!r:!c&&l.position==="static"&&!!r&&["absolute","fixed"].includes(r.position)||$e(s)&&!c&&kt(e,s))?o=o.filter(h=>h!==s):r=l,s=we(s)}return t.set(e,o),o}function ro(e){let{element:t,boundary:n,rootBoundary:o,strategy:r}=e;const s=[...n==="clippingAncestors"?no(t,this._c):[].concat(n),o],l=s[0],c=s.reduce((f,h)=>{const m=ht(t,h,r);return f.top=ce(m.top,f.top),f.right=ge(m.right,f.right),f.bottom=ge(m.bottom,f.bottom),f.left=ce(m.left,f.left),f},ht(t,l,r));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}function io(e){return Ot(e)}function so(e,t,n){const o=Q(t),r=G(t),i=n==="fixed",s=ue(e,!0,i,t);let l={scrollLeft:0,scrollTop:0};const c=re(0);if(o||!o&&!i)if((ie(t)!=="body"||$e(r))&&(l=et(t)),o){const f=ue(t,!0,i,t);c.x=f.x+t.clientLeft,c.y=f.y+t.clientTop}else r&&(c.x=Ct(r));return{x:s.left+l.scrollLeft-c.x,y:s.top+l.scrollTop-c.y,width:s.width,height:s.height}}function yt(e,t){return!Q(e)||j(e).position==="fixed"?null:t?t(e):e.offsetParent}function Nt(e,t){const n=M(e);if(!Q(e))return n;let o=yt(e,t);for(;o&&Kt(o)&&j(o).position==="static";)o=yt(o,t);return o&&(ie(o)==="html"||ie(o)==="body"&&j(o).position==="static"&&!ct(o))?n:o||Qt(e)||n}const lo=async function(e){let{reference:t,floating:n,strategy:o}=e;const r=this.getOffsetParent||Nt,i=this.getDimensions;return{reference:so(t,await r(n),o),floating:{x:0,y:0,...await i(n)}}};function co(e){return j(e).direction==="rtl"}const ao={convertOffsetParentRelativeRectToViewportRelativeRect:Zt,getDocumentElement:G,getClippingRect:ro,getOffsetParent:Nt,getElementRects:lo,getClientRects:Gt,getDimensions:io,getScale:ve,isElement:Z,isRTL:co};function uo(e,t){let n=null,o;const r=G(e);function i(){clearTimeout(o),n&&n.disconnect(),n=null}function s(l,c){l===void 0&&(l=!1),c===void 0&&(c=1),i();const{left:f,top:h,width:m,height:v}=e.getBoundingClientRect();if(l||t(),!m||!v)return;const d=Xe(h),y=Xe(r.clientWidth-(f+m)),w=Xe(r.clientHeight-(h+v)),A=Xe(f),x={rootMargin:-d+"px "+-y+"px "+-w+"px "+-A+"px",threshold:ce(0,ge(1,c))||1};let _=!0;function O(S){const k=S[0].intersectionRatio;if(k!==c){if(!_)return s();k?s(!1,k):o=setTimeout(()=>{s(!1,1e-7)},100)}_=!1}try{n=new IntersectionObserver(O,{...x,root:r.ownerDocument})}catch{n=new IntersectionObserver(O,x)}n.observe(e)}return s(!0),i}function fo(e,t,n,o){o===void 0&&(o={});const{ancestorScroll:r=!0,ancestorResize:i=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:l=typeof IntersectionObserver=="function",animationFrame:c=!1}=o,f=ut(e),h=r||i?[...f?Ue(f):[],...Ue(t)]:[];h.forEach(g=>{r&&g.addEventListener("scroll",n,{passive:!0}),i&&g.addEventListener("resize",n)});const m=f&&l?uo(f,n):null;let v=-1,d=null;s&&(d=new ResizeObserver(g=>{let[x]=g;x&&x.target===f&&d&&(d.unobserve(t),cancelAnimationFrame(v),v=requestAnimationFrame(()=>{d&&d.observe(t)})),n()}),f&&!c&&d.observe(f),d.observe(t));let y,w=c?ue(e):null;c&&A();function A(){const g=ue(e);w&&(g.x!==w.x||g.y!==w.y||g.width!==w.width||g.height!==w.height)&&n(),w=g,y=requestAnimationFrame(A)}return n(),()=>{h.forEach(g=>{r&&g.removeEventListener("scroll",n),i&&g.removeEventListener("resize",n)}),m&&m(),d&&d.disconnect(),d=null,c&&cancelAnimationFrame(y)}}const vt=(e,t,n)=>{const o=new Map,r={platform:ao,...n},i={...r.platform,_c:o};return zt(e,t,{...r,platform:i})};/*
* React Tooltip
* {@link https://github.com/ReactTooltip/react-tooltip}
* @copyright ReactTooltip Team
* @license MIT
*/const po="react-tooltip-core-styles",mo="react-tooltip-base-styles",gt={core:!1,base:!1};function wt({css:e,id:t=mo,type:n="base",ref:o}){var r,i;if(!e||typeof document>"u"||gt[n]||n==="core"&&typeof process<"u"&&(!((r=process==null?void 0:process.env)===null||r===void 0)&&r.REACT_TOOLTIP_DISABLE_CORE_STYLES)||n!=="base"&&typeof process<"u"&&(!((i=process==null?void 0:process.env)===null||i===void 0)&&i.REACT_TOOLTIP_DISABLE_BASE_STYLES))return;n==="core"&&(t=po),o||(o={});const{insertAt:s}=o;if(document.getElementById(t))return void console.warn(`[react-tooltip] Element with id '${t}' already exists. Call \`removeStyle()\` first`);const l=document.head||document.getElementsByTagName("head")[0],c=document.createElement("style");c.id=t,c.type="text/css",s==="top"&&l.firstChild?l.insertBefore(c,l.firstChild):l.appendChild(c),c.styleSheet?c.styleSheet.cssText=e:c.appendChild(document.createTextNode(e)),gt[n]=!0}const bt=(e,t,n)=>{let o=null;return function(...r){const i=()=>{o=null,n||e.apply(this,r)};n&&!o&&(e.apply(this,r),o=setTimeout(i,t)),n||(o&&clearTimeout(o),o=setTimeout(i,t))}},ho="DEFAULT_TOOLTIP_ID",yo={anchorRefs:new Set,activeAnchor:{current:null},attach:()=>{},detach:()=>{},setActiveAnchor:()=>{}},vo=p.createContext({getTooltipData:()=>yo});function Dt(e=ho){return p.useContext(vo).getTooltipData(e)}const go=typeof window<"u"?p.useLayoutEffect:p.useEffect,wo=e=>{if(!(e instanceof HTMLElement||e instanceof SVGElement))return!1;const t=getComputedStyle(e);return["overflow","overflow-x","overflow-y"].some(n=>{const o=t.getPropertyValue(n);return o==="auto"||o==="scroll"})},xt=e=>{if(!e)return null;let t=e.parentElement;for(;t;){if(wo(t))return t;t=t.parentElement}return document.scrollingElement||document.documentElement},Et=async({elementReference:e=null,tooltipReference:t=null,tooltipArrowReference:n=null,place:o="top",offset:r=10,strategy:i="absolute",middlewares:s=[Yt(Number(r)),qt(),Xt({padding:5})],border:l})=>{if(!e)return{tooltipStyles:{},tooltipArrowStyles:{},place:o};if(t===null)return{tooltipStyles:{},tooltipArrowStyles:{},place:o};const c=s;return n?(c.push(jt({element:n,padding:5})),vt(e,t,{placement:o,strategy:i,middleware:c}).then(({x:f,y:h,placement:m,middlewareData:v})=>{var d,y;const w={left:`${f}px`,top:`${h}px`,border:l},{x:A,y:g}=(d=v.arrow)!==null&&d!==void 0?d:{x:0,y:0},x=(y={top:"bottom",right:"left",bottom:"top",left:"right"}[m.split("-")[0]])!==null&&y!==void 0?y:"bottom",_=l&&{top:{borderBottom:l,borderRight:l},right:{borderBottom:l,borderLeft:l},bottom:{borderTop:l,borderLeft:l},left:{borderTop:l,borderRight:l}}[m.split("-")[0]];let O=0;if(l){const S=`${l}`.match(/(\d+)px/);O=S!=null&&S[1]?Number(S[1]):1}return{tooltipStyles:w,tooltipArrowStyles:{left:A!=null?`${A}px`:"",top:g!=null?`${g}px`:"",right:"",bottom:"",..._,[x]:`-${4+O}px`},place:m}})):vt(e,t,{placement:"bottom",strategy:i,middleware:c}).then(({x:f,y:h,placement:m})=>({tooltipStyles:{left:`${f}px`,top:`${h}px`},tooltipArrowStyles:{},place:m}))};var bo="core-styles-module_tooltip__3vRRp",xo="core-styles-module_fixed__pcSol",Eo="core-styles-module_arrow__cvMwQ",So="core-styles-module_noArrow__xock6",Ao="core-styles-module_clickable__ZuTTB",_o="core-styles-module_show__Nt9eE",nt={tooltip:"styles-module_tooltip__mnnfp",arrow:"styles-module_arrow__K0L3T",dark:"styles-module_dark__xNqje",light:"styles-module_light__Z6W-X",success:"styles-module_success__A2AKt",warning:"styles-module_warning__SCK0X",error:"styles-module_error__JvumD",info:"styles-module_info__BWdHW"};const Ro=({id:e,className:t,classNameArrow:n,variant:o="dark",anchorId:r,anchorSelect:i,place:s="top",offset:l=10,events:c=["hover"],openOnClick:f=!1,positionStrategy:h="absolute",middlewares:m,wrapper:v,delayShow:d=0,delayHide:y=0,float:w=!1,hidden:A=!1,noArrow:g=!1,clickable:x=!1,closeOnEsc:_=!1,closeOnScroll:O=!1,closeOnResize:S=!1,style:k,position:W,afterShow:V,afterHide:Y,content:D,contentWrapperRef:C,isOpen:F,setIsOpen:L,activeAnchor:R,setActiveAnchor:N,border:H,opacity:fe})=>{const I=p.useRef(null),ee=p.useRef(null),B=p.useRef(null),z=p.useRef(null),[Be,We]=p.useState(s),[be,Fe]=p.useState({}),[He,Ie]=p.useState({}),[q,Me]=p.useState(!1),[xe,de]=p.useState(!1),Ee=p.useRef(!1),Se=p.useRef(null),{anchorRefs:Ae,setActiveAnchor:ze}=Dt(e),pe=p.useRef(!1),[te,_e]=p.useState([]),se=p.useRef(!1),me=f||c.includes("click");go(()=>(se.current=!0,()=>{se.current=!1}),[]),p.useEffect(()=>{if(!q){const u=setTimeout(()=>{de(!1)},150);return()=>{clearTimeout(u)}}return()=>null},[q]);const X=u=>{se.current&&(u&&de(!0),setTimeout(()=>{se.current&&(L==null||L(u),F===void 0&&Me(u))},10))};p.useEffect(()=>{if(F===void 0)return()=>null;F&&de(!0);const u=setTimeout(()=>{Me(F)},10);return()=>{clearTimeout(u)}},[F]),p.useEffect(()=>{q!==Ee.current&&(Ee.current=q,q?V==null||V():Y==null||Y())},[q]);const he=(u=y)=>{z.current&&clearTimeout(z.current),z.current=setTimeout(()=>{pe.current||X(!1)},u)},oe=u=>{var b;if(!u)return;const a=(b=u.currentTarget)!==null&&b!==void 0?b:u.target;if(!(a!=null&&a.isConnected))return N(null),void ze({current:null});d?(B.current&&clearTimeout(B.current),B.current=setTimeout(()=>{X(!0)},d)):X(!0),N(a),ze({current:a}),z.current&&clearTimeout(z.current)},je=()=>{x?he(y||100):y?he():X(!1),B.current&&clearTimeout(B.current)},Re=({x:u,y:b})=>{Et({place:s,offset:l,elementReference:{getBoundingClientRect:()=>({x:u,y:b,width:0,height:0,top:b,left:u,right:u,bottom:b})},tooltipReference:I.current,tooltipArrowReference:ee.current,strategy:h,middlewares:m,border:H}).then(a=>{Object.keys(a.tooltipStyles).length&&Fe(a.tooltipStyles),Object.keys(a.tooltipArrowStyles).length&&Ie(a.tooltipArrowStyles),We(a.place)})},qe=u=>{if(!u)return;const b=u,a={x:b.clientX,y:b.clientY};Re(a),Se.current=a},Ve=u=>{oe(u),y&&he()},Te=u=>{var b;[document.querySelector(`[id='${r}']`),...te].some(a=>a==null?void 0:a.contains(u.target))||!((b=I.current)===null||b===void 0)&&b.contains(u.target)||(X(!1),B.current&&clearTimeout(B.current))},Oe=bt(oe,50,!0),le=bt(je,50,!0),ne=p.useCallback(()=>{W?Re(W):w?Se.current&&Re(Se.current):Et({place:s,offset:l,elementReference:R,tooltipReference:I.current,tooltipArrowReference:ee.current,strategy:h,middlewares:m,border:H}).then(u=>{se.current&&(Object.keys(u.tooltipStyles).length&&Fe(u.tooltipStyles),Object.keys(u.tooltipArrowStyles).length&&Ie(u.tooltipArrowStyles),We(u.place))})},[q,R,D,k,s,l,h,W,w]);p.useEffect(()=>{var u,b;const a=new Set(Ae);te.forEach(U=>{a.add({current:U})});const E=document.querySelector(`[id='${r}']`);E&&a.add({current:E});const T=()=>{X(!1)},$=xt(R),P=xt(I.current);O&&(window.addEventListener("scroll",T),$==null||$.addEventListener("scroll",T),P==null||P.addEventListener("scroll",T));let K=null;S?window.addEventListener("resize",T):R&&I.current&&(K=fo(R,I.current,ne,{ancestorResize:!0,elementResize:!0,layoutShift:!0}));const Ce=U=>{U.key==="Escape"&&X(!1)};_&&window.addEventListener("keydown",Ce);const J=[];me?(window.addEventListener("click",Te),J.push({event:"click",listener:Ve})):(J.push({event:"mouseenter",listener:Oe},{event:"mouseleave",listener:le},{event:"focus",listener:Oe},{event:"blur",listener:le}),w&&J.push({event:"mousemove",listener:qe}));const Ye=()=>{pe.current=!0},ft=()=>{pe.current=!1,je()};return x&&!me&&((u=I.current)===null||u===void 0||u.addEventListener("mouseenter",Ye),(b=I.current)===null||b===void 0||b.addEventListener("mouseleave",ft)),J.forEach(({event:U,listener:ke})=>{a.forEach(tt=>{var Ne;(Ne=tt.current)===null||Ne===void 0||Ne.addEventListener(U,ke)})}),()=>{var U,ke;O&&(window.removeEventListener("scroll",T),$==null||$.removeEventListener("scroll",T),P==null||P.removeEventListener("scroll",T)),S?window.removeEventListener("resize",T):K==null||K(),me&&window.removeEventListener("click",Te),_&&window.removeEventListener("keydown",Ce),x&&!me&&((U=I.current)===null||U===void 0||U.removeEventListener("mouseenter",Ye),(ke=I.current)===null||ke===void 0||ke.removeEventListener("mouseleave",ft)),J.forEach(({event:tt,listener:Ne})=>{a.forEach(Pt=>{var ot;(ot=Pt.current)===null||ot===void 0||ot.removeEventListener(tt,Ne)})})}},[R,ne,xe,Ae,te,_,c]),p.useEffect(()=>{let u=i??"";!u&&e&&(u=`[data-tooltip-id='${e}']`);const b=new MutationObserver(a=>{const E=[];a.forEach(T=>{if(T.type==="attributes"&&T.attributeName==="data-tooltip-id"&&T.target.getAttribute("data-tooltip-id")===e&&E.push(T.target),T.type==="childList"&&(R&&[...T.removedNodes].some($=>{var P;return!!(!((P=$==null?void 0:$.contains)===null||P===void 0)&&P.call($,R))&&(de(!1),X(!1),N(null),B.current&&clearTimeout(B.current),z.current&&clearTimeout(z.current),!0)}),u))try{const $=[...T.addedNodes].filter(P=>P.nodeType===1);E.push(...$.filter(P=>P.matches(u))),E.push(...$.flatMap(P=>[...P.querySelectorAll(u)]))}catch{}}),E.length&&_e(T=>[...T,...E])});return b.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-tooltip-id"]}),()=>{b.disconnect()}},[e,i,R]),p.useEffect(()=>{ne()},[ne]),p.useEffect(()=>{if(!(C!=null&&C.current))return()=>null;const u=new ResizeObserver(()=>{ne()});return u.observe(C.current),()=>{u.disconnect()}},[D,C==null?void 0:C.current]),p.useEffect(()=>{var u;const b=document.querySelector(`[id='${r}']`),a=[...te,b];R&&a.includes(R)||N((u=te[0])!==null&&u!==void 0?u:b)},[r,te,R]),p.useEffect(()=>()=>{B.current&&clearTimeout(B.current),z.current&&clearTimeout(z.current)},[]),p.useEffect(()=>{let u=i;if(!u&&e&&(u=`[data-tooltip-id='${e}']`),u)try{const b=Array.from(document.querySelectorAll(u));_e(b)}catch{_e([])}},[e,i]);const Le=!A&&D&&q&&Object.keys(be).length>0;return xe?ye.createElement(v,{id:e,role:"tooltip",className:dt("react-tooltip",bo,nt.tooltip,nt[o],t,`react-tooltip__place-${Be}`,{"react-tooltip__show":Le,[_o]:Le,[xo]:h==="fixed",[Ao]:x}),style:{...k,...be,opacity:fe!==void 0&&Le?fe:void 0},ref:I},D,ye.createElement(v,{className:dt("react-tooltip-arrow",Eo,nt.arrow,n,{[So]:g}),style:He,ref:ee})):null},To=({content:e})=>ye.createElement("span",{dangerouslySetInnerHTML:{__html:e}}),Lo=({id:e,anchorId:t,anchorSelect:n,content:o,html:r,render:i,className:s,classNameArrow:l,variant:c="dark",place:f="top",offset:h=10,wrapper:m="div",children:v=null,events:d=["hover"],openOnClick:y=!1,positionStrategy:w="absolute",middlewares:A,delayShow:g=0,delayHide:x=0,float:_=!1,hidden:O=!1,noArrow:S=!1,clickable:k=!1,closeOnEsc:W=!1,closeOnScroll:V=!1,closeOnResize:Y=!1,style:D,position:C,isOpen:F,disableStyleInjection:L=!1,border:R,opacity:N,setIsOpen:H,afterShow:fe,afterHide:I})=>{const[ee,B]=p.useState(o),[z,Be]=p.useState(r),[We,be]=p.useState(f),[Fe,He]=p.useState(c),[Ie,q]=p.useState(h),[Me,xe]=p.useState(g),[de,Ee]=p.useState(x),[Se,Ae]=p.useState(_),[ze,pe]=p.useState(O),[te,_e]=p.useState(m),[se,me]=p.useState(d),[X,he]=p.useState(w),[oe,je]=p.useState(null),Re=p.useRef(L),{anchorRefs:qe,activeAnchor:Ve}=Dt(e),Te=u=>u==null?void 0:u.getAttributeNames().reduce((b,a)=>{var E;return a.startsWith("data-tooltip-")&&(b[a.replace(/^data-tooltip-/,"")]=(E=u==null?void 0:u.getAttribute(a))!==null&&E!==void 0?E:null),b},{}),Oe=u=>{const b={place:a=>{var E;be((E=a)!==null&&E!==void 0?E:f)},content:a=>{B(a??o)},html:a=>{Be(a??r)},variant:a=>{var E;He((E=a)!==null&&E!==void 0?E:c)},offset:a=>{q(a===null?h:Number(a))},wrapper:a=>{var E;_e((E=a)!==null&&E!==void 0?E:m)},events:a=>{const E=a==null?void 0:a.split(" ");me(E??d)},"position-strategy":a=>{var E;he((E=a)!==null&&E!==void 0?E:w)},"delay-show":a=>{xe(a===null?g:Number(a))},"delay-hide":a=>{Ee(a===null?x:Number(a))},float:a=>{Ae(a===null?_:a==="true")},hidden:a=>{pe(a===null?O:a==="true")}};Object.values(b).forEach(a=>a(null)),Object.entries(u).forEach(([a,E])=>{var T;(T=b[a])===null||T===void 0||T.call(b,E)})};p.useEffect(()=>{B(o)},[o]),p.useEffect(()=>{Be(r)},[r]),p.useEffect(()=>{be(f)},[f]),p.useEffect(()=>{He(c)},[c]),p.useEffect(()=>{q(h)},[h]),p.useEffect(()=>{xe(g)},[g]),p.useEffect(()=>{Ee(x)},[x]),p.useEffect(()=>{Ae(_)},[_]),p.useEffect(()=>{pe(O)},[O]),p.useEffect(()=>{he(w)},[w]),p.useEffect(()=>{Re.current!==L&&console.warn("[react-tooltip] Do not change `disableStyleInjection` dynamically.")},[L]),p.useEffect(()=>{typeof window<"u"&&window.dispatchEvent(new CustomEvent("react-tooltip-inject-styles",{detail:{disableCore:L==="core",disableBase:L}}))},[]),p.useEffect(()=>{var u;const b=new Set(qe);let a=n;if(!a&&e&&(a=`[data-tooltip-id='${e}']`),a)try{document.querySelectorAll(a).forEach(K=>{b.add({current:K})})}catch{console.warn(`[react-tooltip] "${a}" is not a valid CSS selector`)}const E=document.querySelector(`[id='${t}']`);if(E&&b.add({current:E}),!b.size)return()=>null;const T=(u=oe??E)!==null&&u!==void 0?u:Ve.current,$=new MutationObserver(K=>{K.forEach(Ce=>{var J;if(!T||Ce.type!=="attributes"||!(!((J=Ce.attributeName)===null||J===void 0)&&J.startsWith("data-tooltip-")))return;const Ye=Te(T);Oe(Ye)})}),P={attributes:!0,childList:!1,subtree:!1};if(T){const K=Te(T);Oe(K),$.observe(T,P)}return()=>{$.disconnect()}},[qe,Ve,oe,t,n]),p.useEffect(()=>{D!=null&&D.border&&console.warn("[react-tooltip] Do not set `style.border`. Use `border` prop instead."),R&&!CSS.supports("border",`${R}`)&&console.warn(`[react-tooltip] "${R}" is not a valid \`border\`.`),D!=null&&D.opacity&&console.warn("[react-tooltip] Do not set `style.opacity`. Use `opacity` prop instead."),N&&!CSS.supports("opacity",`${N}`)&&console.warn(`[react-tooltip] "${N}" is not a valid \`opacity\`.`)},[]);let le=v;const ne=p.useRef(null);if(i){const u=i({content:ee??null,activeAnchor:oe});le=u?ye.createElement("div",{ref:ne,className:"react-tooltip-content-wrapper"},u):null}else ee&&(le=ee);z&&(le=ye.createElement(To,{content:z}));const Le={id:e,anchorId:t,anchorSelect:n,className:s,classNameArrow:l,content:le,contentWrapperRef:ne,place:We,variant:Fe,offset:Ie,wrapper:te,events:se,openOnClick:y,positionStrategy:X,middlewares:A,delayShow:Me,delayHide:de,float:Se,hidden:ze,noArrow:S,clickable:k,closeOnEsc:W,closeOnScroll:V,closeOnResize:Y,style:D,position:C,isOpen:F,border:R,opacity:N,setIsOpen:H,afterShow:fe,afterHide:I,activeAnchor:oe,setActiveAnchor:u=>je(u)};return ye.createElement(Ro,{...Le})};typeof window<"u"&&window.addEventListener("react-tooltip-inject-styles",e=>{e.detail.disableCore||wt({css:":root{--rt-color-white:#fff;--rt-color-dark:#222;--rt-color-success:#8dc572;--rt-color-error:#be6464;--rt-color-warning:#f0ad4e;--rt-color-info:#337ab7;--rt-opacity:0.9}.core-styles-module_tooltip__3vRRp{visibility:hidden;position:absolute;top:0;left:0;pointer-events:none;opacity:0;transition:opacity 0.3s ease-out;will-change:opacity,visibility}.core-styles-module_fixed__pcSol{position:fixed}.core-styles-module_arrow__cvMwQ{position:absolute;background:inherit}.core-styles-module_noArrow__xock6{display:none}.core-styles-module_clickable__ZuTTB{pointer-events:auto}.core-styles-module_show__Nt9eE{visibility:visible;opacity:var(--rt-opacity)}",type:"core"}),e.detail.disableBase||wt({css:`
.styles-module_tooltip__mnnfp{padding:8px 16px;border-radius:3px;font-size:90%;width:max-content}.styles-module_arrow__K0L3T{width:8px;height:8px;transform:rotate(45deg)}.styles-module_dark__xNqje{background:var(--rt-color-dark);color:var(--rt-color-white)}.styles-module_light__Z6W-X{background-color:var(--rt-color-white);color:var(--rt-color-dark)}.styles-module_success__A2AKt{background-color:var(--rt-color-success);color:var(--rt-color-white)}.styles-module_warning__SCK0X{background-color:var(--rt-color-warning);color:var(--rt-color-white)}.styles-module_error__JvumD{background-color:var(--rt-color-error);color:var(--rt-color-white)}.styles-module_info__BWdHW{background-color:var(--rt-color-info);color:var(--rt-color-white)}`,type:"base"})});export{Lo as W,fo as a};
