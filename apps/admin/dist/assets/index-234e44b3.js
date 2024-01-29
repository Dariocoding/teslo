import{q as L,r as d,P as F,j as s,A as _,e as S,L as y,v as c,l as V,m as B,n as A,h as H,R as n,C as O,D as U,s as $,y as z,g as Y,b as q,N as Q,p as J,E as G,f as K,_ as E}from"./index-5d060a31.js";import{H as W}from"./index-dddff9b7.js";import{u as X}from"./useFetchProduct-5abc2093.js";import{t}from"./translate-df1875a3.js";import{L as Z,M as ss}from"./Lightbox-57c96d51.js";import{I as es}from"./index.esm-f872f87b.js";import{u as ts}from"./useBarCodeProduct-558d969e.js";import{T as as}from"./index-6f0a55a5.js";import{R as ls}from"./index-7167fa41.js";import"./index-bb9c84f2.js";import"./emotion-is-prop-valid.esm-9ab032ed.js";import"./useQueryState-744f060d.js";import"./ConfirmModal-61bf492c.js";import"./JsBarcode-3b6cc033.js";import"./react-tooltip.min-8e0ae1f0.js";const rs=h=>{var p,u,f,i,x,b,N,P,r,v,I,R;const{product:e,onDeleteProduct:k,onOpenQuickModal:C}=h,{formatMessage:a}=L(),[m,l]=d.useState(null),D=(p=e.images)!=null&&p.length?F+"/product/"+e.images[0]:"/img/others/box.png",w=o=>{const T=o.target;T.tagName==="IMG"&&l(T.src)},{srcJsBarCode:M,copyImageJsBarCode:j,copied:g}=ts(e);return s.jsxs("div",{className:"grid lg:grid-cols-12 lg:gap-8 gap-4",children:[s.jsx("div",{className:"lg:col-span-4",children:s.jsxs("div",{className:"tile",children:[s.jsx("div",{className:"flex items-center justify-center mb-4",children:s.jsx("img",{src:D,className:"w-36",alt:""})}),s.jsx("h6",{className:"text-center mb-1.5",children:e.title}),s.jsx(_,{validRoles:[S.ValidRoles.ADMIN,S.ValidRoles.SUPERVISOR,S.ValidRoles.SUPER_USER],children:s.jsxs("div",{className:"flex flex-col justify-end items-end h-full",children:[s.jsxs(y,{to:c.editProduct.fnPath(e.id),type:"button",className:"mx-auto w-full btn btn-primary btn-sm gap-2",children:[s.jsx(V,{className:"ml-2"})," ",t("products.actions.edit")]}),s.jsxs("button",{type:"button",className:"mx-auto w-full btn bg-orange-500 hover:bg-orange-600 text-white btn-sm gap-2",onClick:C,children:[s.jsx(es,{className:"ml-2 text-lg"})," ",t("products.actions.quickEdit")]}),s.jsxs("button",{type:"button",className:"mx-auto w-full btn btn-danger btn-sm gap-2",onClick:k,children:[s.jsx(B,{className:"ml-2 text-lg"})," ",t("products.actions.delete")]})]})})]})}),s.jsxs("div",{className:"tile lg:col-span-8",children:[s.jsx("h4",{className:"mb-6",children:e.title}),s.jsxs("div",{className:"text-sm space-y-3",children:[s.jsxs("p",{children:[s.jsx("span",{className:"font-bold",children:"ID:"})," ",e.id]}),s.jsxs("p",{children:[s.jsxs("span",{className:"font-bold",children:[t("products.label.dateCreated"),":"]})," ",A(e.dateCreated).format("DD/MM/YYYY HH:mm:ss")]}),s.jsxs("p",{children:[s.jsx("span",{className:"font-bold",children:"Slug:"})," ",e.slug]}),s.jsxs("p",{children:[s.jsx("span",{className:"font-bold",children:"Price:"})," ",H.format(e.price)]}),s.jsxs("p",{children:[s.jsx("span",{className:"font-bold",children:"Stock:"})," ",e.stock]}),s.jsxs("p",{children:[s.jsxs("span",{className:"font-bold",children:[t("products.label.sizes"),":"]})," ",(u=e.sizes)==null?void 0:u.join(", ")]}),s.jsx(n,{isTrue:e.status,children:s.jsx("p",{children:e.status})}),s.jsx(n,{isTrue:(f=e.categories)==null?void 0:f.length,children:s.jsxs("span",{className:"flex items-center gap-x-1",children:[s.jsxs("span",{className:"font-bold",children:[t("products.label.categories"),":"]})," ",s.jsx("ul",{className:"flex items-center gap-1 flex-wrap",children:(x=(i=e.categories)==null?void 0:i.map)==null?void 0:x.call(i,o=>s.jsx("li",{children:s.jsx(y,{to:c.viewCategory.fnPath(o.idcategory),className:"link-table",children:o.title})},o.idcategory))})]})}),s.jsx(n,{isTrue:e.brand,children:s.jsxs("span",{className:"flex items-center gap-x-1",children:[s.jsxs("span",{className:"font-bold",children:[t("products.label.brand"),":"]})," ",s.jsx("ul",{children:s.jsx("li",{children:s.jsx(y,{to:c.viewCategory.fnPath((b=e.brand)==null?void 0:b.idbrand),className:"link-table",children:(N=e.brand)==null?void 0:N.title})})})]})}),s.jsx(n,{isTrue:(P=e.providers)==null?void 0:P.length,children:s.jsxs("span",{className:"flex items-center gap-x-1",children:[s.jsxs("span",{className:"font-bold",children:[t("products.label.providers"),":"]})," ",s.jsx("ul",{className:"flex items-center gap-1 flex-wrap",children:(v=(r=e.providers)==null?void 0:r.map)==null?void 0:v.call(r,o=>s.jsx("li",{children:s.jsx(y,{to:c.viewProvider.fnPath(o.idprovider),className:"link-table",children:o.name})},o.idprovider))})]})}),s.jsx(n,{isTrue:e.description,children:s.jsxs("p",{children:[s.jsxs("span",{className:"font-bold block w-full text-center mb-2",children:[t("products.label.description"),":"]})," ",e.description]})}),s.jsxs(n,{isTrue:(I=e.images)==null?void 0:I.length,children:[s.jsx("h5",{className:"text-center mb-2",children:t("products.label.images")}),s.jsx("div",{className:"flex flex-wrap",onClick:w,children:(R=e.images)==null?void 0:R.map(os)})]})]}),s.jsxs("div",{className:"flex items-center flex-col justify-start",children:[s.jsx("h6",{className:"text-lg font-semibold",children:t("products.label.barCode")}),s.jsx("img",{src:M,alt:`Product: ${e.title} Code bar`}),s.jsx("div",{children:s.jsx(as,{className:"btn btn-info btn-sm cursor-pointer",onClick:j,message:g?`${a({id:"app.copied"})} 🙌`:a({id:"app.clickToCopy"}),children:s.jsxs("span",{className:"flex items-center gap-2",children:[a({id:"app.copy"})," ",s.jsx(O,{})]})})})]})]}),s.jsx(n,{isTrue:m,children:s.jsx(Z,{medium:m,large:m,small:m,onClose:()=>l(null),alt:e.title})})]})},os=(h,e)=>s.jsx("span",{className:"m-2 cursor-pointer hover:scale-105 transition duration-300",children:s.jsx("img",{src:F+`/product/${h}`,alt:"",className:"w-56 mx-auto"})},e),cs=d.lazy(()=>U(()=>import("./index-b782c55b.js"),["assets/index-b782c55b.js","assets/index-5d060a31.js","assets/index-57a2b61b.css","assets/index-a6ad04c6.js","assets/formik.esm-d4024a5f.js","assets/index-830e2dd2.js","assets/label-4820e3e3.js","assets/translate-df1875a3.js","assets/index.esm-27ddb6fd.js"])),ks=h=>{const{setModal:e,closeModal:k}=$(),C=z(),{formatMessage:a}=L(),m=Y(),{data:l,isFetching:D,error:w,setData:M}=X(C.id),[j,g]=d.useState(!1),[p,u]=d.useState(null),[f,i]=d.useState(null);if(D)return s.jsx(q,{loading:!0});if(!Object.keys(l).length&&w)return s.jsx(Q,{to:J.products.path});const x=()=>{g(!1),u(null)},b=()=>{g(!0),u(l)},N=async()=>{try{i(!0),await K.productsService.deleteProduct(p.id),m(c.products.path),x(),E.success(a({id:"producs.deleted.success"}))}catch(r){console.log(r),E.error(r.response.data.message||a({id:"products.deleted.error"}))}finally{i(!1)}},P=()=>{function r(v){M(v),k()}e({title:a({id:"products.quickEdit.title"}),children:s.jsx(d.Suspense,{children:s.jsx(cs,{product:l,onSuccess:r})}),size:"md"})};return s.jsxs(W,{breadcrumbs:[{label:t("dashboard.title"),to:c.home.path},{label:t("products.title"),to:c.products.path},{label:l.title||a({id:"products.single"})}],icon:s.jsx(G,{}),title:l.title||a({id:"products.single"}),to:c.products.path,children:[s.jsx(rs,{product:l,onDeleteProduct:b,onOpenQuickModal:P}),s.jsx(ls,{isTrue:j,children:s.jsx(d.Suspense,{fallback:s.jsx(s.Fragment,{}),children:s.jsx(ss,{onAcceptDeleteProduct:N,onCloseModalDelete:x,showModalDeleteProduct:j,product:p,isLoading:f})})})]})};export{ks as default};