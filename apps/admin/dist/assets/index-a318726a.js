import{j as e,L as R,v as _,n as j,h as P,d as J,f as N,g as q,K as H,r as f,O as K,Z,ah as G,c as Q,t as W,R as B,ai as X,aj as $,ak as ee,S as x,T as p,D as V,q as te,s as A}from"./index-3ba1a706.js";import{D as se}from"./DataTable-eb9c6d6c.js";import{t as n}from"./translate-092d59f9.js";import{A as ae}from"./ActionsTableOrder-0ba68a93.js";import{B as re}from"./BadgeStatusOrder-2a4a99b5.js";import{T as oe}from"./TablePlaceholder-35369399.js";import{a as le}from"./index.esm-b422dff9.js";import{D as L}from"./index-abaab777.js";import{V as ne}from"./index.esm-65f99a51.js";import{baseFetchPdf as ie,baseFetchCsv as ce,baseFetchExcel as de,baseExportJson as me}from"./utils-c6e11853.js";import{c as M,g as E}from"./ExportsBillOrders-cd8c4223.js";import{S as h}from"./sweetalert2.all-6afdc543.js";const ue=()=>[{title:n("orders.label.ID"),field:"idorder"},{title:n("orders.label.reference"),field:"reference"},{title:n("orders.label.buyer"),field:"fullName"},{title:n("orders.label.seller"),field:"sellerFullName"},{title:n("orders.label.dateCreated"),field:"dateCreatedFormatted"},{title:n("orders.label.paymentMethod"),field:"paymentMethod.title"},{title:n("orders.label.subtotal"),field:"subtotalFormatted",center:!0},{title:"I.V.A",field:"ivaFormatted",center:!0},{title:n("orders.label.discount"),field:"discountFormatted",center:!0},{title:n("orders.label.total"),field:"totalFormatted",center:!0},{title:n("orders.label.status"),field:"badgeStatus",center:!0},{title:n("orders.label.actions"),field:"actions",center:!0}],fe=r=>{const{orders:s}=r;return s.map(t=>{var i,d;const c=((t.subtotal||0)*(t.iva||0)/100).toFixed(2);return{...t,actions:e.jsx(ae,{order:t,...r}),fullName:t.user?e.jsx(R,{className:"link-table",to:_.viewUser.fnPath(t.user.iduser),children:((i=t.user)==null?void 0:i.firstName)+" "+((d=t.user)==null?void 0:d.lastName)}):"C/F",dateCreatedFormatted:j(t.dateCreated).format("DD/MM/YYYY"),totalFormatted:P.format(t.total),badgeStatus:e.jsx(re,{status:t.status}),subtotalFormatted:P.format(t.subtotal||0),ivaFormatted:P.format(parseFloat(c)),sellerFullName:t.userSell?t.userSell.firstName+" "+t.userSell.lastName:"",discountFormatted:t.discount+" %"}})},be=r=>{const{to:s,setFrom:t,setTo:c,from:i,fetchData:d}=r;return e.jsxs("div",{className:"flex items-center justify-start flex-wrap w-full sm:w-auto flex-grow gap-4",children:[e.jsxs("div",{className:"w-full sm:max-w-[225px]",children:[e.jsx("label",{htmlFor:"category-select-products",className:"text-xs w-full text-start mb-1 font-semibold block",children:n("app.from")}),e.jsx("div",{children:e.jsx(L,{value:i,placeholder:"From",borderRadius:"semi-square",size:"small",maxDate:new Date,onChange:m=>t(m)})})]}),e.jsxs("div",{className:"w-full sm:max-w-[225px]",children:[e.jsx("label",{htmlFor:"category-select-products",className:"text-xs w-full text-start mb-1 font-semibold block",children:n("app.from")}),e.jsx("div",{children:e.jsx(L,{value:s,placeholder:"To",borderRadius:"semi-square",size:"small",maxDate:new Date,onChange:m=>c(m)})})]}),e.jsx("div",{className:"flex items-end sm:h-[50px]",children:e.jsx("button",{className:"btn btn-xs btn-success mb-0",type:"button",onClick:d,children:e.jsx(J,{})})})]})},he=r=>{const{refetch:s,buttons:t,showSelects:c,setIsLoadingTable:i,setOrders:d,fetchOrders:m=N.ordersService.getOrders,navigateOnChageDateSelect:w=!0,orders:b}=r,k=q(),[y]=H(),v=y.get("from"),C=y.get("to"),[l,D]=f.useState(v?new Date(v):K()),[u,O]=f.useState(C?new Date(new Date(C)):new Date),F=f.useCallback(async()=>{try{if(j(l).isAfter(j(u))||j(u).isBefore(j(l)))return Z.error("The date range is invalid");i(!0);const g=await m({from:l,to:u});d(g.data),w&&k({pathname:_.orders.path,search:G({from:l.toISOString(),to:u.toISOString()}).toString()})}catch(g){console.log(g)}finally{i(!1)}},[l,u,w,m]);return e.jsxs("div",{children:[e.jsxs("div",{className:"w-full flex items-center justify-start flex-wrap pb-2 sm:flex-row flex-col mb-2",children:[e.jsxs("div",{className:Q("flex items-end justify-start sm:mb-0 mb-2",c&&"sm:h-[50px]"),children:[e.jsx(R,{to:_.newOrder.path,className:"btn btn-primary btn-xs mb-0",children:e.jsx(W,{})}),e.jsx(B,{isTrue:s,children:e.jsx("button",{className:"btn btn-alternative btn-xs mb-0",onClick:F,children:e.jsx(le,{})})}),t]}),e.jsx(B,{isTrue:c,children:e.jsx(be,{to:u,setFrom:D,setTo:O,fetchData:F,from:l})})]}),e.jsx(B,{isTrue:b.length,children:e.jsxs("div",{className:"w-full flex items-center justify-start flex-wrap pb-2 sm:mb-0 mb-2 mt-3",children:[e.jsxs("button",{type:"button",className:"btn btn-xs mb-0 btn-danger mr-2 gap-1 shadow-none",onClick:()=>S.onClickPdf(b),children:["PDF ",e.jsx(X,{})]}),e.jsxs("button",{type:"button",onClick:()=>S.onClickExcel(b),className:"btn btn-xs mb-0 btn-success gap-1 shadow-none",children:["Excel ",e.jsx($,{})]}),e.jsxs("button",{type:"button",className:"btn btn-xs mb-0 btn-info gap-1 shadow-none",onClick:()=>S.onClickCsv(b),children:["CSV ",e.jsx(ee,{})]}),e.jsxs("button",{type:"button",className:"btn btn-xs mb-0 btn-alternative gap-1 shadow-none",onClick:()=>S.onClickJson(b),children:["JSON ",e.jsx(ne,{})]})]})})]})},S={onClickPdf:async r=>{x();const s={name:"Orders",headers:M.map(t=>t.header),rows:E(r)};await ie(s,"Orders"),p()},onClickCsv:async r=>{x();try{const s={name:"Orders",columns:M,data:E(r,!1)};await ce(s,"Orders")}catch(s){console.log(s)}finally{p()}},onClickExcel:async r=>{x();try{const s={name:"Orders",columns:M,data:E(r)};await de(s,"Orders")}catch(s){console.log(s)}finally{p()}},onClickJson:async r=>{me(r,"Orders")}},xe=f.lazy(()=>V(()=>import("./FormUpdateOrder-73cc0955.js"),["assets/FormUpdateOrder-73cc0955.js","assets/index-3ba1a706.js","assets/index-57a2b61b.css","assets/index-ef1fda9f.js","assets/formik.esm-082975a3.js","assets/index-e73b124f.js","assets/label-7eeebea1.js","assets/index-c8ae6f07.js","assets/index.esm-6b48a1be.js","assets/styled-components.browser.esm-f45d86a5.js","assets/emotion-is-prop-valid.esm-9ab032ed.js","assets/emotion-unitless.esm-475d8cc4.js","assets/capitalize-1790f93b.js","assets/translate-092d59f9.js","assets/BadgeStatusOrder-2a4a99b5.js","assets/react-paginate-dac8dd77.js","assets/index-afbcf810.js","assets/index-6654b9c9.js","assets/index-3f054690.css","assets/react-tooltip.min-e79f5625.js","assets/react-tooltip-a01a62b5.css","assets/_upload-6afe1282.css"])),pe=f.lazy(()=>V(()=>import("./ModalViewUser-49d3f6b0.js"),["assets/ModalViewUser-49d3f6b0.js","assets/index-3ba1a706.js","assets/index-57a2b61b.css","assets/index.esm-38543386.js","assets/getMaximiumRol-a7666242.js","assets/capitalize-1790f93b.js","assets/translate-092d59f9.js"])),Te=r=>{const{orders:s,isFetching:t,heading:c=ue(),setOrders:i,refetch:d,showPagination:m,showSearch:w,buttons:b,showSelects:k,fetchOrders:y,navigateOnChageDateSelect:v,itemsPerPage:C}=r,{formatMessage:l}=te(),[D,u]=f.useState(!1),O=A(o=>o.setModal),F=A(o=>o.closeModal);async function g(o){function T(a){i(s.map(I=>I.idorder===a.idorder?{...a}:I)),F()}try{x();const a=await N.paymentMethodService.getAll();O({title:l({id:"orders.edit.title"}),size:"lg",children:e.jsx(f.Suspense,{fallback:e.jsx(e.Fragment,{}),children:e.jsx(xe,{paymentMethods:a.data,order:o,onSuccess:T})})})}catch(a){console.log(a)}finally{p()}}function z(o){O({title:l({id:"orders.view.order.user"},{idorder:o.idorder}),children:e.jsx(f.Suspense,{fallback:e.jsx(e.Fragment,{}),children:e.jsx(pe,{user:o.user})}),size:"md"})}const U=async o=>{if((await h.fire({title:"Confirm to submit",text:"Are you sure to do this.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes",cancelButtonText:"No",reverseButtons:!0})).isConfirmed)try{x(),await N.ordersService.updateOrder(o.idorder,{status:"cancelled"}),i(s.map(a=>({...a,status:a.idorder===o.idorder?"cancelled":a.status}))),h.fire(l({id:"orders.cancelled.success"}),"","success")}catch(a){console.log(a),h.fire(l({id:"orders.cancelled.error"}),"","error")}finally{p()}},Y=async o=>{if((await h.fire({title:"Confirm to submit",text:"Are you sure to do this.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes",cancelButtonText:"No",reverseButtons:!0})).isConfirmed)try{x(),await N.ordersService.updateOrder(o.idorder,{status:"completed"}),i(s.map(a=>({...a,status:a.idorder===o.idorder?"completed":a.status}))),h.fire(l({id:"orders.completed.success"}),"","success")}catch(a){console.log(a),h.fire(l({id:"orders.completed.error"}),"","error")}finally{p()}};return e.jsx(se,{itemsPerPage:C||50,placeholder:e.jsx(oe,{}),buttons:e.jsx(he,{orders:s,setOrders:i,buttons:b,refetch:d,setIsLoadingTable:u,showSelects:k,fetchOrders:y,navigateOnChageDateSelect:v}),data:fe({orders:s,onClickUpdateOrder:g,onClickViewUser:z,onCancelOrder:U,onCompleteOrder:Y}),loading:t||D,heading:c,showPagination:m,showSearch:w,showResponsive:!1})};export{Te as T};
