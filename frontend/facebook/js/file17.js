;/*FB_PKG_DELIM*/

"use strict";(function(){var a=typeof globalThis!=="undefined"&&globalThis||typeof self!=="undefined"&&self||typeof global!=="undefined"&&global;if(typeof a.AbortController!=="undefined")return;var b=function(){function a(){this.__listeners=new Map()}a.prototype=Object.create(Object.prototype);a.prototype.addEventListener=function(a,b,c){if(arguments.length<2)throw new TypeError("TypeError: Failed to execute 'addEventListener' on 'CustomEventTarget': 2 arguments required, but only "+arguments.length+" present.");var d=this.__listeners,e=a.toString();d.has(e)||d.set(e,new Map());var f=d.get(e);f.has(b)||f.set(b,c)};a.prototype.removeEventListener=function(a,b,c){if(arguments.length<2)throw new TypeError("TypeError: Failed to execute 'addEventListener' on 'CustomEventTarget': 2 arguments required, but only "+arguments.length+" present.");var d=this.__listeners,e=a.toString();if(d.has(e)){var f=d.get(e);f.has(b)&&f["delete"](b)}};a.prototype.dispatchEvent=function(a){if(!(a instanceof Event))throw new TypeError("Failed to execute 'dispatchEvent' on 'CustomEventTarget': parameter 1 is not of type 'Event'.");var b=a.type,c=this.__listeners;c=c.get(b);if(c)for(var b=c.entries(),d=Array.isArray(b),e=0,b=d?b:b[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var f;if(d){if(e>=b.length)break;f=b[e++]}else{e=b.next();if(e.done)break;f=e.value}f=f;var g=f[0];f=f[1];try{typeof g==="function"?g.call(this,a):g&&typeof g.handleEvent==="function"&&g.handleEvent(a)}catch(a){setTimeout(function(){throw a})}f&&f.once&&c["delete"](g)}return!0};return a}(),c={};a.AbortSignal=function(){function a(a){if(a!==c)throw new TypeError("Illegal constructor.");b.call(this);this._aborted=!1}a.prototype=Object.create(b.prototype);a.prototype.constructor=a;Object.defineProperty(a.prototype,"onabort",{get:function(){return this._onabort},set:function(a){var b=this._onabort;b&&this.removeEventListener("abort",b);this._onabort=a;this.addEventListener("abort",a)}});Object.defineProperty(a.prototype,"aborted",{get:function(){return this._aborted}});return a}();a.AbortController=function(){function a(){this._signal=new AbortSignal(c)}a.prototype=Object.create(Object.prototype);Object.defineProperty(a.prototype,"signal",{get:function(){return this._signal}});a.prototype.abort=function(){var a=this.signal;a.aborted||(a._aborted=!0,a.dispatchEvent(new Event("abort")))};return a}()})();



"use strict";(function(){if(!Array.prototype.flat){var a=function b(a){return a<1?Array.prototype.slice.call(this):Array.prototype.reduce.call(this,function(c,d){Array.isArray(d)?c.push.apply(c,b.call(d,a-1)):c.push(d);return c},[])};Array.prototype.flat=function(){return a.call(this,isNaN(arguments[0])?1:Number(arguments[0]))}}if(!Array.prototype.flatMap){var b=function(a,b){var c=[];if(typeof b!=="function")throw new TypeError("Callback function must be callable.");for(var d=0;d<a.length;d++){var e=b.call(a,a[d],d,a);Array.isArray(e)?c.push.apply(c,e):c.push(e)}return c};Array.prototype.flatMap=function(a){var c=arguments[1]||this;return b(c,a)}}})();


(function(){"use strict";var a=Array.prototype.indexOf;Array.prototype.includes||(Array.prototype.includes=function(d){"use strict";if(d!==void 0&&Array.isArray(this)&&!Number.isNaN(d))return a.apply(this,arguments)!==-1;var e=Object(this),f=e.length?b(e.length):0;if(f===0)return!1;var g=arguments.length>1?c(arguments[1]):0,h=g<0?Math.max(f+g,0):g,i=Number.isNaN(d);while(h<f){var j=e[h];if(j===d||i&&Number.isNaN(j))return!0;h++}return!1});function b(a){return Math.min(Math.max(c(a),0),Number.MAX_SAFE_INTEGER)}function c(a){a=Number(a);return Number.isFinite(a)&&a!==0?d(a)*Math.floor(Math.abs(a)):a}function d(a){return a>=0?1:-1}if(!Array.prototype.values){var e=typeof Symbol==="function"?Symbol.iterator:"@@iterator",f=function(){function a(a){this.$1=void 0;this.$2=0;if(a==null)throw new TypeError("Cannot convert undefined or null to object");this.$1=Object(a)}var b=a.prototype;b.next=function(){if(this.$1==null||this.$2>=this.$1.length){this.$1=void 0;return{value:void 0,done:!0}}var a=this.$1[this.$2];this.$2++;return{value:a,done:!1}};b[e]=function(){return this};return a}();Array.prototype.values=function(){return new f(this)}}Array.prototype[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]||(Array.prototype[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]=Array.prototype.values)})();
(function(a){var b={},c=function(a,b){if(!a&&!b)return null;var c={};typeof a!=="undefined"&&(c.type=a);typeof b!=="undefined"&&(c.signature=b);return c},d=function(a,b){return c(a&&/^[A-Z]/.test(a)?a:void 0,b&&(b.params&&b.params.length||b.returns)?"function("+(b.params?b.params.map(function(a){return/\?/.test(a)?"?"+a.replace("?",""):a}).join(","):"")+")"+(b.returns?":"+b.returns:""):void 0)},e=function(a,b,c){return a},f=function(a,b,c){"sourcemeta"in __transform_includes&&(a.__SMmeta=b);if("typechecks"in __transform_includes){b=d(b?b.name:void 0,c);b&&__w(a,b)}return a},g=function(a,b,c){return c.apply(a,b)},h=function(a,b,c,d){d&&d.params&&__t.apply(a,d.params);c=c.apply(a,b);d&&d.returns&&__t([c,d.returns]);return c};h=function(a,c,d,e,f){if(f){f.callId||(f.callId=f.module+":"+(f.line||0)+":"+(f.column||0));e=f.callId;b[e]=(b[e]||0)+1}return d.apply(a,c)};typeof __transform_includes==="undefined"?(a.__annotator=e,a.__bodyWrapper=g):(a.__annotator=f,"codeusage"in __transform_includes?(a.__annotator=e,a.__bodyWrapper=h,a.__bodyWrapper.getCodeUsage=function(){return b},a.__bodyWrapper.clearCodeUsage=function(){b={}}):"typechecks"in __transform_includes?a.__bodyWrapper=g:a.__bodyWrapper=g)})(typeof globalThis!=="undefined"?globalThis:typeof global!=="undefined"?global:typeof window!=="undefined"?window:typeof this!=="undefined"?this:typeof self!=="undefined"?self:{});
(function(a){a.__t=function(a){return a[0]},a.__w=function(a){return a}})(typeof globalThis!=="undefined"?globalThis:typeof global!=="undefined"?global:typeof window!=="undefined"?window:typeof this!=="undefined"?this:typeof self!=="undefined"?self:{});
self.__DEV__=self.__DEV__||0,self.emptyFunction=function(){};



(function(a,b){var c="keys",d="values",e="entries",f=function(){var a=h(Array),b;a||(b=function(){"use strict";function a(a,b){this.$1=a,this.$2=b,this.$3=0}var b=a.prototype;b.next=function(){if(this.$1==null)return{value:void 0,done:!0};var a=this.$1,b=this.$1.length,f=this.$3,g=this.$2;if(f>=b){this.$1=void 0;return{value:void 0,done:!0}}this.$3=f+1;if(g===c)return{value:f,done:!1};else if(g===d)return{value:a[f],done:!1};else if(g===e)return{value:[f,a[f]],done:!1}};b[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]=function(){return this};return a}());return{keys:a?function(a){return a.keys()}:function(a){return new b(a,c)},values:a?function(a){return a.values()}:function(a){return new b(a,d)},entries:a?function(a){return a.entries()}:function(a){return new b(a,e)}}}(),g=function(){var a=h(String),b;a||(b=function(){"use strict";function a(a){this.$1=a,this.$2=0}var b=a.prototype;b.next=function(){if(this.$1==null)return{value:void 0,done:!0};var a=this.$2,b=this.$1,c=b.length;if(a>=c){this.$1=void 0;return{value:void 0,done:!0}}var d=b.charCodeAt(a);if(d<55296||d>56319||a+1===c)d=b[a];else{c=b.charCodeAt(a+1);c<56320||c>57343?d=b[a]:d=b[a]+b[a+1]}this.$2=a+d.length;return{value:d,done:!1}};b[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]=function(){return this};return a}());return{keys:function(){throw TypeError("Strings default iterator doesn't implement keys.")},values:a?function(a){return a[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]()}:function(a){return new b(a)},entries:function(){throw TypeError("Strings default iterator doesn't implement entries.")}}}();function h(a){return typeof a.prototype[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]==="function"&&typeof a.prototype.values==="function"&&typeof a.prototype.keys==="function"&&typeof a.prototype.entries==="function"}var i=function(){"use strict";function a(a,b){this.$1=a,this.$2=b,this.$3=Object.keys(a),this.$4=0}var b=a.prototype;b.next=function(){var a=this.$3.length,b=this.$4,f=this.$2,g=this.$3[b];if(b>=a){this.$1=void 0;return{value:void 0,done:!0}}this.$4=b+1;if(f===c)return{value:g,done:!1};else if(f===d)return{value:this.$1[g],done:!1};else if(f===e)return{value:[g,this.$1[g]],done:!1}};b[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]=function(){return this};return a}(),j={keys:function(a){return new i(a,c)},values:function(a){return new i(a,d)},entries:function(a){return new i(a,e)}};function k(a,b){if(typeof a==="string")return g[b||d](a);else if(Array.isArray(a))return f[b||d](a);else if(a[typeof Symbol==="function"?Symbol.iterator:"@@iterator"])return a[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();else return j[b||e](a)}Object.assign(k,{KIND_KEYS:c,KIND_VALUES:d,KIND_ENTRIES:e,keys:function(a){return k(a,c)},values:function(a){return k(a,d)},entries:function(a){return k(a,e)},generic:j.entries});a.FB_enumerate=k})(typeof global==="object"?global:typeof this==="object"?this:typeof window==="object"?window:typeof self==="object"?self:{});
