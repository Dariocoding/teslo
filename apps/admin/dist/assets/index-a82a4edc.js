import{a,j as e,c as m,Z as G,o as x,R as W,a2 as Z,r as F,f as J,_ as N,v}from"./index-3ba1a706.js";import{a as U,s as C,_ as d,W as p,H as X}from"./index-a1d8defb.js";import{e as Y}from"./index.esm-b422dff9.js";import{c as K,t as q}from"./theme-consts-d6db9214.js";import{c as Q}from"./capitalize-1790f93b.js";import{D as ee,a as S}from"./DropdownItem-3f2e4d6d.js";import{T as re}from"./index-c3a23381.js";import{L as y}from"./label-7eeebea1.js";import{C as f}from"./index-f4c330e0.js";import{t as E}from"./translate-092d59f9.js";import{G as D}from"./switch-ec57b769.js";import{V as oe}from"./index.esm-65f99a51.js";import{P as c}from"./index-6654b9c9.js";import{Z as te,A as j}from"./zIndex-8db5d079.js";import"./emotion-is-prop-valid.esm-9ab032ed.js";import"./index-f98b8c3b.js";import"./useMedia-ab89cd6a.js";import"./react-tooltip.min-e79f5625.js";import"./hidden-ddcee52c.js";var H,ne=U(C.div)(H||(H=d([`
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 5000;
    transform: translate(-50%, -50%);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 0;
    color: #ddd;

    > div {
        box-sizing: border-box;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 5000;
        transform: translate(-50%, -50%) rotate(90deg);
        display: inline-block;
        float: none;
        background-color: currentColor;
        border: 0 solid currentColor;
        margin-top: -4px;
        margin-left: -4px;
        border-radius: 100px;
        animation: ball-spin-clockwise 1s infinite ease-in-out;
    }

    > div:nth-child(1) {
        top: 5%;
        left: 50%;
        animation-delay: -0.875s;
        color: #fe4849;
    }

    > div:nth-child(2) {
        top: 18.1801948466%;
        left: 81.8198051534%;
        animation-delay: -0.75s;
        color: #ff6837;
    }

    > div:nth-child(3) {
        top: 50%;
        left: 95%;
        animation-delay: -0.625s;
        color: #f8d832;
    }

    > div:nth-child(4) {
        top: 81.8198051534%;
        left: 81.8198051534%;
        animation-delay: -0.5s;
        color: #c7e46a;
    }

    > div:nth-child(5) {
        top: 94.9999999966%;
        left: 50.0000000005%;
        animation-delay: -0.375s;
        color: #1de9b6;
    }

    > div:nth-child(6) {
        top: 81.8198046966%;
        left: 18.1801949248%;
        animation-delay: -0.25s;
        color: #1ad1a3;
    }

    > div:nth-child(7) {
        top: 49.9999750815%;
        left: 5.0000051215%;
        animation-delay: -0.125s;
        color: #01b6f5;
    }

    > div:nth-child(8) {
        top: 18.179464974%;
        left: 18.1803700518%;
        animation-delay: 0s;
        color: #5c56b6;
    }

    @-webkit-keyframes ball-spin-clockwise {
        0%,
        100% {
            opacity: 1;
            transform: scale(1);
        }

        20% {
            opacity: 1;
        }

        80% {
            opacity: 0;
            transform: scale(0);
        }
    }

    @-moz-keyframes ball-spin-clockwise {
        0%,
        100% {
            opacity: 1;
            transform: scale(1);
        }

        20% {
            opacity: 1;
        }

        80% {
            opacity: 0;
            transform: scale(0);
        }
    }

    @-o-keyframes ball-spin-clockwise {
        0%,
        100% {
            opacity: 1;
            transform: scale(1);
        }

        20% {
            opacity: 1;
        }

        80% {
            opacity: 0;
            transform: scale(0);
        }
    }

    @keyframes ball-spin-clockwise {
        0%,
        100% {
            opacity: 1;
            transform: scale(1);
        }

        20% {
            opacity: 1;
        }

        80% {
            opacity: 0;
            transform: scale(0);
        }
    }

    `,`;
    `,`;
    `,`;
    `,`;
    `,`;
    `,`;
    `,`;
    `,`;
    `,`;
`])),function(r){return r.size==="xx-small"&&`
            width: 1rem;
            height: 1rem;

            > div {
                width: 0.125rem;
                height: 0.125rem;
            }
        `},function(r){return r.size==="x-small"&&`
            width: 1.25rem;
            height: 1.25rem;

            > div {
                width: 0.25rem;
                height: 0.25rem;
            }
        `},function(r){return r.size==="small"&&`
            width: 1.625rem;
            height: 1.625rem;

            > div {
                width: 0.375rem;
                height: 0.375rem;
            }
        `},function(r){return r.size==="medium"&&`
            width: 2rem;
            height: 2rem;

            > div {
                width: 0.4375rem;
                height: 0.4375rem;
            }
        `},function(r){return r.size==="large"&&`
            width: 3rem;
            height: 3rem;

            > div {
                width: 0.5625rem;
                height: 0.5625rem;
            }
        `},function(r){return r.size==="x-large"&&`
            width: 5.125rem;
            height: 5.125rem;

            > div {
                width: 0.813rem;
                height: 0.813rem;
            }
        `},function(r){return r.variant==="brand"&&`
            > div {
                color: `.concat(r.palette.brand.main,` !important;
            }
        `)},function(r){return r.variant==="inverse"&&`
            > div {
                color: `.concat(r.palette.getContrastText(r.palette.text.main),` !important;
            }
        `)},function(r){return r.variant==="neutral"&&`
            > div {
                color: `.concat(r.palette.background.highlight,` !important;
            }
        `)});const ae=ne;var w={"x-large":"82",large:"48",medium:"32",small:"26","x-small":"20","xx-small":"16"};function T(r){return w[r]||w.medium}var A,L,I,_,M,R,z,se=p(A||(A=d([`
    0% {
        stroke-dasharray: 1, 248;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 177, 248;
        stroke-dashoffset: -75;
    }

    100% {
        stroke-dasharray: 177, 248;
        stroke-dashoffset: -246;
    }
`]))),ie=p(L||(L=d([`
    0% {
        stroke-dasharray: 1, 141;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 100, 141;
        stroke-dashoffset: -43;
    }

    100% {
        stroke-dasharray: 100, 141;
        stroke-dashoffset: -139;
    }
`]))),le=p(I||(I=d([`
    0% {
        stroke-dasharray: 1, 91;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 65, 91;
        stroke-dashoffset: -28;
    }

    100% {
        stroke-dasharray: 65, 91;
        stroke-dashoffset: -89;
    }
`]))),de=p(_||(_=d([`
    0% {
        stroke-dasharray: 1, 72;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 51, 72;
        stroke-dashoffset: -22;
    }

    100% {
        stroke-dasharray: 51, 72;
        stroke-dashoffset: -70;
    }
`]))),be=p(M||(M=d([`
    0% {
        stroke-dasharray: 1, 53;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 38, 53;
        stroke-dashoffset: -16;
    }

    100% {
        stroke-dasharray: 38, 53;
        stroke-dashoffset: -51;
    }
`]))),ge=p(R||(R=d([`
    0% {
        stroke-dasharray: 1, 41;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 29, 41;
        stroke-dashoffset: -12;
    }

    100% {
        stroke-dasharray: 29, 41;
        stroke-dashoffset: -39;
    }
`]))),B={"x-large":se,large:ie,medium:le,small:de,"x-small":be,"xx-small":ge},ce=U(C.svg)(z||(z=d([`
    animation: rotate 1s linear infinite;
    display: block;
    transform-origin: 50% 50%;
    width: `,`px;
    height: `,`px;

    & .path {
        stroke: `,`;
        stroke-linecap: round;
        animation: `,` 1.5s ease-in-out infinite;
    }

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }
    `,`;
    `,`;
    `,`;
`])),function(r){return T(r.size)},function(r){return T(r.size)},function(r){return r.palette.border.main},function(r){return B[r.size]||B.medium},function(r){return r.variant==="brand"&&`
            & .path {
                stroke: `.concat(r.palette.brand.main,`;
            }
        `)},function(r){return r.variant==="inverse"&&`
            & .path {
                stroke: `.concat(r.palette.getContrastText(r.palette.text.main),`;
            }
        `)},function(r){return r.variant==="neutral"&&`
            & .path {
                stroke: `.concat(r.palette.background.highlight,`;
            }
        `)});const me=ce;var O,he=C.div(O||(O=d([`
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: `,`;
    transform: translate(-50%, -50%);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 0;
    color: #ddd;
`])),te);const pe=he;var P,ue=C.span(P||(P=d([`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    flex-direction: column;
`])));const $=ue;function k(r){var t=r.className,o=r.style,n=r.assistiveText,s=r.isVisible,b=r.size,h=r.variant,u=r.type,g=r.children,i=T(b);return s?u==="arc"?a.createElement(pe,{className:t,style:o},a.createElement(me,{viewBox:"".concat(0," ",0," ",i," ").concat(i),size:b,variant:h},a.createElement("circle",{className:"path",cx:i/2,cy:i/2,r:(i-3)/2,fill:"none",strokeWidth:"3"})),a.createElement($,null,g),a.createElement(j,{text:n})):a.createElement(ae,{className:t,size:b,variant:h,style:o},a.createElement("div",null),a.createElement("div",null),a.createElement("div",null),a.createElement("div",null),a.createElement("div",null),a.createElement("div",null),a.createElement("div",null),a.createElement("div",null),a.createElement($,null,g),a.createElement(j,{text:n})):null}k.propTypes={variant:c.oneOf(["base","brand","inverse","neutral"]),size:c.oneOf(["xx-small","x-small","small","medium","large","x-large"]),isVisible:c.bool,assistiveText:c.string,className:c.string,style:c.object,type:c.oneOf(["circle","arc"]),children:c.node};k.defaultProps={variant:"base",size:"medium",isVisible:!0,assistiveText:null,className:void 0,style:void 0,type:"circle",children:null};const xe=r=>{const{...t}=r,o=(n,s)=>{const[b,h,u]=n.split("-");navigator.clipboard.writeText(`${s}-${h}-${u}`),G.success("Copied to clipboard")};return e.jsxs("div",{children:[e.jsx("h2",{className:m("text-2xl mb-4"),children:Q(t.name)}),e.jsx("div",{className:"flex items-start justify-start flex-wrap gap-4",children:t.colors.filter(n=>n.startsWith("bg")).map((n,s)=>e.jsxs(ee,{placement:"right",displayButton:e.jsxs(re,{message:"Click to copy color",placement:"top",className:"cursor-pointer hover:scale-110 transition",children:[e.jsx("div",{className:m(n,"w-14 h-8 rounded-lg inline-block")}),e.jsx("p",{className:"text-xs font-semibold",children:n.replaceAll("bg-","").replaceAll("-"," ").replaceAll(t.name,"")})]},s),children:[e.jsx(S,{onClick:()=>o(n,"text"),children:"Text"}),e.jsx(S,{onClick:()=>o(n,"bg"),children:"Background"}),e.jsx(S,{onClick:()=>o(n,"hover:bg"),children:"Hover:background"})]},s))})]})},ve=r=>{const t=K.map(o=>({name:o,colors:q.filter(n=>n.startsWith("bg-"+o)||n.startsWith("text-"+o))}));return e.jsx("div",{className:"flex flex-wrap items-center gap-x-12 gap-y-6",children:t.map((o,n)=>e.jsx(xe,{...o},n))})},l=r=>{const{name:t}=r,{colors:o,setColors:n}=x(),s=b=>{n({...o,[b.target.name]:b.target.value})};return e.jsxs("div",{className:"form-group",children:[e.jsx(y,{children:r.children}),e.jsx("input",{type:"text",value:o[t],className:"form-control",name:t,onChange:s,disabled:!o.isThemed})]})},Ce=r=>{const{colors:t,setColors:o}=x();return e.jsxs("div",{children:[e.jsxs("div",{className:"form-group",children:[e.jsx("h6",{className:"text-lg mb-1",children:"Header colors"}),e.jsxs("div",{className:"grid lg:grid-cols-2 gap-x-4",children:[e.jsx(l,{name:"headerTop",children:"Header Top"}),e.jsx(l,{name:"topLogoContainer",children:"Top logo container"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("h6",{className:"text-lg mb-1",children:"Sidebar colors"}),e.jsxs("div",{className:"grid lg:grid-cols-2 gap-x-4",children:[e.jsx(l,{name:"sidebarItemHover",children:"Sidebar item hover"}),e.jsx(l,{name:"hoverNavToggle",children:"Hover Nav Toggle"}),e.jsx(l,{name:"sidebarContainer",children:"Sidebar container"}),e.jsx(l,{name:"sidebarDropdownCollapsedContainer",children:"Sidebar dropdown collapsed container"}),e.jsx(l,{name:"sidebarItemDropdown",children:"Sidebar item dropdown"}),e.jsx(l,{name:"textSubtitleSidebar",children:"Sidebar Text subtitle"})]})]}),e.jsxs("div",{children:[e.jsx("h6",{className:"text-lg mb-1",children:"Extras"}),e.jsxs("div",{className:"grid lg:grid-cols-2 gap-x-4",children:[e.jsx(l,{name:"loaderColor",children:"Loader color"}),e.jsx(l,{name:"backgroundHome",children:"Background Home"}),e.jsx(l,{name:"textColor",children:"Text Color"}),e.jsxs("div",{className:"grid grid-cols-2",children:[e.jsxs("div",{children:[e.jsx("div",{className:m(t.isThemed?"mt-5":"mt-10"),children:e.jsx(f,{onChange:()=>o({isThemed:!t.isThemed}),isChecked:t.isThemed,children:e.jsx("span",{className:"text-xs",children:"Is themed"})})}),e.jsx(W,{isTrue:t.isThemed,children:e.jsx("span",{className:"inline-block pt-1",children:e.jsx(f,{onChange:()=>o({isThemeDarkLogin:!t.isThemeDarkLogin}),isChecked:t.isThemeDarkLogin,children:e.jsx("span",{className:"text-xs",children:"Themed Login"})})})})]}),e.jsx("div",{children:e.jsx("div",{className:m("form-group mb-0",t.isThemed?"mt-5":"mt-10"),children:e.jsx(f,{onChange:()=>o({isHeaderTop:!t.isHeaderTop}),isChecked:t.isHeaderTop,children:e.jsx("span",{className:"text-xs",children:"Header Top"})})})})]})]})]})]})},Se=r=>{const{color:t,className:o,name:n}=r,{setColors:s}=x();return e.jsx("button",{className:m("btn btn-sm text-white uppercase",o),type:"button",onClick:()=>s(t),children:n})},fe={topLogoContainer:"bg-red-800 border-red-600 border-t-0",headerTop:"bg-red-600",textColor:"text-gray-50",textSubtitleSidebar:"text-gray-50",hoverNavToggle:"hover:bg-red-700",sidebarContainer:"bg-red-700 border-0",sidebarItemHover:"hover:bg-red-600",sidebarItemDropdown:"hover:bg-red-500",sidebarDropdownCollapsedContainer:"bg-red-600",loaderColor:"text-red-700",backgroundHome:"bg-red-800",isThemed:!0,isThemeDarkLogin:!0,isHeaderTop:!0,enableClothesShopping:!0},ye={topLogoContainer:"bg-rose-800 border-rose-600 border-t-0",headerTop:"bg-rose-600",textColor:"text-gray-50",textSubtitleSidebar:"text-gray-50",hoverNavToggle:"hover:bg-rose-700",sidebarContainer:"bg-rose-700 border-0",sidebarItemHover:"hover:bg-rose-600",sidebarItemDropdown:"hover:bg-rose-500",sidebarDropdownCollapsedContainer:"bg-rose-600",loaderColor:"text-rose-700",backgroundHome:"bg-rose-800",isThemed:!0,isThemeDarkLogin:!0,isHeaderTop:!0,enableClothesShopping:!0},Te={topLogoContainer:"bg-orange-700 border-orange-500 border-t-0",headerTop:"bg-orange-600",textColor:"text-gray-50",textSubtitleSidebar:"text-gray-50",hoverNavToggle:"hover:bg-orange-700",sidebarContainer:"bg-orange-500 border-0",sidebarItemHover:"hover:bg-orange-600",sidebarItemDropdown:"hover:bg-orange-700",sidebarDropdownCollapsedContainer:"bg-orange-600",loaderColor:"text-orange-700",backgroundHome:"bg-orange-800",isThemed:!0,isThemeDarkLogin:!0,isHeaderTop:!0,enableClothesShopping:!0},ke={topLogoContainer:"bg-yellow-700 border-yellow-500 border-t-0",headerTop:"bg-yellow-600",textColor:"text-gray-50",textSubtitleSidebar:"text-gray-50",hoverNavToggle:"hover:bg-yellow-700",sidebarContainer:"bg-yellow-500 border-0",sidebarItemHover:"hover:bg-yellow-600",sidebarItemDropdown:"hover:bg-yellow-700",sidebarDropdownCollapsedContainer:"bg-yellow-600",loaderColor:"text-yellow-700",backgroundHome:"bg-yellow-800",isThemed:!0,isThemeDarkLogin:!0,isHeaderTop:!0,enableClothesShopping:!0},Ne={topLogoContainer:"bg-amber-700 border-amber-500 border-t-0",headerTop:"bg-amber-600",textColor:"text-gray-50",textSubtitleSidebar:"text-gray-50",hoverNavToggle:"hover:bg-amber-700",sidebarContainer:"bg-amber-500 border-0",sidebarItemHover:"hover:bg-amber-600",sidebarItemDropdown:"hover:bg-amber-700",sidebarDropdownCollapsedContainer:"bg-amber-600",loaderColor:"text-amber-700",backgroundHome:"bg-amber-800",isThemed:!0,isThemeDarkLogin:!0,isHeaderTop:!0,enableClothesShopping:!0},Ee={topLogoContainer:"bg-teal-800 border-teal-600 border-t-0",headerTop:"bg-teal-600",textColor:"text-gray-50",textSubtitleSidebar:"text-gray-50",hoverNavToggle:"hover:bg-teal-700",sidebarContainer:"bg-teal-700 border-0",sidebarItemHover:"hover:bg-teal-600",sidebarItemDropdown:"hover:bg-teal-500",sidebarDropdownCollapsedContainer:"bg-teal-600",loaderColor:"text-teal-700",backgroundHome:"bg-teal-800",isThemed:!0,isThemeDarkLogin:!0,enableClothesShopping:!0,isHeaderTop:!0},De={topLogoContainer:"bg-green-800 border-green-600 border-t-0",headerTop:"bg-green-600",textColor:"text-gray-50",textSubtitleSidebar:"text-gray-50",hoverNavToggle:"hover:bg-green-700",sidebarContainer:"bg-green-700 border-0",sidebarItemHover:"hover:bg-green-600",sidebarItemDropdown:"hover:bg-green-500",sidebarDropdownCollapsedContainer:"bg-green-600",loaderColor:"text-green-700",backgroundHome:"bg-green-800",isThemed:!0,isThemeDarkLogin:!0,enableClothesShopping:!0,isHeaderTop:!0},je={topLogoContainer:"bg-emerald-800 border-emerald-600 border-t-0",headerTop:"bg-emerald-600",textColor:"text-gray-50",textSubtitleSidebar:"text-gray-50",hoverNavToggle:"hover:bg-emerald-700",sidebarContainer:"bg-emerald-700 border-0",sidebarItemHover:"hover:bg-emerald-600",sidebarItemDropdown:"hover:bg-emerald-500",sidebarDropdownCollapsedContainer:"bg-emerald-600",loaderColor:"text-emerald-700",backgroundHome:"bg-emerald-800",isThemed:!0,isThemeDarkLogin:!0,enableClothesShopping:!0,isHeaderTop:!0},He={topLogoContainer:"bg-lime-700 border-lime-600 border-t-0",headerTop:"bg-lime-600",textColor:"text-gray-50",textSubtitleSidebar:"text-gray-50",hoverNavToggle:"hover:bg-lime-700",sidebarContainer:"bg-lime-600 border-0",sidebarItemHover:"hover:bg-lime-600",sidebarItemDropdown:"hover:bg-lime-600",sidebarDropdownCollapsedContainer:"bg-lime-700",loaderColor:"text-lime-700",backgroundHome:"bg-lime-800",isThemed:!0,isThemeDarkLogin:!0,enableClothesShopping:!0,isHeaderTop:!0},we={topLogoContainer:"bg-indigo-700 border-indigo-600 border-t-0",headerTop:"bg-indigo-600",textColor:"text-gray-50",textSubtitleSidebar:"text-gray-50",hoverNavToggle:"hover:bg-indigo-700",sidebarContainer:"bg-indigo-700 border-0",sidebarItemHover:"hover:bg-indigo-600",sidebarItemDropdown:"hover:bg-indigo-500",sidebarDropdownCollapsedContainer:"bg-indigo-800",loaderColor:"text-indigo-700",backgroundHome:"bg-indigo-800",isThemed:!0,isThemeDarkLogin:!0,enableClothesShopping:!0,isHeaderTop:!0},Ae={topLogoContainer:"bg-purple-700 border-purple-600 border-t-0",headerTop:"bg-purple-600",textColor:"text-gray-50",textSubtitleSidebar:"text-gray-50",hoverNavToggle:"hover:bg-purple-700",sidebarContainer:"bg-purple-700 border-0",sidebarItemHover:"hover:bg-purple-600",sidebarItemDropdown:"hover:bg-purple-500",sidebarDropdownCollapsedContainer:"bg-purple-800",loaderColor:"text-purple-700",backgroundHome:"bg-purple-800",isThemed:!0,isThemeDarkLogin:!0,enableClothesShopping:!0,isHeaderTop:!0},Le={topLogoContainer:"bg-fuchsia-700 border-fuchsia-600 border-t-0",headerTop:"bg-fuchsia-600",textColor:"text-gray-50",textSubtitleSidebar:"text-gray-50",hoverNavToggle:"hover:bg-fuchsia-700",sidebarContainer:"bg-fuchsia-700 border-0",sidebarItemHover:"hover:bg-fuchsia-600",sidebarItemDropdown:"hover:bg-fuchsia-500",sidebarDropdownCollapsedContainer:"bg-fuchsia-800",loaderColor:"text-fuchsia-700",backgroundHome:"bg-fuchsia-800",isThemeDarkLogin:!0,enableClothesShopping:!0,isHeaderTop:!0,isThemed:!0},Ie={topLogoContainer:"bg-pink-700 border-pink-600 border-t-0",headerTop:"bg-pink-600",textColor:"text-gray-50",textSubtitleSidebar:"text-gray-50",hoverNavToggle:"hover:bg-pink-700",sidebarContainer:"bg-pink-700 border-0",sidebarItemHover:"hover:bg-pink-600",sidebarItemDropdown:"hover:bg-pink-500",sidebarDropdownCollapsedContainer:"bg-pink-800",loaderColor:"text-pink-700",backgroundHome:"bg-pink-800",isThemed:!0,isThemeDarkLogin:!0,enableClothesShopping:!0,isHeaderTop:!0},_e={topLogoContainer:"bg-violet-700 border-violet-600 border-t-0",headerTop:"bg-violet-600",textColor:"text-gray-50",textSubtitleSidebar:"text-gray-50",hoverNavToggle:"hover:bg-violet-700",sidebarContainer:"bg-violet-700 border-0",sidebarItemHover:"hover:bg-violet-600",sidebarItemDropdown:"hover:bg-violet-500",sidebarDropdownCollapsedContainer:"bg-violet-800",loaderColor:"text-violet-700",backgroundHome:"bg-violet-800",isThemed:!0,isThemeDarkLogin:!0,enableClothesShopping:!0,isHeaderTop:!0},Me={topLogoContainer:"bg-blue-700 border-blue-600 border-t-0",headerTop:"bg-blue-600",textColor:"text-gray-50",textSubtitleSidebar:"text-gray-50",hoverNavToggle:"hover:bg-blue-700",sidebarContainer:"bg-blue-700 border-0",sidebarItemHover:"hover:bg-blue-600",sidebarItemDropdown:"hover:bg-blue-500",sidebarDropdownCollapsedContainer:"bg-blue-800",loaderColor:"text-blue-700",backgroundHome:"bg-blue-800",isThemed:!0,isThemeDarkLogin:!0,isHeaderTop:!0,enableClothesShopping:!0},Re={topLogoContainer:"bg-sky-700 border-sky-600 border-t-0",headerTop:"bg-sky-600",textColor:"text-gray-50",textSubtitleSidebar:"text-gray-50",hoverNavToggle:"hover:bg-sky-700",sidebarContainer:"bg-sky-700 border-0",sidebarItemHover:"hover:bg-sky-600",sidebarItemDropdown:"hover:bg-sky-500",sidebarDropdownCollapsedContainer:"bg-sky-800",loaderColor:"text-sky-700",backgroundHome:"bg-sky-800",isThemed:!0,isThemeDarkLogin:!0,isHeaderTop:!0,enableClothesShopping:!0},ze={topLogoContainer:"bg-cyan-700 border-cyan-600 border-t-0",headerTop:"bg-cyan-600",textColor:"text-gray-50",textSubtitleSidebar:"text-gray-50",hoverNavToggle:"hover:bg-cyan-700",sidebarContainer:"bg-cyan-700 border-0",sidebarItemHover:"hover:bg-cyan-600",sidebarItemDropdown:"hover:bg-cyan-500",sidebarDropdownCollapsedContainer:"bg-cyan-800",loaderColor:"text-cyan-700",backgroundHome:"bg-cyan-800",isThemed:!0,isThemeDarkLogin:!0,isHeaderTop:!0,enableClothesShopping:!0},Be={topLogoContainer:"bg-black border-gray-900 border-t-0",headerTop:"bg-neutral-900",textColor:"text-gray-50",textSubtitleSidebar:"text-gray-50",hoverNavToggle:"hover:bg-neutral-700",sidebarContainer:"bg-black border-0",sidebarItemHover:"hover:bg-neutral-900",sidebarItemDropdown:"hover:bg-neutral-800",sidebarDropdownCollapsedContainer:"bg-neutral-900",loaderColor:"text-black",backgroundHome:"bg-black",isThemed:!0,isThemeDarkLogin:!0,isHeaderTop:!0,enableClothesShopping:!0},Oe={topLogoContainer:"bg-slate-900 border-slate-800 border-t-0",headerTop:"bg-slate-800",textColor:"text-gray-50",textSubtitleSidebar:"text-gray-50",hoverNavToggle:"hover:bg-slate-700",sidebarContainer:"bg-slate-800 border-0",sidebarItemHover:"hover:bg-slate-700",sidebarItemDropdown:"hover:bg-slate-500",sidebarDropdownCollapsedContainer:"bg-slate-700",loaderColor:"text-slate-700",backgroundHome:"bg-slate-800",isThemeDarkLogin:!0,isHeaderTop:!0,enableClothesShopping:!0,isThemed:!0},Pe={topLogoContainer:"bg-gray-800 border-gray-700 border-t-0",headerTop:"bg-gray-700",textColor:"text-gray-50",textSubtitleSidebar:"text-gray-50",hoverNavToggle:"hover:bg-gray-800",sidebarContainer:"bg-gray-700 border-0",sidebarItemHover:"hover:bg-gray-800",sidebarItemDropdown:"hover:bg-gray-900",sidebarDropdownCollapsedContainer:"bg-gray-800",loaderColor:"text-gray-700",backgroundHome:"bg-gray-800",isThemed:!0,isThemeDarkLogin:!0,isHeaderTop:!0,enableClothesShopping:!0},$e={topLogoContainer:"bg-zinc-900 border-zinc-800 border-t-0",headerTop:"bg-zinc-800",textColor:"text-zinc-50",textSubtitleSidebar:"text-zinc-50",hoverNavToggle:"hover:bg-zinc-700",sidebarContainer:"bg-zinc-800 border-0",sidebarItemHover:"hover:bg-zinc-700",sidebarItemDropdown:"hover:bg-zinc-500",sidebarDropdownCollapsedContainer:"bg-zinc-700",loaderColor:"text-zinc-700",backgroundHome:"bg-zinc-800",isThemeDarkLogin:!0,isHeaderTop:!0,enableClothesShopping:!0,isThemed:!0},Ue={topLogoContainer:"bg-neutral-900 border-neutral-800 border-t-0",headerTop:"bg-neutral-800",textColor:"text-gray-50",textSubtitleSidebar:"text-gray-50",hoverNavToggle:"hover:bg-neutral-700",sidebarContainer:"bg-neutral-800 border-0",sidebarItemHover:"hover:bg-neutral-700",sidebarItemDropdown:"hover:bg-neutral-500",sidebarDropdownCollapsedContainer:"bg-neutral-700",loaderColor:"text-neutral-700",backgroundHome:"bg-neutral-800",isThemed:!0,isThemeDarkLogin:!0,isHeaderTop:!0,enableClothesShopping:!0},Ve={topLogoContainer:"bg-stone-900 border-stone-800 border-t-0",headerTop:"bg-stone-800",textColor:"text-gray-50",textSubtitleSidebar:"text-gray-50",hoverNavToggle:"hover:bg-stone-700",sidebarContainer:"bg-stone-800 border-0",sidebarItemHover:"hover:bg-stone-700",sidebarItemDropdown:"hover:bg-stone-500",sidebarDropdownCollapsedContainer:"bg-stone-700",loaderColor:"text-stone-700",backgroundHome:"bg-stone-800",isThemed:!0,isThemeDarkLogin:!0,isHeaderTop:!0,enableClothesShopping:!0},Ge=[{name:"Dark Colors",colors:[{name:"Black",color:Be,className:"bg-black hover:bg-neutral-800"},{name:"Slate",color:Oe,className:"bg-slate-800 hover:bg-slate-900"},{name:"Gray",color:Pe,className:"bg-gray-700 hover:bg-gray-800"},{name:"Zinc",color:$e,className:"bg-zinc-700 hover:bg-zinc-800"},{name:"Neutral",color:Ue,className:"bg-neutral-700 hover:bg-neutral-800"},{name:"Stone",color:Ve,className:"bg-stone-700 hover:bg-stone-800"}]},{name:"Green Colors",colors:[{name:"Emerald",color:je,className:"bg-emerald-600 hover:bg-emerald-700"},{name:"Green",color:De,className:"bg-green-600 hover:bg-green-700"},{name:"Teal",color:Ee,className:"bg-teal-600 hover:bg-teal-700"},{name:"Lime",color:He,className:"bg-lime-600 hover:bg-lime-700"}]},{name:"Blue Colors",colors:[{name:"Blue",color:Me,className:"bg-blue-600 hover:bg-blue-700"},{name:"Sky",color:Re,className:"bg-sky-600 hover:bg-sky-700"},{name:"Cyan",color:ze,className:"bg-cyan-600 hover:bg-cyan-700"}]},{name:"Red Colors",colors:[{name:"Red",color:fe,className:"bg-red-600 hover:bg-red-700"},{name:"Rose",color:ye,className:"bg-rose-600 hover:bg-rose-700"},{name:"Orange",color:Te,className:"bg-orange-600 hover:bg-orange-700"},{name:"Yellow",color:ke,className:"bg-yellow-400 hover:bg-yellow-500"},{name:"Amber",color:Ne,className:"bg-amber-500 hover:bg-amber-600"}]},{name:"Others Colors",colors:[{name:"Indigo",color:we,className:"bg-indigo-800 hover:bg-indigo-90"},{name:"Purple",color:Ae,className:"bg-purple-800 hover:bg-purple-900"},{name:"Fuchsia",color:Le,className:"bg-fuchsia-700 hover:bg-fuchsia-800"},{name:"Pink",color:Ie,className:"bg-pink-600 hover:bg-pink-700"},{name:"Violet",color:_e,className:"bg-violet-700 hover:bg-violet-800"}]}],We=r=>e.jsx("div",{className:"tile",children:Ge.map((t,o)=>e.jsxs("div",{className:"form-group",children:[e.jsx("h6",{className:"text-lg mb-1",children:t.name}),t.colors.map((n,s)=>e.jsx(Se,{...n},s))]},o))}),Ze=r=>{const{setColors:t,colors:o}=x();return e.jsxs("div",{className:"grid grid-cols-2",children:[e.jsxs("div",{className:m("form-group mb-2"),children:[e.jsx(y,{className:"",children:"Enable Prefix User"}),e.jsx(D,{checked:o.enablePrefixesUser,onChange:()=>t({...o,enablePrefixesUser:!o.enablePrefixesUser}),className:`${o.enablePrefixesUser?"bg-blue-600":"bg-gray-200"} relative inline-flex h-6 w-11 items-center rounded-full`,children:e.jsx("span",{className:`${o.enablePrefixesUser?"translate-x-6":"translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition`})})]}),e.jsxs("div",{className:m("form-group mb-2"),children:[e.jsx(y,{className:"",children:"Enable Clothes Shopping"}),e.jsx(D,{checked:o.enableClothesShopping,onChange:()=>t({...o,enableClothesShopping:!o.enableClothesShopping}),className:`${o.enableClothesShopping?"bg-blue-600":"bg-gray-200"} relative inline-flex h-6 w-11 items-center rounded-full`,children:e.jsx("span",{className:`${o.enableClothesShopping?"translate-x-6":"translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition`})})]})]})};function Fe(r){return Z({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"g",attr:{id:"Import"},child:[{tag:"g",attr:{},child:[{tag:"path",attr:{d:"M5.552,20.968a2.577,2.577,0,0,1-2.5-2.73c-.012-2.153,0-4.306,0-6.459a.5.5,0,0,1,1,0c0,2.2-.032,4.4,0,6.6.016,1.107.848,1.589,1.838,1.589H18.353A1.546,1.546,0,0,0,19.825,19a3.023,3.023,0,0,0,.1-1.061V11.779h0a.5.5,0,0,1,1,0c0,2.224.085,4.465,0,6.687a2.567,2.567,0,0,1-2.67,2.5Z"}},{tag:"path",attr:{d:"M11.63,15.818a.459.459,0,0,0,.312.138c.014,0,.027.005.042.006s.027,0,.041-.006a.457.457,0,0,0,.312-.138l3.669-3.669a.5.5,0,0,0-.707-.707l-2.815,2.815V3.515a.5.5,0,0,0-1,0V14.257L8.668,11.442a.5.5,0,0,0-.707.707Z"}}]}]}]})(r)}const Je=r=>{const{colors:t,setColors:o}=x(),[n,s]=F.useState(!1),b=async()=>{try{s(!0),await J.configAppService.update({colorsAdmin:t}),N.success("Colors updated")}catch(g){console.log(g),N.error("Error updating colors")}finally{s(!1)}},h=()=>{const g=`data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(t))}`,i=document.createElement("a");i.href=g,i.download="colors.json",i.click()},u=g=>{const i=new FileReader;i.readAsText(g.target.files[0],"UTF-8"),i.onload=V=>{o(JSON.parse(V.target.result))}};return e.jsxs("div",{className:"mt-3",children:[e.jsx("button",{className:"btn btn-primary w-full btn-sm",type:"button",onClick:b,disabled:n,children:n?e.jsx(k,{}):"Save changes"}),e.jsxs("div",{className:"flex items-center",children:[e.jsxs("button",{className:"btn btn-outline-dark btn-xs w-1/2 gap-1",disabled:n,onClick:h,children:["Export as JSON ",e.jsx(oe,{className:"text-base"})]}),e.jsx("input",{type:"file",onChange:u,className:"hidden",id:"file-json-input",accept:"application/json"}),e.jsxs("button",{className:"btn btn-outline-success btn-xs w-1/2 gap-1",disabled:n,onClick:()=>document.getElementById("file-json-input").click(),children:["Import as JSON ",e.jsx(Fe,{className:"text-base"})]})]})]})},hr=r=>e.jsx(X,{to:v.settings.path,breadcrumbs:[{to:v.dashboard.path,label:E("dashboard.title")},{to:v.settings.path,label:E("settings.title")},{to:v.colorsAdmin.path,label:"Colors"}],icon:e.jsx(Y,{}),title:"Colors Admin",children:e.jsxs("div",{className:"grid lg:grid-cols-7 gap-4",children:[e.jsxs("div",{className:"lg:col-span-3",children:[e.jsx("div",{className:"tile p-3.5 mb-2",children:e.jsx(Ce,{})}),e.jsx("div",{className:"tile p-3.5 mb-2",children:e.jsx(Ze,{})}),e.jsx("div",{className:"tile p-3.5 mb-2",children:e.jsx(Je,{})}),e.jsx(We,{})]}),e.jsx("div",{className:"tile lg:col-span-4",children:e.jsx(ve,{})})]})});export{hr as default};
