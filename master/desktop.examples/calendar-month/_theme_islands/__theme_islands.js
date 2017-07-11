!function(e){var t={NOT_RESOLVED:"NOT_RESOLVED",IN_RESOLVING:"IN_RESOLVING",RESOLVED:"RESOLVED"},n=function(){var f={trackCircularDependencies:!0,allowMultipleDeclarations:!0},d={},l=!1,h=[],m=function(e,n,i){i||(i=n,n=[]);var r=d[e];r||(r=d[e]={name:e,decl:void 0}),r.decl={name:e,prev:r.decl,fn:i,state:t.NOT_RESOLVED,deps:n,dependents:[],exports:void 0}},_=function(t,n,r){"string"==typeof t&&(t=[t]),l||(l=!0,c(E)),h.push({deps:t,cb:function(t,o){o?(r||i)(o):n.apply(e,t)}})},p=function(e){var n=d[e];return n?t[n.decl.state]:"NOT_DEFINED"},v=function(e){return!!d[e]},y=function(e){for(var t in e)e.hasOwnProperty(t)&&(f[t]=e[t])},g=function(){var e,t={};for(var n in d)d.hasOwnProperty(n)&&(e=d[n],(t[e.decl.state]||(t[e.decl.state]=[])).push(n));return t},E=function(){l=!1,b()},b=function(){var e,t=h,n=0;for(h=[];e=t[n++];)M(null,e.deps,[],e.cb)},M=function(e,t,n,i){var o=t.length;o||i([]);for(var s,a,u=[],c=function(e,t){if(t)return void i(null,t);if(!--o){for(var n,r=[],s=0;n=u[s++];)r.push(n.exports);i(r)}},f=0,l=o;f<l;){if("string"==typeof(s=t[f++])){if(!d[s])return void i(null,r(s,e));a=d[s].decl}else a=s;u.push(a),N(a,n,c)}},N=function(n,i,r){if(n.state===t.RESOLVED)return void r(n.exports);if(n.state===t.IN_RESOLVING)return void(f.trackCircularDependencies&&u(n,i)?r(null,o(n,i)):n.dependents.push(r));if(n.dependents.push(r),n.prev&&!f.allowMultipleDeclarations)return void x(n,a(n));f.trackCircularDependencies&&(i=i.slice()).push(n);var c=!1,d=n.prev?n.deps.concat([n.prev]):n.deps;n.state=t.IN_RESOLVING,M(n,d,i,function(t,i){if(i)return void x(n,i);t.unshift(function(e,t){if(c)return void r(null,s(n));c=!0,t?x(n,t):k(n,e)}),n.fn.apply({name:n.name,deps:n.deps,global:e},t)})},k=function(e,n){e.exports=n,e.state=t.RESOLVED;for(var i,r=0;i=e.dependents[r++];)i(n);e.dependents=void 0},x=function(e,n){e.state=t.NOT_RESOLVED;for(var i,r=0;i=e.dependents[r++];)i(null,n);e.dependents=[]};return{create:n,define:m,require:_,getState:p,isDefined:v,setOptions:y,getStat:g}},i=function(e){c(function(){throw e})},r=function(e,t){return Error(t?'Module "'+t.name+'": can\'t resolve dependence "'+e+'"':'Required module "'+e+"\" can't be resolved")},o=function(e,t){for(var n,i=[],r=0;n=t[r++];)i.push(n.name);return i.push(e.name),Error('Circular dependence has been detected: "'+i.join(" -> ")+'"')},s=function(e){return Error('Declaration of module "'+e.name+'" has already been provided')},a=function(e){return Error('Multiple declarations of module "'+e.name+'" have been detected')},u=function(e,t){for(var n,i=0;n=t[i++];)if(e===n)return!0;return!1},c=function(){var t=[],n=function(e){return 1===t.push(e)},i=function(){var e=t,n=0,i=t.length;for(t=[];n<i;)e[n++]()};if("object"==typeof process&&process.nextTick)return function(e){n(e)&&process.nextTick(i)};if(e.setImmediate)return function(t){n(t)&&e.setImmediate(i)};if(e.postMessage&&!e.opera){var r=!0;if(e.attachEvent){var o=function(){r=!1};e.attachEvent("onmessage",o),e.postMessage("__checkAsync","*"),e.detachEvent("onmessage",o)}if(r){var s="__modules"+ +new Date,a=function(e){e.data===s&&(e.stopPropagation&&e.stopPropagation(),i())};return e.addEventListener?e.addEventListener("message",a,!0):e.attachEvent("onmessage",a),function(t){n(t)&&e.postMessage(s,"*")}}}var u=e.document;if("onreadystatechange"in u.createElement("script")){var c=u.getElementsByTagName("head")[0],f=function(){var e=u.createElement("script");e.onreadystatechange=function(){e.parentNode.removeChild(e),e=e.onreadystatechange=null,i()},c.appendChild(e)};return function(e){n(e)&&f()}}return function(e){n(e)&&setTimeout(i,0)}}();"object"==typeof exports?module.exports=n():e.modules=n()}("undefined"!=typeof window?window:global),"undefined"==typeof window&&"undefined"!=typeof module&&(modules=module.exports),modules.define("i-bem-dom",["i-bem","i-bem__internal","i-bem-dom__collection","i-bem-dom__events_type_dom","i-bem-dom__events_type_bem","inherit","identify","objects","functions","jquery","dom"],function(e,t,n,i,r,o,s,a,u,c,f,d){function l(e,t,n){var i,r,o,s,a=e[0],u=v(a);for(i in u)r=i.split(V),o=r[0],s=r[1],s&&((n[o]||(n[o]={}))[s]=!0),h(i,e,_(u[i],i,t))}function h(e,t,n,i,r){var o=t[0];if(!S[a(o)]){n||(n=_(y(o,e),e));var s=n.uniqId,c=j[s];if(c)return c.domElem.index(o)<0&&(c.domElem=c.domElem.add(t),u.extend(c.params,n)),c;C[s]=C[s]?C[s].add(t):t;var d=o.parentNode;d&&11!==d.nodeType||f.unique(C[s]);var l=m(e);return l._processInit(),!l.lazyInit||i||!1===n.lazyInit?(i&&t.addClass(B),c=new l(C[s],n,!!i),delete C[s],r&&r.apply(c,H.call(arguments,4)),c):void 0}}function m(e){if(P[e])return P[e];var t=e.split(V);return t[1]?w.declElem(t[0],t[1],{},{lazyInit:!0},!0):w.declBlock(e,{},{lazyInit:!0},!0)}function _(e,t,n){return e.uniqId||(e.uniqId=(e.id?t+"-id-"+e.id:a())+(n||a())),e}function p(e,t,n){var i=e.find(t);return n?i:i.add(e.filter(t))}function v(e){var t=a(e);return I[t]||(I[t]=g(e))}function y(e,t){var n=v(e);return n[t]||(n[t]={})}function g(e){var t=e.getAttribute(A);return t?JSON.parse(t):{}}function E(e,t){1===e.domElem.length?(e._delInitedMod(),delete j[e._uniqId]):e.domElem=e.domElem.not(t)}function b(e){e.each(function(){D[a(this)]=this.parentNode})}function M(e,t){e.add(e.parents()).each(function(e,n){var i=I[a(n)];i&&u.each(i,function(e){var n=j[e.uniqId];if(n){var i=t[n.__self._blockName];i&&n._dropElemCache(Object.keys(i))}})})}function N(e){return"string"==typeof e?e={elem:e}:c.isFunction(e)?e={elem:e.getName()}:c.isFunction(e.elem)&&(e.elem=e.elem.getName()),{elem:e.elem,mod:F(e.modName,e.modVal)}}function k(e){return f("string"==typeof e?f.parseHTML(e,null,!0):e)}function x(e){if("string"==typeof e||"object"==typeof e&&"string"==typeof e.block)throw new Error("Block must be a class or description (block, modName, modVal) of the block to find")}var w,C={},j={},D={},I={},S={},P=t.entities,B="i-bem",O="."+B,A="data-bem",q=n.NAME_PATTERN,T=n.MOD_DELIM,V=n.ELEM_DELIM,F=n.buildModPostfix,L=n.buildClassName,R=Array.prototype.reverse,H=Array.prototype.slice,z=new r.EventManagerFactory(m),G=new o.EventManagerFactory(m),Y=s({__constructor:function(e,t,n){this.domElem=e,this._elemsCache={},this._elemCache={},this._findBackRefs=[],j[t.uniqId||a(this)]=this,this.__base(null,t,n)},_block:function(){},_elems:function(e){var t=N(e),n=this._elemsCache[t.elem];if(n&&t.mod in n)return n[t.mod];var i=(n||(this._elemsCache[t.elem]={}))[t.mod]=this.findMixedElems(e).concat(this.findChildElems(e));return i.forEach(function(e){e._findBackRefs.push(this)},this),i},_elem:function(e){var t=N(e),n=this._elemCache[t.elem];if(n&&t.mod in n)return n[t.mod];var i=(n||(this._elemCache[t.elem]={}))[t.mod]=this.findMixedElem(e)||this.findChildElem(e);return i&&i._findBackRefs.push(this),i},_dropElemCache:function(e){return arguments.length?((Array.isArray(e)?e:H.call(arguments)).forEach(function(e){var t=N(e);t.mod?(this._elemsCache[t.elem]&&delete this._elemsCache[t.elem][t.mod],this._elemCache[t.elem]&&delete this._elemCache[t.elem][t.mod]):(delete this._elemsCache[t.elem],delete this._elemCache[t.elem])},this),this):(this._elemsCache={},this._elemCache={},this)},findChildBlock:function(e){return x(e),this._findEntities("find",e,!0)},findChildBlocks:function(e){return x(e),this._findEntities("find",e)},findParentBlock:function(e){return x(e),this._findEntities("parents",e,!0)},findParentBlocks:function(e){return x(e),this._findEntities("parents",e)},findMixedBlock:function(e){return x(e),this._findEntities("filter",e,!0)},findMixedBlocks:function(e){return x(e),this._findEntities("filter",e)},findChildElem:function(e,t){return t?this._filterFindElemResults(this._findEntities("find",e)).get(0):this._findEntities("find",e,!0)},findChildElems:function(e,t){var n=this._findEntities("find",e);return t?this._filterFindElemResults(n):n},findParentElem:function(e,t){return t?this._filterFindElemResults(this._findEntities("parents",e))[0]:this._findEntities("parents",e,!0)},findParentElems:function(e,t){var n=this._findEntities("parents",e);return t?this._filterFindElemResults(n):n},findMixedElem:function(e){return this._findEntities("filter",e,!0)},findMixedElems:function(e){return this._findEntities("filter",e)},_filterFindElemResults:function(e){var t=this._block();return e.filter(function(e){return e._block()===t})},_findEntities:function(e,t,n){var r=c.isFunction(t)?t.getEntityName():"object"==typeof t?t.block?t.block.getEntityName():"string"==typeof t.elem?this.__self._blockName+V+t.elem:t.elem.getEntityName():this.__self._blockName+V+t,o="."+("object"==typeof t?L(r,t.modName,void 0===t.modVal||t.modVal):r)+(n?":first":""),s=this.domElem[e](o);if(n)return s[0]?h(r,s.eq(0),void 0,!0)._setInitedMod():null;var a=[],u={};return s.each(function(e,t){var n=h(r,f(t),void 0,!0)._setInitedMod();u[n._uniqId]||(u[n._uniqId]=!0,a.push(n))}),new i(a)},_domEvents:function(e){return z.getEventManager(this,e,this.domElem)},_events:function(e){return G.getEventManager(this,e,this.domElem)},_emit:function(e,t){return("object"==typeof e&&"js"===e.modName||this.hasMod("js","inited"))&&o.emit(this,e,t),this},_extractModVal:function(e){var t,n=this.domElem[0];return n&&(t=n.className.match(this.__self._buildModValRE(e))),t?t[2]||!0:""},_onSetMod:function(e,t,n){var i=this.__self,r=i.getName();if(this._findBackRefs.forEach(function(i){""===n||i._dropElemCache({elem:r,modName:e,modVal:n}),i._dropElemCache(""===t?r:{elem:r,modName:e,modVal:t})}),this.__base.apply(this,arguments),"js"!==e||""!==t){var o=i._buildModClassNamePrefix(e),s=i._buildModValRE(e),a=""===t;this.domElem.each(function(){var e=this.className,i=o;!0!==t&&(i+=T+t),(!0===n?s.test(e):(" "+e).indexOf(" "+o+T)>-1)?this.className=e.replace(s,a?"":"$1"+i):a||f(this).addClass(i)})}},_afterSetMod:function(e,t,n){var i={modName:e,modVal:t,oldModVal:n};this._emit({modName:e,modVal:"*"},i)._emit({modName:e,modVal:t},i)},containsEntity:function(e){return d.contains(this.domElem,e.domElem)}},{create:function(){throw Error("bemDom entities can not be created otherwise than from DOM")},_processInit:function(e){if(this.onInit&&this._inited==e){this.__base(e),this.onInit();var t=this.getName(),n=this.onInit;this.init=function(){this.getName()===t&&n.apply(this,arguments)}}},_domEvents:function(e){return z.getEventManager(this,e,w.scope)},_events:function(e){return G.getEventManager(this,e,w.scope)},_buildModClassNamePrefix:function(e){return this.getEntityName()+T+e},_buildModValRE:function(e){return new RegExp("(\\s|^)"+this._buildModClassNamePrefix(e)+"(?:"+T+"("+q+"))?(?=\\s|$)")},_buildClassName:function(e,t){return L(this.getEntityName(),e,t)},_buildSelector:function(e,t){return"."+this._buildClassName(e,t)}}),Q=s([t.Block,Y],{_block:function(){return this}}),W=s([t.Elem,Y],{_block:function(){return this._blockInstance||(this._blockInstance=this.findParentBlock(m(this.__self._blockName)))}});f.fn.bem=function(e,t){var n=h(e.getEntityName(),this,t,!0);return n?n._setInitedMod():null},f(function(){w={scope:f("body"),doc:f(document),win:f(window),Block:Q,Elem:W,isEntity:function(e){return e instanceof Q||e instanceof W},declBlock:function(e,n,i,r){return n&&("object"!=typeof n||Array.isArray(n))||(r=i,i=n,n="string"==typeof e?P[e]||Q:e),t.declBlock(e,n,i,r)},declElem:function(e,n,i,r,o){return i&&("object"!=typeof i||Array.isArray(i))||(o=r,r=i,i=P[e+V+n]||W),t.declElem(e,n,i,r,o)},declMixin:t.declMixin,init:function(e){e="string"==typeof e?f(e):e||w.scope;var n={},i=a();return p(e,O).each(function(){l(f(this),i,n)}),t._runInitFns(),M(e,n),e},_destruct:function(e,t,n){var i,r=[];b(i=t?e.children():e),R.call(p(i,O)).each(function(e,t){var n=v(t),i=a(t);S[i]=!0,r.push(i),u.each(n,function(e){if(e.uniqId){var n=j[e.uniqId];n?E(n,t):delete C[e.uniqId]}}),delete I[a(t)]}),n&&(t?e.empty():e.remove()),D={},r.forEach(function(e){delete S[e]})},destruct:function(e,t){this._destruct(e,t,!0)},detach:function(e,t){this._destruct(e,t)},update:function(e,t){return this.destruct(e,!0),this.init(e.html(t))},replace:function(e,t){var n=e.prev(),i=e.parent();return t=k(t),this.destruct(e),this.init(n.length?t.insertAfter(n):t.prependTo(i))},append:function(e,t){return this.init(k(t).appendTo(e))},prepend:function(e,t){return this.init(k(t).prependTo(e))},before:function(e,t){return this.init(k(t).insertBefore(e))},after:function(e,t){return this.init(k(t).insertAfter(e))}},e(w)})}),function(){var e=modules.define,t=[];modules.define=function(n,i,r){e.apply(modules,arguments),"i-bem-dom__init"!==n&&arguments.length>2&&~i.indexOf("i-bem-dom")&&(t.push(n),1===t.length&&modules.define("i-bem-dom__init",t,function(e){e(arguments[arguments.length-1]),t=[]}))}}(),function(e){function t(e){var t=c(e);if(_)for(var n,i=0;n=y[i++];)e.hasOwnProperty(n)&&t.push(n);return t}function n(e,n,i){for(var r,s,a=t(i),u=0,c=a.length;u<c;)"__self"!==(r=a[u++])&&(s=i[r],h(s)&&(!o||s.toString().indexOf(".__base")>-1)?n[r]=function(t,i){var r=e[t]?e[t]:"__constructor"===t?n.__self.__parent:m;return function(){var e=this.__base;this.__base=r;var t=i.apply(this,arguments);return this.__base=e,t}}(r,s):n[r]=s)}function i(e,t){for(var n,i=1;n=e[i++];)t?h(n)?r.self(t,n.prototype,n):r.self(t,n):t=h(n)?r(e[0],n.prototype,n):r(e[0],n);return t||e[0]}function r(){var e=arguments,t=l(e[0]),r=t||h(e[0]),o=r?t?i(e[0]):e[0]:s,a=e[r?1:0]||{},c=e[r?2:1],d=a.__constructor||r&&o.prototype.__constructor?function(){return this.__constructor.apply(this,arguments)}:r?function(){return o.apply(this,arguments)}:function(){};if(!r)return d.prototype=a,d.prototype.__self=d.prototype.constructor=d,f(d,c);f(d,o),d.__parent=o;var m=o.prototype,_=d.prototype=u(m);return _.__self=_.constructor=d,a&&n(m,_,a),c&&n(o,d,c),d}var o=function(){"_"}.toString().indexOf("_")>-1,s=function(){},a=Object.prototype.hasOwnProperty,u=Object.create||function(e){var t=function(){};return t.prototype=e,new t},c=Object.keys||function(e){var t=[];for(var n in e)a.call(e,n)&&t.push(n);return t},f=function(e,t){for(var n in t)a.call(t,n)&&(e[n]=t[n]);return e},d=Object.prototype.toString,l=Array.isArray||function(e){return"[object Array]"===d.call(e)},h=function(e){return"[object Function]"===d.call(e)},m=function(){},_=!0,p={toString:""};for(var v in p)p.hasOwnProperty(v)&&(_=!1);var y=_?["toString","valueOf"]:null;r.self=function(){var e=arguments,t=l(e[0]),r=t?i(e[0],e[0][0]):e[0],o=e[1],s=e[2],a=r.prototype;return o&&n(a,a,o),s&&n(r,r,s),r};var g=!0;"object"==typeof exports&&(module.exports=r,g=!1),"object"==typeof modules&&(modules.define("inherit",function(e){e(r)}),g=!1),"function"==typeof define&&(define(function(e,t,n){n.exports=r}),g=!1),g&&(e.inherit=r)}(this),modules.define("jquery",["loader_type_js","jquery__config"],function(e,t,n){function i(t){e(t?jQuery:jQuery.noConflict(!0))}"undefined"!=typeof jQuery?i(!0):t(n.url,i)}),modules.define("loader_type_js",function(e){var t={},n={},i=document.getElementsByTagName("head")[0],r=function(e,n){var i,r=t[e],o=0;for(delete t[e];i=r[o++];)i[n]&&i[n]()},o=function(e){n[e]=!0,r(e,"success")},s=function(e){r(e,"error")};e(function(e,r,a){if(n[e])return void(r&&r());if(t[e])return void t[e].push({success:r,error:a});t[e]=[{success:r,error:a}];var u=document.createElement("script");u.type="text/javascript",u.charset="utf-8",u.src=("file:"!==location.protocol||e.indexOf("//")?"":"http:")+e,"onload"in u?(u.onload=function(){u.onload=u.onerror=null,o(e)},u.onerror=function(){u.onload=u.onerror=null,s(e)}):u.onreadystatechange=function(){var t=this.readyState;"loaded"!==t&&"complete"!==t||(u.onreadystatechange=null,o(e))},i.insertBefore(u,i.lastChild)})}),modules.define("jquery__config",function(e){e({url:"https://yastatic.net/jquery/3.1.0/jquery.min.js"})}),modules.define("jquery__config",["ua","objects"],function(e,t,n,i){e(t.msie&&parseInt(t.version,10)<9?n.extend(i,{url:"https://yastatic.net/jquery/1.12.3/jquery.min.js"}):i)}),modules.define("ua",function(e){var t=navigator.userAgent.toLowerCase(),n=/(chrome)[ \/]([\w.]+)/.exec(t)||/(webkit)[ \/]([\w.]+)/.exec(t)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t)||/(msie) ([\w.]+)/.exec(t)||t.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t)||[],i={browser:n[1]||"",version:n[2]||"0"},r={};i.browser&&(r[i.browser]=!0,r.version=i.version),r.chrome?r.webkit=!0:r.webkit&&(r.safari=!0),e(r)}),modules.define("objects",function(e){var t=Object.prototype.hasOwnProperty;e({extend:function(e,n){("object"!=typeof e||null===e)&&(e={});for(var i=1,r=arguments.length;i<r;i++){var o=arguments[i];if(o)for(var s in o)t.call(o,s)&&(e[s]=o[s])}return e},isEmpty:function(e){for(var n in e)if(t.call(e,n))return!1;return!0},each:function(e,n,i){for(var r in e)t.call(e,r)&&(i?n.call(i,e[r],r):n(e[r],r))}})}),modules.define("functions",function(e){var t=Object.prototype.toString;e({isFunction:function(e){return"[object Function]"===t.call(e)},noop:function(){}})}),modules.define("dom",["jquery"],function(e,t){var n={"datetime-local":!0,date:!0,month:!0,number:!0,password:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};e({contains:function(e,t){var n=!1;return t.each(function(){var t=this;do{if(~e.index(t))return!(n=!0)}while(t=t.parentNode);return n}),n},getFocused:function(){try{return t(document.activeElement)}catch(e){}},containsFocus:function(e){return this.contains(e,this.getFocused())},isFocusable:function(e){var t=e[0];if(!t)return!1;if(t.hasAttribute("tabindex"))return!0;switch(t.tagName.toLowerCase()){case"iframe":return!0;case"input":case"button":case"textarea":case"select":return!t.disabled;case"a":return!!t.href}return!1},isEditable:function(e){var t=e[0];if(!t)return!1;switch(t.tagName.toLowerCase()){case"input":return n.hasOwnProperty(t.type)&&!t.disabled&&!t.readOnly;case"textarea":return!t.disabled&&!t.readOnly;default:return"true"===t.contentEditable}}})}),modules.define("i-bem-dom__init",["i-bem-dom"],function(e,t){e(function(e){return t.init(e)})}),modules.define("i-bem",["i-bem__internal","inherit","identify","next-tick","objects","functions"],function(e,t,n,i,r,o,s){function a(e,t,n){return"__"+e+"__mod"+(t?"_"+t:"")+(n?"_"+n:"")}function u(e,t,n,i){return n||i?function(r,o,s){var a,u;if(n&&(a=!1===n.apply(this,arguments)),(!i||i(e,o,s))&&(u=!1===t.apply(this,arguments)),a||u)return!1}:t}function c(e,t,n){if(s.isFunction(t))n[a(e,"*","*")]=t;else{var i,r,o;for(i in t)if(o=t[i],s.isFunction(o))n[a(e,i,"*")]=o;else{var c=a(e,i,"*");for(r in o){var f=o[r],d=r[0];"!"===d||"~"===d||"*"===r?("*"===r||(r=r.substr(1)),n[c]=u(r,f,n[c],v[d])):n[a(e,i,r)]=f}}}}function f(e,t){return t?Array.isArray(t)?function(n){for(var i=0,r=t.length;i<r;)if(d(n,e,t[i++]))return!0;return!1}:function(n){return d(n,e,t)}:function(t){return d(t,e,!0)}}function d(e,t,n){var i=e._processingMods[t];return"*"===n?e.hasMod(t)||null!=i:e.hasMod(t,n)||i===n}function l(e){e.beforeSetMod&&(c("before",e.beforeSetMod,e),delete e.beforeSetMod),e.onSetMod&&(c("after",e.onSetMod,e),delete e.onSetMod)}function h(e,t,i,r,o){i||(i=p[t]||e),Array.isArray(i)||(i=[i]),i[0].__bemEntity||(i=i.slice(),i.unshift(p[t]||e)),r&&l(r);var s;return t===i[0].getEntityName()?(s=n.self(i,r,o))._processInit(!0):s=p[t]=n(i,r,o),s}var m=t.ELEM_DELIM,_=[],p={},v={"!":function(e,t,n){return t!==e},"~":function(e,t,n){return n===e}},y=n({__constructor:function(e,t,n){this._modCache=e||{},this._processingMods={},this.params=o.extend(this._getDefaultParams(),t),this._uniqId=this.params.uniqId||i(this),!1!==n?this._setInitedMod():_.push(this._setInitedMod,this)},_setInitedMod:function(){return this.setMod("js","inited")},_delInitedMod:function(){this.delMod("js")},hasMod:function(e,t){var n=typeof t;"undefined"===n||"boolean"===n||(t=t.toString());var i=this.getMod(e)===(t||"");return 1===arguments.length?!i:i},getMod:function(e){var t=this._modCache;return e in t?t[e]||"":t[e]=this._extractModVal(e)},setMod:function(e,t){var n=typeof t;if("undefined"===n?t=!0:"boolean"===n?!1===t&&(t=""):t=t.toString(),null!=this._processingMods[e])return this;var i=this.getMod(e);if(i===t)return this;this._processingMods[e]=i;for(var r,o,s,a=!0,u=[e,t,i],c=[["*","*"],[e,"*"],[e,t]],f=["before","after"],d=0;r=f[d++];){for(o=0;s=c[o++];)if(!1===this._callModFn(r,s[0],s[1],u)){a=!1;break}if(!a)break;"before"===r&&(this._modCache[e]=t,this._onSetMod(e,t,i))}return this._processingMods[e]=null,a&&this._afterSetMod(e,t,i),this},_onSetMod:function(e,t,n){},_afterSetMod:function(e,t,n){},toggleMod:function(e,t,n,i){void 0===t&&(t=!0),void 0===n?n="":"boolean"==typeof n&&(i=n,n="");var r=this.getMod(e);return(r===t||r===n)&&this.setMod(e,"boolean"==typeof i?i?t:n:this.hasMod(e,t)?n:t),this},delMod:function(e){return this.setMod(e,"")},_callModFn:function(e,t,n,i){var r=a(e,t,n);return this[r]?this[r].apply(this,i):void 0},_extractModVal:function(e){return""},_getDefaultParams:function(){return{}},_nextTick:function(e){var t=this;return r(function(){t.hasMod("js","inited")&&e.call(t)}),this}},{create:function(e,t){return new this(e,t)},declMod:function(e,t,i){t&&l(t);var r=f(e.modName,e.modVal),a=this.prototype;return o.each(t,function(e,n){s.isFunction(e)&&(t[n]=function(){var t;if(r(this))t=e;else{var i=a[n];i&&i!==e&&(t=this.__base)}return t?t.apply(this,arguments):void 0})}),n.self(this,t,i)},__bemEntity:!0,_name:null,_processInit:function(e){this._inited=!0},getName:function(){return this._name},getEntityName:function(){return this._name}}),g=y,E=n(y,{_block:function(){return this._blockInstance}},{create:function(e,t,n){var i=new this(t,n);return i._blockInstance=e,i},getEntityName:function(){return this._blockName+m+this._name}});e({Block:g,Elem:E,entities:p,declBlock:function(e,t,n,i){"object"!=typeof t||Array.isArray(t)||(i=n,n=t,t=void 0);var r=g;"string"!=typeof e&&(r=e,e=e.getEntityName());var o=h(r,e,t,n,i);return o._name=o._blockName=e,o},declElem:function(e,t,n,i,r){var o,s=E;"string"!=typeof e?(r=i,i=n,n=t,t=e._name,s=e,e=s._blockName,o=s.getEntityName()):o=e+m+t,"object"!=typeof n||Array.isArray(n)||(r=i,i=n,n=void 0);var a=h(s,o,n,i,r);return a._blockName=e,a._name=t,a},declMixin:function(e,t){return l(e||(e={})),n(e,t)},_runInitFns:function(){if(_.length){var e,t=_,n=0;for(_=[];e=t[n];)e.call(t[n+1]),n+=2}}})}),modules.define("i-bem__internal",function(e){function t(e){var t=typeof e;return"string"===t||"number"===t||"boolean"===t}function n(e,t){var n="";return null!=t&&!1!==t&&(n+=s+e,!0!==t&&(n+=s+t)),n}function i(e,t,i){return e+n(t,i)}function r(e,t,r,s){return i(e,o,o)+a+t+n(r,s)}var o,s="_",a="__";e({NAME_PATTERN:"[a-zA-Z0-9-]+",MOD_DELIM:s,ELEM_DELIM:a,buildModPostfix:n,buildClassName:function(e,n,s,a){return t(s)?t(a)||(a=s,s=n,n=o):void 0!==s?s=o:n&&"string"!=typeof n&&(n=o),n||s?n?r(e,n,s,a):i(e,s,a):e},buildClassNames:function(e,t,n){t&&"string"!=typeof t&&(n=t,t=o);var s=t?r(e,t,o,o):i(e,o,o);if(n)for(var a in n)n.hasOwnProperty(a)&&n[a]&&(s+=" "+(t?r(e,t,a,n[a]):i(e,a,n[a])));return s}})}),modules.define("identify",function(e){var t=0,n="__"+ +new Date,i=this.global,r=function(){return"uniq"+ ++t},o=function(e){if("object"==typeof e&&null!==e||"function"==typeof e){var t;return"uniqueID"in e?(e===i.document&&(e=e.documentElement),t="uniqueID"):t=n,t in e?e[t]:e[t]=r()}return""};e(function(e){if(arguments.length){if(1===arguments.length)return o(e);for(var t=[],n=0,i=arguments.length;n<i;n++)t.push(o(arguments[n]));return t.sort().join("")}return r()})}),modules.define("next-tick",function(e){var t=this.global,n=[],i=function(e){return n.push(e),1===n.length},r=function(){var e=n,t=0,i=n.length;for(n=[];t<i;)e[t++]()};if("object"==typeof process&&process.nextTick)return e(function(e){i(e)&&process.nextTick(r)});if(t.setImmediate)return e(function(e){i(e)&&t.setImmediate(r)});if(t.postMessage){var o=!0;if(t.attachEvent){var s=function(){o=!1};t.attachEvent("onmessage",s),t.postMessage("__checkAsync","*"),t.detachEvent("onmessage",s)}if(o){var a="__nextTick"+ +new Date,u=function(e){e.data===a&&(e.stopPropagation&&e.stopPropagation(),r())};return t.addEventListener?t.addEventListener("message",u,!0):t.attachEvent("onmessage",u),e(function(e){i(e)&&t.postMessage(a,"*")})}}var c=t.document;if("onreadystatechange"in c.createElement("script")){var f=c.getElementsByTagName("head")[0],d=function(){var e=c.createElement("script");e.onreadystatechange=function(){e.parentNode.removeChild(e),e=e.onreadystatechange=null,r()},f.appendChild(e)};return e(function(e){i(e)&&d()})}e(function(e){i(e)&&t.setTimeout(r,0)})}),modules.define("i-bem-dom__events",["i-bem__internal","i-bem-dom__collection","inherit","identify","objects","jquery","functions"],function(e,t,n,i,r,o,s,a){var u=window,c=document,f=(r(u),r(c),{}),d=i({__constructor:function(e,t,n){this._params=e,this._fnWrapper=t,this._eventBuilder=n,this._storage={}},on:function(e,t,n,i,o){var s=this._params,u=this._eventBuilder(e,s);a.isFunction(t)&&(o=i,i=n,n=t,t=void 0);var c=this._storage[u]||(this._storage[u]={}),f=r(n,i);if(!c[f]){var d=s.bindDomElem,l=s.bindSelector,h=this,m=c[f]=this._fnWrapper(o?function(){h.un(e,n,i),n.apply(this,arguments)}:n,i,f);d.on(u,l,t,m),l&&d.is(l)&&d.on(u,t,m)}return this},once:function(e,t,n,i){return a.isFunction(t)&&(i=n,n=t,t=void 0),this.on(e,t,n,i,!0)},un:function(e,t,n){var i=arguments.length;if(i){var s=this._params,a=this._eventBuilder(e,s);if(1===i)this._unbindByEvent(this._storage[a],a);else{var u,c=r(t,n),f=this._storage[a],d=s.bindDomElem,l=s.bindSelector;(u=f&&f[c])&&delete f[c];var h=u||t;d.off(a,s.bindSelector,h),l&&d.is(l)&&d.off(a,h)}}else o.each(this._storage,this._unbindByEvent,this);return this},_unbindByEvent:function(e,t){var n=this._params,i=n.bindDomElem,r=n.bindSelector,s=r&&i.is(r);e&&o.each(e,function(e){i.off(t,r,e),s&&i.off(t,e)}),this._storage[t]=null}}),l=function(e){return function(){var t=arguments;return this._eventManagers.forEach(function(n){n[e].apply(n,t)}),this}},h=i({__constructor:function(e){this._eventManagers=e},on:l("on"),once:l("once"),un:l("un")});e({EventManagerFactory:i({__constructor:function(e){this._storageSuffix=r(),this._getEntityCls=e,this._eventManagerCls=d},getEventManager:function(e,t,i){if(t instanceof n)return new h(t.map(function(t){return this.getEventManager(e,t,i)},this));var o,s=r(e),a=f[s],u=this._storageSuffix,c="function"!=typeof e,d="";c?o=e.__self:(o=e,d=e._buildSelector());var l=this._buildEventManagerParams(t,i,d,o),m=l.key+u;return a||(a=f[s]={},c&&e._events().on({modName:"js",modVal:""},function(){l.bindToArbitraryDomElem&&a[m]&&a[m].un(),delete a[s]})),a[m]||(a[m]=this._createEventManager(e,l,c))},_buildEventManagerParams:function(e,n,i,o){var a={bindEntityCls:null,bindDomElem:n,bindToArbitraryDomElem:!1,bindSelector:i,ctxSelector:i,key:""};if(e){var f=typeof e;if(e.jquery)a.bindDomElem=e,a.key=r.apply(null,e.get()),a.bindToArbitraryDomElem=!0;else if(e===u||e===c||"object"===f&&1===e.nodeType)a.bindDomElem=s(e),a.key=r(e),a.bindToArbitraryDomElem=!0;else if("object"===f&&e.__self)a.bindDomElem=e.domElem,a.key=e._uniqId,a.bindEntityCls=e.__self;else if("string"===f||"object"===f||"function"===f){var d,l,h,m;"string"===f?(d=o._blockName,l=e):"object"===f?(d=e.block?e.block.getName():o._blockName,l="function"==typeof e.elem?e.elem.getName():e.elem,h=e.modName,m=e.modVal):e.getName()===e.getEntityName()?d=e.getName():(d=o._blockName,l=e.getName());var _=t.buildClassName(d,l);a.bindEntityCls=this._getEntityCls(_),a.bindSelector="."+(a.key=_+t.buildModPostfix(h,m))}}else a.bindEntityCls=o;return a},_createEventManager:function(e,t,n){throw new Error("not implemented")}})})}),modules.define("i-bem-dom__collection",["inherit","i-bem__collection"],function(e,t,n){function i(e,t,n){return e.map(function(e){return e[t].apply(e,n)})}function r(e){return function(){return new s(i(this,e,arguments))}}function o(e){return function(){var t=[];return i(this,e,arguments).forEach(function(e){e.forEach(function(e){t.push(e)})}),new s(t)}}var s=t(n,{findChildBlock:r("findChildBlock"),findChildBlocks:o("findChildBlocks"),findParentBlock:r("findParentBlock"),findParentBlocks:o("findParentBlocks"),findMixedBlock:r("findMixedBlock"),findMixedBlocks:o("findMixedBlocks"),findChildElem:r("findChildElem"),findChildElems:o("findChildElems"),findParentElem:r("findParentElem"),findParentElems:o("findParentElems"),findMixedElem:r("findMixedElem"),findMixedElems:o("findMixedElems")});e(s)}),modules.define("i-bem__collection",["inherit"],function(e,t){function n(e){return function(){var t=arguments;return this._entities.forEach(function(n){n[e].apply(n,t)}),this}}function i(e){return function(){var t=this._entities;return t[e].apply(t,arguments)}}function r(e,t){return function(){var n=arguments;return this._entities[e](function(e){return e[t].apply(e,n)})}}var o=t({__constructor:function(e){var t=this._entities=[],n={};(Array.isArray(e)?e:a.call(arguments)).forEach(function(e){n[e._uniqId]||(n[e._uniqId]=!0,t.push(e))})},setMod:n("setMod"),delMod:n("delMod"),toggleMod:n("toggleMod"),everyHasMod:r("every","hasMod"),someHasMod:r("some","hasMod"),get:function(e){return this._entities[e]},forEach:i("forEach"),map:i("map"),reduce:i("reduce"),reduceRight:i("reduceRight"),filter:function(){return new this.__self(i("filter").apply(this,arguments))},some:i("some"),every:i("every"),has:function(e){return this._entities.indexOf(e)>-1},find:function(e,t){t||(t=this);for(var n,i=this._entities,r=0;n=i[r];)if(e.call(t,i[r],r++,this))return n;return null},concat:function(){for(var e,t=0,n=arguments.length,i=[];t<n;)e=arguments[t++],i.push(e instanceof o?e._entities:e);return new this.__self(s.apply(this._entities,i))},size:function(){return this._entities.length},toArray:function(){return this._entities.slice()}}),s=Array.prototype.concat,a=Array.prototype.slice;e(o)}),modules.define("i-bem-dom__events_type_dom",["i-bem-dom__events","inherit","jquery"],function(e,t,n,i){var r=function(e){return e};e({EventManagerFactory:n(t.EventManagerFactory,{_createEventManager:function(e,t,n){function o(r){return function(o){var s;if(n)s=e;else{var a=i(o.target).closest(t.ctxSelector);a.length&&(s=a.bem(e))}s&&(t.bindEntityCls&&(o.bemTarget=i(this).bem(t.bindEntityCls)),r.apply(s,arguments))}}return new this._eventManagerCls(t,o,r)}})})}),modules.define("i-bem-dom__events_type_bem",["i-bem-dom__events","i-bem__internal","inherit","functions","jquery","identify","events"],function(e,t,n,i,r,o,s,a){var u=o.event.special,c={},f=function(e){return{setup:function(){c[e]||(c[e]=!0)},teardown:r.noop}},d=function(e,t){var i="__bem__"+t.bindEntityCls.getEntityName()+("object"==typeof e?e instanceof a.Event?e.type:n.buildModPostfix(e.modName,e.modVal):e);return u[i]||(u[i]=f(i)),i},l=i(t.EventManagerFactory,{_createEventManager:function(e,t,n){function i(i,r,s){return function(a,u,c,f){if(!c.fns[s]){var d,l;n?(d=e,l=d.domElem):(l=o(a.target).closest(t.ctxSelector),l.length&&(d=l.bem(e))),!d||c.propagationStoppedDomNode&&o.contains(l[0],c.propagationStoppedDomNode)||(f.data=a.data,f.bemTarget=f.target,c.fns[s]=!0,i.call(r||d,f,u),f.isPropagationStopped()&&(a.stopPropagation(),c.propagationStoppedDomNode=l[0]))}}}return new this._eventManagerCls(t,i,d)}});e({emit:function(e,t,n){var i;"string"==typeof t?i=new a.Event(t,e):t.modName?i=new a.Event("modchange",e):t.target||(t.target=e,i=t);var r=d(t,{bindEntityCls:e.__self});c[r]&&e.domElem.trigger(r,[n,{fns:{},propagationStoppedDomNode:null},i])},EventManagerFactory:l})}),modules.define("events",["identify","inherit","functions"],function(e,t,n,i){var r="__"+ +new Date+"storage",o=n({__constructor:function(e,t){this.type=e,this.target=t,this.data=void 0,this._isDefaultPrevented=!1,this._isPropagationStopped=!1},preventDefault:function(){this._isDefaultPrevented=!0},isDefaultPrevented:function(){return this._isDefaultPrevented},stopPropagation:function(){this._isPropagationStopped=!0},isPropagationStopped:function(){return this._isPropagationStopped}});e({Emitter:n({on:function(e,n,o,s,a){if("string"==typeof e){i.isFunction(n)&&(s=o,o=n,n=void 0);for(var u,c,f,d,l=t(o,s),h=this[r]||(this[r]={}),m=e.split(" "),_=0;u=m[_++];)d=h[u]||(h[u]={ids:{},list:{}}),l in d.ids||(c=d.list,f={
fn:o,data:n,ctx:s,special:a},c.last?(c.last.next=f,f.prev=c.last):c.first=f,d.ids[l]=c.last=f)}else for(var p in e)e.hasOwnProperty(p)&&this.on(p,e[p],n,a);return this},once:function(e,t,n,i){return this.on(e,t,n,i,{once:!0})},un:function(e,n,i){if("string"==typeof e||void 0===e){var o=this[r];if(o)if(e){for(var s,a=e.split(" "),u=0;e=a[u++];)if(s=o[e])if(n){var c=t(n,i),f=s.ids;if(c in f){var d=s.list,l=f[c],h=l.prev,m=l.next;h?h.next=m:l===d.first&&(d.first=m),m?m.prev=h:l===d.last&&(d.last=h),delete f[c]}}else delete this[r][e]}else delete this[r]}else for(var _ in e)e.hasOwnProperty(_)&&this.un(_,e[_],n);return this},emit:function(e,t){var n=this[r],i=!1;if(n)for(var s,a,u=["string"==typeof e?e:e.type,"*"],c=0;s=u[c++];)if(a=n[s])for(var f,d=a.list.first,l=a.list.last;d&&(i||(i=!0,"string"==typeof e&&(e=new o(e)),e.target||(e.target=this)),e.data=d.data,f=d.fn.apply(d.ctx||this,arguments),!1===f&&(e.preventDefault(),e.stopPropagation()),d.special&&d.special.once&&this.un(e.type,d.fn,d.ctx),d!==l);)d=d.next;return this}}),Event:o})}),modules.require(["i-bem-dom__init","jquery","next-tick"],function(e,t,n){t(function(){n(e)})}),modules.define("calendar-month",["i-bem-dom"],function(e,t){e(t.declBlock(this.name,{onSetMod:{js:{inited:function(){this._date=new Date(this.params.date)}}},_checkRange:function(e){return e.getFullYear()===this._date.getFullYear()&&e.getMonth()===this._date.getMonth()},getDate:function(){return this._date},getDayByDate:function(e){if(e&&this._checkRange(e))return this._elems("day").get(e.getDate()-1)}},{}))}),modules.define("calendar-month__day",["i-bem-dom"],function(e,t){e(t.declElem("calendar-month","day",{getDate:function(){return new Date(Number(this.domElem.text()))}},{lazyInit:!0,onInit:function(){this._domEvents().on("click",function(){this._emit("click")})}}))}),modules.define("calendar-month",[],function(e,t){e(t.declMod({modName:"selectable",modVal:"single"},{onSetMod:{js:{inited:function(){this.__base.apply(this,arguments);var e=this.findChildElem({elem:"day",modName:"selected",modVal:!0});this._date=new Date(this.params.date),e&&(this._val=new Date(this._date.getFullYear(),this._date.getMonth(),e.getDate())),this._events("day").on("click",function(e){this.setVal(new Date(this._date.getFullYear(),this._date.getMonth(),e.target.getDate()))})}}},getVal:function(){return this._val},setVal:function(e,t){if(this._val===e)return this;var n=e instanceof Date&&isNaN(e.getTime());if(!e||n)n&&console.warn("Invalid date"),delete this._val;else{if(!this._checkRange(e))return console.warn("Out of range"),this.setVal();this._val=e}return this.findChildElems({elem:"day",modName:"selected",modVal:!0}).delMod("selected"),this._val&&this.getDayByDate(this._val).setMod("selected",!0),this._emit("change",t),this}},{}))});var BEMHTML;!function(e){function t(e){var t={};return t.apply=function(){return""},t}var n=!0;"object"==typeof module&&"object"==typeof module.exports&&(exports.BEMHTML=t({}),n=!1),"object"==typeof modules&&(modules.define("BEMHTML",[],function(e){e(t({}))}),n=!1),n&&(BEMHTML=t({}),e.BEMHTML=BEMHTML)}("undefined"!=typeof window?window:"undefined"!=typeof global?global:this);