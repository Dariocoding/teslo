import{f as h,j as s,g as I,o as O,q as U,u as A,r as m,e as l,w as F,x as L,v as x,_ as M,y as C,b as S,N as T,p as _,z as k,R as q,c as B}from"./index-3ba1a706.js";import{H as z}from"./index-a1d8defb.js";import{u as v}from"./useQueryState-40058bbe.js";import{T as H}from"./index-a318726a.js";import{t as a}from"./translate-092d59f9.js";import"./formik.esm-082975a3.js";import"./react-paginate-dac8dd77.js";import K from"./index-4083717d.js";import"./index-afbcf810.js";import"./react-tooltip.min-e79f5625.js";/* empty css                */import{c as b}from"./capitalize-1790f93b.js";import $ from"./FormUser-8b54ffcb.js";import{S as Q}from"./sweetalert2.all-6afdc543.js";import{M as W}from"./ModalDeleteUser-0c848b57.js";import{R as N}from"./index-f98b8c3b.js";import"./index-6654b9c9.js";import"./emotion-is-prop-valid.esm-9ab032ed.js";import"./DataTable-eb9c6d6c.js";import"./useMedia-ab89cd6a.js";import"./ActionsTableOrder-0ba68a93.js";import"./DropdownItem-3f2e4d6d.js";import"./index.esm-903abc48.js";import"./BadgeStatusOrder-2a4a99b5.js";import"./TablePlaceholder-35369399.js";import"./index.esm-b422dff9.js";import"./index-abaab777.js";import"./getPrototypeOf-4a45ccd2.js";import"./setPrototypeOf-ef451187.js";import"./unsupportedIterableToArray-cf7d0cbd.js";import"./zIndex-8db5d079.js";import"./slicedToArray-efe1abbd.js";import"./index.esm-65f99a51.js";import"./utils-c6e11853.js";import"./ExportsBillOrders-cd8c4223.js";import"./index-f4c330e0.js";import"./index-6ffea55d.js";import"./index.esm-431b757e.js";import"./motion-d685a380.js";import"./index-ef1fda9f.js";import"./index-e73b124f.js";import"./label-7eeebea1.js";import"./index-c8ae6f07.js";import"./index.esm-6b48a1be.js";import"./styled-components.browser.esm-f45d86a5.js";import"./emotion-unitless.esm-475d8cc4.js";import"./index-4a612718.js";import"./index.esm-8e4abcfc.js";import"./useTimeOutMessage-9ac15e50.js";import"./ConfirmModal-fa012840.js";async function G(i){const{queryKey:e}=i,{data:t}=await h.usersService.getUser(e[1]);return t}function J(i){return v(["user",i],G,{})}async function X(i,e){const{data:t}=await h.ordersService.getOrdersByIdUser(i.queryKey[1],{...e||{}});return t}function Y(i,e){return v(["orders-by-user",i],t=>X(t),[])}const Z=i=>{const{id:e}=i,{data:t,setData:d,refetch:c,isFetching:n}=Y(e);return s.jsx(H,{itemsPerPage:10,orders:t,setOrders:d,refetch:c,isFetching:n})},ee=i=>{var R,g;const{user:e,setUser:t}=i,d=I(),{colors:c}=O(),{formatMessage:n}=U(),{user:r}=A(),[w,f]=m.useState(!1),[E,u]=m.useState(!1),[y,j]=m.useState(!1),V=(e.iduser!==r.iduser&&(((e==null?void 0:e.roles.includes(l.ValidRoles.SUPER_USER))||(e==null?void 0:e.roles.includes(l.ValidRoles.ADMIN))||(e==null?void 0:e.roles.includes(l.ValidRoles.SUPERVISOR))||(e==null?void 0:e.roles.includes(l.ValidRoles.SELLER)))&&((R=r==null?void 0:r.roles)==null?void 0:R.includes(l.ValidRoles.SUPER_USER))||((e==null?void 0:e.roles.includes(l.ValidRoles.ADMIN))||(e==null?void 0:e.roles.includes(l.ValidRoles.SUPERVISOR))||(e==null?void 0:e.roles.includes(l.ValidRoles.SELLER)))&&(r==null?void 0:r.roles.includes(l.ValidRoles.ADMIN))||((e==null?void 0:e.roles.includes(l.ValidRoles.SUPERVISOR))||(e==null?void 0:e.roles.includes(l.ValidRoles.SELLER)))&&(r==null?void 0:r.roles.includes(l.ValidRoles.SUPERVISOR)))||(e==null?void 0:e.roles.includes(l.ValidRoles.USER)))&&!(e!=null&&e.roles.includes(l.ValidRoles.SUPER_USER)),D=(g=r==null?void 0:r.roles)==null?void 0:g.some(o=>o===l.ValidRoles.ADMIN||o===l.ValidRoles.SUPER_USER||o===l.ValidRoles.SUPERVISOR),P=async()=>{try{j(!0),await h.usersService.deleteUser(e.iduser),d(x.users.path),u(!1),Q.fire(n({id:"users.deleted.success"}),"","success")}catch(o){console.log(o),M.error(o.response.data.message||n({id:"users.deleted.error"}))}finally{j(!1)}};return s.jsxs(m.Fragment,{children:[s.jsx("div",{className:"tile",children:s.jsx("div",{className:"flex flex-col xl:flex-row gap-4",children:s.jsx("div",{children:s.jsxs("div",{className:"flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto",children:[s.jsxs("div",{className:"flex xl:flex-col items-center gap-4",children:[s.jsx("img",{alt:"...",src:"https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg",className:"shadow-xl rounded-full h-12 align-middle border-none w-12"}),s.jsx("h6",{className:"font-bold",children:b(e==null?void 0:e.firstName)+" "+b(e==null?void 0:e.lastName)})]}),s.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-2 gap-x-4 mt-8",children:[s.jsx(p,{title:"ID",value:e==null?void 0:e.iduser}),s.jsx(N,{isTrue:e==null?void 0:e.dni,children:s.jsx(p,{title:"DNI",value:(e!=null&&e.prefix&&c.enablePrefixesUser?(e==null?void 0:e.prefix)+" ":null)+(e==null?void 0:e.dni)})}),s.jsx(p,{title:"Email",value:e==null?void 0:e.email}),s.jsx(p,{title:"Phone",value:e==null?void 0:e.phone})]}),s.jsx(N,{isTrue:V,children:s.jsxs("div",{className:"mt-4 flex flex-col xl:flex-row gap-2",children:[s.jsxs("button",{type:"button",onClick:()=>u(!0),className:"btn btn-outline-danger btn-sm w-full gap-1 mb-0",children:[a("app.delete")," ",s.jsx(F,{})]}),s.jsxs("button",{type:"button",onClick:()=>f(!0),className:"btn btn-primary btn-sm w-full gap-1 mb-0",children:[a("app.edit")," ",s.jsx(L,{})]})]})})]})})})}),s.jsx(K,{title:s.jsx("span",{className:"text-lg font-bold",children:a("users.edit")}),width:290,onClose:()=>f(!1),isOpen:w,children:s.jsx($,{user:e,fullWidthDni:!0,renderRoles:D,onSuccess:o=>{f(!1),t(o)}})}),s.jsx(W,{isLoading:y,user:e,showModalDeleteUser:E,onAcceptDeleteUser:P,onCloseModalDelete:()=>u(!1)})]})},p=i=>{const{title:e,value:t}=i;return s.jsxs("div",{children:[s.jsx("span",{className:"font-bold",children:e}),s.jsx("p",{className:"text-gray-700 dark:text-gray-200 font-semibold text-sm",children:t})]})},se=i=>{U();const e=C(),{data:t,isFetching:d,setData:c,error:n}=J(e.id);return d?s.jsx(S,{loading:!0}):!Object.keys(t).length&&n?s.jsx(T,{to:_.users.path}):Object.keys(t).length?s.jsx(z,{to:x.users.path,title:a("users.single"),icon:s.jsx(k,{}),breadcrumbs:[{label:a("dashboard.title"),to:x.home.path},{label:a("users.title"),to:x.users.path},{label:t!=null&&t.firstName?(t==null?void 0:t.firstName)+" "+(t==null?void 0:t.lastName):a("users.single")}],children:s.jsxs("div",{className:"flex flex-col xl:flex-row gap-4",children:[s.jsx("div",{children:s.jsx(ee,{user:t,setUser:c})}),s.jsx("div",{className:"w-full",children:s.jsx(q,{isTrue:!0,children:s.jsxs("div",{className:B("tile"),children:[s.jsx("h6",{className:"mb-4",children:a("orders.title")}),s.jsx(Z,{id:e.id})]})})})]})}):s.jsx(S,{loading:!0})},Ye=m.memo(se);export{Ye as default};
