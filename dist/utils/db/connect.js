"use strict";var n=Object.defineProperty;var a=Object.getOwnPropertyDescriptor;var i=Object.getOwnPropertyNames;var p=Object.prototype.hasOwnProperty;var g=(c,o)=>{for(var r in o)n(c,r,{get:o[r],enumerable:!0})},l=(c,o,r,e)=>{if(o&&typeof o=="object"||typeof o=="function")for(let t of i(o))!p.call(c,t)&&t!==r&&n(c,t,{get:()=>o[t],enumerable:!(e=a(o,t))||e.enumerable});return c};var m=c=>l(n({},"__esModule",{value:!0}),c);var y={};g(y,{connectToDb:()=>x});module.exports=m(y);var s=require("mongoose");const x=async c=>{try{await(0,s.connect)(c)}catch(o){console.log(o),process.exit(0)}};0&&(module.exports={connectToDb});
//# sourceMappingURL=connect.js.map
