"use strict";(self.webpackChunkotus_js_basic_cost=self.webpackChunkotus_js_basic_cost||[]).push([[683],{683:(e,t,a)=>{a.r(t),a.d(t,{Statistics:()=>C,default:()=>S});var s=a(7294),n=a(5007),l=a(9198),i=a.n(l),c=a(3379),o=a.n(c),r=a(7795),d=a.n(r),u=a(569),m=a.n(u),h=a(3565),g=a.n(h),f=a(9216),j=a.n(f),v=a(4589),b=a.n(v),y=a(7617),p={};p.styleTagTransform=b(),p.setAttributes=g(),p.insert=m().bind(null,"head"),p.domAPI=d(),p.insertStyleElement=j(),o()(y.Z,p),y.Z&&y.Z.locals&&y.Z.locals;var _=a(5893);const x=s.lazy((()=>Promise.all([a.e(50),a.e(54)]).then(a.bind(a,9054)))),D=s.lazy((()=>a.e(484).then(a.bind(a,9484))));function N(e,t){let a=[];return function e(t,s){for(let n in t)"object"==typeof t[n]&&Object.values(t[n]).length>0&&(n===s?(console.log(t[n]),a.push({...t[n]})):e(t[n],s))}(e,t),console.log(a),a}const C=e=>{const t=(0,n.v9)((e=>e.settings.categories)),[a,l]=(0,s.useState)(""),[c,o]=(0,s.useState)(null),[r,d]=(0,s.useState)(null),u=(m=a?{data:t[a].subCategories,fromDate:c,toDate:r}:{data:t,fromDate:c,toDate:r},Object.entries(m.data).map((e=>({id:e[1].id,name:e[1].name,count:N(e[1],"dates").map((e=>(!m.fromDate||Number(Object.keys(e)[0])>=m.fromDate.getTime())&&(!m.toDate||Number(Object.keys(e)[0])<=m.toDate.getTime())?Object.values(e)[0].total:0)).reduce(((e,t)=>e+t),0)}))));var m;return(0,s.useEffect)((()=>{const e=new URLSearchParams(location.search).get("category");let a;"string"==typeof e&&(a=((e,t)=>{const a=Object.values(t).filter((t=>t.name.trim().toLowerCase()===e.trim().trim().toLowerCase()));return a.length?a[0].id:null})(e,t),console.log("id ",a),a&&l(a))})),(0,_.jsxs)("div",{className:"statistics",children:[(0,_.jsxs)("div",{className:"statistics__filter filter",children:[(0,_.jsx)("div",{className:"filter__category",children:(0,_.jsxs)("select",{value:a,className:"input",name:"category-select",id:"category-selectr",onChange:e=>{l(e.target.value);const t=new URL(location.toString());e.target.value?t.searchParams.set("category",document.getElementById(`opt-${e.target.value}`)?.innerText):t.searchParams.delete("category"),history.pushState({},"",t)},children:[(0,_.jsx)("option",{value:"",children:"All Categories"},""),Object.values(t).map((e=>(0,_.jsx)("option",{value:e.id,id:`opt-${e.id}`,children:e.name},e.id)))]})}),(0,_.jsx)("div",{className:"filter__date",children:(0,_.jsx)(i(),{className:"input",dateFormat:"dd-MM-yyyy",selected:c,onChange:e=>{const[t,a]=e;o(t),d(a)},startDate:c,endDate:r,selectsRange:!0,placeholderText:"Filter by Date"})})]}),(0,_.jsxs)("div",{className:"statistics__info info",children:[(0,_.jsx)("div",{className:"info__graphics",children:u.length?(0,_.jsx)(x,{data:u}):""}),(0,_.jsx)("div",{className:"info__table",children:u.length?(0,_.jsx)(D,{data:u}):""})]})]})},S=C},7617:(e,t,a)=>{a.d(t,{Z:()=>c});var s=a(8081),n=a.n(s),l=a(3645),i=a.n(l)()(n());i.push([e.id,"",""]);const c=i}}]);