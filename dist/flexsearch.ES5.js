/**!
 * FlexSearch.js v0.7.31 (ES5)
 * Copyright 2018-2022 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/flexsearch
 */
(function(self){'use strict';var l=l||{};l.scope={};l.arrayIteratorImpl=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};l.arrayIterator=function(a){return{next:l.arrayIteratorImpl(a)}};l.ASSUME_ES5=!1;l.ASSUME_NO_NATIVE_MAP=!1;l.ASSUME_NO_NATIVE_SET=!1;l.SIMPLE_FROUND_POLYFILL=!1;l.ISOLATE_POLYFILLS=!1;l.FORCE_POLYFILL_PROMISE=!1;l.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION=!1;
l.defineProperty=l.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};l.getGlobal=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");};l.global=l.getGlobal(this);
l.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");l.TRUST_ES6_POLYFILLS=!l.ISOLATE_POLYFILLS||l.IS_SYMBOL_NATIVE;l.polyfills={};l.propertyToPolyfillSymbol={};l.POLYFILL_PREFIX="$jscp$";l.polyfill=function(a,b,c,d){b&&(l.ISOLATE_POLYFILLS?l.polyfillIsolated(a,b,c,d):l.polyfillUnisolated(a,b,c,d))};
l.polyfillUnisolated=function(a,b){var c=l.global;a=a.split(".");for(var d=0;d<a.length-1;d++){var f=a[d];if(!(f in c))return;c=c[f]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&l.defineProperty(c,a,{configurable:!0,writable:!0,value:b})};
l.polyfillIsolated=function(a,b,c){var d=a.split(".");a=1===d.length;var f=d[0];f=!a&&f in l.polyfills?l.polyfills:l.global;for(var g=0;g<d.length-1;g++){var e=d[g];if(!(e in f))return;f=f[e]}d=d[d.length-1];c=l.IS_SYMBOL_NATIVE&&"es6"===c?f[d]:null;b=b(c);null!=b&&(a?l.defineProperty(l.polyfills,d,{configurable:!0,writable:!0,value:b}):b!==c&&(void 0===l.propertyToPolyfillSymbol[d]&&(a=1E9*Math.random()>>>0,l.propertyToPolyfillSymbol[d]=l.IS_SYMBOL_NATIVE?l.global.Symbol(d):l.POLYFILL_PREFIX+a+"$"+
d),l.defineProperty(f,l.propertyToPolyfillSymbol[d],{configurable:!0,writable:!0,value:b})))};l.initSymbol=function(){};
l.polyfill("Symbol",function(a){function b(g){if(this instanceof b)throw new TypeError("Symbol is not a constructor");return new c(d+(g||"")+"_"+f++,g)}function c(g,e){this.$jscomp$symbol$id_=g;l.defineProperty(this,"description",{configurable:!0,writable:!0,value:e})}if(a)return a;c.prototype.toString=function(){return this.$jscomp$symbol$id_};var d="jscomp_symbol_"+(1E9*Math.random()>>>0)+"_",f=0;return b},"es6","es3");
l.polyfill("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var b="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),c=0;c<b.length;c++){var d=l.global[b[c]];"function"===typeof d&&"function"!=typeof d.prototype[a]&&l.defineProperty(d.prototype,a,{configurable:!0,writable:!0,value:function(){return l.iteratorPrototype(l.arrayIteratorImpl(this))}})}return a},"es6","es3");
l.iteratorPrototype=function(a){a={next:a};a[Symbol.iterator]=function(){return this};return a};l.iteratorFromArray=function(a,b){a instanceof String&&(a+="");var c=0,d=!1,f={next:function(){if(!d&&c<a.length){var g=c++;return{value:b(g,a[g]),done:!1}}d=!0;return{done:!0,value:void 0}}};f[Symbol.iterator]=function(){return f};return f};l.polyfill("Array.prototype.keys",function(a){return a?a:function(){return l.iteratorFromArray(this,function(b){return b})}},"es6","es3");
l.makeIterator=function(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):l.arrayIterator(a)};
l.polyfill("Promise",function(a){function b(e){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];this.isRejectionHandled_=!1;var h=this.createResolveAndReject_();try{e(h.resolve,h.reject)}catch(k){h.reject(k)}}function c(){this.batch_=null}function d(e){return e instanceof b?e:new b(function(h){h(e)})}if(a&&(!(l.FORCE_POLYFILL_PROMISE||l.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION&&"undefined"===typeof l.global.PromiseRejectionEvent)||!l.global.Promise||-1===l.global.Promise.toString().indexOf("[native code]")))return a;
c.prototype.asyncExecute=function(e){if(null==this.batch_){this.batch_=[];var h=this;this.asyncExecuteFunction(function(){h.executeBatch_()})}this.batch_.push(e)};var f=l.global.setTimeout;c.prototype.asyncExecuteFunction=function(e){f(e,0)};c.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var e=this.batch_;this.batch_=[];for(var h=0;h<e.length;++h){var k=e[h];e[h]=null;try{k()}catch(m){this.asyncThrow_(m)}}}this.batch_=null};c.prototype.asyncThrow_=function(e){this.asyncExecuteFunction(function(){throw e;
})};b.prototype.createResolveAndReject_=function(){function e(m){return function(r){k||(k=!0,m.call(h,r))}}var h=this,k=!1;return{resolve:e(this.resolveTo_),reject:e(this.reject_)}};b.prototype.resolveTo_=function(e){if(e===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(e instanceof b)this.settleSameAsPromise_(e);else{a:switch(typeof e){case "object":var h=null!=e;break a;case "function":h=!0;break a;default:h=!1}h?this.resolveToNonPromiseObj_(e):this.fulfill_(e)}};
b.prototype.resolveToNonPromiseObj_=function(e){var h=void 0;try{h=e.then}catch(k){this.reject_(k);return}"function"==typeof h?this.settleSameAsThenable_(h,e):this.fulfill_(e)};b.prototype.reject_=function(e){this.settle_(2,e)};b.prototype.fulfill_=function(e){this.settle_(1,e)};b.prototype.settle_=function(e,h){if(0!=this.state_)throw Error("Cannot settle("+e+", "+h+"): Promise already settled in state"+this.state_);this.state_=e;this.result_=h;2===this.state_&&this.scheduleUnhandledRejectionCheck_();
this.executeOnSettledCallbacks_()};b.prototype.scheduleUnhandledRejectionCheck_=function(){var e=this;f(function(){if(e.notifyUnhandledRejection_()){var h=l.global.console;"undefined"!==typeof h&&h.error(e.result_)}},1)};b.prototype.notifyUnhandledRejection_=function(){if(this.isRejectionHandled_)return!1;var e=l.global.CustomEvent,h=l.global.Event,k=l.global.dispatchEvent;if("undefined"===typeof k)return!0;"function"===typeof e?e=new e("unhandledrejection",{cancelable:!0}):"function"===typeof h?
e=new h("unhandledrejection",{cancelable:!0}):(e=l.global.document.createEvent("CustomEvent"),e.initCustomEvent("unhandledrejection",!1,!0,e));e.promise=this;e.reason=this.result_;return k(e)};b.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var e=0;e<this.onSettledCallbacks_.length;++e)g.asyncExecute(this.onSettledCallbacks_[e]);this.onSettledCallbacks_=null}};var g=new c;b.prototype.settleSameAsPromise_=function(e){var h=this.createResolveAndReject_();e.callWhenSettled_(h.resolve,
h.reject)};b.prototype.settleSameAsThenable_=function(e,h){var k=this.createResolveAndReject_();try{e.call(h,k.resolve,k.reject)}catch(m){k.reject(m)}};b.prototype.then=function(e,h){function k(q,n){return"function"==typeof q?function(t){try{m(q(t))}catch(v){r(v)}}:n}var m,r,p=new b(function(q,n){m=q;r=n});this.callWhenSettled_(k(e,m),k(h,r));return p};b.prototype.catch=function(e){return this.then(void 0,e)};b.prototype.callWhenSettled_=function(e,h){function k(){switch(m.state_){case 1:e(m.result_);
break;case 2:h(m.result_);break;default:throw Error("Unexpected state: "+m.state_);}}var m=this;null==this.onSettledCallbacks_?g.asyncExecute(k):this.onSettledCallbacks_.push(k);this.isRejectionHandled_=!0};b.resolve=d;b.reject=function(e){return new b(function(h,k){k(e)})};b.race=function(e){return new b(function(h,k){for(var m=l.makeIterator(e),r=m.next();!r.done;r=m.next())d(r.value).callWhenSettled_(h,k)})};b.all=function(e){var h=l.makeIterator(e),k=h.next();return k.done?d([]):new b(function(m,
r){function p(t){return function(v){q[t]=v;n--;0==n&&m(q)}}var q=[],n=0;do q.push(void 0),n++,d(k.value).callWhenSettled_(p(q.length-1),r),k=h.next();while(!k.done)})};return b},"es6","es3");l.polyfill("Object.is",function(a){return a?a:function(b,c){return b===c?0!==b||1/b===1/c:b!==b&&c!==c}},"es6","es3");
l.polyfill("Array.prototype.includes",function(a){return a?a:function(b,c){var d=this;d instanceof String&&(d=String(d));var f=d.length;c=c||0;for(0>c&&(c=Math.max(c+f,0));c<f;c++){var g=d[c];if(g===b||Object.is(g,b))return!0}return!1}},"es7","es3");
l.checkStringArgs=function(a,b,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""};l.polyfill("String.prototype.includes",function(a){return a?a:function(b,c){return-1!==l.checkStringArgs(this,b,"includes").indexOf(b,c||0)}},"es6","es3");l.owns=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)};
l.assign=l.TRUST_ES6_POLYFILLS&&"function"==typeof Object.assign?Object.assign:function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(d)for(var f in d)l.owns(d,f)&&(a[f]=d[f])}return a};l.polyfill("Object.assign",function(a){return a||l.assign},"es6","es3");function u(a,b){return"undefined"!==typeof a?a:b}function w(a){for(var b=Array(a),c=0;c<a;c++)b[c]=x();return b}function x(){return Object.create(null)}function aa(a,b){return b.length-a.length}function y(a){return"string"===typeof a}function z(a){return"object"===typeof a}function E(a){return"function"===typeof a};function ba(a,b,c,d){if(a&&(b&&(a=F(a,b)),this.matcher&&(a=F(a,this.matcher)),this.stemmer&&1<a.length&&(a=F(a,this.stemmer)),d&&1<a.length&&(a=H(a)),c||""===c)){a=a.split(c);if(this.filter){b=this.filter;c=a.length;d=[];for(var f=0,g=0;f<c;f++){var e=a[f];e&&!b[e]&&(d[g++]=e)}a=d}return a}return a}var ca=/[\p{Z}\p{S}\p{P}\p{C}]+/u,da=/[\u0300-\u036f]/g;
function ea(a,b){for(var c=Object.keys(a),d=c.length,f=[],g="",e=0,h=0,k,m;h<d;h++)k=c[h],(m=a[k])?(f[e++]=I(b?"(?!\\b)"+k+"(\\b|_)":k),f[e++]=m):g+=(g?"|":"")+k;g&&(f[e++]=I(b?"(?!\\b)("+g+")(\\b|_)":"("+g+")"),f[e]="");return f}function F(a,b){for(var c=0,d=b.length;c<d&&(a=a.replace(b[c],b[c+1]),a);c+=2);return a}function I(a){return new RegExp(a,"g")}function H(a){for(var b="",c="",d=0,f=a.length,g;d<f;d++)(g=a[d])!==c&&(b+=c=g);return b};var ha={encode:fa,rtl:!1,tokenize:""};function fa(a){return ba.call(this,(""+a).toLowerCase(),!1,ca,!1)};var ia={},J={};function ja(a){K(a,"add");K(a,"append");K(a,"search");K(a,"update");K(a,"remove")}function K(a,b){a[b+"Async"]=function(){var c=this,d=arguments,f=d[d.length-1];if(E(f)){var g=f;delete d[d.length-1]}f=new Promise(function(e){setTimeout(function(){c.async=!0;var h=c[b].apply(c,d);c.async=!1;e(h)})});return g?(f.then(g),this):f}};function ka(a,b,c,d){var f=a.length,g=[],e,h=0;d&&(d=[]);for(var k=f-1;0<=k;k--){for(var m=a[k],r=m.length,p=x(),q=!D,n=0;n<r;n++){var t=m[n],v=t.length;if(v)for(var A=0,B,C;A<v;A++)if(C=t[A],D){if(D[C]){if(!k)if(c)c--;else if(g[h++]=C,h===b)return g;if(k||d)p[C]=1;q=!0}d&&(B=(e[C]||0)+1,e[C]=B,B<f&&(B=d[B-2]||(d[B-2]=[]),B[B.length]=C))}else p[C]=1}if(d)D||(e=p);else if(!q)return[];var D=p}if(d)for(a=d.length-1;0<=a;a--)for(f=d[a],e=f.length,k=0;k<e;k++)if(m=f[k],!D[m]){if(c)c--;else if(g[h++]=m,
h===b)return g;D[m]=1}return g}function la(a,b){for(var c=x(),d=x(),f=[],g=0;g<a.length;g++)c[a[g]]=1;for(a=0;a<b.length;a++){g=b[a];for(var e=0,h;e<g.length;e++)h=g[e],c[h]&&!d[h]&&(d[h]=1,f[f.length]=h)}return f};function L(a){this.limit=!0!==a&&a;this.cache=x();this.queue=[]}function ma(a,b,c){z(a)&&(a=a.query);var d=this.cache.get(a);d||(d=this.search(a,b,c),this.cache.set(a,d));return d}L.prototype.set=function(a,b){if(!this.cache[a]){var c=this.queue.length;c===this.limit?delete this.cache[this.queue[c-1]]:c++;for(--c;0<c;c--)this.queue[c]=this.queue[c-1];this.queue[0]=a}this.cache[a]=b};
L.prototype.get=function(a){var b=this.cache[a];if(this.limit&&b&&(a=this.queue.indexOf(a))){var c=this.queue[a-1];this.queue[a-1]=this.queue[a];this.queue[a]=c}return b};L.prototype.del=function(a){for(var b=0,c,d;b<this.queue.length;b++)d=this.queue[b],c=this.cache[d],c.includes(a)&&(this.queue.splice(b--,1),delete this.cache[d])};var na={memory:{charset:"latin:extra",resolution:3,minlength:4,fastupdate:!1},performance:{resolution:3,minlength:3,optimize:!1,context:{depth:2,resolution:1}},match:{charset:"latin:extra",tokenize:"reverse"},score:{charset:"latin:advanced",resolution:20,minlength:3,context:{depth:3,resolution:9}},"default":{}};function oa(a,b,c,d,f,g,e){setTimeout(function(){var h=a(c?c+"."+d:d,JSON.stringify(e));h&&h.then?h.then(function(){b.export(a,b,c,f,g+1)}):b.export(a,b,c,f,g+1)})};function M(a,b){if(!(this instanceof M))return new M(a);var c;if(a){if(y(a))na[a]||console.warn("Preset not found: "+a),a=na[a];else if(c=a.preset)c[c]||console.warn("Preset not found: "+c),a=Object.assign({},c[c],a);c=a.charset;var d=a.lang;y(c)&&(-1===c.indexOf(":")&&(c+=":default"),c=J[c]);y(d)&&(d=ia[d])}else a={};var f,g,e=a.context||{};this.encode=a.encode||c&&c.encode||fa;this.register=b||x();this.resolution=f=a.resolution||9;this.tokenize=b=c&&c.tokenize||a.tokenize||"strict";this.depth="strict"===
b&&e.depth;this.bidirectional=u(e.bidirectional,!0);this.optimize=g=u(a.optimize,!0);this.fastupdate=u(a.fastupdate,!0);this.minlength=a.minlength||1;this.boost=a.boost;this.map=g?w(f):x();this.resolution_ctx=f=e.resolution||1;this.ctx=g?w(f):x();this.rtl=c&&c.rtl||a.rtl;this.matcher=(b=a.matcher||d&&d.matcher)&&ea(b,!1);this.stemmer=(b=a.stemmer||d&&d.stemmer)&&ea(b,!0);if(c=b=a.filter||d&&d.filter){c=b;d=x();e=0;for(f=c.length;e<f;e++)d[c[e]]=1;c=d}this.filter=c;this.cache=(b=a.cache)&&new L(b)}
M.prototype.append=function(a,b){return this.add(a,b,!0)};
M.prototype.add=function(a,b,c,d){if(b&&(a||0===a)){if(!d&&!c&&this.register[a])return this.update(a,b);b=this.encode(""+b);if(d=b.length){for(var f=x(),g=x(),e=this.depth,h=this.resolution,k=0;k<d;k++){var m=b[this.rtl?d-1-k:k],r=m.length;if(m&&r>=this.minlength&&(e||!g[m])){var p=N(h,d,k),q="";switch(this.tokenize){case "full":if(2<r){for(p=0;p<r;p++)for(var n=r;n>p;n--)if(n-p>=this.minlength){var t=N(h,d,k,r,p);q=m.substring(p,n);this.push_index(g,q,t,a,c)}break}case "reverse":if(1<r){for(n=r-
1;0<n;n--)q=m[n]+q,q.length>=this.minlength&&(t=N(h,d,k,r,n),this.push_index(g,q,t,a,c));q=""}case "forward":if(1<r){for(n=0;n<r;n++)q+=m[n],q.length>=this.minlength&&this.push_index(g,q,p,a,c);break}default:if(this.boost&&(p=Math.min(p/this.boost(b,m,k)|0,h-1)),this.push_index(g,m,p,a,c),e&&1<d&&k<d-1)for(r=x(),q=this.resolution_ctx,p=m,n=Math.min(e+1,d-k),t=r[p]=1;t<n;t++)if((m=b[this.rtl?d-1-k-t:k+t])&&m.length>=this.minlength&&!r[m]){r[m]=1;var v=N(q+(d/2>q?0:1),d,k,n-1,t-1),A=this.bidirectional&&
m>p;this.push_index(f,A?p:m,v,a,c,A?m:p)}}}}this.fastupdate||(this.register[a]=1)}}return this};function N(a,b,c,d,f){return c&&1<a?b+(d||0)<=a?c+(f||0):(a-1)/(b+(d||0))*(c+(f||0))+1|0:0}
M.prototype.push_index=function(a,b,c,d,f,g){var e=g?this.ctx:this.map;if(!a[b]||g&&!a[b][g])this.optimize&&(e=e[c]),g?(a=a[b]||(a[b]=x()),a[g]=1,e=e[g]||(e[g]=x())):a[b]=1,e=e[b]||(e[b]=[]),this.optimize||(e=e[c]||(e[c]=[])),f&&e.includes(d)||(e[e.length]=d,this.fastupdate&&(a=this.register[d]||(this.register[d]=[]),a[a.length]=e))};
M.prototype.search=function(a,b,c){c||(!b&&z(a)?(c=a,a=c.query):z(b)&&(c=b));var d=[],f=0;if(c){a=c.query||a;b=c.limit;f=c.offset||0;var g=c.context;var e=c.suggest}if(a){a=this.encode(""+a);var h=a.length;if(1<h){c=x();for(var k=[],m=0,r=0,p;m<h;m++)if((p=a[m])&&p.length>=this.minlength&&!c[p])if(this.optimize||e||this.map[p])k[r++]=p,c[p]=1;else return d;a=k;h=a.length}}if(!h)return d;b||(b=100);g=this.depth&&1<h&&!1!==g;c=0;if(g){var q=a[0];c=1}else 1<h&&a.sort(aa);for(;c<h;c++){m=a[c];g?(k=this.add_result(d,
e,b,f,2===h,m,q),e&&!1===k&&d.length||(q=m)):k=this.add_result(d,e,b,f,1===h,m);if(k)return k;if(e&&c===h-1){k=d.length;if(!k){if(g){g=0;c=-1;continue}return d}if(1===k)return pa(d[0],b,f)}}return ka(d,b,f,e)};
M.prototype.add_result=function(a,b,c,d,f,g,e){var h=[],k=e?this.ctx:this.map;this.optimize||(k=qa(k,g,e,this.bidirectional));if(k){for(var m=0,r=Math.min(k.length,e?this.resolution_ctx:this.resolution),p=0,q=0,n,t;p<r;p++)if(n=k[p])if(this.optimize&&(n=qa(n,g,e,this.bidirectional)),d&&n&&f&&(t=n.length,t<=d?(d-=t,n=null):(n=n.slice(d),d=0)),n&&(h[m++]=n,f&&(q+=n.length,q>=c)))break;if(m){if(f)return pa(h,c,0);a[a.length]=h;return}}return!b&&h};
function pa(a,b,c){a=1===a.length?a[0]:[].concat.apply([],a);return c||a.length>b?a.slice(c,c+b):a}function qa(a,b,c,d){c?(d=d&&b>c,a=(a=a[d?b:c])&&a[d?c:b]):a=a[b];return a}M.prototype.contain=function(a){return!!this.register[a]};M.prototype.update=function(a,b){return this.remove(a).add(a,b)};
M.prototype.remove=function(a,b){var c=this.register[a];if(c){if(this.fastupdate)for(var d=0,f;d<c.length;d++)f=c[d],f.splice(f.indexOf(a),1);else O(this.map,a,this.resolution,this.optimize),this.depth&&O(this.ctx,a,this.resolution_ctx,this.optimize);b||delete this.register[a];this.cache&&this.cache.del(a)}return this};
function O(a,b,c,d,f){var g=0;if(a.constructor===Array)if(f)b=a.indexOf(b),-1!==b?1<a.length&&(a.splice(b,1),g++):g++;else{f=Math.min(a.length,c);for(var e=0,h;e<f;e++)if(h=a[e])g=O(h,b,c,d,f),d||g||delete a[e]}else for(e in a)(g=O(a[e],b,c,d,f))||delete a[e];return g}M.prototype.searchCache=ma;
M.prototype.export=function(a,b,c,d,f){switch(f||(f=0)){case 0:var g="reg";if(this.fastupdate){var e=x();for(var h in this.register)e[h]=1}else e=this.register;break;case 1:g="cfg";e={doc:0,opt:this.optimize?1:0};break;case 2:g="map";e=this.map;break;case 3:g="ctx";e=this.ctx;break;default:return}oa(a,b||this,c,g,d,f,e);return!0};
M.prototype.import=function(a,b){var c=this;if(b)switch(y(b)&&(b=JSON.parse(b)),a){case "cfg":this.optimize=!!b.opt;break;case "reg":this.fastupdate=!1;this.register=b;break;case "map":0===Object.keys(this.map[0]).length?this.map=b:(this.map.forEach(function(d,f){for(var g in c.map[f])b[f].hasOwnProperty(g)&&(c.map[f][g]=c.map[f][g].concat(b[f][g]))}),b.forEach(function(d,f){for(var g in b[f])c.map[f].hasOwnProperty(g)||(c.map[f][g]=b[f][g])}));break;case "ctx":this.ctx=b}};ja(M.prototype);function ra(a){a=a.data;var b=self._index,c=a.args,d=a.task;switch(d){case "init":d=a.options||{};a=a.factory;b=d.encode;d.cache=!1;b&&0===b.indexOf("function")&&(d.encode=Function("return "+b)());a?(Function("return "+a)()(self),self._index=new self.FlexSearch.Index(d),delete self.FlexSearch):self._index=new M(d);break;default:a=a.id,b=b[d].apply(b,c),postMessage("search"===d?{id:a,msg:b}:{id:a})}};var sa=0;
function P(a){if(!(this instanceof P))return new P(a);var b;a?E(b=a.encode)&&(a.encode=b.toString()):a={};(b=(self||window)._factory)&&(b=b.toString());var c="undefined"===typeof window&&self.exports,d=this;this.worker=ta(b,c,a.worker);this.resolver=x();if(this.worker){if(c)this.worker.on("message",function(f){d.resolver[f.id](f.msg);delete d.resolver[f.id]});else this.worker.onmessage=function(f){f=f.data;d.resolver[f.id](f.msg);delete d.resolver[f.id]};this.worker.postMessage({task:"init",factory:b,
options:a})}}Q("add");Q("append");Q("search");Q("update");Q("remove");function Q(a){P.prototype[a]=P.prototype[a+"Async"]=function(){var b=this,c=[].slice.call(arguments),d=c[c.length-1];if(E(d)){var f=d;c.splice(c.length-1,1)}d=new Promise(function(g){setTimeout(function(){b.resolver[++sa]=g;b.worker.postMessage({task:a,id:sa,args:c})})});return f?(d.then(f),this):d}}
function ta(a,b,c){try{var d=b?eval('new (require("worker_threads")["Worker"])("../dist/node/node.js")'):a?new Worker(URL.createObjectURL(new Blob(["onmessage="+ra.toString()],{type:"text/javascript"}))):new Worker(y(c)?c:"worker/worker.js",{type:"module"})}catch(f){}return d};function R(a){if(!(this instanceof R))return new R(a);var b=a.document||a.doc||a,c;this.tree=[];this.field=[];this.marker=[];this.register=x();this.key=(c=b.key||b.id)&&S(c,this.marker)||"id";this.fastupdate=u(a.fastupdate,!0);this.storetree=(c=b.store)&&!0!==c&&[];this.store=c&&x();this.tag=(c=b.tag)&&S(c,this.marker);this.tagindex=c&&x();this.cache=(c=a.cache)&&new L(c);a.cache=!1;this.worker=a.worker;this.async=!1;c=x();var d=b.index||b.field||b;y(d)&&(d=[d]);for(var f=0,g,e=void 0;f<d.length;f++)g=
d[f],y(g)||(e=g,g=g.field),e=z(e)?Object.assign({},a,e):a,this.worker&&(c[g]=new P(e),c[g].worker||(this.worker=!1)),this.worker||(c[g]=new M(e,this.register)),this.tree[f]=S(g,this.marker),this.field[f]=g;if(this.storetree)for(a=b.store,y(a)&&(a=[a]),b=0;b<a.length;b++)this.storetree[b]=S(a[b],this.marker);this.index=c}
function S(a,b){for(var c=a.split(":"),d=0,f=0;f<c.length;f++)a=c[f],0<=a.indexOf("[]")&&(a=a.substring(0,a.length-2))&&(b[d]=!0),a&&(c[d++]=a);d<c.length&&(c.length=d);return 1<d?c:c[0]}function T(a,b){if(y(b))a=a[b];else for(var c=0;a&&c<b.length;c++)a=a[b[c]];return a}function U(a,b,c,d,f){a=a[f];if(d===c.length-1)b[f]=a;else if(a)if(a.constructor===Array)for(b=b[f]=Array(a.length),f=0;f<a.length;f++)U(a,b,c,d,f);else b=b[f]||(b[f]=x()),f=c[++d],U(a,b,c,d,f)}
function V(a,b,c,d,f,g,e,h){if(a=a[e])if(d===b.length-1){if(a.constructor===Array){if(c[d]){for(b=0;b<a.length;b++)f.add(g,a[b],!0,!0);return}a=a.join(" ")}f.add(g,a,h,!0)}else if(a.constructor===Array)for(e=0;e<a.length;e++)V(a,b,c,d,f,g,e,h);else e=b[++d],V(a,b,c,d,f,g,e,h)}R.prototype.push_index=V;
R.prototype.add=function(a,b,c){z(a)&&(b=a,a=T(b,this.key));if(b&&(a||0===a)){if(!c&&this.register[a])return this.update(a,b);for(var d=0,f,g;d<this.field.length;d++)g=this.field[d],f=this.tree[d],y(f)&&(f=[f]),V(b,f,this.marker,0,this.index[g],a,f[0],c);if(this.tag){d=T(b,this.tag);f=x();y(d)&&(d=[d]);g=0;for(var e;g<d.length;g++)if(e=d[g],!f[e]&&(f[e]=1,e=this.tagindex[e]||(this.tagindex[e]=[]),!c||!e.includes(a)))if(e[e.length]=a,this.fastupdate){var h=this.register[a]||(this.register[a]=[]);h[h.length]=
e}}if(this.store&&(!c||!this.store[a])){if(this.storetree){var k=x();for(c=0;c<this.storetree.length;c++)d=this.storetree[c],y(d)?k[d]=b[d]:U(b,k,d,0,d[0])}this.store[a]=k||b}}return this};R.prototype.append=function(a,b){return this.add(a,b,!0)};R.prototype.update=function(a,b){return this.remove(a).add(a,b)};
R.prototype.remove=function(a){z(a)&&(a=T(a,this.key));if(this.register[a]){for(var b=0;b<this.field.length&&(this.index[this.field[b]].remove(a,!this.worker),!this.fastupdate);b++);if(this.tag&&!this.fastupdate)for(var c in this.tagindex){b=this.tagindex[c];var d=b.indexOf(a);-1!==d&&(1<b.length?b.splice(d,1):delete this.tagindex[c])}this.store&&delete this.store[a];delete this.register[a]}return this};
R.prototype.search=function(a,b,c,d){c||(!b&&z(a)?(c=a,a=""):z(b)&&(c=b,b=0));var f=[],g=[],e,h=0;if(c)if(c.constructor===Array){var k=c;c=null}else{a=c.query||a;k=(e=c.pluck)||c.index||c.field;var m=c.tag;var r=this.store&&c.enrich;var p="and"===c.bool;b=c.limit||b||100;var q=c.offset||0;if(m&&(y(m)&&(m=[m]),!a)){g=0;for(e=void 0;g<m.length;g++)if(e=ua.call(this,m[g],b,q,r))f[f.length]=e,h++;return h?f:[]}y(k)&&(k=[k])}k||(k=this.field);p=p&&(1<k.length||m&&1<m.length);for(var n=!d&&(this.worker||
this.async)&&[],t=0,v=void 0,A=void 0,B=void 0;t<k.length;t++)if(v=void 0,A=k[t],y(A)||(v=A,A=v.field,a=v.query||a,b=v.limit||b),n)n[t]=this.index[A].searchAsync(a,b,v||c);else{B=(v=d?d[t]:this.index[A].search(a,b,v||c))&&v.length;if(m&&B){var C=[],D=0;p&&(C[0]=[v]);var W=0,G=void 0;for(G=void 0;W<m.length;W++)if(G=m[W],B=(G=this.tagindex[G])&&G.length)D++,C[C.length]=p?[G]:G;D&&(v=p?ka(C,b||100,q||0):la(v,C),B=v.length)}if(B)g[h]=A,f[h++]=v;else if(p)return[]}if(n){var Aa=this;return new Promise(function(Ba){Promise.all(n).then(function(Ca){Ba(Aa.search(a,
b,c,Ca))})})}if(!h)return[];if(e&&(!r||!this.store))return f[0];m=0;for(q=void 0;m<g.length;m++){q=f[m];q.length&&r&&(q=va.call(this,q));if(e)return q;f[m]={field:g[m],result:q}}return f};function ua(a,b,c,d){var f=this.tagindex[a],g=f&&f.length-c;if(g&&0<g){if(g>b||c)f=f.slice(c,c+b);d&&(f=va.call(this,f));return{tag:a,result:f}}}function va(a){for(var b=Array(a.length),c=0,d;c<a.length;c++)d=a[c],b[c]={id:d,doc:this.store[d]};return b}R.prototype.contain=function(a){return!!this.register[a]};
R.prototype.get=function(a){return this.store[a]};R.prototype.set=function(a,b){this.store[a]=b;return this};R.prototype.searchCache=ma;R.prototype.export=function(a,b,c,d,f){f||(f=0);d||(d=0);if(d<this.field.length){var g=this.field[d],e=this.index[g];b=this;setTimeout(function(){e.export(a,b,f?g:"",d,f++)||(d++,f=1,b.export(a,b,g,d,f))})}else{switch(f){case 1:var h="tag";var k=this.tagindex;break;case 2:h="store";k=this.store;break;default:return}oa(a,this,c,h,d,f,k)}};
R.prototype.import=function(a,b){if(b)switch(y(b)&&(b=JSON.parse(b)),a=a.replace(/(\w+\.)(store|tag)/,"$2"),a){case "tag":this.tagindex?(a=Object.keys(b)[0],this.tagindex[a]=b[a]):this.tagindex=b;break;case "reg":this.fastupdate=!1;this.register=b;a=0;for(var c;a<this.field.length;a++)c=this.index[this.field[a]],c.register=b,c.fastupdate=!1;break;case "store":this.store?(a=Object.keys(b)[0],this.store[a]=b[a]):this.store=b;break;default:a=a.split("."),c=a[0],a=a[1],c&&a&&this.index[c].import(a,b)}};
ja(R.prototype);var xa={encode:wa,rtl:!1,tokenize:""},ya=I("[\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5]"),za=I("[\u00e8\u00e9\u00ea\u00eb]"),Da=I("[\u00ec\u00ed\u00ee\u00ef]"),Ea=I("[\u00f2\u00f3\u00f4\u00f5\u00f6\u0151]"),Fa=I("[\u00f9\u00fa\u00fb\u00fc\u0171]"),Ga=I("[\u00fd\u0177\u00ff]"),Ha=I("\u00f1"),Ia=I("[\u00e7c]"),Ja=I("\u00df"),Ka=I(" & "),La=[ya,"a",za,"e",Da,"i",Ea,"o",Fa,"u",Ga,"y",Ha,"n",Ia,"k",Ja,"s",Ka," and "];
function wa(a){var b=a=""+a;b.normalize&&(b=b.normalize("NFD").replace(da,""));return ba.call(this,b.toLowerCase(),!a.normalize&&La,ca,!1)};var Na={encode:Ma,rtl:!1,tokenize:"strict"},Oa=/[^a-z0-9]+/,Pa={b:"p",v:"f",w:"f",z:"s",x:"s","\u00df":"s",d:"t",n:"m",c:"k",g:"k",j:"k",q:"k",i:"e",y:"e",u:"o"};function Ma(a){a=wa.call(this,a).join(" ");var b=[];if(a)for(var c=a.split(Oa),d=c.length,f=0,g,e=0;f<d;f++)if((a=c[f])&&(!this.filter||!this.filter[a])){g=a[0];for(var h=Pa[g]||g,k=h,m=1;m<a.length;m++)g=a[m],(g=Pa[g]||g)&&g!==k&&(h+=g,k=g);b[e++]=h}return b};var Ra={encode:Qa,rtl:!1,tokenize:""},Sa=I("ae"),Ta=I("oe"),Ua=I("sh"),Va=I("th"),Wa=I("ph"),Xa=I("pf"),Ya=[Sa,"a",Ta,"o",Ua,"s",Va,"t",Wa,"f",Xa,"f",I("(?![aeo])h(?![aeo])"),"",I("(?!^[aeo])h(?!^[aeo])"),""];function Qa(a,b){a&&(a=Ma.call(this,a).join(" "),2<a.length&&(a=F(a,Ya)),b||(1<a.length&&(a=H(a)),a&&(a=a.split(" "))));return a||[]};var $a={encode:Za,rtl:!1,tokenize:""},ab=I("(?!\\b)[aeo]");function Za(a){a&&(a=Qa.call(this,a,!0),1<a.length&&(a=a.replace(ab,"")),1<a.length&&(a=H(a)),a&&(a=a.split(" ")));return a||[]};J["latin:default"]=ha;J["latin:simple"]=xa;J["latin:balance"]=Na;J["latin:advanced"]=Ra;J["latin:extra"]=$a;var X=self,Y,Z={Index:M,Document:R,Worker:P,registerCharset:function(a,b){J[a]=b},registerLanguage:function(a,b){ia[a]=b}};(Y=X.define)&&Y.amd?Y([],function(){return Z}):X.exports?X.exports=Z:X.FlexSearch=Z;}(this));
