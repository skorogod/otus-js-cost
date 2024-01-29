"use strict";(self.webpackChunkotus_js_basic_cost=self.webpackChunkotus_js_basic_cost||[]).push([[98],{4098:(e,t,n)=>{n.r(t),n.d(t,{Statistics:()=>N,default:()=>k});var s=n(7294),a=n(5007),i=n(9198),l=n.n(i),o=n(3379),c=n.n(o),r=n(7795),d=n.n(r),p=n(569),u=n.n(p),f=n(3565),_=n.n(f),m=n(9216),h=n.n(m),x=n(4589),b=n.n(x),g=n(7617),j={};j.styleTagTransform=b(),j.setAttributes=_(),j.insert=u().bind(null,"head"),j.domAPI=d(),j.insertStyleElement=h(),c()(g.Z,j),g.Z&&g.Z.locals&&g.Z.locals;var v=n(5893);const y=s.lazy((()=>Promise.all([n.e(50),n.e(54)]).then(n.bind(n,9054)))),w=s.lazy((()=>n.e(484).then(n.bind(n,9484))));function D(e,t){let n=[];return function e(t,s){for(let a in t)"object"==typeof t[a]&&Object.values(t[a]).length>0&&(a===s?(console.log(t[a]),n.push({...t[a]})):e(t[a],s))}(e,t),console.log(n),n}const N=e=>{const t=(0,a.v9)((e=>e.settings.categories)),[n,i]=(0,s.useState)(""),[o,c]=(0,s.useState)(null),[r,d]=(0,s.useState)(null),p=(u=n?{data:t[n].subCategories,fromDate:o,toDate:r}:{data:t,fromDate:o,toDate:r},Object.entries(u.data).map((e=>({id:e[1].id,name:e[1].name,count:D(e[1],"dates").map((e=>(!u.fromDate||Number(Object.keys(e)[0])>=u.fromDate.getTime())&&(!u.toDate||Number(Object.keys(e)[0])<=u.toDate.getTime())?Object.values(e)[0].total:0)).reduce(((e,t)=>e+t),0)}))));var u;return(0,v.jsxs)("div",{className:"statistics",children:[(0,v.jsxs)("div",{className:"statistics__filter filter",children:[(0,v.jsx)("div",{className:"filter__category",children:(0,v.jsxs)("select",{name:"category-select",id:"category-selectr",onChange:e=>{i(e.target.value)},children:[(0,v.jsx)("option",{value:"",children:"All Categories"}),Object.values(t).map((e=>(0,v.jsx)("option",{value:e.id,children:e.name})))]})}),(0,v.jsx)("div",{className:"filter__date",children:(0,v.jsx)(l(),{dateFormat:"dd-MM-yyyy",selected:o,onChange:e=>{const[t,n]=e;c(t),d(n)},startDate:o,endDate:r,selectsRange:!0,placeholderText:"Filter by Date"})})]}),(0,v.jsxs)("div",{className:"statistics__info info",children:[(0,v.jsx)("div",{className:"info__graphics",children:p?(0,v.jsx)(y,{data:p}):""}),(0,v.jsx)("div",{className:"info__table",children:p?(0,v.jsx)(w,{data:p}):""})]})]})},k=N},7617:(e,t,n)=>{n.d(t,{Z:()=>o});var s=n(8081),a=n.n(s),i=n(3645),l=n.n(i)()(a());l.push([e.id,".statistics__filter {\n  margin-top: 30px;\n  display: flex;\n  column-gap: 20px;\n  flex-wrap: nowrap;\n}\n\n.container__statistics {\n  position: relative;\n  width: 100%;\n  display: flex;\n  background-color: whitesmoke;\n  justify-content: space-between;\n  padding: 20px;\n  border-radius: 20px;\n  min-height: 500px;\n}\n\n.statistics {\n  margin-top: 50px;\n  flex-basis: 80%;\n  position: relative;\n}\n\n.statistics__header {\n  position: absolute;\n  width: 100%;\n  text-align: center;\n}\n\n.statistics__info {\n  display: flex;\n  justify-content: space-between;\n  margin-top: 20px;\n}\n\n.statistics__add {\n  position: relative;\n  order: -1;\n  z-index: 2;\n}\n\n.statistics__graphics {\n}\n\n.statistics__info {\n  display: flex;\n  flex-flow: row wrap;\n}\n\n.info__graphics {\n}\n\n.info__table {\n  order: -1;\n  flex-basis: 60%;\n}\n",""]);const o=l}}]);