import{j as s,c as t,R as F}from"./index-5d060a31.js";import{u as I,g as a}from"./formik.esm-d4024a5f.js";import{L}from"./label-4820e3e3.js";import"./react-paginate-3ebe4213.js";import"./index-fe6bc13a.js";import"./react-tooltip.min-8e0ae1f0.js";/* empty css                */const A=n=>{const{label:m,className:i,name:r,classNameLabel:u,classNameInput:d,disabled:p,placeholder:h,required:x,showError:f,showSuccess:g,forceErrorMessage:l,rows:j=5,cols:N=5}=n,{errors:v,touched:b,handleBlur:E,handleChange:T,values:w}=I(),B=a(w,r),e=a(v,r),c=a(b,r),o=e&&c&&f||!!l,C=!e&&c&&g&&!o;return s.jsxs("div",{className:t("form-group",o?"form-group-error":null,C?"form-group-success":null,i),children:[s.jsx(L,{htmlFor:r,required:x,className:u,children:m}),s.jsx("textarea",{className:t("form-control",d),disabled:p,placeholder:h,name:r,id:r,onBlur:E,onChange:T,rows:j,cols:N,value:B}),s.jsx(F,{isTrue:o,children:s.jsx("p",{children:e||l})})]})};export{A as T};