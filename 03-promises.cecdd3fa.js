function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in o)return o[e].exports;if(e in n){var t=n[e];delete n[e];var r={id:e,exports:{}};return o[e]=r,t.call(r.exports,r,r.exports),r.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){n[e]=t},t.parcelRequired7c6=r);var l=r("eWCmQ");const u=document.querySelector(".form"),i=document.querySelector('button[type="submit"]');let s={};function a(e,t){return new Promise(((o,n)=>{const r=Math.random()>.3;setTimeout((()=>{r?o(`✅ Fulfilled promise ${e} in ${t}ms`):n(`❌ Rejected promise ${e} in ${t}ms`)}),t)}))}function d(t){e(l).Notify.success(t),console.log(t)}function c(t){e(l).Notify.failure(t),console.log(t)}u.addEventListener("submit",(function(e){e.preventDefault(),i.disabled=!0;const{elements:{delay:t,step:o,amount:n}}=e.target;s.delay=Number(t.value),s.step=Number(o.value),s.amount=Number(n.value),e.currentTarget.reset(),console.log(s),function(e,t,o){console.log({delay:e,step:t,amount:o});for(let n=1;n<=o;n+=1)a(n,e).then(d).catch(c),e+=t;setTimeout((()=>{i.disabled=!1}),e)}(s.delay,s.step,s.amount)}));
//# sourceMappingURL=03-promises.cecdd3fa.js.map
