import{y as h,j as r,v as i,R as o,L as x}from"./index-5d060a31.js";import{H as b}from"./index-dddff9b7.js";import{b as j}from"./index.esm-5c58c595.js";import{L as f,F as u}from"./LoadedSetBill-2d1e2766.js";import{u as v}from"./useFetchProviders-fa84d98e.js";import{u as g}from"./useFetchBill-823a2e24.js";import{t as e}from"./translate-df1875a3.js";import"./index-bb9c84f2.js";import"./emotion-is-prop-valid.esm-9ab032ed.js";import"./index-7167fa41.js";import"./EnterpriseInfo-fa131e93.js";import"./formik.esm-d4024a5f.js";import"./slicedToArray-efe1abbd.js";import"./unsupportedIterableToArray-cf7d0cbd.js";import"./getPrototypeOf-b9d135b5.js";import"./setPrototypeOf-6cb8dd5e.js";import"./emotion-unitless.esm-475d8cc4.js";import"./react-tooltip.min-8e0ae1f0.js";import"./label-4820e3e3.js";import"./index-830e2dd2.js";import"./index-4ed1c163.js";import"./react-paginate-3ebe4213.js";import"./useMedia-235a01df.js";import"./index-984e7e33.js";import"./index-fe6bc13a.js";import"./index-4c77f7f5.js";import"./index.esm-8c897c47.js";import"./motion-489fcba6.js";/* empty css                */import"./TablePlaceholder-02f29929.js";import"./index-6f0a55a5.js";import"./useFetchProducts-cb82c9eb.js";import"./useQueryState-744f060d.js";import"./useFetchCategories-8cb0bd86.js";import"./useFetchBrands-30ccf14b.js";import"./capitalize-1790f93b.js";import"./index-a6ad04c6.js";import"./index.esm-27ddb6fd.js";import"./index-844affc0.js";import"./sweetalert2.all-8c6828e1.js";const ar=B=>{const{id:l}=h(),{data:s,isFetching:m,refetch:a,error:p}=v(),{data:t,isFetching:d,refetch:n,error:c}=g(l);return r.jsx(b,{to:i.bills.path,breadcrumbs:[{to:i.dashboard.path,label:e("dashboard.title")},{to:i.bills.path,label:e("bills.title")},{label:e("bills.edit.title")}],title:e("bills.edit.title"),icon:r.jsx(j,{}),children:r.jsxs(f,{providers:s,isLoadingProviders:m||d,refetch:()=>{a(),n()},error:p||c,children:[r.jsx(o,{isTrue:!t||!Object.keys(t).length,children:r.jsxs("div",{className:"tile max-w-[900px] mx-auto",children:[r.jsxs("div",{className:"text-center",children:[r.jsx("div",{children:r.jsx("img",{src:"/img/others/error.png",alt:"Error message",className:"w-28 mx-auto"})}),r.jsxs("div",{className:"mt-4",children:[r.jsx("h1",{className:"text-2xl font-semibold",children:"Bill not found"}),r.jsx("p",{children:"Maybe this bill was deleted or doesn't exist or you don't have permissions to see it"})]})]}),r.jsx("div",{className:"flex items-center justify-center",children:r.jsx(x,{to:i.bills.path,className:"btn btn-sm btn-primary mt-4",children:"Go back"})})]})}),r.jsx(o,{isTrue:t&&Object.keys(t).length,children:r.jsx(u,{bill:t,providers:s})})]})})};export{ar as default};