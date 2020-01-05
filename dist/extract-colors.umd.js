!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):(t=t||self,e(t.extractColors={}))}(this,function(t){"use strict";class e{constructor(t,e,n,i){this.isColor=!0,this.red=t,this.green=e,this.blue=n,this.hex=i,this.count=1}distance(t){return Math.abs(t.red-this.red)+Math.abs(t.green-this.green)+Math.abs(t.blue-this.blue)}getWeight(t){return this.count+this.getSaturation()*t}getSaturation(){return void 0===this.saturation&&(this.saturation=Math.max(Math.abs(this.red-this.green),Math.abs(this.red-this.blue),Math.abs(this.green-this.blue))),this.saturation}}class n{constructor(){this.count=1,this.children={}}addGroup(t){return this.children[t]?this.children[t].count++:this.children[t]=new n,this.children[t]}addColor(t,n,i,o){return this.children[t]?this.children[t].count++:this.children[t]=new e(n,i,o,t),this.children[t]}getList(){return Object.keys(this.children).map(t=>this.children[t])}getMaxWeight(t){if(void 0===this.maxWeight){const e=this.getList().map(e=>e.isColor?e.getWeight(t):e.getMaxWeight(t));e.sort((t,e)=>e-t),this.maxWeight=e[0]||0}return this.maxWeight}getMaxWeightColor(t){const e=this.getList();return e.sort((e,n)=>{if(e.isColor)return n.getWeight(t)-e.getWeight(t);return n.getMaxWeight(t)-e.getMaxWeight(t)}),e[0].isColor?e[0]:e[0].getMaxWeightColor(t)}getColors(t,e){const n=this.getList().map(t=>{const n=t.count;const i=t.getMaxWeightColor(e);i.count=n;return i});n.sort((t,n)=>n.getWeight(e)-t.getWeight(e));const i=[];return n.forEach(e=>{const n=i.find(n=>n.distance(e)<t);n?n.count+=e.count:i.push(e)}),i}}const i=(t,e,n=0,i=Number.MAX_SAFE_INTEGER)=>Number.isInteger(e)&&e>=n&&e<=i?parseInt(e):new Error(t+" is invalid"),o=(t,e,n=0,i=Number.MAX_VALUE)=>Number(e)==e&&e>=n&&e<=i?Number(e):new Error(t+" is invalid"),r=(t,e)=>e&&"[object Function]"==={}.toString.call(e)?e:new Error(t+" is invalid");class s{constructor({pixels:pixels=s.pixelsDefault,distance:distance=s.distanceDefault,saturationImportance:saturationImportance=s.saturationImportanceDefault,splitPower:splitPower=s.splitPowerDefault,colorValidator:colorValidator=s.colorValidatorDefault}={}){this.pixels=i("pixels",pixels,1),this.splitPower=o("splitPower",splitPower,2,16),this.distance=i("distance",distance,1,762),this.saturationImportance=o("saturationImportance",saturationImportance,0),this.colorValidator=r("colorValidator",colorValidator)}process(t){const e=new n,i=this.splitPower;for(let n=0;n<t.length;n+=4){const o=t[n],r=t[n+1],s=t[n+2],a=t[n+3];if(this.colorValidator(o,r,s,a)){const t=o<<16|r<<8|s,n=(o>>4&15)<<2|(r>>4&15)<<1|s>>4&15,a=Math.round(o*(i-1)/255)*(i*i)+Math.round(r*(i-1)/255)*i+Math.round(s*(i-1)/255);e.addGroup(a).addGroup(n).addColor(t,o,r,s)}}return e.getColors(this.distance,this.saturationImportance)}extract(t){return this.process(t).map(t=>({hex:"#"+"0".repeat(6-t.hex.toString(16).length)+t.hex.toString(16),red:t.red,green:t.green,blue:t.blue,area:t.count/this.pixels,saturation:t.saturation/255}))}}s.pixelsDefault=1e4,s.distanceDefault=150,s.saturationImportanceDefault=5,s.splitPowerDefault=10,s.colorValidatorDefault=((t,e,n,i=255)=>i>250);const a=(t,e)=>{const n=t.width*t.height;const i=n<e?t.width:Math.round(t.width*Math.sqrt(e/n));const o=n<e?t.height:Math.round(t.height*Math.sqrt(e/n));const r=document.createElement("canvas");r.width=i;r.height=o;const s=r.getContext("2d");s.drawImage(t,0,0,t.width,t.height,0,0,i,o);return s.getImageData(0,0,i,o)},c=(t,e)=>{const n=new s(e);return n.extract(t.data)},u=(t,e)=>new Promise(n=>{const i=(t,e)=>{const i=new s(e);const o=a(t,i.pixels);n(i.extract(o.data))};if(t.complete)i(t,e);else{const n=()=>{t.removeEventListener("load",n);i(t,e)};t.addEventListener("load",n)}}),h=(t,e)=>{const n=new Image;n.src=t;u(n,e)},l=(t,e)=>{if(t instanceof ImageData)return new Promise(n=>{n(c(t,e))});if(t instanceof Image)return u(t,e);return h(t,e)};t.default=l,t.extractColorsFromImage=u,t.extractColorsFromImageData=c,t.extractColorsFromSrc=h,Object.defineProperty(t,"__esModule",{value:!0})});
