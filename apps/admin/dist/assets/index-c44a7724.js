import{j as e,L as F,p as T,k as V,A as _,e as l,l as A,m as I,r as t,D as M,q as U,s as S,t as L,n as w,v as x,R as H,f as O,_ as B,H as Y}from"./index-3ba1a706.js";import{H as z}from"./index-a1d8defb.js";import{T as q}from"./TablePlaceholder-35369399.js";import{D as $}from"./DataTable-eb9c6d6c.js";import{a as G}from"./index.esm-b422dff9.js";import{u as J}from"./useFetchBrands-ff01215b.js";import{t as r}from"./translate-092d59f9.js";import"./index-6654b9c9.js";import"./emotion-is-prop-valid.esm-9ab032ed.js";import"./index-f98b8c3b.js";import"./formik.esm-082975a3.js";import"./react-paginate-dac8dd77.js";import"./useMedia-ab89cd6a.js";import"./useQueryState-40058bbe.js";const K=b=>{const{brand:a,onDeleteBrand:o,onUpdateBrand:i}=b,d=()=>i(a),c=()=>o(a);return e.jsxs("div",{children:[e.jsx(F,{to:T.viewBrand.fnPath(a.idbrand),className:"btn btn-success btn-xs",children:e.jsx(V,{})}),e.jsxs(_,{validRoles:[l.ValidRoles.ADMIN,l.ValidRoles.SUPER_USER,l.ValidRoles.SUPERVISOR],children:[e.jsx("button",{className:"btn btn-primary btn-xs",onClick:d,children:e.jsx(A,{})}),e.jsx("button",{className:"btn btn-danger btn-xs",onClick:c,children:e.jsx(I,{})})]})]})},Q=()=>[{title:r("brands.label.nameFormatted"),field:"nameFormatted"},{title:r("brands.label.dateCreated"),field:"dateFormatted",center:!0},{title:r("brands.label.actions"),field:"actions",center:!0}],g=t.lazy(()=>M(()=>import("./FormBrand-27c51771.js"),["assets/FormBrand-27c51771.js","assets/index-3ba1a706.js","assets/index-57a2b61b.css","assets/index-ef1fda9f.js","assets/formik.esm-082975a3.js","assets/index-e73b124f.js","assets/label-7eeebea1.js","assets/translate-092d59f9.js","assets/useTimeOutMessage-9ac15e50.js","assets/index.esm-8e4abcfc.js"])),W=t.lazy(()=>M(()=>import("./ModalDeleteBrand-598acc85.js"),["assets/ModalDeleteBrand-598acc85.js","assets/index-3ba1a706.js","assets/index-57a2b61b.css","assets/ConfirmModal-fa012840.js","assets/translate-092d59f9.js"])),X=b=>{const{formatMessage:a}=U(),[o,i]=t.useState(!1),[d,c]=t.useState(null),[v,p]=t.useState(null),{data:m,setData:u,isFetching:P,refetch:k}=J(),j=S(s=>s.setModal),f=S(s=>s.closeModal),E=s=>{const n=R=>{u(m.map(h=>h.idbrand===R.idbrand?{...h,...R}:h)),f()};j({title:a({id:"brands.edit.title"}),children:e.jsx(t.Suspense,{fallback:e.jsx(e.Fragment,{}),children:e.jsx(g,{brand:s,onSuccess:n})}),size:"md"})},C=()=>{const s=n=>{u([n,...m]),f()};j({title:a({id:"brands.add.title"}),children:e.jsx(t.Suspense,{fallback:e.jsx(e.Fragment,{}),children:e.jsx(g,{onSuccess:s})})})},D=()=>{i(!1),c(null)},y=s=>{i(!0),c(s)},N=async()=>{try{p(!0),await O.brandsService.delete(d.idbrand),u(m.filter(n=>n.idbrand!==d.idbrand)),D();const s=a({id:"brands.deleted.success"});B.success(s)}catch(s){console.log(s);const n=a({id:"brands.deleted.error"});B.error(s.response.data.message||n)}finally{p(!1)}};return e.jsxs(t.Fragment,{children:[e.jsx($,{placeholder:e.jsx(q,{}),buttons:e.jsxs("div",{className:"flex items-center justify-start",children:[e.jsx(_,{validRoles:[l.ValidRoles.ADMIN,l.ValidRoles.SUPER_USER,l.ValidRoles.SUPERVISOR],children:e.jsx("button",{className:"btn btn-primary btn-xs",onClick:C,children:e.jsx(L,{})})}),e.jsx("button",{className:"btn btn-outline-alternative btn-xs",onClick:()=>k(),children:e.jsx(G,{})})]}),data:m.map(s=>({...s,dateFormatted:w(s.dateCreated).format("DD/MM/YYYY HH:mm:ss"),actions:e.jsx(K,{brand:s,onDeleteBrand:y,onUpdateBrand:E}),nameFormatted:e.jsx(F,{className:"link-table",to:x.viewBrand.fnPath(s.idbrand),children:s.title})})),heading:Q(),loading:P}),e.jsx(H,{isTrue:o,children:e.jsx(t.Suspense,{fallback:e.jsx(e.Fragment,{}),children:e.jsx(W,{onAcceptDelete:N,onClose:D,show:o,brand:d,isLoading:v})})})]})},ue=b=>e.jsx(z,{to:x.dashboard.path,title:r("brands.title"),icon:e.jsx(Y,{}),breadcrumbs:[{label:r("dashboard.title"),to:x.home.path},{label:r("brands.title")}],children:e.jsx("div",{className:"tile",children:e.jsx(X,{})})});export{ue as default};
