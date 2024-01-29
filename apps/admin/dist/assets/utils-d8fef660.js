import{Z as s,f as i,n as c,h}from"./index-5d060a31.js";const w={onClickPdf:async()=>{const t=s.loading("Exporting Products, Please wait...");try{const a=await i.productsService.getAllProducts(),o={name:"Products - "+c().format("DD/MM/YYYY"),headers:["Title","Custom Cod.","Cod.","Price","Stock","Brand","Categories","Status"],rows:a.data.map(e=>[e.title,e.customCode||"",e.code.toString(),e.price?h.format(e.price):"0",e.stock?e.stock.toString():0 .toString(),e.brand.title,e.categories.map(r=>r.title).join(", "),e.status||""])};await d(o,"Products",t)}catch(a){console.log(a),s.error(a.message)}finally{s.dismiss(t)}},onClickCsv:async t=>{const a=s.loading("Exporting Products, Please wait...");try{const o=await i.productsService.getAllProducts(),e={name:"Products - "+c().format("DD-MM-YYYY"),columns:[{header:"Title"},{header:"custom Cod."},{header:"Cod."},{header:"Price"},{header:"Stock"},{header:"Brand"},{header:"Categories"},{header:"Providers"},{header:"Status"},{header:"Description"}],data:o.data.map(r=>[r.title,r.customCode||"empty",r.code.toString(),r.price?h.format(r.price):"0",r.stock?r.stock.toString():0 .toString(),r.brand.title||"",r.categories.map(n=>n.title).join(", "),r.providers.map(n=>n.name).join(", "),r.status||"",r.description||"",t?r.gender:null,t?r.sizes.map(n=>n).join(", "):null].filter(n=>n!==null))};t&&(e.columns.push({header:"Gender"}),e.columns.push({header:"Sizes"})),await m(e,"Products",a)}catch(o){console.log(o),s.error(o.message)}finally{s.dismiss(a)}},onClickExcel:async t=>{const a=s.loading("Exporting Products, Please wait...");try{const o=await i.productsService.getAllProducts(),e={name:"Products - "+c().format("DD-MM-YYYY"),columns:[{header:"Title"},{header:"custom Cod."},{header:"Cod."},{header:"Price"},{header:"Stock"},{header:"Brand"},{header:"Categories"},{header:"Providers"},{header:"Status"},{header:"Description"}],data:o.data.map(r=>[r.title,r.customCode||"empty",r.code.toString(),r.price?h.format(r.price):"0",r.stock?r.stock.toString():0 .toString(),r.brand.title||"",r.categories.map(n=>n.title).join(", "),r.providers.map(n=>n.name).join(", "),r.status||"",r.description||"",t?r.gender:null,t?r.sizes.map(n=>n).join(", "):null].filter(n=>n!==null))};t&&(e.columns.push({header:"Gender"}),e.columns.push({header:"Sizes"})),await l(e,"Products",a)}catch(o){console.log(o),s.error(o.message)}finally{s.dismiss(a)}},onClickJson:async()=>{const t=await i.productsService.getAllProducts();g(t,"Products")}},P={onClickPdf:async()=>{const t=s.loading("Exporting Categories, Please wait...");try{const a=await i.categoriesService.getCategories(),o={name:"Categories",headers:["Title","Slug"],rows:a.data.map(e=>[e.title,e.slug])};await d(o,"Categories",t)}catch(a){console.log(a),s.error(a.message)}finally{s.dismiss(t)}},onClickCsv:async()=>{const t=s.loading("Exporting Categories, Please wait...");try{const a=await i.categoriesService.getCategories(),o={name:"Categories - "+c().format("DD-MM-YYYY"),columns:[{header:"Title"},{header:"Slug"}],data:a.data.map(e=>[e.title,e.slug])};await m(o,"Categories",t)}catch(a){console.log(a),s.error(a.message)}finally{s.dismiss(t)}},onClickExcel:async()=>{const t=s.loading("Exporting Categories, Please wait...");try{const a=await i.categoriesService.getCategories(),o={name:"Categories - "+c().format("DD-MM-YYYY"),columns:[{header:"Title"},{header:"Slug"}],data:a.data.map(e=>[e.title,e.slug])};await l(o,"Categories",t)}catch(a){console.log(a),s.error(a.message)}finally{s.dismiss(t)}},onClickJson:async()=>{const t=await i.categoriesService.getCategories();g(t,"Categories")}},f={onClickPdf:async()=>{const t=s.loading("Exporting Brands, Please wait...");try{const a=await i.brandsService.getAll(),o={name:"Brands",headers:["Title","Slug"],rows:a.data.map(e=>[e.title,e.slug])};await d(o,"Brands",t)}catch(a){console.log(a),s.error(a.message)}finally{s.dismiss(t)}},onClickCsv:async()=>{const t=s.loading("Exporting Brands, Please wait...");try{const a=await i.brandsService.getAll(),o={name:"Brands - "+c().format("DD-MM-YYYY"),columns:[{header:"Title"},{header:"Slug"}],data:a.data.map(e=>[e.title,e.slug])};await m(o,"Brands",t)}catch(a){console.log(a),s.error(a.message)}finally{s.dismiss(t)}},onClickExcel:async()=>{const t=s.loading("Exporting Brands, Please wait...");try{const a=await i.brandsService.getAll(),o={name:"Brands - "+c().format("DD-MM-YYYY"),columns:[{header:"Title"},{header:"Slug"}],data:a.data.map(e=>[e.title,e.slug])};await l(o,"Brands",t)}catch(a){console.log(a),s.error(a.message)}finally{s.dismiss(t)}},onClickJson:async()=>{const t=await i.brandsService.getAll();g(t,"Brands")}},u={onClickPdf:async()=>{const t=s.loading("Exporting Brands, Please wait...");try{const a=await i.providersService.getAll(),o={name:"Providers",headers:["Name","Phone 1","Phone 2","Email","Address"],rows:a.data.map(e=>[e.name,e.phone1,e.phone2,e.email,"Address"])};await d(o,"Providers",t)}catch(a){console.log(a),s.error(a.message)}finally{s.dismiss(t)}},onClickCsv:async()=>{const t=s.loading("Exporting Providers, Please wait...");try{const a=await i.providersService.getAll(),o={name:"Providers - "+c().format("DD-MM-YYYY"),columns:[{header:"Name"},{header:"Phone 1"},{header:"Phone 2"},{header:"Email"},{header:"Address"}],data:a.data.map(e=>[e.name,e.phone1,e.phone2,e.email,"Address"])};await m(o,"Providers",t)}catch(a){console.log(a),s.error(a.message)}finally{s.dismiss(t)}},onClickExcel:async()=>{const t=s.loading("Exporting Providers, Please wait...");try{const a=await i.providersService.getAll(),o={name:"Providers - "+c().format("DD-MM-YYYY"),columns:[{header:"Name"},{header:"Phone 1"},{header:"Phone 2"},{header:"Email"},{header:"Address"}],data:a.data.map(e=>[e.name,e.phone1,e.phone2,e.email,"Address"])};await l(o,"Providers",t)}catch(a){console.log(a),s.error(a.message)}finally{s.dismiss(t)}},onClickJson:async()=>{const t=await i.providersService.getAll();g(t,"Providers")}},v={onClickPdf:async()=>{const t=s.loading("Exporting Payment Methods, Please wait...");try{const a=await i.paymentMethodService.getAll();a.data[0][""];const o={name:"Payment Methods",headers:["Title","DNI","Email","Owner","Phone","Email"],rows:a.data.map(e=>[e.title,e.dni,e.email,e.owner,e.phone])};await d(o,"Payment Methods",t)}catch(a){console.log(a),s.error(a.message)}finally{s.dismiss(t)}},onClickCsv:async()=>{const t=s.loading("Exporting Payment Methods, Please wait...");try{const{data:a}=await i.paymentMethodService.getAll(),o={name:"Payment Methods - "+c().format("DD-MM-YYYY"),columns:[{header:"Title"},{header:"DNI"},{header:"Owner"},{header:"Phone"},{header:"Email"}],data:a.map(e=>[e.title,e.dni,e.email,e.owner,e.phone])};await m(o,"Payment Methods",t)}catch(a){console.log(a),s.error(a.message)}finally{s.dismiss(t)}},onClickExcel:async()=>{const t=s.loading("Exporting Payment Methods, Please wait...");try{const{data:a}=await i.paymentMethodService.getAll(),o={name:"Payment Methods - "+c().format("DD-MM-YYYY"),columns:[{header:"Title"},{header:"DNI"},{header:"Owner"},{header:"Phone"},{header:"Email"}],data:a.map(e=>[e.title,e.dni,e.email,e.owner,e.phone])};await l(o,"Payment Methods",t)}catch(a){console.log(a),s.error(a.message)}finally{s.dismiss(t)}},onClickJson:async()=>{const t=await i.paymentMethodService.getAll();g(t,"Payment Methods")}},d=async(t,a,o)=>{try{const e=await i.filesService.pdf(t,{responseType:"arraybuffer"}),r=new Blob([e.data],{type:"application/pdf"}),n=document.createElement("a");document.body.appendChild(n),n.href=window.URL.createObjectURL(r),n.download=`${a}.pdf`,n.click(),setTimeout(()=>{window.URL.revokeObjectURL(n.href),document.body.removeChild(n)},0),s.success("Success"),o&&s.dismiss(o)}catch(e){console.log(e),s.error(e.message)}finally{s.dismiss(o)}},l=async(t,a,o)=>{try{const e=await i.filesService.excel(t,{responseType:"blob"}),r=document.createElement("a");document.body.appendChild(r);const n=window.URL.createObjectURL(new Blob([e.data]));r.href=n,r.setAttribute("download",`${a}.xlsx`),r.click(),setTimeout(()=>{window.URL.revokeObjectURL(n),document.body.removeChild(r)},0),s.success("Success"),o&&s.dismiss(o)}catch(e){console.log(e),s.error(e.message)}finally{s.dismiss(o)}},m=async(t,a,o)=>{try{const e=await i.filesService.excel(t,{responseType:"blob"},{csv:!0}),r=window.URL.createObjectURL(new Blob([e.data],{})),n=document.createElement("a");document.body.appendChild(n),n.href=r,n.setAttribute("download",`${a}.csv`),n.click(),setTimeout(()=>{window.URL.revokeObjectURL(n.href),document.body.removeChild(n)},0),s.success("Success"),o&&s.dismiss(o)}catch(e){console.log(e),s.error(e.message)}finally{s.dismiss(o)}},g=(t,a)=>{const o=`data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(t))}`,e=document.createElement("a");document.body.appendChild(e),e.href=o,e.download=`${a}.json`,e.click(),e.remove(),setTimeout(()=>{window.URL.revokeObjectURL(e.href)},0)};export{f as actionsBrands,P as actionsCategories,v as actionsPaymentMethods,w as actionsProducts,u as actionsProviders,g as baseExportJson,m as baseFetchCsv,l as baseFetchExcel,d as baseFetchPdf};