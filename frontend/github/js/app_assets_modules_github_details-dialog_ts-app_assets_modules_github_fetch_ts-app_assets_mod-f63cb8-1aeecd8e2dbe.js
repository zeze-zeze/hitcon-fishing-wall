"use strict";(globalThis.webpackChunk=globalThis.webpackChunk||[]).push([["app_assets_modules_github_details-dialog_ts-app_assets_modules_github_fetch_ts-app_assets_mod-f63cb8"],{19146:(e,t,o)=>{o.d(t,{W:()=>s});var i=o(59753);async function s(e){let t=document.querySelector("#site-details-dialog").content.cloneNode(!0),o=t.querySelector("details"),s=o.querySelector("details-dialog"),r=o.querySelector(".js-details-dialog-spinner");e.detailsClass&&o.classList.add(...e.detailsClass.split(" ")),e.dialogClass&&s.classList.add(...e.dialogClass.split(" ")),e.label?s.setAttribute("aria-label",e.label):e.labelledBy&&s.setAttribute("aria-labelledby",e.labelledBy),document.body.append(t);try{let t=await e.content;r.remove(),s.prepend(t)}catch(t){r.remove();let o=document.createElement("span");o.textContent=e.errorMessage||"Couldn't load the content",o.classList.add("my-6"),o.classList.add("mx-4"),s.prepend(o)}return o.addEventListener("toggle",(()=>{o.hasAttribute("open")||((0,i.f)(s,"dialog:remove"),o.remove())})),s}},34892:(e,t,o)=>{o.d(t,{DF:()=>l,Fr:()=>d,a_:()=>c});var i=o(67525);let s=class extends Error{constructor(e,t){super(`${e} for HTTP ${t.status}`),this.response=t}};var r=o(22490),n=o(7180);let a=r.Z.createPolicy("server-x-safe-html",{createHTML:(e,t)=>n.O.apply({policy:()=>(function(e,t,o=!1){let i=t.headers.get("content-type")||"";if(!o&&!i.startsWith("text/html"))throw new s(`expected response with text/html, but was ${i}`,t);if(o&&!i.startsWith("text/html")&&!i.startsWith("application/json"))throw new s(`expected response with text/html or application/json, but was ${i}`,t);let r=t.headers.get("x-html-safe");if(!r)throw new s("missing X-HTML-Safe nonce",t);if(!e.includes(r))throw new s("response X-HTML-Safe nonce did not match",t)}(function(e){let t=[...e.querySelectorAll("meta[name=html-safe-nonce]")].map((e=>e.content));if(t.length<1)throw Error("could not find html-safe-nonce on document");return t}(document),t),e),fallback:e})});async function c(e,t,o){let s=new Request(t,o);s.headers.append("X-Requested-With","XMLHttpRequest");let r=await self.fetch(s);if(r.status<200||r.status>=300)throw Error(`HTTP ${r.status}${r.statusText||""}`);let n=a.createHTML(await r.text(),r);return(0,i.r)(e,n)}function l(e,t,o=1e3,i=[200]){return async function o(s){let r=new Request(e,t);r.headers.append("X-Requested-With","XMLHttpRequest");let n=await self.fetch(r);if(202===n.status)return await new Promise((e=>setTimeout(e,s))),o(1.5*s);if(i.includes(n.status))return n;if(n.status<200||n.status>=300)throw Error(`HTTP ${n.status}${n.statusText||""}`);throw Error(`Unexpected ${n.status} response status from poll endpoint`)}(o)}async function d(e,t,o){let{wait:i=500,acceptedStatusCodes:s=[200],max:r=3,attempt:n=0}=o||{},a=await(async()=>new Promise(((o,a)=>{setTimeout((async()=>{try{let i=new Request(e,t);i.headers.append("X-Requested-With","XMLHttpRequest");let a=await self.fetch(i);if(s.includes(a.status)||n+1===r)return o(a);o("retry")}catch(e){a(e)}}),i*n)})))();return"retry"!==a?a:d(e,t,{wait:i,acceptedStatusCodes:s,max:r,attempt:n+1})}},254:(e,t,o)=>{o.d(t,{ZG:()=>a,q6:()=>l,w4:()=>c});var i=o(8439);let s=!1,r=new i.Z;function n(e){let t=e.target;if(t instanceof HTMLElement&&t.nodeType!==Node.DOCUMENT_NODE)for(let e of r.matches(t))e.data.call(null,t)}function a(e,t){s||(s=!0,document.addEventListener("focus",n,!0)),r.add(e,t),document.activeElement instanceof HTMLElement&&document.activeElement.matches(e)&&t(document.activeElement)}function c(e,t,o){function i(t){let s=t.currentTarget;s&&(s.removeEventListener(e,o),s.removeEventListener("blur",i))}a(t,(function(t){t.addEventListener(e,o),t.addEventListener("blur",i)}))}function l(e,t){function o(e){let{currentTarget:i}=e;i&&(i.removeEventListener("input",t),i.removeEventListener("blur",o))}a(e,(function(e){e.addEventListener("input",t),e.addEventListener("blur",o)}))}},67525:(e,t,o)=>{o.d(t,{r:()=>s});let i=o(22490).Z.createPolicy("parse-html-no-op",{createHTML:e=>e});function s(e,t){let o=e.createElement("template");return o.innerHTML=i.createHTML(t),e.importNode(o.content,!0)}},97538:(e,t,o)=>{var i=o(76006),s=function(e,t,o,i){var s,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(r<3?s(n):r>3?s(t,o,n):s(t,o))||n);return r>3&&n&&Object.defineProperty(t,o,n),n};let r=class extends HTMLElement{connectedCallback(){this.toggleSpecificOptions()}toggleSpecificOptions(){this.selectRadio.checked?this.specificOptions.hidden=!1:this.specificOptions.hidden=!0}};s([i.fA],r.prototype,"specificOptions",void 0),s([i.fA],r.prototype,"selectRadio",void 0),r=s([i.Ih],r)},93147:(e,t,o)=>{var i,s,r,n=o(76006),a=o(4412),c=function(e,t,o,i){var s,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(r<3?s(n):r>3?s(t,o,n):s(t,o))||n);return r>3&&n&&Object.defineProperty(t,o,n),n};let l=class extends HTMLElement{async connectedCallback(){await a.x,this.selectRunnerPlatform(),this.customImageUriInput.onkeydown=e=>e.stopPropagation()}selectRunnerPlatform(){let e=this.getSelectedPlatform();this.customImageUriInput.required="custom"===e;let t=this.getSelectedImageVersion(e);t&&(this.updateSelectedImageHint(t),this.machineSpecsDropdown&&this.machineSpecsDropdown.updateOptionsVisibility(e,t))}getSelectedPlatform(){let e=this.platforms.find((e=>e.checked));return e?e.value:"linux-x64"}getSelectedImageVersion(e){return 0===this.imageVersions.length?null:this.imageVersions.find((t=>t.imagePlatform===e&&t.checked))??this.imageVersions[0]}updateSelectedImageHint(e){for(let t of this.selectedImageHints)t.renderContent(e)}};c([n.GO],l.prototype,"platforms",void 0),c([n.GO],l.prototype,"imageVersions",void 0),c([n.GO],l.prototype,"selectedImageHints",void 0),c([n.fA],l.prototype,"customImageUriInput",void 0),c([n.fA],l.prototype,"machineSpecsDropdown",void 0),l=c([n.Ih],l);let d=class extends HTMLElement{updateOptionsVisibility(e,t){for(let o of this.items)o.setVisibility(e,t);this.updateTabsVisibility();let o=this.getSelectedItem();if(!o||!o.visible){let e=this.getFirstVisibleItem();e?.selectItem(),o=e}o&&this.selectTabByType(o.runnerType)}updateTabsVisibility(){let e=0;for(let t of this.tabs){let o=this.items.some((e=>e.runnerType===t.type&&e.visible));e+=o?1:0,t.setVisibility(o)}this.tabsHeader&&(this.tabsHeader.hidden=e<2)}selectTabByType(e){this.tabs.find((t=>t.type===e))?.selectTab()}getSelectedItem(){return this.items.find((e=>e.checked))}getFirstVisibleItem(){return this.items.find((e=>e.visible))}};c([n.GO],d.prototype,"tabs",void 0),c([n.GO],d.prototype,"items",void 0),c([n.fA],d.prototype,"tabsHeader",void 0),d=c([n.Ih],d);let u=class extends HTMLElement{selectTab(){this.clickArea.click()}setVisibility(e){this.hidden=!e}};c([n.fA],u.prototype,"clickArea",void 0),c([n.Lj],u.prototype,"type",void 0),u=c([n.Ih],u);let p=((i=class extends HTMLElement{get checked(){return this.checkbox.checked}get visible(){return!this.hidden}selectItem(){this.checkbox.click()}setVisibility(e,t){this.hidden=!this.shouldBeVisible(e,t)}shouldBeVisible(e,t){return("win-x64"!==e&&"linux-x64"!==e||"gpu_optimized"!==this.runnerType||"Curated"!==t.imageSource)&&!(this.storageGb<t.sizeGb)}constructor(...e){super(...e),this.storageGb=0}}).attrPrefix="",i);c([n.fA],p.prototype,"checkbox",void 0),c([n.Lj],p.prototype,"storageGb",void 0),c([n.Lj],p.prototype,"runnerType",void 0),p=c([n.Ih],p);let h=((s=class extends HTMLElement{get checked(){return this.checkbox.checked}constructor(...e){super(...e),this.sizeGb=0}}).attrPrefix="",s);c([n.fA],h.prototype,"checkbox",void 0),c([n.Lj],h.prototype,"sizeGb",void 0),c([n.Lj],h.prototype,"imagePlatform",void 0),c([n.Lj],h.prototype,"imageSource",void 0),c([n.Lj],h.prototype,"imageId",void 0),h=c([n.Ih],h);let f=class extends HTMLElement{renderContent(e){this.innerHTML=this.getContent(e)}getContent(e){let t="";if("Curated"===e.imageSource){t+=`\n        <p class='text-small color-fg-muted'>\n          GitHub images are kept up to date and secure, containing all the tools you need to get started building and testing your applications. <a href='${this.getCuratedImageInfoUrl(e)}'>Learn more about images.</a>\n        </p>\n      `,("ubuntu-latest"===e.imageId||"windows-latest"===e.imageId)&&(t+='\n          <p class="text-small color-fg-muted">\n            "Latest" tag matches with standard GitHub-hosted runners latest tag for the images. <a href=\'https://github.com/actions/runner-images#label-scheme\'>Learn more about latest tags. </a>\n          </p>\n        ')}else"Marketplace"===e.imageSource&&(t+='\n          <p class="text-small color-fg-muted">\n          Partner images are provided by third parties. To find out more about how these are being kept up to date and supported by the partner as part of this closed beta, please reach out to your GitHub account team for the partner contact details.\n          </p>\n        ');return t}getCuratedImageInfoUrl(e){return"codespaces-prebuild"===e.imageId?"https://github.com/github/codespaces":"https://github.com/actions/runner-images/releases"}};f=c([n.Ih],f);var m=o(15345),b=function(e,t,o,i){var s,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(r<3?s(n):r>3?s(t,o,n):s(t,o))||n);return r>3&&n&&Object.defineProperty(t,o,n),n};let y=document.querySelector("input[name='maximum_runners']"),g=class extends HTMLElement{disableSubmitButton(){document.querySelector(".js-submit-custom-hosted-runner-button").disabled=!0}enableSubmitButton(){document.querySelector(".js-submit-custom-hosted-runner-button").disabled=!1}validateMax(){if(this.resetMaxState(),!this.maxInput.value)return;let e=+this.maxInput.value,t=parseInt(y.max);return e<parseInt(y.min)?(this.maxGroup.classList.add("errored"),this.maxTooLowErrorMessage.hidden=!1,(0,m.N)(this.maxNote),void this.disableSubmitButton()):e>t?(this.maxGroup.classList.add("errored"),this.maxTooHighErrorMessage.hidden=!1,(0,m.N)(this.maxNote),void this.disableSubmitButton()):void 0}resetMaxState(){this.maxTooHighErrorMessage.hidden=!0,this.maxTooLowErrorMessage.hidden=!0,this.maxGroup.classList.remove("errored"),this.enableSubmitButton()}};b([n.fA],g.prototype,"maxInput",void 0),b([n.fA],g.prototype,"maxGroup",void 0),b([n.fA],g.prototype,"maxTooLowErrorMessage",void 0),b([n.fA],g.prototype,"maxTooHighErrorMessage",void 0),b([n.fA],g.prototype,"maxNote",void 0),g=b([n.Ih],g);var v=function(e,t,o,i){var s,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(r<3?s(n):r>3?s(t,o,n):s(t,o))||n);return r>3&&n&&Object.defineProperty(t,o,n),n};let x=((r=class extends HTMLElement{connectedCallback(){this.isAllowed=this.hasAttribute("is-allowed")}checkboxChanged(){let e=this.checkbox.checked;this.isAllowed||e||(this.checkbox.setAttribute("disabled","disabled"),this.description.classList.remove("color-fg-muted"),this.labelSection.classList.add("color-fg-subtle"))}constructor(...e){super(...e),this.isAllowed=!1}}).attrPrefix="",r);v([n.fA],x.prototype,"checkbox",void 0),v([n.fA],x.prototype,"description",void 0),v([n.fA],x.prototype,"labelSection",void 0),v([n.Lj],x.prototype,"isAllowed",void 0),x=v([n.Ih],x),(0,o(59753).on)("submit",".js-onboard-new-account",(function(e){let t=e.currentTarget;if(!(t instanceof HTMLFormElement))return;let o=t.querySelector('input[type="checkbox"]');o&&(o.disabled=!0)}))},84700:(e,t,o)=>{var i=o(76006),s=o(58700),r=function(e,t,o,i){var s,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(r<3?s(n):r>3?s(t,o,n):s(t,o))||n);return r>3&&n&&Object.defineProperty(t,o,n),n};let n=class extends HTMLElement{toggle(e){this.checkbox.checked?(this.status.hidden=!0,this.dialog.show(),e.stopPropagation()):(this.status.hidden=!1,(0,s.Bt)(this.form))}confirm(){this.status.hidden=!1,(0,s.Bt)(this.form),this.dialog.open=!1}close(){this.checkbox.checked=!1}};r([i.fA],n.prototype,"checkbox",void 0),r([i.fA],n.prototype,"status",void 0),r([i.fA],n.prototype,"dialog",void 0),r([i.fA],n.prototype,"form",void 0),n=r([i.Ih],n)},87577:(e,t,o)=>{var i=o(76006),s=function(e,t,o,i){var s,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(r<3?s(n):r>3?s(t,o,n):s(t,o))||n);return r>3&&n&&Object.defineProperty(t,o,n),n};let r=class extends HTMLElement{connectedCallback(){this.submitButton.disabled=!0,this.toggleSpecificOptions()}enableForm(){this.submitButton.disabled=!1}toggleSpecificOptions(){this.selectRadio.checked?this.specificOptions.hidden=!1:this.specificOptions.hidden=!0}};s([i.fA],r.prototype,"specificOptions",void 0),s([i.fA],r.prototype,"submitButton",void 0),s([i.fA],r.prototype,"selectRadio",void 0),r=s([i.Ih],r)},46426:(e,t,o)=>{o.d(t,{$:()=>n,c:()=>r});var i=o(15205);let s=(0,i.Z)((function(){return(document.head?.querySelector('meta[name="enabled-features"]')?.content||"").split(",")}));let r=(0,i.Z)((function(e){return-1!==s().indexOf(e)}));let n={isFeatureEnabled:r}},86283:(e,t,o)=>{o.d(t,{Qg:()=>i.Qg,W6:()=>i.W6,cF:()=>i.cF,iG:()=>s.iG,jX:()=>s.jX,n4:()=>s.n4,zu:()=>s.zu});var i=o(35647),s=o(73614)},73614:(e,t,o)=>{o.d(t,{iG:()=>s,jX:()=>n,n4:()=>i,zu:()=>r});let i="undefined"==typeof document?void 0:document,s="undefined"==typeof window?void 0:window,r="undefined"==typeof history?void 0:history,n="undefined"==typeof location?{pathname:"",origin:"",search:"",hash:""}:location},35647:(e,t,o)=>{o.d(t,{Qg:()=>r,W6:()=>s,cF:()=>n});var i=o(73614);let s=void 0===i.n4,r=!s;function n(){return!!s||Boolean(i.n4.querySelector('react-app[data-ssr="true"]'))}},7180:(e,t,o)=>{o.d(t,{O:()=>a,d:()=>n});var i=o(46426),s=o(71643),r=o(24601);let n=class extends Error{};let a={apply:function({policy:e,fallback:t,fallbackOnError:o=!1}){try{return(0,i.c)("BYPASS_TRUSTED_TYPES_POLICY_RULES")?t:e()}catch(e){if(e instanceof n||((0,r.eK)(e),(0,s.b)({incrementKey:"TRUSTED_TYPES_POLICY_ERROR"}),!o))throw e}return t}}},22490:(e,t,o)=>{o.d(t,{Z:()=>a});var i=o(86283);function s(e){return()=>{throw TypeError(`The policy does not implement the function ${e}`)}}let r={createHTML:s("createHTML"),createScript:s("createScript"),createScriptURL:s("createScriptURL")},n={createPolicy:(e,t)=>({name:e,...r,...t})},a=globalThis.trustedTypes??n,c=!1;i.n4?.addEventListener("securitypolicyviolation",(e=>{"require-trusted-types-for"!==e.violatedDirective||c||(console.warn("Hi fellow Hubber!\n    You're probably seeing a Report Only Trusted Types error near this message. This is intended behaviour, staff-only,\n    does not impact application control flow, and is used solely for statistic collection. Unfortunately we\n    can't gather these statistics without adding the above warnings to your console. Sorry about that!\n    Feel free to drop by #pse-architecture if you have any additional questions about Trusted Types or CSP."),c=!0)}))}}]);