if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const a=s=>l(s,r),t={module:{uri:r},exports:u,require:a};e[r]=Promise.all(i.map((s=>t[s]||a(s)))).then((s=>(n(...s),u)))}}define(["./workbox-b125aa89"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/_upload-6afe1282.css",revision:null},{url:"assets/ActionsProducts-166a1b21.js",revision:null},{url:"assets/ActionsTableOrder-e3e2ab6b.js",revision:null},{url:"assets/BadgeStatusOrder-a9ca6b7d.js",revision:null},{url:"assets/capitalize-1790f93b.js",revision:null},{url:"assets/ConfirmModal-61bf492c.js",revision:null},{url:"assets/data-menu-03d815b5.js",revision:null},{url:"assets/DataTable-880fcb59.js",revision:null},{url:"assets/DeveloperOptions-adbe2e36.js",revision:null},{url:"assets/DropdownItem-83d8cdee.js",revision:null},{url:"assets/emotion-is-prop-valid.esm-9ab032ed.js",revision:null},{url:"assets/emotion-unitless.esm-475d8cc4.js",revision:null},{url:"assets/en-bb0a6fb0.js",revision:null},{url:"assets/EnterpriseInfo-fa131e93.js",revision:null},{url:"assets/es-1b621c8b.js",revision:null},{url:"assets/ExportsBillOrders-795cc4bb.js",revision:null},{url:"assets/ForgottenPasswordForm-ba431284.js",revision:null},{url:"assets/FormBrand-64a8a298.js",revision:null},{url:"assets/FormCategory-b0de83b4.js",revision:null},{url:"assets/formik.esm-d4024a5f.js",revision:null},{url:"assets/FormProvider-d60ccd1d.js",revision:null},{url:"assets/FormUpdateOrder-4725b719.js",revision:null},{url:"assets/FormUser-ef302a8b.js",revision:null},{url:"assets/getMaximiumRol-ab834d09.js",revision:null},{url:"assets/getPrototypeOf-b9d135b5.js",revision:null},{url:"assets/hidden-36975b35.js",revision:null},{url:"assets/index-00fee96b.js",revision:null},{url:"assets/index-08f0451d.js",revision:null},{url:"assets/index-0d6c51a8.js",revision:null},{url:"assets/index-0f2a27c9.js",revision:null},{url:"assets/index-113529cc.js",revision:null},{url:"assets/index-214678a7.css",revision:null},{url:"assets/index-234e44b3.js",revision:null},{url:"assets/index-24c47334.js",revision:null},{url:"assets/index-2ef7dd6c.js",revision:null},{url:"assets/index-3f054690.css",revision:null},{url:"assets/index-425297a4.js",revision:null},{url:"assets/index-44be4ea3.js",revision:null},{url:"assets/index-4c77f7f5.js",revision:null},{url:"assets/index-4ed1c163.js",revision:null},{url:"assets/index-57a2b61b.css",revision:null},{url:"assets/index-5a4cfb67.js",revision:null},{url:"assets/index-5d060a31.js",revision:null},{url:"assets/index-65366b08.js",revision:null},{url:"assets/index-65c18334.js",revision:null},{url:"assets/index-67b29b82.js",revision:null},{url:"assets/index-687c7df4.js",revision:null},{url:"assets/index-691b975e.js",revision:null},{url:"assets/index-6f0a55a5.js",revision:null},{url:"assets/index-6fb24b86.js",revision:null},{url:"assets/index-6ff0af95.js",revision:null},{url:"assets/index-7167fa41.js",revision:null},{url:"assets/index-7295cd0e.js",revision:null},{url:"assets/index-743d1115.js",revision:null},{url:"assets/index-7588abf3.js",revision:null},{url:"assets/index-784419e1.js",revision:null},{url:"assets/index-799a004f.js",revision:null},{url:"assets/index-7ad9511d.js",revision:null},{url:"assets/index-7c317ef3.js",revision:null},{url:"assets/index-830e2dd2.js",revision:null},{url:"assets/index-844affc0.js",revision:null},{url:"assets/index-8b5eb0cf.js",revision:null},{url:"assets/index-984e7e33.js",revision:null},{url:"assets/index-9a530314.js",revision:null},{url:"assets/index-9e401d08.js",revision:null},{url:"assets/index-9f030d70.js",revision:null},{url:"assets/index-a6ad04c6.js",revision:null},{url:"assets/index-a6d234de.js",revision:null},{url:"assets/index-a6d682d1.js",revision:null},{url:"assets/index-a8b12287.js",revision:null},{url:"assets/index-b1f60f15.js",revision:null},{url:"assets/index-b5d70441.js",revision:null},{url:"assets/index-b6747acb.js",revision:null},{url:"assets/index-b782c55b.js",revision:null},{url:"assets/index-b90f8f3c.js",revision:null},{url:"assets/index-bb9c84f2.js",revision:null},{url:"assets/index-bcb4e024.css",revision:null},{url:"assets/index-c434ed8b.js",revision:null},{url:"assets/index-c905eff4.js",revision:null},{url:"assets/index-d41ef152.js",revision:null},{url:"assets/index-d9769582.js",revision:null},{url:"assets/index-da22cc52.js",revision:null},{url:"assets/index-dd0b478d.js",revision:null},{url:"assets/index-dddff9b7.js",revision:null},{url:"assets/index-e09a6f06.js",revision:null},{url:"assets/index-e1f0dc42.js",revision:null},{url:"assets/index-e8b7f1c0.js",revision:null},{url:"assets/index-e9f812c7.css",revision:null},{url:"assets/index-f80f8ff0.js",revision:null},{url:"assets/index-faa77686.js",revision:null},{url:"assets/index-fd4345f8.js",revision:null},{url:"assets/index-fe6bc13a.js",revision:null},{url:"assets/index.esm-17a756fd.js",revision:null},{url:"assets/index.esm-27ddb6fd.js",revision:null},{url:"assets/index.esm-45ecfba4.js",revision:null},{url:"assets/index.esm-52d18ec2.js",revision:null},{url:"assets/index.esm-5c58c595.js",revision:null},{url:"assets/index.esm-68a1f323.js",revision:null},{url:"assets/index.esm-8c897c47.js",revision:null},{url:"assets/index.esm-b3530202.js",revision:null},{url:"assets/index.esm-ca75a173.js",revision:null},{url:"assets/index.esm-e9c774ce.js",revision:null},{url:"assets/index.esm-f872f87b.js",revision:null},{url:"assets/index.esm-fddd0dd0.js",revision:null},{url:"assets/JsBarcode-3b6cc033.js",revision:null},{url:"assets/label-4820e3e3.js",revision:null},{url:"assets/Lightbox-57c96d51.js",revision:null},{url:"assets/LoadedSetBill-2d1e2766.js",revision:null},{url:"assets/ModalDeleteBrand-86d5d467.js",revision:null},{url:"assets/ModalDeleteCategory-9690d805.js",revision:null},{url:"assets/ModalDeletePaymentMethod-34f018f6.js",revision:null},{url:"assets/ModalDeleteProvider-3793f6a1.js",revision:null},{url:"assets/ModalDeleteUser-9ac860d3.js",revision:null},{url:"assets/ModalViewUser-0f8df677.js",revision:null},{url:"assets/motion-489fcba6.js",revision:null},{url:"assets/MyBarCode-21443929.js",revision:null},{url:"assets/PdfCode-cc5d6c6a.js",revision:null},{url:"assets/react-paginate-3ebe4213.js",revision:null},{url:"assets/react-tooltip-a01a62b5.css",revision:null},{url:"assets/react-tooltip.min-8e0ae1f0.js",revision:null},{url:"assets/setPrototypeOf-6cb8dd5e.js",revision:null},{url:"assets/slicedToArray-efe1abbd.js",revision:null},{url:"assets/styled-components.browser.esm-b73f4f45.js",revision:null},{url:"assets/sweetalert2.all-8c6828e1.js",revision:null},{url:"assets/switch-09b77e93.js",revision:null},{url:"assets/TablePlaceholder-02f29929.js",revision:null},{url:"assets/theme-consts-d6db9214.js",revision:null},{url:"assets/TileFormProduct-11ab0749.js",revision:null},{url:"assets/translate-df1875a3.js",revision:null},{url:"assets/unsupportedIterableToArray-cf7d0cbd.js",revision:null},{url:"assets/useBarCodeProduct-558d969e.js",revision:null},{url:"assets/useFetchBill-823a2e24.js",revision:null},{url:"assets/useFetchBrands-30ccf14b.js",revision:null},{url:"assets/useFetchCategories-8cb0bd86.js",revision:null},{url:"assets/useFetchPaymentMethods-bb78b578.js",revision:null},{url:"assets/useFetchProduct-5abc2093.js",revision:null},{url:"assets/useFetchProducts-cb82c9eb.js",revision:null},{url:"assets/useFetchProviders-fa84d98e.js",revision:null},{url:"assets/useFetchUsers-7496e69e.js",revision:null},{url:"assets/useFirstLoad-85bc81b4.js",revision:null},{url:"assets/useMedia-235a01df.js",revision:null},{url:"assets/useQueryState-744f060d.js",revision:null},{url:"assets/useTimeOutMessage-1f33819f.js",revision:null},{url:"assets/utils-d8fef660.js",revision:null},{url:"assets/VerticalMenuContent-2303fc87.css",revision:null},{url:"assets/VerticalMenuContent-c9212115.js",revision:null},{url:"assets/zIndex-e43e5c8e.js",revision:null},{url:"index.html",revision:"87adbbb0ac1675363fc8b77b00310a82"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"AppImages/android/android-launchericon-192-192.png",revision:"1f11929558cca6b682ffaacfe1953ecc"},{url:"AppImages/android/android-launchericon-512-512.png",revision:"a699d4c5c36b698ee8bf94549aa10059"},{url:"AppImages/ios/180.png",revision:"d844e3b0314799232a21619c0584710b"},{url:"AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-256.png",revision:"083fa8569d81cc9f016c9611a8417b6d"},{url:"manifest.webmanifest",revision:"e6cb656e739c7ade43151d1b5aaef867"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
