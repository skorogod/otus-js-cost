"use strict";(self.webpackChunkotus_js_basic_cost=self.webpackChunkotus_js_basic_cost||[]).push([[24],{6024:(e,s,a)=>{a.r(s),a.d(s,{CategoryComponent:()=>t,default:()=>n}),a(7294);var o=a(5893);const t=e=>{return(0,o.jsxs)("div",{className:"category",children:[(0,o.jsx)("input",{type:"radio",name:"category",value:e.id,onChange:()=>{e.onCategoryChecked&&e.onCategoryChecked(e.id)}}),(0,o.jsx)("label",{htmlFor:`${e.id}`,children:e.name}),e.visible&&(s=e.id,a=Object.values(e.subCategories),t=e.onSubcategoryChecked,a?(0,o.jsxs)("select",{onChange:()=>{if(t){const e=document.getElementById(`sub-${s}`);t(e.value)}},name:"subCategory",id:`sub-${s}`,children:[(0,o.jsx)("option",{value:"",children:"--choose subcategory--"}),a.map((e=>(0,o.jsx)("option",{value:e.id,children:e.name},e.id)))]}):null)]});var s,a,t},n=t}}]);