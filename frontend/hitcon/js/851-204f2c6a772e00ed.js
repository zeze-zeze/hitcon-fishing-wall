"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[851],{7851:function(e,r,o){o.d(r,{m:function(){return O}});var t=/^\[(.+)\]$/;function n(e,r){var o=e;return r.split("-").forEach((function(e){o.nextPart.has(e)||o.nextPart.set(e,{nextPart:new Map,validators:[]}),o=o.nextPart.get(e)})),o}var i=/\s+/;function l(){for(var e,r,o=0,t="";o<arguments.length;)(e=arguments[o++])&&(r=function e(r){if("string"==typeof r)return r;for(var o,t="",n=0;n<r.length;n++)r[n]&&(o=e(r[n]))&&(t&&(t+=" "),t+=o);return t}(e))&&(t&&(t+=" "),t+=r);return t}function a(e){var r=function(r){return r[e]||[]};return r.isThemeGetter=!0,r}var s=/^\[(?:([a-z-]+):)?(.+)\]$/i,c=/^\d+\/\d+$/,d=new Set(["px","full","screen"]),u=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,p=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|^0$/,b=/^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;function f(e){return y(e)||d.has(e)||c.test(e)||m(e)}function m(e){return I(e,"length",M)}function g(e){return I(e,"size",P)}function h(e){return I(e,"position",P)}function v(e){return I(e,"url",N)}function x(e){return I(e,"number",y)}function y(e){return!Number.isNaN(Number(e))}function w(e){return e.endsWith("%")&&y(e.slice(0,-1))}function k(e){return S(e)||I(e,"number",S)}function z(e){return s.test(e)}function C(){return!0}function j(e){return u.test(e)}function G(e){return I(e,"",E)}function I(e,r,o){var t=s.exec(e);return!!t&&(t[1]?t[1]===r:o(t[2]))}function M(e){return p.test(e)}function P(){return!1}function N(e){return e.startsWith("url(")}function S(e){return Number.isInteger(Number(e))}function E(e){return b.test(e)}var O=function(){for(var e,r,o,a=arguments.length,s=Array(a),c=0;c<a;c++)s[c]=arguments[c];var d=function(i){var l=s[0];return r=(e=function(e){var r,o,i,l,a,s,c,d,u,p,b;return{cache:function(e){if(e<1)return{get:function(){},set:function(){}};var r=0,o=new Map,t=new Map;function n(n,i){o.set(n,i),++r>e&&(r=0,t=o,o=new Map)}return{get:function(e){var r=o.get(e);return void 0!==r?r:void 0!==(r=t.get(e))?(n(e,r),r):void 0},set:function(e,r){o.has(e)?o.set(e,r):n(e,r)}}}(e.cacheSize),splitModifiers:(o=1===(r=e.separator||":").length,i=r[0],l=r.length,function(e){for(var t,n=[],a=0,s=0,c=0;c<e.length;c++){var d=e[c];if(0===a){if(d===i&&(o||e.slice(c,c+l)===r)){n.push(e.slice(s,c)),s=c+l;continue}if("/"===d){t=c;continue}}"["===d?a++:"]"===d&&a--}var u=0===n.length?e:e.substring(s),p=u.startsWith("!");return{modifiers:n,hasImportantModifier:p,baseClassName:p?u.substring(1):u,maybePostfixModifierPosition:t&&t>s?t-s:void 0}}),...(d=e.theme,u=e.prefix,p={nextPart:new Map,validators:[]},(b=Object.entries(e.classGroups),u?b.map((function(e){return[e[0],e[1].map((function(e){return"string"==typeof e?u+e:"object"==typeof e?Object.fromEntries(Object.entries(e).map((function(e){return[u+e[0],e[1]]}))):e}))]})):b).forEach((function(e){var r=e[0];!function e(r,o,t,i){r.forEach((function(r){if("string"!=typeof r)return"function"==typeof r?r.isThemeGetter?void e(r(i),o,t,i):void o.validators.push({validator:r,classGroupId:t}):void Object.entries(r).forEach((function(r){var l=r[0];e(r[1],n(o,l),t,i)}));(""===r?o:n(o,r)).classGroupId=t}))}(e[1],p,r,d)})),a=e.conflictingClassGroups,c=void 0===(s=e.conflictingClassGroupModifiers)?{}:s,{getClassGroupId:function(e){var r=e.split("-");return""===r[0]&&1!==r.length&&r.shift(),function e(r,o){if(0===r.length)return o.classGroupId;var t=r[0],n=o.nextPart.get(t),i=n?e(r.slice(1),n):void 0;if(i)return i;if(0!==o.validators.length){var l=r.join("-");return o.validators.find((function(e){return(0,e.validator)(l)}))?.classGroupId}}(r,p)||function(e){if(t.test(e)){var r=t.exec(e)[1],o=r?.substring(0,r.indexOf(":"));if(o)return"arbitrary.."+o}}(e)},getConflictingClassGroupIds:function(e,r){var o=a[e]||[];return r&&c[e]?[].concat(o,c[e]):o}})}}(s.slice(1).reduce((function(e,r){return r(e)}),l()))).cache.get,o=e.cache.set,d=u,u(i)};function u(t){var n,l,a,s,c,d=r(t);if(d)return d;var u=(l=(n=e).splitModifiers,a=n.getClassGroupId,s=n.getConflictingClassGroupIds,c=new Set,t.trim().split(i).map((function(e){var r=l(e),o=r.modifiers,t=r.hasImportantModifier,n=r.baseClassName,i=r.maybePostfixModifierPosition,s=a(i?n.substring(0,i):n),c=!!i;if(!s){if(!i||!(s=a(n)))return{isTailwindClass:!1,originalClassName:e};c=!1}var d=function(e){if(e.length<=1)return e;var r=[],o=[];return e.forEach((function(e){"["===e[0]?(r.push.apply(r,o.sort().concat([e])),o=[]):o.push(e)})),r.push.apply(r,o.sort()),r}(o).join(":");return{isTailwindClass:!0,modifierId:t?d+"!":d,classGroupId:s,originalClassName:e,hasPostfixModifier:c}})).reverse().filter((function(e){if(!e.isTailwindClass)return!0;var r=e.modifierId,o=e.classGroupId,t=e.hasPostfixModifier,n=r+o;return!c.has(n)&&(c.add(n),s(o,t).forEach((function(e){return c.add(r+e)})),!0)})).reverse().map((function(e){return e.originalClassName})).join(" "));return o(t,u),u}return function(){return d(l.apply(null,arguments))}}((function(){var e=a("colors"),r=a("spacing"),o=a("blur"),t=a("brightness"),n=a("borderColor"),i=a("borderRadius"),l=a("borderSpacing"),s=a("borderWidth"),c=a("contrast"),d=a("grayscale"),u=a("hueRotate"),p=a("invert"),b=a("gap"),I=a("gradientColorStops"),M=a("gradientColorStopPositions"),P=a("inset"),N=a("margin"),S=a("opacity"),E=a("padding"),O=a("saturate"),T=a("scale"),W=a("sepia"),$=a("skew"),_=a("space"),R=a("translate"),q=function(){return["auto",r]},A=function(){return["",f]},B=function(){return["auto",y,z]},D=function(){return["","0",z]},F=function(){return[y,x]},H=function(){return[y,z]};return{cacheSize:500,theme:{colors:[C],spacing:[f],blur:["none","",j,m],brightness:F(),borderColor:[e],borderRadius:["none","","full",j,m],borderSpacing:[r],borderWidth:A(),contrast:F(),grayscale:D(),hueRotate:H(),invert:D(),gap:[r],gradientColorStops:[e],gradientColorStopPositions:[w,m],inset:q(),margin:q(),opacity:F(),padding:[r],saturate:F(),scale:F(),sepia:D(),skew:H(),space:[r],translate:[r]},classGroups:{aspect:[{aspect:["auto","square","video",z]}],container:["container"],columns:[{columns:[j]}],"break-after":[{"break-after":["auto","avoid","all","avoid-page","page","left","right","column"]}],"break-before":[{"break-before":["auto","avoid","all","avoid-page","page","left","right","column"]}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none"]}],clear:[{clear:["left","right","both","none"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[].concat(["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],[z])}],overflow:[{overflow:["auto","hidden","clip","visible","scroll"]}],"overflow-x":[{"overflow-x":["auto","hidden","clip","visible","scroll"]}],"overflow-y":[{"overflow-y":["auto","hidden","clip","visible","scroll"]}],overscroll:[{overscroll:["auto","contain","none"]}],"overscroll-x":[{"overscroll-x":["auto","contain","none"]}],"overscroll-y":[{"overscroll-y":["auto","contain","none"]}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[P]}],"inset-x":[{"inset-x":[P]}],"inset-y":[{"inset-y":[P]}],start:[{start:[P]}],end:[{end:[P]}],top:[{top:[P]}],right:[{right:[P]}],bottom:[{bottom:[P]}],left:[{left:[P]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",k]}],basis:[{basis:q()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",z]}],grow:[{grow:D()}],shrink:[{shrink:D()}],order:[{order:["first","last","none",k]}],"grid-cols":[{"grid-cols":[C]}],"col-start-end":[{col:["auto",{span:[k]},z]}],"col-start":[{"col-start":B()}],"col-end":[{"col-end":B()}],"grid-rows":[{"grid-rows":[C]}],"row-start-end":[{row:["auto",{span:[k]},z]}],"row-start":[{"row-start":B()}],"row-end":[{"row-end":B()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",z]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",z]}],gap:[{gap:[b]}],"gap-x":[{"gap-x":[b]}],"gap-y":[{"gap-y":[b]}],"justify-content":[{justify:["normal"].concat(["start","end","center","between","around","evenly","stretch"])}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal"].concat(["start","end","center","between","around","evenly","stretch"],["baseline"])}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[].concat(["start","end","center","between","around","evenly","stretch"],["baseline"])}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[E]}],px:[{px:[E]}],py:[{py:[E]}],ps:[{ps:[E]}],pe:[{pe:[E]}],pt:[{pt:[E]}],pr:[{pr:[E]}],pb:[{pb:[E]}],pl:[{pl:[E]}],m:[{m:[N]}],mx:[{mx:[N]}],my:[{my:[N]}],ms:[{ms:[N]}],me:[{me:[N]}],mt:[{mt:[N]}],mr:[{mr:[N]}],mb:[{mb:[N]}],ml:[{ml:[N]}],"space-x":[{"space-x":[_]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[_]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit",r]}],"min-w":[{"min-w":["min","max","fit",f]}],"max-w":[{"max-w":["0","none","full","min","max","fit","prose",{screen:[j]},j,m]}],h:[{h:[r,"auto","min","max","fit"]}],"min-h":[{"min-h":["min","max","fit",f]}],"max-h":[{"max-h":[r,"min","max","fit"]}],"font-size":[{text:["base",j,m]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",x]}],"font-family":[{font:[C]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractons"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",m]}],"line-clamp":[{"line-clamp":["none",y,x]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",f]}],"list-image":[{"list-image":["none",z]}],"list-style-type":[{list:["none","disc","decimal",z]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[S]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[S]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[].concat(["solid","dashed","dotted","double","none"],["wavy"])}],"text-decoration-thickness":[{decoration:["auto","from-font",f]}],"underline-offset":[{"underline-offset":["auto",f]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],indent:[{indent:[r]}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",m]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",z]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[S]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[].concat(["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],[h])}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",g]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},v]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[M]}],"gradient-via-pos":[{via:[M]}],"gradient-to-pos":[{to:[M]}],"gradient-from":[{from:[I]}],"gradient-via":[{via:[I]}],"gradient-to":[{to:[I]}],rounded:[{rounded:[i]}],"rounded-s":[{"rounded-s":[i]}],"rounded-e":[{"rounded-e":[i]}],"rounded-t":[{"rounded-t":[i]}],"rounded-r":[{"rounded-r":[i]}],"rounded-b":[{"rounded-b":[i]}],"rounded-l":[{"rounded-l":[i]}],"rounded-ss":[{"rounded-ss":[i]}],"rounded-se":[{"rounded-se":[i]}],"rounded-ee":[{"rounded-ee":[i]}],"rounded-es":[{"rounded-es":[i]}],"rounded-tl":[{"rounded-tl":[i]}],"rounded-tr":[{"rounded-tr":[i]}],"rounded-br":[{"rounded-br":[i]}],"rounded-bl":[{"rounded-bl":[i]}],"border-w":[{border:[s]}],"border-w-x":[{"border-x":[s]}],"border-w-y":[{"border-y":[s]}],"border-w-s":[{"border-s":[s]}],"border-w-e":[{"border-e":[s]}],"border-w-t":[{"border-t":[s]}],"border-w-r":[{"border-r":[s]}],"border-w-b":[{"border-b":[s]}],"border-w-l":[{"border-l":[s]}],"border-opacity":[{"border-opacity":[S]}],"border-style":[{border:[].concat(["solid","dashed","dotted","double","none"],["hidden"])}],"divide-x":[{"divide-x":[s]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[s]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[S]}],"divide-style":[{divide:["solid","dashed","dotted","double","none"]}],"border-color":[{border:[n]}],"border-color-x":[{"border-x":[n]}],"border-color-y":[{"border-y":[n]}],"border-color-t":[{"border-t":[n]}],"border-color-r":[{"border-r":[n]}],"border-color-b":[{"border-b":[n]}],"border-color-l":[{"border-l":[n]}],"divide-color":[{divide:[n]}],"outline-style":[{outline:[""].concat(["solid","dashed","dotted","double","none"])}],"outline-offset":[{"outline-offset":[f]}],"outline-w":[{outline:[f]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:A()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[S]}],"ring-offset-w":[{"ring-offset":[f]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",j,G]}],"shadow-color":[{shadow:[C]}],opacity:[{opacity:[S]}],"mix-blend":[{"mix-blend":["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity","plus-lighter"]}],"bg-blend":[{"bg-blend":["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity","plus-lighter"]}],filter:[{filter:["","none"]}],blur:[{blur:[o]}],brightness:[{brightness:[t]}],contrast:[{contrast:[c]}],"drop-shadow":[{"drop-shadow":["","none",j,z]}],grayscale:[{grayscale:[d]}],"hue-rotate":[{"hue-rotate":[u]}],invert:[{invert:[p]}],saturate:[{saturate:[O]}],sepia:[{sepia:[W]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[o]}],"backdrop-brightness":[{"backdrop-brightness":[t]}],"backdrop-contrast":[{"backdrop-contrast":[c]}],"backdrop-grayscale":[{"backdrop-grayscale":[d]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[u]}],"backdrop-invert":[{"backdrop-invert":[p]}],"backdrop-opacity":[{"backdrop-opacity":[S]}],"backdrop-saturate":[{"backdrop-saturate":[O]}],"backdrop-sepia":[{"backdrop-sepia":[W]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[l]}],"border-spacing-x":[{"border-spacing-x":[l]}],"border-spacing-y":[{"border-spacing-y":[l]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",z]}],duration:[{duration:H()}],ease:[{ease:["linear","in","out","in-out",z]}],delay:[{delay:H()}],animate:[{animate:["none","spin","ping","pulse","bounce",z]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[T]}],"scale-x":[{"scale-x":[T]}],"scale-y":[{"scale-y":[T]}],rotate:[{rotate:[k,z]}],"translate-x":[{"translate-x":[R]}],"translate-y":[{"translate-y":[R]}],"skew-x":[{"skew-x":[$]}],"skew-y":[{"skew-y":[$]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",z]}],accent:[{accent:["auto",e]}],appearance:["appearance-none"],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",z]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":[r]}],"scroll-mx":[{"scroll-mx":[r]}],"scroll-my":[{"scroll-my":[r]}],"scroll-ms":[{"scroll-ms":[r]}],"scroll-me":[{"scroll-me":[r]}],"scroll-mt":[{"scroll-mt":[r]}],"scroll-mr":[{"scroll-mr":[r]}],"scroll-mb":[{"scroll-mb":[r]}],"scroll-ml":[{"scroll-ml":[r]}],"scroll-p":[{"scroll-p":[r]}],"scroll-px":[{"scroll-px":[r]}],"scroll-py":[{"scroll-py":[r]}],"scroll-ps":[{"scroll-ps":[r]}],"scroll-pe":[{"scroll-pe":[r]}],"scroll-pt":[{"scroll-pt":[r]}],"scroll-pr":[{"scroll-pr":[r]}],"scroll-pb":[{"scroll-pb":[r]}],"scroll-pl":[{"scroll-pl":[r]}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","pinch-zoom","manipulation",{pan:["x","left","right","y","up","down"]}]}],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",z]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[f,x]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}}))}}]);