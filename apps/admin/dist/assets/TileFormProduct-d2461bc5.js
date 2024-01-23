import{j as o,P as ke,e as te,r as re,o as Oe,q as Be,R as k,f as N,_ as J,L as _,v as Z}from"./index-3ba1a706.js";import{I as H}from"./index-e73b124f.js";import{u as Se,g as Ne,F as Te,a as Ue}from"./formik.esm-082975a3.js";import{U as Le,F as Me}from"./index.esm-89aca2a2.js";import{t as f}from"./translate-092d59f9.js";import{T as ze}from"./index-1ff27b96.js";import{S as T}from"./index-c8ae6f07.js";import{c as We}from"./capitalize-1790f93b.js";import{B as He}from"./index-ef1fda9f.js";import{c as qe,a as Ge}from"./index.esm-8e4abcfc.js";import{T as $e}from"./TablePlaceholder-35369399.js";const Xe=a=>{const{values:t,setFieldValue:r}=Se(),e=Ne(t,"images");function i(m){r("images",[...m,...e])}function n(m){if(typeof m=="string"){const c=e.filter(s=>s!==m);r("images",c)}else{const c=e.filter(s=>typeof s=="string"?s:s.tempID!==m.tempID);r("images",c)}}return o.jsx("div",{className:"form-group",children:o.jsx(Le,{multiple:!0,fileList:e,onChange:i,onFileRemove:n,baseUrlPreview:ke+"/product",showList:!0,children:o.jsxs("div",{className:"my-8 text-center",children:[o.jsx("div",{className:"text-6xl mb-4 flex justify-center",children:o.jsx(Me,{})}),o.jsxs("p",{className:"font-semibold",children:[o.jsxs("span",{className:"text-gray-800 dark:text-white",children:[f("app.dropYourImageOr")," "]}),o.jsx("span",{className:"text-blue-500",children:f("app.browse")})]}),o.jsxs("p",{className:"mt-1 opacity-60 dark:text-white",children:[f("app.support"),": jpeg, jpg, png, webp"]})]})})})},Ve=te.ARRSIZES.map(a=>({value:a,label:a})),Ye=a=>o.jsx(T,{multiple:!0,name:"sizes",options:Ve,onChange:t=>t?[...t].map(e=>e.value):[],label:f("products.label.sizes"),placeholder:f("products.placeholder.sizes")}),Ke=a=>{const t=[{label:f("products.placeholder.gender"),value:""},...te.ARRGENDERS.map(r=>({value:r,label:We(r)}))];return o.jsx(T,{name:"gender",options:t,label:f("products.label.gender")})},Je=a=>{const{categories:t}=a,r=re.useMemo(()=>t.map(e=>({value:e.idcategory,label:e.title})),[t]);return o.jsx(T,{multiple:!0,onChange:e=>e?[...e].map(n=>n.value):[],options:r,name:"categories",label:f("products.label.categories"),placeholder:f("products.placeholder.categories")})},_e=a=>{const t=[{label:f("products.placeholder.status"),value:""},...te.ARRSTATUSPRODUCT.map(r=>({value:r,label:r}))];return o.jsx(T,{name:"status",options:t,label:f("products.label.status")})};/*!
 * Compressor.js v1.2.1
 * https://fengyuanchen.github.io/compressorjs
 *
 * Copyright 2018-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2023-02-28T14:09:41.732Z
 */function ve(a,t){var r=Object.keys(a);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(a);t&&(e=e.filter(function(i){return Object.getOwnPropertyDescriptor(a,i).enumerable})),r.push.apply(r,e)}return r}function q(a){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?ve(Object(r),!0).forEach(function(e){et(a,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(r)):ve(Object(r)).forEach(function(e){Object.defineProperty(a,e,Object.getOwnPropertyDescriptor(r,e))})}return a}function Ze(a,t){if(!(a instanceof t))throw new TypeError("Cannot call a class as a function")}function be(a,t){for(var r=0;r<t.length;r++){var e=t[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(a,Re(e.key),e)}}function Qe(a,t,r){return t&&be(a.prototype,t),r&&be(a,r),Object.defineProperty(a,"prototype",{writable:!1}),a}function et(a,t,r){return t=Re(t),t in a?Object.defineProperty(a,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):a[t]=r,a}function G(){return G=Object.assign?Object.assign.bind():function(a){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&(a[e]=r[e])}return a},G.apply(this,arguments)}function tt(a,t){if(typeof a!="object"||a===null)return a;var r=a[Symbol.toPrimitive];if(r!==void 0){var e=r.call(a,t||"default");if(typeof e!="object")return e;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(a)}function Re(a){var t=tt(a,"string");return typeof t=="symbol"?t:String(t)}var Ee={exports:{}};(function(a){typeof window>"u"||function(t){var r=t.HTMLCanvasElement&&t.HTMLCanvasElement.prototype,e=t.Blob&&function(){try{return!!new Blob}catch{return!1}}(),i=e&&t.Uint8Array&&function(){try{return new Blob([new Uint8Array(100)]).size===100}catch{return!1}}(),n=t.BlobBuilder||t.WebKitBlobBuilder||t.MozBlobBuilder||t.MSBlobBuilder,m=/^data:((.*?)(;charset=.*?)?)(;base64)?,/,c=(e||n)&&t.atob&&t.ArrayBuffer&&t.Uint8Array&&function(s){var u,h,p,w,g,l,b,x,B;if(u=s.match(m),!u)throw new Error("invalid data URI");for(h=u[2]?u[1]:"text/plain"+(u[3]||";charset=US-ASCII"),p=!!u[4],w=s.slice(u[0].length),p?g=atob(w):g=decodeURIComponent(w),l=new ArrayBuffer(g.length),b=new Uint8Array(l),x=0;x<g.length;x+=1)b[x]=g.charCodeAt(x);return e?new Blob([i?b:l],{type:h}):(B=new n,B.append(l),B.getBlob(h))};t.HTMLCanvasElement&&!r.toBlob&&(r.mozGetAsFile?r.toBlob=function(s,u,h){var p=this;setTimeout(function(){h&&r.toDataURL&&c?s(c(p.toDataURL(u,h))):s(p.mozGetAsFile("blob",u))})}:r.toDataURL&&c&&(r.msToBlob?r.toBlob=function(s,u,h){var p=this;setTimeout(function(){(u&&u!=="image/png"||h)&&r.toDataURL&&c?s(c(p.toDataURL(u,h))):s(p.msToBlob(u))})}:r.toBlob=function(s,u,h){var p=this;setTimeout(function(){s(c(p.toDataURL(u,h)))})})),a.exports?a.exports=c:t.dataURLtoBlob=c}(window)})(Ee);var xe=Ee.exports,rt=function(t){return typeof Blob>"u"?!1:t instanceof Blob||Object.prototype.toString.call(t)==="[object Blob]"},ye={strict:!0,checkOrientation:!0,retainExif:!1,maxWidth:1/0,maxHeight:1/0,minWidth:0,minHeight:0,width:void 0,height:void 0,resize:"none",quality:.8,mimeType:"auto",convertTypes:["image/png"],convertSize:5e6,beforeDraw:null,drew:null,success:null,error:null},at=typeof window<"u"&&typeof window.document<"u",A=at?window:{},$=function(t){return t>0&&t<1/0},it=Array.prototype.slice;function ae(a){return Array.from?Array.from(a):it.call(a)}var nt=/^image\/.+$/;function ee(a){return nt.test(a)}function st(a){var t=ee(a)?a.substr(6):"";return t==="jpeg"&&(t="jpg"),".".concat(t)}var Fe=String.fromCharCode;function ot(a,t,r){var e="",i;for(r+=t,i=t;i<r;i+=1)e+=Fe(a.getUint8(i));return e}var lt=A.btoa;function we(a,t){for(var r=[],e=8192,i=new Uint8Array(a);i.length>0;)r.push(Fe.apply(null,ae(i.subarray(0,e)))),i=i.subarray(e);return"data:".concat(t,";base64,").concat(lt(r.join("")))}function ct(a){var t=new DataView(a),r;try{var e,i,n;if(t.getUint8(0)===255&&t.getUint8(1)===216)for(var m=t.byteLength,c=2;c+1<m;){if(t.getUint8(c)===255&&t.getUint8(c+1)===225){i=c;break}c+=1}if(i){var s=i+4,u=i+10;if(ot(t,s,4)==="Exif"){var h=t.getUint16(u);if(e=h===18761,(e||h===19789)&&t.getUint16(u+2,e)===42){var p=t.getUint32(u+4,e);p>=8&&(n=u+p)}}}if(n){var w=t.getUint16(n,e),g,l;for(l=0;l<w;l+=1)if(g=n+l*12+2,t.getUint16(g,e)===274){g+=8,r=t.getUint16(g,e),t.setUint16(g,1,e);break}}}catch{r=1}return r}function ut(a){var t=0,r=1,e=1;switch(a){case 2:r=-1;break;case 3:t=-180;break;case 4:e=-1;break;case 5:t=90,e=-1;break;case 6:t=90;break;case 7:t=90,r=-1;break;case 8:t=-90;break}return{rotate:t,scaleX:r,scaleY:e}}var mt=/\.\d*(?:0|9){12}\d*$/;function je(a){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1e11;return mt.test(a)?Math.round(a*t)/t:a}function M(a){var t=a.aspectRatio,r=a.height,e=a.width,i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"none",n=$(e),m=$(r);if(n&&m){var c=r*t;(i==="contain"||i==="none")&&c>e||i==="cover"&&c<e?r=e/t:e=r*t}else n?r=e/t:m&&(e=r*t);return{width:e,height:r}}function dt(a){for(var t=ae(new Uint8Array(a)),r=t.length,e=[],i=0;i+3<r;){var n=t[i],m=t[i+1];if(n===255&&m===218)break;if(n===255&&m===216)i+=2;else{var c=t[i+2]*256+t[i+3],s=i+c+2,u=t.slice(i,s);e.push(u),i=s}}return e.reduce(function(h,p){return p[0]===255&&p[1]===225?h.concat(p):h},[])}function ft(a,t){var r=ae(new Uint8Array(a));if(r[2]!==255||r[3]!==224)return a;var e=r[4]*256+r[5],i=[255,216].concat(t,r.slice(4+e));return new Uint8Array(i)}var ht=A.ArrayBuffer,Q=A.FileReader,D=A.URL||A.webkitURL,pt=/\.\w+$/,gt=A.Compressor,vt=function(){function a(t,r){Ze(this,a),this.file=t,this.exif=[],this.image=new Image,this.options=q(q({},ye),r),this.aborted=!1,this.result=null,this.init()}return Qe(a,[{key:"init",value:function(){var r=this,e=this.file,i=this.options;if(!rt(e)){this.fail(new Error("The first argument must be a File or Blob object."));return}var n=e.type;if(!ee(n)){this.fail(new Error("The first argument must be an image File or Blob object."));return}if(!D||!Q){this.fail(new Error("The current browser does not support image compression."));return}ht||(i.checkOrientation=!1,i.retainExif=!1);var m=n==="image/jpeg",c=m&&i.checkOrientation,s=m&&i.retainExif;if(D&&!c&&!s)this.load({url:D.createObjectURL(e)});else{var u=new Q;this.reader=u,u.onload=function(h){var p=h.target,w=p.result,g={},l=1;c&&(l=ct(w),l>1&&G(g,ut(l))),s&&(r.exif=dt(w)),c||s?!D||l>1?g.url=we(w,n):g.url=D.createObjectURL(e):g.url=w,r.load(g)},u.onabort=function(){r.fail(new Error("Aborted to read the image with FileReader."))},u.onerror=function(){r.fail(new Error("Failed to read the image with FileReader."))},u.onloadend=function(){r.reader=null},c||s?u.readAsArrayBuffer(e):u.readAsDataURL(e)}}},{key:"load",value:function(r){var e=this,i=this.file,n=this.image;n.onload=function(){e.draw(q(q({},r),{},{naturalWidth:n.naturalWidth,naturalHeight:n.naturalHeight}))},n.onabort=function(){e.fail(new Error("Aborted to load the image."))},n.onerror=function(){e.fail(new Error("Failed to load the image."))},A.navigator&&/(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(A.navigator.userAgent)&&(n.crossOrigin="anonymous"),n.alt=i.name,n.src=r.url}},{key:"draw",value:function(r){var e=this,i=r.naturalWidth,n=r.naturalHeight,m=r.rotate,c=m===void 0?0:m,s=r.scaleX,u=s===void 0?1:s,h=r.scaleY,p=h===void 0?1:h,w=this.file,g=this.image,l=this.options,b=document.createElement("canvas"),x=b.getContext("2d"),B=Math.abs(c)%180===90,j=(l.resize==="contain"||l.resize==="cover")&&$(l.width)&&$(l.height),E=Math.max(l.maxWidth,0)||1/0,F=Math.max(l.maxHeight,0)||1/0,P=Math.max(l.minWidth,0)||0,C=Math.max(l.minHeight,0)||0,d=i/n,y=l.width,v=l.height;if(B){var O=[F,E];E=O[0],F=O[1];var z=[C,P];P=z[0],C=z[1];var R=[v,y];y=R[0],v=R[1]}j&&(d=y/v);var I=M({aspectRatio:d,width:E,height:F},"contain");E=I.width,F=I.height;var W=M({aspectRatio:d,width:P,height:C},"cover");if(P=W.width,C=W.height,j){var ie=M({aspectRatio:d,width:y,height:v},l.resize);y=ie.width,v=ie.height}else{var ne=M({aspectRatio:d,width:y,height:v}),se=ne.width;y=se===void 0?i:se;var oe=ne.height;v=oe===void 0?n:oe}y=Math.floor(je(Math.min(Math.max(y,P),E))),v=Math.floor(je(Math.min(Math.max(v,C),F)));var Ce=-y/2,Ie=-v/2,Ae=y,De=v,X=[];if(j){var le=0,ce=0,V=i,Y=n,ue=M({aspectRatio:d,width:i,height:n},{contain:"cover",cover:"contain"}[l.resize]);V=ue.width,Y=ue.height,le=(i-V)/2,ce=(n-Y)/2,X.push(le,ce,V,Y)}if(X.push(Ce,Ie,Ae,De),B){var me=[v,y];y=me[0],v=me[1]}b.width=y,b.height=v,ee(l.mimeType)||(l.mimeType=w.type);var de="transparent";w.size>l.convertSize&&l.convertTypes.indexOf(l.mimeType)>=0&&(l.mimeType="image/jpeg");var fe=l.mimeType==="image/jpeg";if(fe&&(de="#fff"),x.fillStyle=de,x.fillRect(0,0,y,v),l.beforeDraw&&l.beforeDraw.call(this,x,b),!this.aborted&&(x.save(),x.translate(y/2,v/2),x.rotate(c*Math.PI/180),x.scale(u,p),x.drawImage.apply(x,[g].concat(X)),x.restore(),l.drew&&l.drew.call(this,x,b),!this.aborted)){var he=function(U){if(!e.aborted){var pe=function(L){return e.done({naturalWidth:i,naturalHeight:n,result:L})};if(U&&fe&&l.retainExif&&e.exif&&e.exif.length>0){var ge=function(L){return pe(xe(we(ft(L,e.exif),l.mimeType)))};if(U.arrayBuffer)U.arrayBuffer().then(ge).catch(function(){e.fail(new Error("Failed to read the compressed image with Blob.arrayBuffer()."))});else{var S=new Q;e.reader=S,S.onload=function(K){var L=K.target;ge(L.result)},S.onabort=function(){e.fail(new Error("Aborted to read the compressed image with FileReader."))},S.onerror=function(){e.fail(new Error("Failed to read the compressed image with FileReader."))},S.onloadend=function(){e.reader=null},S.readAsArrayBuffer(U)}}else pe(U)}};b.toBlob?b.toBlob(he,l.mimeType,l.quality):he(xe(b.toDataURL(l.mimeType,l.quality)))}}},{key:"done",value:function(r){var e=r.naturalWidth,i=r.naturalHeight,n=r.result,m=this.file,c=this.image,s=this.options;if(D&&c.src.indexOf("blob:")===0&&D.revokeObjectURL(c.src),n)if(s.strict&&!s.retainExif&&n.size>m.size&&s.mimeType===m.type&&!(s.width>e||s.height>i||s.minWidth>e||s.minHeight>i||s.maxWidth<e||s.maxHeight<i))n=m;else{var u=new Date;n.lastModified=u.getTime(),n.lastModifiedDate=u,n.name=m.name,n.name&&n.type!==m.type&&(n.name=n.name.replace(pt,st(n.type)))}else n=m;this.result=n,s.success&&s.success.call(this,n)}},{key:"fail",value:function(r){var e=this.options;if(e.error)e.error.call(this,r);else throw r}},{key:"abort",value:function(){this.aborted||(this.aborted=!0,this.reader?this.reader.abort():this.image.complete?this.fail(new Error("The compression process has been aborted.")):(this.image.onload=null,this.image.onabort()))}}],[{key:"noConflict",value:function(){return window.Compressor=gt,a}},{key:"setDefaults",value:function(r){G(ye,r)}}]),a}();function Pe(a){return new Promise(async function(t){let r=[],e=0,i=a.length;for(let n=0;n<i;n++){const m=a[n];await new Promise(c=>{new vt(m,{quality:.6,resize:"contain",success(s){r[n]=s,c(s)}})}),e+=1}e===i&&t(r)})}const bt=a=>{const{providers:t}=a,r=re.useMemo(()=>t.map(e=>({value:e.idprovider,label:e.name})),[t]);return o.jsx(T,{multiple:!0,options:r,name:"providers",label:f("products.label.providers"),placeholder:f("products.placeholder.providers"),onChange:e=>e?[...e].map(n=>n.value):[]})},xt=a=>{const{brands:t}=a,r=re.useMemo(()=>t.map(e=>({value:e.idbrand,label:e.title})),[t]);return o.jsx(T,{options:r,name:"brand",label:f("products.label.brand")})},kt=a=>{var w,g,l;const{onSuccess:t,categories:r,product:e,brands:i,providers:n}=a,{colors:m}=Oe(),{formatMessage:c}=Be(),s=e?"update":"create",u={customCode:(e==null?void 0:e.customCode)||"",title:(e==null?void 0:e.title)||"",images:(e==null?void 0:e.images)||[],sizes:(e==null?void 0:e.sizes)||[],stock:(e==null?void 0:e.stock)||0,gender:(e==null?void 0:e.gender)||"",description:(e==null?void 0:e.description)||"",price:(e==null?void 0:e.price)||0,categories:(w=e==null?void 0:e.categories)!=null&&w.length?e.categories.map(b=>b.idcategory):[],status:(e==null?void 0:e.status)||"",brand:((g=e==null?void 0:e.brand)==null?void 0:g.idbrand)||i[0].idbrand||null,providers:(l=e==null?void 0:e.providers)!=null&&l.length?e.providers.map(b=>b.idprovider):[]};async function h(b,x){var C;const{images:B,...j}={...b};(C=j.customCode)!=null&&C.trim()||(j.customCode=null);const E=B.filter(d=>typeof d!="string"),F=B.filter(d=>typeof d=="string");let P;j.categories=r.filter(d=>j.categories.includes(d.idcategory)),j.brand=i.find(d=>d.idbrand===j.brand),j.providers=n.filter(d=>j.providers.includes(d.idprovider));try{s==="create"?P=(await N.productsService.createProduct(j)).data:s==="update"&&(P=(await N.productsService.updateProduct(e.id,{...j,images:F})).data)}catch(d){console.log(d),J.error(d.response.data.message||`Error ${s==="create"?"creating":"updating"} product`);return}try{if(B.length>0&&s==="create"){const v=(await Pe(B)).map(async R=>{const I=new FormData;return I.append("file",R,R.name),(await N.filesService.uploadFileProduct(I)).data.secureUrl}),O=await Promise.all(v);P=(await N.productsService.updateProduct(P.id,{images:[...O,...B.filter(R=>typeof R=="string")]})).data}if(E.length>0&&s==="update"){const v=(await Pe(E)).map(async R=>{const I=new FormData;return I.append("file",R,R.name),(await N.filesService.uploadFileProduct(I)).data.secureUrl}),O=[...await Promise.all([...v]),...F];P=(await N.productsService.updateProduct(P.id,{images:O})).data}t==null||t(P,x);const d=c({id:s==="create"?"products.add.success":"products.edit.success"});J.success(d)}catch(d){console.log(d),J.error(d.response.data.message||`Error ${s==="create"?"creating":"updating"} product`)}}const p=qe({title:Ge().required(f("products.error.name.required"))});return o.jsx(Te,{initialValues:u,onSubmit:h,validationSchema:p,enableReinitialize:!0,children:o.jsxs(Ue,{children:[o.jsxs("div",{className:"grid lg:grid-cols-2 gap-4",children:[o.jsxs("div",{children:[o.jsx(H,{label:f("products.label.code"),name:"customCode",placeholder:f("products.placeholder.customCode"),className:"lg:max-w-[350px]"}),o.jsx(H,{label:f("products.label.name"),name:"title",required:!0,placeholder:f("products.placeholder.name")}),o.jsx(H,{type:"number",label:f("products.label.price"),name:"price",required:!0,placeholder:f("products.placeholder.price")}),o.jsx(H,{type:"number",label:f("products.label.stock"),name:"stock",required:!0,placeholder:f("products.placeholder.stock"),decimalValues:!1}),o.jsx(Xe,{})]}),o.jsxs("div",{children:[o.jsx(ze,{name:"description",placeholder:f("products.placeholder.description"),label:f("products.label.description"),rows:5}),o.jsxs(k,{isTrue:m.enableClothesShopping,children:[o.jsx(Ye,{}),o.jsx(Ke,{})]}),o.jsx(_e,{}),o.jsx(Je,{categories:r}),o.jsx(xt,{brands:i}),o.jsx(bt,{providers:n})]})]}),o.jsx(He,{className:"btn btn-primary btn-sm mt-6",full:!0,children:f(s==="create"?"products.add.title":"products.edit.title")})]})})},Ot=a=>{const{isLoading:t,categories:r,brands:e,errorBrands:i,errorCategories:n,errorProviders:m,refetch:c}=a,{formatMessage:s}=Be();return(i||n||m)&&!t?o.jsxs("div",{className:"tile",children:[o.jsx("img",{src:"/img/others/error.png",alt:"Error",className:"w-40 mx-auto mb-4"}),o.jsx("h6",{className:"text-center font-normal text-sm",children:"There was an error fetching your product"}),o.jsxs("div",{className:"mt-4 flex items-center flex-col justify-center",children:[o.jsx(_,{to:Z.products.path,className:"btn btn-primary btn-sm w-auto mx-auto",children:s({id:"products.title"})}),o.jsx("button",{type:"button",onClick:c,className:"btn btn-success btn-sm px-6",children:"Retry"})]})]}):o.jsxs("div",{className:"tile mx-auto",children:[o.jsx(k,{isTrue:t,children:o.jsx($e,{})}),o.jsxs(k,{isTrue:!t,children:[o.jsxs(k,{isTrue:!r.length,children:[o.jsx("div",{className:"mb-3",children:o.jsx("img",{src:"/img/others/error.png",alt:"Error",className:"mx-auto w-28"})}),o.jsx("h6",{className:"text-center font-normal text-sm",children:"Categories Empty, try adding categories"}),o.jsx("div",{className:"mt-4 flex items-center justify-center",children:o.jsx(_,{to:Z.categories.path,className:"btn btn-primary btn-sm w-auto mx-auto",children:s({id:"categories.title"})})})]}),o.jsxs(k,{isTrue:r.length,children:[o.jsxs(k,{isTrue:!e.length,children:[o.jsx("h6",{className:"text-center font-normal text-sm",children:"Brands Empty, try adding categories"}),o.jsx("div",{className:"mt-4 flex items-center justify-center",children:o.jsx(_,{to:Z.brands.path,className:"btn btn-primary btn-sm w-auto mx-auto",children:s({id:"brands.title"})})})]}),o.jsx(k,{isTrue:e.length,children:a.children})]})]})]})};export{kt as F,Ot as T};
