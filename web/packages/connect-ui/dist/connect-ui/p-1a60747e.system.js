var __extends=this&&this.__extends||function(){var e=function(t,r){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)if(Object.prototype.hasOwnProperty.call(t,r))e[r]=t[r]};return e(t,r)};return function(t,r){e(t,r);function n(){this.constructor=t}t.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}();var __awaiter=this&&this.__awaiter||function(e,t,r,n){function a(e){return e instanceof r?e:new r((function(t){t(e)}))}return new(r||(r=Promise))((function(r,i){function o(e){try{s(n.next(e))}catch(t){i(t)}}function l(e){try{s(n["throw"](e))}catch(t){i(t)}}function s(e){e.done?r(e.value):a(e.value).then(o,l)}s((n=n.apply(e,t||[])).next())}))};var __generator=this&&this.__generator||function(e,t){var r={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},n,a,i,o;return o={next:l(0),throw:l(1),return:l(2)},typeof Symbol==="function"&&(o[Symbol.iterator]=function(){return this}),o;function l(e){return function(t){return s([e,t])}}function s(o){if(n)throw new TypeError("Generator is already executing.");while(r)try{if(n=1,a&&(i=o[0]&2?a["return"]:o[0]?a["throw"]||((i=a["return"])&&i.call(a),0):a.next)&&!(i=i.call(a,o[1])).done)return i;if(a=0,i)o=[o[0]&2,i.value];switch(o[0]){case 0:case 1:i=o;break;case 4:r.label++;return{value:o[1],done:false};case 5:r.label++;a=o[1];o=[0];continue;case 7:o=r.ops.pop();r.trys.pop();continue;default:if(!(i=r.trys,i=i.length>0&&i[i.length-1])&&(o[0]===6||o[0]===2)){r=0;continue}if(o[0]===3&&(!i||o[1]>i[0]&&o[1]<i[3])){r.label=o[1];break}if(o[0]===6&&r.label<i[1]){r.label=i[1];i=o;break}if(i&&r.label<i[2]){r.label=i[2];r.ops.push(o);break}if(i[2])r.ops.pop();r.trys.pop();continue}o=t.call(e,r)}catch(l){o=[6,l];a=0}finally{n=i=0}if(o[0]&5)throw o[1];return{value:o[0]?o[1]:void 0,done:true}}};var __spreadArrays=this&&this.__spreadArrays||function(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length;for(var n=Array(e),a=0,t=0;t<r;t++)for(var i=arguments[t],o=0,l=i.length;o<l;o++,a++)n[a]=i[o];return n};System.register([],(function(e,t){"use strict";return{execute:function(){var r=this;var n=e("N","connect-ui");var a;var i;var o=false;var l=false;var s=e("w",typeof window!=="undefined"?window:{});var f=e("C",s.CSS);var u=e("d",s.document||{head:{}});var $=e("p",{$flags$:0,$resourcesUrl$:"",jmp:function(e){return e()},raf:function(e){return requestAnimationFrame(e)},ael:function(e,t,r,n){return e.addEventListener(t,r,n)},rel:function(e,t,r,n){return e.removeEventListener(t,r,n)},ce:function(e,t){return new CustomEvent(e,t)}});var c=function(){return(u.head.attachShadow+"").indexOf("[native")>-1}();var v=e("a",(function(e){return Promise.resolve(e)}));var d=function(){try{new CSSStyleSheet;return true}catch(e){}return false}();var h="{visibility:hidden}.hydrated{visibility:inherit}";var p=function(e,t){if(t===void 0){t=""}{return function(){return}}};var m=function(e,t){{return function(){return}}};var g=new WeakMap;var y=function(e,t,r){var n=je.get(e);if(d&&r){n=n||new CSSStyleSheet;n.replace(t)}else{n=t}je.set(e,n)};var b=function(e,t,r,n){var a=S(t);var i=je.get(a);e=e.nodeType===11?e:u;if(i){if(typeof i==="string"){e=e.head||e;var o=g.get(e);var l=void 0;if(!o){g.set(e,o=new Set)}if(!o.has(a)){{if($.$cssShim$){l=$.$cssShim$.createHostStyle(n,a,i,!!(t.$flags$&10));var s=l["s-sc"];if(s){a=s;o=null}}else{l=u.createElement("style");l.innerHTML=i}e.insertBefore(l,e.querySelector("link"))}if(o){o.add(a)}}}else if(!e.adoptedStyleSheets.includes(i)){e.adoptedStyleSheets=__spreadArrays(e.adoptedStyleSheets,[i])}}return a};var w=function(e){var t=e.$cmpMeta$;var r=e.$hostElement$;var n=t.$flags$;var a=p("attachStyles",t.$tagName$);var i=b(c&&r.shadowRoot?r.shadowRoot:r.getRootNode(),t,e.$modeName$,r);if(n&10){r["s-sc"]=i;r.classList.add(i+"-h")}a()};var S=function(e,t){return"sc-"+e.$tagName$};var _={};var x="http://www.w3.org/2000/svg";var R="http://www.w3.org/1999/xhtml";var N=function(e){return e!=null};var j=function(){};var k=function(e){e=typeof e;return e==="object"||e==="function"};var E=typeof Deno!=="undefined";var C=!E&&typeof global!=="undefined"&&typeof require==="function"&&!!global.process&&typeof __filename==="string"&&(!global.origin||typeof global.origin!=="string");var O=E&&Deno.build.os==="windows";var M=C?process.cwd:E?Deno.cwd:function(){return"/"};var A=C?process.exit:E?Deno.exit:j;var P=e("h",(function(e,t){var r=[];for(var n=2;n<arguments.length;n++){r[n-2]=arguments[n]}var a=null;var i=false;var o=false;var l=[];var s=function(t){for(var r=0;r<t.length;r++){a=t[r];if(Array.isArray(a)){s(a)}else if(a!=null&&typeof a!=="boolean"){if(i=typeof e!=="function"&&!k(a)){a=String(a)}if(i&&o){l[l.length-1].$text$+=a}else{l.push(i?L(null,a):a)}o=i}}};s(r);if(t){{var f=t.className||t.class;if(f){t.class=typeof f!=="object"?f:Object.keys(f).filter((function(e){return f[e]})).join(" ")}}}if(typeof e==="function"){return e(t===null?{}:t,l,U)}var u=L(e,null);u.$attrs$=t;if(l.length>0){u.$children$=l}return u}));var L=function(e,t){var r={$flags$:0,$tag$:e,$text$:t,$elm$:null,$children$:null};{r.$attrs$=null}return r};var T={};var B=function(e){return e&&e.$tag$===T};var U={forEach:function(e,t){return e.map(I).forEach(t)},map:function(e,t){return e.map(I).map(t).map(H)}};var I=function(e){return{vattrs:e.$attrs$,vchildren:e.$children$,vkey:e.$key$,vname:e.$name$,vtag:e.$tag$,vtext:e.$text$}};var H=function(e){if(typeof e.vtag==="function"){var t=Object.assign({},e.vattrs);if(e.vkey){t.key=e.vkey}if(e.vname){t.name=e.vname}return P.apply(void 0,__spreadArrays([e.vtag,t],e.vchildren||[]))}var r=L(e.vtag,e.vtext);r.$attrs$=e.vattrs;r.$children$=e.vchildren;r.$key$=e.vkey;r.$name$=e.vname;return r};var z=function(e,t,r,n,a,i){if(r!==n){var o=_e(e,t);var l=t.toLowerCase();if(t==="class"){var f=e.classList;var u=D(r);var c=D(n);f.remove.apply(f,u.filter((function(e){return e&&!c.includes(e)})));f.add.apply(f,c.filter((function(e){return e&&!u.includes(e)})))}else if(!o&&t[0]==="o"&&t[1]==="n"){if(t[2]==="-"){t=t.slice(3)}else if(_e(s,l)){t=l.slice(2)}else{t=l[2]+t.slice(3)}if(r){$.rel(e,t,r,false)}if(n){$.ael(e,t,n,false)}}else{var v=k(n);if((o||v&&n!==null)&&!a){try{if(!e.tagName.includes("-")){var d=n==null?"":n;if(t==="list"){o=false}else if(r==null||e[t]!=d){e[t]=d}}else{e[t]=n}}catch(h){}}if(n==null||n===false){if(n!==false||e.getAttribute(t)===""){{e.removeAttribute(t)}}}else if((!o||i&4||a)&&!v){n=n===true?"":n;{e.setAttribute(t,n)}}}}};var q=/\s/;var D=function(e){return!e?[]:e.split(q)};var V=function(e,t,r,n){var a=t.$elm$.nodeType===11&&t.$elm$.host?t.$elm$.host:t.$elm$;var i=e&&e.$attrs$||_;var o=t.$attrs$||_;{for(n in i){if(!(n in o)){z(a,n,i[n],undefined,r,t.$flags$)}}}for(n in o){z(a,n,i[n],o[n],r,t.$flags$)}};var W=function(e,t,r,n){var i=t.$children$[r];var l=0;var s;var f;if(i.$text$!==null){s=i.$elm$=u.createTextNode(i.$text$)}else{if(!o){o=i.$tag$==="svg"}s=i.$elm$=u.createElementNS(o?x:R,i.$tag$);if(o&&i.$tag$==="foreignObject"){o=false}{V(null,i,o)}if(N(a)&&s["s-si"]!==a){s.classList.add(s["s-si"]=a)}if(i.$children$){for(l=0;l<i.$children$.length;++l){f=W(e,i,l);if(f){s.appendChild(f)}}}{if(i.$tag$==="svg"){o=false}else if(s.tagName==="foreignObject"){o=true}}}return s};var F=function(e,t,r,n,a,o){var l=e;var s;if(l.shadowRoot&&l.tagName===i){l=l.shadowRoot}for(;a<=o;++a){if(n[a]){s=W(null,r,a);if(s){n[a].$elm$=s;l.insertBefore(s,t)}}}};var G=function(e,t,r,n,a){for(;t<=r;++t){if(n=e[t]){a=n.$elm$;a.remove()}}};var J=function(e,t,r,n){var a=0;var i=0;var o=t.length-1;var l=t[0];var s=t[o];var f=n.length-1;var u=n[0];var $=n[f];var c;while(a<=o&&i<=f){if(l==null){l=t[++a]}else if(s==null){s=t[--o]}else if(u==null){u=n[++i]}else if($==null){$=n[--f]}else if(K(l,u)){Q(l,u);l=t[++a];u=n[++i]}else if(K(s,$)){Q(s,$);s=t[--o];$=n[--f]}else if(K(l,$)){Q(l,$);e.insertBefore(l.$elm$,s.$elm$.nextSibling);l=t[++a];$=n[--f]}else if(K(s,u)){Q(s,u);e.insertBefore(s.$elm$,l.$elm$);s=t[--o];u=n[++i]}else{{c=W(t&&t[i],r,i);u=n[++i]}if(c){{l.$elm$.parentNode.insertBefore(c,l.$elm$)}}}}if(a>o){F(e,n[f+1]==null?null:n[f+1].$elm$,r,n,i,f)}else if(i>f){G(t,a,o)}};var K=function(e,t){if(e.$tag$===t.$tag$){return true}return false};var Q=function(e,t){var r=t.$elm$=e.$elm$;var n=e.$children$;var a=t.$children$;var i=t.$tag$;var l=t.$text$;if(l===null){{o=i==="svg"?true:i==="foreignObject"?false:o}{{V(e,t,o)}}if(n!==null&&a!==null){J(r,n,t,a)}else if(a!==null){if(e.$text$!==null){r.textContent=""}F(r,null,t,a,0,a.length-1)}else if(n!==null){G(n,0,n.length-1)}if(o&&i==="svg"){o=false}}else if(e.$text$!==l){r.data=l}};var X=function(e,t){var r=e.$hostElement$;var n=e.$vnode$||L(null,null);var o=B(t)?t:P(null,null,t);i=r.tagName;o.$tag$=null;o.$flags$|=4;e.$vnode$=o;o.$elm$=n.$elm$=r.shadowRoot||r;{a=r["s-sc"]}Q(n,o)};var Y=function(e){return be(e).$hostElement$};var Z=e("c",(function(e,t,r){var n=Y(e);return{emit:function(e){return ee(n,t,{bubbles:!!(r&4),composed:!!(r&2),cancelable:!!(r&1),detail:e})}}}));var ee=function(e,t,r){var n=$.ce(t,r);e.dispatchEvent(n);return n};var te=function(e,t){if(t&&!e.$onRenderResolve$&&t["s-p"]){t["s-p"].push(new Promise((function(t){return e.$onRenderResolve$=t})))}};var re=function(e,t){{e.$flags$|=16}if(e.$flags$&4){e.$flags$|=512;return}te(e,e.$ancestorComponent$);var r=function(){return ne(e,t)};return Pe(r)};var ne=function(e,t){var r=p("scheduleUpdate",e.$cmpMeta$.$tagName$);var n=e.$lazyInstance$;var a;r();return fe(a,(function(){return ae(e,n,t)}))};var ae=function(e,t,r){var n=e.$hostElement$;var a=p("update",e.$cmpMeta$.$tagName$);var i=n["s-rc"];if(r){w(e)}var o=p("render",e.$cmpMeta$.$tagName$);{{X(e,ie(e,t))}}if($.$cssShim$){$.$cssShim$.updateHost(n)}if(i){i.map((function(e){return e()}));n["s-rc"]=undefined}o();a();{var l=n["s-p"];var s=function(){return oe(e)};if(l.length===0){s()}else{Promise.all(l).then(s);e.$flags$|=4;l.length=0}}};var ie=function(e,t){try{t=t.render();{e.$flags$&=~16}{e.$flags$|=2}}catch(r){xe(r)}return t};var oe=function(e){var t=e.$cmpMeta$.$tagName$;var r=e.$hostElement$;var n=p("postUpdate",t);var a=e.$ancestorComponent$;if(!(e.$flags$&64)){e.$flags$|=64;{ue(r)}n();{e.$onReadyResolve$(r);if(!a){se()}}}else{n()}{if(e.$onRenderResolve$){e.$onRenderResolve$();e.$onRenderResolve$=undefined}if(e.$flags$&512){Ae((function(){return re(e,false)}))}e.$flags$&=~(4|512)}};var le=function(e){{var t=be(e);var r=t.$hostElement$.isConnected;if(r&&(t.$flags$&(2|16))===2){re(t,false)}return r}};var se=function(e){{ue(u.documentElement)}Ae((function(){return ee(s,"appload",{detail:{namespace:n}})}))};var fe=function(e,t){return e&&e.then?e.then(t):t()};var ue=function(e){return e.classList.add("hydrated")};var $e=function(e,t){if(e!=null&&!k(e)){return e}return e};var ce=function(e,t){return be(e).$instanceValues$.get(t)};var ve=function(e,t,r,n){var a=be(e);var i=a.$instanceValues$.get(t);var o=a.$flags$;var l=a.$lazyInstance$;r=$e(r);if((!(o&8)||i===undefined)&&r!==i){a.$instanceValues$.set(t,r);if(l){if((o&(2|16))===2){re(a,false)}}}};var de=function(e,t,r){if(t.$members$){var n=Object.entries(t.$members$);var a=e.prototype;n.map((function(e){var t=e[0],n=e[1][0];if(n&31||r&2&&n&32){Object.defineProperty(a,t,{get:function(){return ce(this,t)},set:function(e){ve(this,t,e)},configurable:true,enumerable:true})}}))}return e};var he=function(e,n,a,i,o){return __awaiter(r,void 0,void 0,(function(){var e,r,i,l,s,f,u;return __generator(this,(function($){switch($.label){case 0:if(!((n.$flags$&32)===0))return[3,5];n.$flags$|=32;o=Ne(a);if(!o.then)return[3,2];e=m();return[4,o];case 1:o=$.sent();e();$.label=2;case 2:if(!o.isProxied){de(o,a,2);o.isProxied=true}r=p("createInstance",a.$tagName$);{n.$flags$|=8}try{new o(n)}catch(c){xe(c)}{n.$flags$&=~8}r();if(!o.style)return[3,5];i=o.style;l=S(a);if(!!je.has(l))return[3,5];s=p("registerStyles",a.$tagName$);if(!(a.$flags$&8))return[3,4];return[4,t.import("./p-57104cc5.system.js").then((function(e){return e.scopeCss(i,l,false)}))];case 3:i=$.sent();$.label=4;case 4:y(l,i,!!(a.$flags$&1));s();$.label=5;case 5:f=n.$ancestorComponent$;u=function(){return re(n,true)};if(f&&f["s-rc"]){f["s-rc"].push(u)}else{u()}return[2]}}))}))};var pe=function(e){if(($.$flags$&1)===0){var t=be(e);var r=t.$cmpMeta$;var n=p("connectedCallback",r.$tagName$);if(!(t.$flags$&1)){t.$flags$|=1;{var a=e;while(a=a.parentNode||a.host){if(a["s-p"]){te(t,t.$ancestorComponent$=a);break}}}if(r.$members$){Object.entries(r.$members$).map((function(t){var r=t[0],n=t[1][0];if(n&31&&e.hasOwnProperty(r)){var a=e[r];delete e[r];e[r]=a}}))}{Ae((function(){return he(e,t,r)}))}}n()}};var me=function(e){if(($.$flags$&1)===0){var t=be(e);if($.$cssShim$){$.$cssShim$.removeHost(e)}}};var ge=e("b",(function(e,t){if(t===void 0){t={}}var r=p();var n=[];var a=t.exclude||[];var i=s.customElements;var o=u.head;var l=o.querySelector("meta[charset]");var f=u.createElement("style");var v=[];var d;var m=true;Object.assign($,t);$.$resourcesUrl$=new URL(t.resourcesUrl||"./",u.baseURI).href;e.map((function(e){return e[1].map((function(t){var r={$flags$:t[0],$tagName$:t[1],$members$:t[2],$listeners$:t[3]};{r.$members$=t[2]}if(!c&&r.$flags$&1){r.$flags$|=8}var o=r.$tagName$;var l=function(e){__extends(t,e);function t(t){var n=e.call(this,t)||this;t=n;Se(t,r);if(r.$flags$&1){if(c){{t.attachShadow({mode:"open"})}}else if(!("shadowRoot"in t)){t.shadowRoot=t}}return n}t.prototype.connectedCallback=function(){var e=this;if(d){clearTimeout(d);d=null}if(m){v.push(this)}else{$.jmp((function(){return pe(e)}))}};t.prototype.disconnectedCallback=function(){var e=this;$.jmp((function(){return me(e)}))};t.prototype.forceUpdate=function(){le(this)};t.prototype.componentOnReady=function(){return be(this).$onReadyPromise$};return t}(HTMLElement);r.$lazyBundleId$=e[0];if(!a.includes(o)&&!i.get(o)){n.push(o);i.define(o,de(l,r,1))}}))}));{f.innerHTML=n+h;f.setAttribute("data-styles","");o.insertBefore(f,l?l.nextSibling:o.firstChild)}m=false;if(v.length){v.map((function(e){return e.connectedCallback()}))}else{{$.jmp((function(){return d=setTimeout(se,30)}))}}r()}));var ye=new WeakMap;var be=function(e){return ye.get(e)};var we=e("r",(function(e,t){return ye.set(t.$lazyInstance$=e,t)}));var Se=function(e,t){var r={$flags$:0,$hostElement$:e,$cmpMeta$:t,$instanceValues$:new Map};{r.$onReadyPromise$=new Promise((function(e){return r.$onReadyResolve$=e}));e["s-p"]=[];e["s-rc"]=[]}return ye.set(e,r)};var _e=function(e,t){return t in e};var xe=function(e){return console.error(e)};var Re=new Map;var Ne=function(e,r,n){var a=e.$tagName$.replace(/-/g,"_");var i=e.$lazyBundleId$;var o=Re.get(i);if(o){return o[a]}return t.import("./"+i+".entry.js"+"").then((function(e){{Re.set(i,e)}return e[a]}),xe)};var je=new Map;var ke=[];var Ee=[];var Ce=function(e,t){return function(r){e.push(r);if(!l){l=true;if(t&&$.$flags$&4){Ae(Me)}else{$.raf(Me)}}}};var Oe=function(e){for(var t=0;t<e.length;t++){try{e[t](performance.now())}catch(r){xe(r)}}e.length=0};var Me=function(){Oe(ke);{Oe(Ee);if(l=ke.length>0){$.raf(Me)}}};var Ae=function(e){return v().then(e)};var Pe=Ce(Ee,true)}}}));