import{u as e}from"./useQueryState-40058bbe.js";import{f as r}from"./index-3ba1a706.js";async function l(t){const{data:i}=await r.billsService.findBill(t.queryKey[1]);return i}function a(t){return e(["bill",t.toString()],l,{})}export{a as u};
