(()=>{"use strict";let e,t=document.querySelectorAll(".btn"),n=document.querySelector(".calculator-screen"),a=document.querySelector(".btn-danger"),l="",c="",u=!1,r=!1,o=!0;function s(e){o&&"-"===e?d(e):c&&"-"!==c&&(u||v(),l=e,o=!0,r=!0)}function i(){0===n.value.toString().length?(e=void 0,l=""):a.textContent="CE",n.value="",c="",o=!0}function v(){n.value&&(void 0===e||""===l?(e=parseFloat(n.value),r=!0):e=function(){switch(l){case"+":return e+parseFloat(c);case"-":return e-parseFloat(c);case"*":return e*parseFloat(c);case"/":return e/parseFloat(c);default:return 0}}(),n.value=e.toString().length>11?e.toExponential(6):e,u=!0)}function d(e){u=!1,o=!1,r&&(n.value="",r=!1);const t=n.value.toString();0===t.length&&(a.textContent="C"),("0"!==e||"0"!==t&&"-0"!==t)&&(!isNaN(e)||"-"===e||"."===e&&!t.includes("."))&&t.length<=10&&(n.value=n.value+e,c=n.value)}t.forEach((e=>{if(e.className.includes("operator"))e.onclick=()=>s(e.value);else switch(e.value){case"clear":e.onclick=()=>i();break;case"=":e.onclick=()=>v();break;default:e.onclick=()=>d(e.value)}})),document.addEventListener("keypress",(e=>{["1","2","3","4","5","6","7","8","9","0","."].includes(e.key)?d(e.key):["+","-","*","/"].includes(e.key)?s(e.key):["c","C","Escape"].includes(e.key)?i():"Backspace"===e.key?function(){const e=n.value.toString().length-1;n.value=n.value.toString().substr(0,e),c=n.value}():"Enter"===e.key&&v()}))})();