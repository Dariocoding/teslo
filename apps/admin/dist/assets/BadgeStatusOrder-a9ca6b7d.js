import{j as r,c as l}from"./index-5d060a31.js";import{t}from"./translate-df1875a3.js";import{c as d}from"./capitalize-1790f93b.js";const c=()=>({cancelled:t("orders.status.cancelled"),completed:t("orders.status.completed"),pending:t("orders.status.pending"),paid:t("orders.status.paid")}),m=e=>{const{status:s,className:a="px-4",full:n=!0}=e;return r.jsx("span",{className:l("btn btn-xs cursor-default btn-pill select-none print:shadow-none",s==="cancelled"&&"btn-danger",s==="completed"&&"btn-success",s==="pending"&&"btn-warning",s==="paid"&&"btn-info",n&&"md:w-full w-max max-w-[110px]",a),children:c()[s]||d(s)})};export{m as B,c as l};