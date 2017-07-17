!function(e){var t={NOT_RESOLVED:"NOT_RESOLVED",IN_RESOLVING:"IN_RESOLVING",RESOLVED:"RESOLVED"},n=function(){var d={trackCircularDependencies:!0,allowMultipleDeclarations:!0},f={},l=!1,h=[],m=function(e,n,i){i||(i=n,n=[]);var o=f[e];o||(o=f[e]={name:e,decl:void 0}),o.decl={name:e,prev:o.decl,fn:i,state:t.NOT_RESOLVED,deps:n,dependents:[],exports:void 0}},_=function(t,n,o){"string"==typeof t&&(t=[t]),l||(l=!0,c(E)),h.push({deps:t,cb:function(t,r){r?(o||i)(r):n.apply(e,t)}})},p=function(e){var n=f[e];return n?t[n.decl.state]:"NOT_DEFINED"},v=function(e){return!!f[e]},y=function(e){for(var t in e)e.hasOwnProperty(t)&&(d[t]=e[t])},g=function(){var e,t={};for(var n in f)f.hasOwnProperty(n)&&(e=f[n],(t[e.decl.state]||(t[e.decl.state]=[])).push(n));return t},E=function(){l=!1,b()},b=function(){var e,t=h,n=0;for(h=[];e=t[n++];)M(null,e.deps,[],e.cb)},M=function(e,t,n,i){var r=t.length;r||i([]);for(var s,a,u=[],c=function(e,t){if(t)return void i(null,t);if(!--r){for(var n,o=[],s=0;n=u[s++];)o.push(n.exports);i(o)}},d=0,l=r;d<l;){if("string"==typeof(s=t[d++])){if(!f[s])return void i(null,o(s,e));a=f[s].decl}else a=s;u.push(a),x(a,n,c)}},x=function(n,i,o){if(n.state===t.RESOLVED)return void o(n.exports);if(n.state===t.IN_RESOLVING)return void(d.trackCircularDependencies&&u(n,i)?o(null,r(n,i)):n.dependents.push(o));if(n.dependents.push(o),n.prev&&!d.allowMultipleDeclarations)return void N(n,a(n));d.trackCircularDependencies&&(i=i.slice()).push(n);var c=!1,f=n.prev?n.deps.concat([n.prev]):n.deps;n.state=t.IN_RESOLVING,M(n,f,i,function(t,i){if(i)return void N(n,i);t.unshift(function(e,t){if(c)return void o(null,s(n));c=!0,t?N(n,t):k(n,e)}),n.fn.apply({name:n.name,deps:n.deps,global:e},t)})},k=function(e,n){e.exports=n,e.state=t.RESOLVED;for(var i,o=0;i=e.dependents[o++];)i(n);e.dependents=void 0},N=function(e,n){e.state=t.NOT_RESOLVED;for(var i,o=0;i=e.dependents[o++];)i(null,n);e.dependents=[]};return{create:n,define:m,require:_,getState:p,isDefined:v,setOptions:y,getStat:g}},i=function(e){c(function(){throw e})},o=function(e,t){return Error(t?'Module "'+t.name+'": can\'t resolve dependence "'+e+'"':'Required module "'+e+"\" can't be resolved")},r=function(e,t){for(var n,i=[],o=0;n=t[o++];)i.push(n.name);return i.push(e.name),Error('Circular dependence has been detected: "'+i.join(" -> ")+'"')},s=function(e){return Error('Declaration of module "'+e.name+'" has already been provided')},a=function(e){return Error('Multiple declarations of module "'+e.name+'" have been detected')},u=function(e,t){for(var n,i=0;n=t[i++];)if(e===n)return!0;return!1},c=function(){var t=[],n=function(e){return 1===t.push(e)},i=function(){var e=t,n=0,i=t.length;for(t=[];n<i;)e[n++]()};if("object"==typeof process&&process.nextTick)return function(e){n(e)&&process.nextTick(i)};if(e.setImmediate)return function(t){n(t)&&e.setImmediate(i)};if(e.postMessage&&!e.opera){var o=!0;if(e.attachEvent){var r=function(){o=!1};e.attachEvent("onmessage",r),e.postMessage("__checkAsync","*"),e.detachEvent("onmessage",r)}if(o){var s="__modules"+ +new Date,a=function(e){e.data===s&&(e.stopPropagation&&e.stopPropagation(),i())};return e.addEventListener?e.addEventListener("message",a,!0):e.attachEvent("onmessage",a),function(t){n(t)&&e.postMessage(s,"*")}}}var u=e.document;if("onreadystatechange"in u.createElement("script")){var c=u.getElementsByTagName("head")[0],d=function(){var e=u.createElement("script");e.onreadystatechange=function(){e.parentNode.removeChild(e),e=e.onreadystatechange=null,i()},c.appendChild(e)};return function(e){n(e)&&d()}}return function(e){n(e)&&setTimeout(i,0)}}();"object"==typeof exports?module.exports=n():e.modules=n()}("undefined"!=typeof window?window:global),"undefined"==typeof window&&"undefined"!=typeof module&&(modules=module.exports),modules.define("i-bem-dom",["i-bem","i-bem__internal","i-bem-dom__collection","i-bem-dom__events_type_dom","i-bem-dom__events_type_bem","inherit","identify","objects","functions","jquery","dom"],function(e,t,n,i,o,r,s,a,u,c,d,f){function l(e,t,n){var i,o,r,s,a=e[0],u=v(a);for(i in u)o=i.split(q),r=o[0],s=o[1],s&&((n[r]||(n[r]={}))[s]=!0),h(i,e,_(u[i],i,t))}function h(e,t,n,i,o){var r=t[0];if(!D[a(r)]){n||(n=_(y(r,e),e));var s=n.uniqId,c=j[s];if(c)return c.domElem.index(r)<0&&(c.domElem=c.domElem.add(t),u.extend(c.params,n)),c;C[s]=C[s]?C[s].add(t):t;var f=r.parentNode;f&&11!==f.nodeType||d.unique(C[s]);var l=m(e);return l._processInit(),!l.lazyInit||i||!1===n.lazyInit?(i&&t.addClass(P),c=new l(C[s],n,!!i),delete C[s],o&&o.apply(c,H.call(arguments,4)),c):void 0}}function m(e){if(B[e])return B[e];var t=e.split(q);return t[1]?w.declElem(t[0],t[1],{},{lazyInit:!0},!0):w.declBlock(e,{},{lazyInit:!0},!0)}function _(e,t,n){return e.uniqId||(e.uniqId=(e.id?t+"-id-"+e.id:a())+(n||a())),e}function p(e,t,n){var i=e.find(t);return n?i:i.add(e.filter(t))}function v(e){var t=a(e);return I[t]||(I[t]=g(e))}function y(e,t){var n=v(e);return n[t]||(n[t]={})}function g(e){var t=e.getAttribute(A);return t?JSON.parse(t):{}}function E(e,t){1===e.domElem.length?(e._delInitedMod(),delete j[e._uniqId]):e.domElem=e.domElem.not(t)}function b(e){e.each(function(){S[a(this)]=this.parentNode})}function M(e,t){e.add(e.parents()).each(function(e,n){var i=I[a(n)];i&&u.each(i,function(e){var n=j[e.uniqId];if(n){var i=t[n.__self._blockName];i&&n._dropElemCache(Object.keys(i))}})})}function x(e){return"string"==typeof e?e={elem:e}:c.isFunction(e)?e={elem:e.getName()}:c.isFunction(e.elem)&&(e.elem=e.elem.getName()),{elem:e.elem,mod:L(e.modName,e.modVal)}}function k(e){return d("string"==typeof e?d.parseHTML(e,null,!0):e)}function N(e){if("string"==typeof e||"object"==typeof e&&"string"==typeof e.block)throw new Error("Block must be a class or description (block, modName, modVal) of the block to find")}var w,C={},j={},S={},I={},D={},B=t.entities,P="i-bem",O="."+P,A="data-bem",T=n.NAME_PATTERN,V=n.MOD_DELIM,q=n.ELEM_DELIM,L=n.buildModPostfix,F=n.buildClassName,R=Array.prototype.reverse,H=Array.prototype.slice,W=new o.EventManagerFactory(m),X=new r.EventManagerFactory(m),Y=s({__constructor:function(e,t,n){this.domElem=e,this._elemsCache={},this._elemCache={},this._findBackRefs=[],j[t.uniqId||a(this)]=this,this.__base(null,t,n)},_block:function(){},_elems:function(e){var t=x(e),n=this._elemsCache[t.elem];if(n&&t.mod in n)return n[t.mod];var i=(n||(this._elemsCache[t.elem]={}))[t.mod]=this.findMixedElems(e).concat(this.findChildElems(e));return i.forEach(function(e){e._findBackRefs.push(this)},this),i},_elem:function(e){var t=x(e),n=this._elemCache[t.elem];if(n&&t.mod in n)return n[t.mod];var i=(n||(this._elemCache[t.elem]={}))[t.mod]=this.findMixedElem(e)||this.findChildElem(e);return i&&i._findBackRefs.push(this),i},_dropElemCache:function(e){return arguments.length?((Array.isArray(e)?e:H.call(arguments)).forEach(function(e){var t=x(e);t.mod?(this._elemsCache[t.elem]&&delete this._elemsCache[t.elem][t.mod],this._elemCache[t.elem]&&delete this._elemCache[t.elem][t.mod]):(delete this._elemsCache[t.elem],delete this._elemCache[t.elem])},this),this):(this._elemsCache={},this._elemCache={},this)},findChildBlock:function(e){return N(e),this._findEntities("find",e,!0)},findChildBlocks:function(e){return N(e),this._findEntities("find",e)},findParentBlock:function(e){return N(e),this._findEntities("parents",e,!0)},findParentBlocks:function(e){return N(e),this._findEntities("parents",e)},findMixedBlock:function(e){return N(e),this._findEntities("filter",e,!0)},findMixedBlocks:function(e){return N(e),this._findEntities("filter",e)},findChildElem:function(e,t){return t?this._filterFindElemResults(this._findEntities("find",e)).get(0):this._findEntities("find",e,!0)},findChildElems:function(e,t){var n=this._findEntities("find",e);return t?this._filterFindElemResults(n):n},findParentElem:function(e,t){return t?this._filterFindElemResults(this._findEntities("parents",e))[0]:this._findEntities("parents",e,!0)},findParentElems:function(e,t){var n=this._findEntities("parents",e);return t?this._filterFindElemResults(n):n},findMixedElem:function(e){return this._findEntities("filter",e,!0)},findMixedElems:function(e){return this._findEntities("filter",e)},_filterFindElemResults:function(e){var t=this._block();return e.filter(function(e){return e._block()===t})},_findEntities:function(e,t,n){var o=c.isFunction(t)?t.getEntityName():"object"==typeof t?t.block?t.block.getEntityName():"string"==typeof t.elem?this.__self._blockName+q+t.elem:t.elem.getEntityName():this.__self._blockName+q+t,r="."+("object"==typeof t?F(o,t.modName,void 0===t.modVal||t.modVal):o)+(n?":first":""),s=this.domElem[e](r);if(n)return s[0]?h(o,s.eq(0),void 0,!0)._setInitedMod():null;var a=[],u={};return s.each(function(e,t){var n=h(o,d(t),void 0,!0)._setInitedMod();u[n._uniqId]||(u[n._uniqId]=!0,a.push(n))}),new i(a)},_domEvents:function(e){return W.getEventManager(this,e,this.domElem)},_events:function(e){return X.getEventManager(this,e,this.domElem)},_emit:function(e,t){return("object"==typeof e&&"js"===e.modName||this.hasMod("js","inited"))&&r.emit(this,e,t),this},_extractModVal:function(e){var t,n=this.domElem[0];return n&&(t=n.className.match(this.__self._buildModValRE(e))),t?t[2]||!0:""},_onSetMod:function(e,t,n){var i=this.__self,o=i.getName();if(this._findBackRefs.forEach(function(i){""===n||i._dropElemCache({elem:o,modName:e,modVal:n}),i._dropElemCache(""===t?o:{elem:o,modName:e,modVal:t})}),this.__base.apply(this,arguments),"js"!==e||""!==t){var r=i._buildModClassNamePrefix(e),s=i._buildModValRE(e),a=""===t;this.domElem.each(function(){var e=this.className,i=r;!0!==t&&(i+=V+t),(!0===n?s.test(e):(" "+e).indexOf(" "+r+V)>-1)?this.className=e.replace(s,a?"":"$1"+i):a||d(this).addClass(i)})}},_afterSetMod:function(e,t,n){var i={modName:e,modVal:t,oldModVal:n};this._emit({modName:e,modVal:"*"},i)._emit({modName:e,modVal:t},i)},containsEntity:function(e){return f.contains(this.domElem,e.domElem)}},{create:function(){throw Error("bemDom entities can not be created otherwise than from DOM")},_processInit:function(e){if(this.onInit&&this._inited==e){this.__base(e),this.onInit();var t=this.getName(),n=this.onInit;this.init=function(){this.getName()===t&&n.apply(this,arguments)}}},_domEvents:function(e){return W.getEventManager(this,e,w.scope)},_events:function(e){return X.getEventManager(this,e,w.scope)},_buildModClassNamePrefix:function(e){return this.getEntityName()+V+e},_buildModValRE:function(e){return new RegExp("(\\s|^)"+this._buildModClassNamePrefix(e)+"(?:"+V+"("+T+"))?(?=\\s|$)")},_buildClassName:function(e,t){return F(this.getEntityName(),e,t)},_buildSelector:function(e,t){return"."+this._buildClassName(e,t)}}),z=s([t.Block,Y],{_block:function(){return this}}),G=s([t.Elem,Y],{_block:function(){return this._blockInstance||(this._blockInstance=this.findParentBlock(m(this.__self._blockName)))}});d.fn.bem=function(e,t){var n=h(e.getEntityName(),this,t,!0);return n?n._setInitedMod():null},d(function(){w={scope:d("body"),doc:d(document),win:d(window),Block:z,Elem:G,isEntity:function(e){return e instanceof z||e instanceof G},declBlock:function(e,n,i,o){return n&&("object"!=typeof n||Array.isArray(n))||(o=i,i=n,n="string"==typeof e?B[e]||z:e),t.declBlock(e,n,i,o)},declElem:function(e,n,i,o,r){return i&&("object"!=typeof i||Array.isArray(i))||(r=o,o=i,i=B[e+q+n]||G),t.declElem(e,n,i,o,r)},declMixin:t.declMixin,init:function(e){e="string"==typeof e?d(e):e||w.scope;var n={},i=a();return p(e,O).each(function(){l(d(this),i,n)}),t._runInitFns(),M(e,n),e},_destruct:function(e,t,n){var i,o=[];b(i=t?e.children():e),R.call(p(i,O)).each(function(e,t){var n=v(t),i=a(t);D[i]=!0,o.push(i),u.each(n,function(e){if(e.uniqId){var n=j[e.uniqId];n?E(n,t):delete C[e.uniqId]}}),delete I[a(t)]}),n&&(t?e.empty():e.remove()),S={},o.forEach(function(e){delete D[e]})},destruct:function(e,t){this._destruct(e,t,!0)},detach:function(e,t){this._destruct(e,t)},update:function(e,t){return this.destruct(e,!0),this.init(e.html(t))},replace:function(e,t){var n=e.prev(),i=e.parent();return t=k(t),this.destruct(e),this.init(n.length?t.insertAfter(n):t.prependTo(i))},append:function(e,t){return this.init(k(t).appendTo(e))},prepend:function(e,t){return this.init(k(t).prependTo(e))},before:function(e,t){return this.init(k(t).insertBefore(e))},after:function(e,t){return this.init(k(t).insertAfter(e))}},e(w)})}),function(){var e=modules.define,t=[];modules.define=function(n,i,o){e.apply(modules,arguments),"i-bem-dom__init"!==n&&arguments.length>2&&~i.indexOf("i-bem-dom")&&(t.push(n),1===t.length&&modules.define("i-bem-dom__init",t,function(e){e(arguments[arguments.length-1]),t=[]}))}}(),function(e){function t(e){var t=c(e);if(_)for(var n,i=0;n=y[i++];)e.hasOwnProperty(n)&&t.push(n);return t}function n(e,n,i){for(var o,s,a=t(i),u=0,c=a.length;u<c;)"__self"!==(o=a[u++])&&(s=i[o],h(s)&&(!r||s.toString().indexOf(".__base")>-1)?n[o]=function(t,i){var o=e[t]?e[t]:"__constructor"===t?n.__self.__parent:m;return function(){var e=this.__base;this.__base=o;var t=i.apply(this,arguments);return this.__base=e,t}}(o,s):n[o]=s)}function i(e,t){for(var n,i=1;n=e[i++];)t?h(n)?o.self(t,n.prototype,n):o.self(t,n):t=h(n)?o(e[0],n.prototype,n):o(e[0],n);return t||e[0]}function o(){var e=arguments,t=l(e[0]),o=t||h(e[0]),r=o?t?i(e[0]):e[0]:s,a=e[o?1:0]||{},c=e[o?2:1],f=a.__constructor||o&&r.prototype.__constructor?function(){return this.__constructor.apply(this,arguments)}:o?function(){return r.apply(this,arguments)}:function(){};if(!o)return f.prototype=a,f.prototype.__self=f.prototype.constructor=f,d(f,c);d(f,r),f.__parent=r;var m=r.prototype,_=f.prototype=u(m);return _.__self=_.constructor=f,a&&n(m,_,a),c&&n(r,f,c),f}var r=function(){"_"}.toString().indexOf("_")>-1,s=function(){},a=Object.prototype.hasOwnProperty,u=Object.create||function(e){var t=function(){};return t.prototype=e,new t},c=Object.keys||function(e){var t=[];for(var n in e)a.call(e,n)&&t.push(n);return t},d=function(e,t){for(var n in t)a.call(t,n)&&(e[n]=t[n]);return e},f=Object.prototype.toString,l=Array.isArray||function(e){return"[object Array]"===f.call(e)},h=function(e){return"[object Function]"===f.call(e)},m=function(){},_=!0,p={toString:""};for(var v in p)p.hasOwnProperty(v)&&(_=!1);var y=_?["toString","valueOf"]:null;o.self=function(){var e=arguments,t=l(e[0]),o=t?i(e[0],e[0][0]):e[0],r=e[1],s=e[2],a=o.prototype;return r&&n(a,a,r),s&&n(o,o,s),o};var g=!0;"object"==typeof exports&&(module.exports=o,g=!1),"object"==typeof modules&&(modules.define("inherit",function(e){e(o)}),g=!1),"function"==typeof define&&(define(function(e,t,n){n.exports=o}),g=!1),g&&(e.inherit=o)}(this),modules.define("jquery",["loader_type_js","jquery__config"],function(e,t,n){function i(t){e(t?jQuery:jQuery.noConflict(!0))}"undefined"!=typeof jQuery?i(!0):t(n.url,i)}),modules.define("loader_type_js",function(e){var t={},n={},i=document.getElementsByTagName("head")[0],o=function(e,n){var i,o=t[e],r=0;for(delete t[e];i=o[r++];)i[n]&&i[n]()},r=function(e){n[e]=!0,o(e,"success")},s=function(e){o(e,"error")};e(function(e,o,a){if(n[e])return void(o&&o());if(t[e])return void t[e].push({success:o,error:a});t[e]=[{success:o,error:a}];var u=document.createElement("script");u.type="text/javascript",u.charset="utf-8",u.src=("file:"!==location.protocol||e.indexOf("//")?"":"http:")+e,"onload"in u?(u.onload=function(){u.onload=u.onerror=null,r(e)},u.onerror=function(){u.onload=u.onerror=null,s(e)}):u.onreadystatechange=function(){var t=this.readyState;"loaded"!==t&&"complete"!==t||(u.onreadystatechange=null,r(e))},i.insertBefore(u,i.lastChild)})}),modules.define("jquery__config",function(e){e({url:"https://yastatic.net/jquery/3.1.0/jquery.min.js"})}),modules.define("jquery__config",["ua","objects"],function(e,t,n,i){e(t.msie&&parseInt(t.version,10)<9?n.extend(i,{url:"https://yastatic.net/jquery/1.12.3/jquery.min.js"}):i)}),modules.define("ua",function(e){var t=navigator.userAgent.toLowerCase(),n=/(chrome)[ \/]([\w.]+)/.exec(t)||/(webkit)[ \/]([\w.]+)/.exec(t)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t)||/(msie) ([\w.]+)/.exec(t)||t.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t)||[],i={browser:n[1]||"",version:n[2]||"0"},o={};i.browser&&(o[i.browser]=!0,o.version=i.version),o.chrome?o.webkit=!0:o.webkit&&(o.safari=!0),e(o)}),modules.define("objects",function(e){var t=Object.prototype.hasOwnProperty;e({extend:function(e,n){("object"!=typeof e||null===e)&&(e={});for(var i=1,o=arguments.length;i<o;i++){var r=arguments[i];if(r)for(var s in r)t.call(r,s)&&(e[s]=r[s])}return e},isEmpty:function(e){for(var n in e)if(t.call(e,n))return!1;return!0},each:function(e,n,i){for(var o in e)t.call(e,o)&&(i?n.call(i,e[o],o):n(e[o],o))}})}),modules.define("functions",function(e){var t=Object.prototype.toString;e({isFunction:function(e){return"[object Function]"===t.call(e)},noop:function(){}})}),modules.define("dom",["jquery"],function(e,t){var n={"datetime-local":!0,date:!0,month:!0,number:!0,password:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};e({contains:function(e,t){var n=!1;return t.each(function(){var t=this;do{if(~e.index(t))return!(n=!0)}while(t=t.parentNode);return n}),n},getFocused:function(){try{return t(document.activeElement)}catch(e){}},containsFocus:function(e){return this.contains(e,this.getFocused())},isFocusable:function(e){var t=e[0];if(!t)return!1;if(t.hasAttribute("tabindex"))return!0;switch(t.tagName.toLowerCase()){case"iframe":return!0;case"input":case"button":case"textarea":case"select":return!t.disabled;case"a":return!!t.href}return!1},isEditable:function(e){var t=e[0];if(!t)return!1;switch(t.tagName.toLowerCase()){case"input":return n.hasOwnProperty(t.type)&&!t.disabled&&!t.readOnly;case"textarea":return!t.disabled&&!t.readOnly;default:return"true"===t.contentEditable}}})}),modules.define("i-bem-dom__init",["i-bem-dom"],function(e,t){e(function(e){return t.init(e)})}),modules.define("i-bem",["i-bem__internal","inherit","identify","next-tick","objects","functions"],function(e,t,n,i,o,r,s){function a(e,t,n){return"__"+e+"__mod"+(t?"_"+t:"")+(n?"_"+n:"")}function u(e,t,n,i){return n||i?function(o,r,s){var a,u;if(n&&(a=!1===n.apply(this,arguments)),(!i||i(e,r,s))&&(u=!1===t.apply(this,arguments)),a||u)return!1}:t}function c(e,t,n){if(s.isFunction(t))n[a(e,"*","*")]=t;else{var i,o,r;for(i in t)if(r=t[i],s.isFunction(r))n[a(e,i,"*")]=r;else{var c=a(e,i,"*");for(o in r){var d=r[o],f=o[0];"!"===f||"~"===f||"*"===o?("*"===o||(o=o.substr(1)),n[c]=u(o,d,n[c],v[f])):n[a(e,i,o)]=d}}}}function d(e,t){return t?Array.isArray(t)?function(n){for(var i=0,o=t.length;i<o;)if(f(n,e,t[i++]))return!0;return!1}:function(n){return f(n,e,t)}:function(t){return f(t,e,!0)}}function f(e,t,n){var i=e._processingMods[t];return"*"===n?e.hasMod(t)||null!=i:e.hasMod(t,n)||i===n}function l(e){e.beforeSetMod&&(c("before",e.beforeSetMod,e),delete e.beforeSetMod),e.onSetMod&&(c("after",e.onSetMod,e),delete e.onSetMod)}function h(e,t,i,o,r){i||(i=p[t]||e),Array.isArray(i)||(i=[i]),i[0].__bemEntity||(i=i.slice(),i.unshift(p[t]||e)),o&&l(o);var s;return t===i[0].getEntityName()?(s=n.self(i,o,r))._processInit(!0):s=p[t]=n(i,o,r),s}var m=t.ELEM_DELIM,_=[],p={},v={"!":function(e,t,n){return t!==e},"~":function(e,t,n){return n===e}},y=n({__constructor:function(e,t,n){this._modCache=e||{},this._processingMods={},this.params=r.extend(this._getDefaultParams(),t),this._uniqId=this.params.uniqId||i(this),!1!==n?this._setInitedMod():_.push(this._setInitedMod,this)},_setInitedMod:function(){return this.setMod("js","inited")},_delInitedMod:function(){this.delMod("js")},hasMod:function(e,t){var n=typeof t;"undefined"===n||"boolean"===n||(t=t.toString());var i=this.getMod(e)===(t||"");return 1===arguments.length?!i:i},getMod:function(e){var t=this._modCache;return e in t?t[e]||"":t[e]=this._extractModVal(e)},setMod:function(e,t){var n=typeof t;if("undefined"===n?t=!0:"boolean"===n?!1===t&&(t=""):t=t.toString(),null!=this._processingMods[e])return this;var i=this.getMod(e);if(i===t)return this;this._processingMods[e]=i;for(var o,r,s,a=!0,u=[e,t,i],c=[["*","*"],[e,"*"],[e,t]],d=["before","after"],f=0;o=d[f++];){for(r=0;s=c[r++];)if(!1===this._callModFn(o,s[0],s[1],u)){a=!1;break}if(!a)break;"before"===o&&(this._modCache[e]=t,this._onSetMod(e,t,i))}return this._processingMods[e]=null,a&&this._afterSetMod(e,t,i),this},_onSetMod:function(e,t,n){},_afterSetMod:function(e,t,n){},toggleMod:function(e,t,n,i){void 0===t&&(t=!0),void 0===n?n="":"boolean"==typeof n&&(i=n,n="");var o=this.getMod(e);return(o===t||o===n)&&this.setMod(e,"boolean"==typeof i?i?t:n:this.hasMod(e,t)?n:t),this},delMod:function(e){return this.setMod(e,"")},_callModFn:function(e,t,n,i){var o=a(e,t,n);return this[o]?this[o].apply(this,i):void 0},_extractModVal:function(e){return""},_getDefaultParams:function(){return{}},_nextTick:function(e){var t=this;return o(function(){t.hasMod("js","inited")&&e.call(t)}),this}},{create:function(e,t){return new this(e,t)},declMod:function(e,t,i){t&&l(t);var o=d(e.modName,e.modVal),a=this.prototype;return r.each(t,function(e,n){s.isFunction(e)&&(t[n]=function(){var t;if(o(this))t=e;else{var i=a[n];i&&i!==e&&(t=this.__base)}return t?t.apply(this,arguments):void 0})}),n.self(this,t,i)},__bemEntity:!0,_name:null,_processInit:function(e){this._inited=!0},getName:function(){return this._name},getEntityName:function(){return this._name}}),g=y,E=n(y,{_block:function(){return this._blockInstance}},{create:function(e,t,n){var i=new this(t,n);return i._blockInstance=e,i},getEntityName:function(){return this._blockName+m+this._name}});e({Block:g,Elem:E,entities:p,declBlock:function(e,t,n,i){"object"!=typeof t||Array.isArray(t)||(i=n,n=t,t=void 0);var o=g;"string"!=typeof e&&(o=e,e=e.getEntityName());var r=h(o,e,t,n,i);return r._name=r._blockName=e,r},declElem:function(e,t,n,i,o){var r,s=E;"string"!=typeof e?(o=i,i=n,n=t,t=e._name,s=e,e=s._blockName,r=s.getEntityName()):r=e+m+t,"object"!=typeof n||Array.isArray(n)||(o=i,i=n,n=void 0);var a=h(s,r,n,i,o);return a._blockName=e,a._name=t,a},declMixin:function(e,t){return l(e||(e={})),n(e,t)},_runInitFns:function(){if(_.length){var e,t=_,n=0;for(_=[];e=t[n];)e.call(t[n+1]),n+=2}}})}),modules.define("i-bem__internal",function(e){function t(e){var t=typeof e;return"string"===t||"number"===t||"boolean"===t}function n(e,t){var n="";return null!=t&&!1!==t&&(n+=s+e,!0!==t&&(n+=s+t)),n}function i(e,t,i){return e+n(t,i)}function o(e,t,o,s){return i(e,r,r)+a+t+n(o,s)}var r,s="_",a="__";e({NAME_PATTERN:"[a-zA-Z0-9-]+",MOD_DELIM:s,ELEM_DELIM:a,buildModPostfix:n,buildClassName:function(e,n,s,a){return t(s)?t(a)||(a=s,s=n,n=r):void 0!==s?s=r:n&&"string"!=typeof n&&(n=r),n||s?n?o(e,n,s,a):i(e,s,a):e},buildClassNames:function(e,t,n){t&&"string"!=typeof t&&(n=t,t=r);var s=t?o(e,t,r,r):i(e,r,r);if(n)for(var a in n)n.hasOwnProperty(a)&&n[a]&&(s+=" "+(t?o(e,t,a,n[a]):i(e,a,n[a])));return s}})}),modules.define("identify",function(e){var t=0,n="__"+ +new Date,i=this.global,o=function(){return"uniq"+ ++t},r=function(e){if("object"==typeof e&&null!==e||"function"==typeof e){var t;return"uniqueID"in e?(e===i.document&&(e=e.documentElement),t="uniqueID"):t=n,t in e?e[t]:e[t]=o()}return""};e(function(e){if(arguments.length){if(1===arguments.length)return r(e);for(var t=[],n=0,i=arguments.length;n<i;n++)t.push(r(arguments[n]));return t.sort().join("")}return o()})}),modules.define("next-tick",function(e){var t=this.global,n=[],i=function(e){return n.push(e),1===n.length},o=function(){var e=n,t=0,i=n.length;for(n=[];t<i;)e[t++]()};if("object"==typeof process&&process.nextTick)return e(function(e){i(e)&&process.nextTick(o)});if(t.setImmediate)return e(function(e){i(e)&&t.setImmediate(o)});if(t.postMessage){var r=!0;if(t.attachEvent){var s=function(){r=!1};t.attachEvent("onmessage",s),t.postMessage("__checkAsync","*"),t.detachEvent("onmessage",s)}if(r){var a="__nextTick"+ +new Date,u=function(e){e.data===a&&(e.stopPropagation&&e.stopPropagation(),o())};return t.addEventListener?t.addEventListener("message",u,!0):t.attachEvent("onmessage",u),e(function(e){i(e)&&t.postMessage(a,"*")})}}var c=t.document;if("onreadystatechange"in c.createElement("script")){var d=c.getElementsByTagName("head")[0],f=function(){var e=c.createElement("script");e.onreadystatechange=function(){e.parentNode.removeChild(e),e=e.onreadystatechange=null,o()},d.appendChild(e)};return e(function(e){i(e)&&f()})}e(function(e){i(e)&&t.setTimeout(o,0)})}),modules.define("i-bem-dom__events",["i-bem__internal","i-bem-dom__collection","inherit","identify","objects","jquery","functions"],function(e,t,n,i,o,r,s,a){var u=window,c=document,d=(o(u),o(c),{}),f=i({__constructor:function(e,t,n){this._params=e,this._fnWrapper=t,this._eventBuilder=n,this._storage={}},on:function(e,t,n,i,r){var s=this._params,u=this._eventBuilder(e,s);a.isFunction(t)&&(r=i,i=n,n=t,t=void 0);var c=this._storage[u]||(this._storage[u]={}),d=o(n,i);if(!c[d]){var f=s.bindDomElem,l=s.bindSelector,h=this,m=c[d]=this._fnWrapper(r?function(){h.un(e,n,i),n.apply(this,arguments)}:n,i,d);f.on(u,l,t,m),l&&f.is(l)&&f.on(u,t,m)}return this},once:function(e,t,n,i){return a.isFunction(t)&&(i=n,n=t,t=void 0),this.on(e,t,n,i,!0)},un:function(e,t,n){var i=arguments.length;if(i){var s=this._params,a=this._eventBuilder(e,s);if(1===i)this._unbindByEvent(this._storage[a],a);else{var u,c=o(t,n),d=this._storage[a],f=s.bindDomElem,l=s.bindSelector;(u=d&&d[c])&&delete d[c];var h=u||t;f.off(a,s.bindSelector,h),l&&f.is(l)&&f.off(a,h)}}else r.each(this._storage,this._unbindByEvent,this);return this},_unbindByEvent:function(e,t){var n=this._params,i=n.bindDomElem,o=n.bindSelector,s=o&&i.is(o);e&&r.each(e,function(e){i.off(t,o,e),s&&i.off(t,e)}),this._storage[t]=null}}),l=function(e){return function(){var t=arguments;return this._eventManagers.forEach(function(n){n[e].apply(n,t)}),this}},h=i({__constructor:function(e){this._eventManagers=e},on:l("on"),once:l("once"),un:l("un")});e({EventManagerFactory:i({__constructor:function(e){this._storageSuffix=o(),this._getEntityCls=e,this._eventManagerCls=f},getEventManager:function(e,t,i){if(t instanceof n)return new h(t.map(function(t){return this.getEventManager(e,t,i)},this));var r,s=o(e),a=d[s],u=this._storageSuffix,c="function"!=typeof e,f="";c?r=e.__self:(r=e,f=e._buildSelector());var l=this._buildEventManagerParams(t,i,f,r),m=l.key+u;return a||(a=d[s]={},c&&e._events().on({modName:"js",modVal:""},function(){l.bindToArbitraryDomElem&&a[m]&&a[m].un(),delete a[s]})),a[m]||(a[m]=this._createEventManager(e,l,c))},_buildEventManagerParams:function(e,n,i,r){var a={bindEntityCls:null,bindDomElem:n,bindToArbitraryDomElem:!1,bindSelector:i,ctxSelector:i,key:""};if(e){var d=typeof e;if(e.jquery)a.bindDomElem=e,a.key=o.apply(null,e.get()),a.bindToArbitraryDomElem=!0;else if(e===u||e===c||"object"===d&&1===e.nodeType)a.bindDomElem=s(e),a.key=o(e),a.bindToArbitraryDomElem=!0;else if("object"===d&&e.__self)a.bindDomElem=e.domElem,a.key=e._uniqId,a.bindEntityCls=e.__self;else if("string"===d||"object"===d||"function"===d){var f,l,h,m;"string"===d?(f=r._blockName,l=e):"object"===d?(f=e.block?e.block.getName():r._blockName,l="function"==typeof e.elem?e.elem.getName():e.elem,h=e.modName,m=e.modVal):e.getName()===e.getEntityName()?f=e.getName():(f=r._blockName,l=e.getName());var _=t.buildClassName(f,l);a.bindEntityCls=this._getEntityCls(_),a.bindSelector="."+(a.key=_+t.buildModPostfix(h,m))}}else a.bindEntityCls=r;return a},_createEventManager:function(e,t,n){throw new Error("not implemented")}})})}),modules.define("i-bem-dom__collection",["inherit","i-bem__collection"],function(e,t,n){function i(e,t,n){return e.map(function(e){return e[t].apply(e,n)})}function o(e){return function(){return new s(i(this,e,arguments))}}function r(e){return function(){var t=[];return i(this,e,arguments).forEach(function(e){e.forEach(function(e){t.push(e)})}),new s(t)}}var s=t(n,{findChildBlock:o("findChildBlock"),findChildBlocks:r("findChildBlocks"),findParentBlock:o("findParentBlock"),findParentBlocks:r("findParentBlocks"),findMixedBlock:o("findMixedBlock"),findMixedBlocks:r("findMixedBlocks"),findChildElem:o("findChildElem"),findChildElems:r("findChildElems"),findParentElem:o("findParentElem"),findParentElems:r("findParentElems"),findMixedElem:o("findMixedElem"),findMixedElems:r("findMixedElems")});e(s)}),modules.define("i-bem__collection",["inherit"],function(e,t){function n(e){return function(){var t=arguments;return this._entities.forEach(function(n){n[e].apply(n,t)}),this}}function i(e){return function(){var t=this._entities;return t[e].apply(t,arguments)}}function o(e,t){return function(){var n=arguments;return this._entities[e](function(e){return e[t].apply(e,n)})}}var r=t({__constructor:function(e){var t=this._entities=[],n={};(Array.isArray(e)?e:a.call(arguments)).forEach(function(e){n[e._uniqId]||(n[e._uniqId]=!0,t.push(e))})},setMod:n("setMod"),delMod:n("delMod"),toggleMod:n("toggleMod"),everyHasMod:o("every","hasMod"),someHasMod:o("some","hasMod"),get:function(e){return this._entities[e]},forEach:i("forEach"),map:i("map"),reduce:i("reduce"),reduceRight:i("reduceRight"),filter:function(){return new this.__self(i("filter").apply(this,arguments))},some:i("some"),every:i("every"),has:function(e){return this._entities.indexOf(e)>-1},find:function(e,t){t||(t=this);for(var n,i=this._entities,o=0;n=i[o];)if(e.call(t,i[o],o++,this))return n;return null},concat:function(){for(var e,t=0,n=arguments.length,i=[];t<n;)e=arguments[t++],i.push(e instanceof r?e._entities:e);return new this.__self(s.apply(this._entities,i))},size:function(){return this._entities.length},toArray:function(){return this._entities.slice()}}),s=Array.prototype.concat,a=Array.prototype.slice;e(r)}),modules.define("i-bem-dom__events_type_dom",["i-bem-dom__events","inherit","jquery"],function(e,t,n,i){var o=function(e){return e};e({EventManagerFactory:n(t.EventManagerFactory,{_createEventManager:function(e,t,n){function r(o){return function(r){var s;if(n)s=e;else{var a=i(r.target).closest(t.ctxSelector);a.length&&(s=a.bem(e))}s&&(t.bindEntityCls&&(r.bemTarget=i(this).bem(t.bindEntityCls)),o.apply(s,arguments))}}return new this._eventManagerCls(t,r,o)}})})}),modules.define("i-bem-dom__events_type_bem",["i-bem-dom__events","i-bem__internal","inherit","functions","jquery","identify","events"],function(e,t,n,i,o,r,s,a){var u=r.event.special,c={},d=function(e){return{setup:function(){c[e]||(c[e]=!0)},teardown:o.noop}},f=function(e,t){var i="__bem__"+t.bindEntityCls.getEntityName()+("object"==typeof e?e instanceof a.Event?e.type:n.buildModPostfix(e.modName,e.modVal):e);return u[i]||(u[i]=d(i)),i},l=i(t.EventManagerFactory,{_createEventManager:function(e,t,n){function i(i,o,s){return function(a,u,c,d){if(!c.fns[s]){var f,l;n?(f=e,l=f.domElem):(l=r(a.target).closest(t.ctxSelector),l.length&&(f=l.bem(e))),!f||c.propagationStoppedDomNode&&r.contains(l[0],c.propagationStoppedDomNode)||(d.data=a.data,d.bemTarget=d.target,c.fns[s]=!0,i.call(o||f,d,u),d.isPropagationStopped()&&(a.stopPropagation(),c.propagationStoppedDomNode=l[0]))}}}return new this._eventManagerCls(t,i,f)}});e({emit:function(e,t,n){var i;"string"==typeof t?i=new a.Event(t,e):t.modName?i=new a.Event("modchange",e):t.target||(t.target=e,i=t);var o=f(t,{bindEntityCls:e.__self});c[o]&&e.domElem.trigger(o,[n,{fns:{},propagationStoppedDomNode:null},i])},EventManagerFactory:l})}),modules.define("events",["identify","inherit","functions"],function(e,t,n,i){var o="__"+ +new Date+"storage",r=n({__constructor:function(e,t){this.type=e,this.target=t,this.data=void 0,this._isDefaultPrevented=!1,this._isPropagationStopped=!1},preventDefault:function(){this._isDefaultPrevented=!0},isDefaultPrevented:function(){return this._isDefaultPrevented},stopPropagation:function(){this._isPropagationStopped=!0},isPropagationStopped:function(){return this._isPropagationStopped}});e({Emitter:n({on:function(e,n,r,s,a){if("string"==typeof e){i.isFunction(n)&&(s=r,r=n,n=void 0);for(var u,c,d,f,l=t(r,s),h=this[o]||(this[o]={}),m=e.split(" "),_=0;u=m[_++];)f=h[u]||(h[u]={ids:{},list:{}}),l in f.ids||(c=f.list,d={
fn:r,data:n,ctx:s,special:a},c.last?(c.last.next=d,d.prev=c.last):c.first=d,f.ids[l]=c.last=d)}else for(var p in e)e.hasOwnProperty(p)&&this.on(p,e[p],n,a);return this},once:function(e,t,n,i){return this.on(e,t,n,i,{once:!0})},un:function(e,n,i){if("string"==typeof e||void 0===e){var r=this[o];if(r)if(e){for(var s,a=e.split(" "),u=0;e=a[u++];)if(s=r[e])if(n){var c=t(n,i),d=s.ids;if(c in d){var f=s.list,l=d[c],h=l.prev,m=l.next;h?h.next=m:l===f.first&&(f.first=m),m?m.prev=h:l===f.last&&(f.last=h),delete d[c]}}else delete this[o][e]}else delete this[o]}else for(var _ in e)e.hasOwnProperty(_)&&this.un(_,e[_],n);return this},emit:function(e,t){var n=this[o],i=!1;if(n)for(var s,a,u=["string"==typeof e?e:e.type,"*"],c=0;s=u[c++];)if(a=n[s])for(var d,f=a.list.first,l=a.list.last;f&&(i||(i=!0,"string"==typeof e&&(e=new r(e)),e.target||(e.target=this)),e.data=f.data,d=f.fn.apply(f.ctx||this,arguments),!1===d&&(e.preventDefault(),e.stopPropagation()),f.special&&f.special.once&&this.un(e.type,f.fn,f.ctx),f!==l);)f=f.next;return this}}),Event:r})}),modules.define("page",["i-bem-dom","mini-map","image"],function(e,t,n,i){e(t.declBlock(this.name,{onSetMod:{js:{inited:function(){var e=this.findChildBlock(n),t=this.findChildBlock(i);e._events().on("change",function(){t.domElem.css({backgroundPosition:100*e.getVal().x+"% "+100*e.getVal().y+"%"})});var o=document.createElement("img");o.src=t.domElem.css("background-image").match(/^url\(["']?(.+?)["']?\)$/)[1],o.onload=function(){e.setVal({x:.5,y:.5}).setThumbSize({width:t.domElem.width()/o.width*e.domElem.width(),height:t.domElem.height()/o.height*e.domElem.height()})}}}}}))}),modules.define("image",["i-bem-dom"],function(e,t){e(t.declBlock(this.name,{},{}))}),modules.require(["i-bem-dom__init","jquery","next-tick"],function(e,t,n){t(function(){n(e)})}),modules.define("mini-map",["i-bem-dom"],function(e,t){e(t.declBlock(this.name,{onSetMod:{js:{inited:function(){this._enabledX=!0,this._enabledY=!0,(this._enabledX||this._enabledY)&&(this.reflow().repaint(),(this.params.scrollStepX||this.params.scrollStepY)&&this._domEvents().on("mousewheel",function(e){this._enabledX&&this.setVal({x:(this._x>=0?this._x:.5)+(0===e.originalEvent.deltaX?0:e.originalEvent.deltaX>0?this.params.scrollStepX:-this.params.scrollStepX)}),this._enabledY&&this.setVal({y:(this._y>=0?this._y:.5)+(0===e.originalEvent.deltaY?0:e.originalEvent.deltaY>0?this.params.scrollStepY:-this.params.scrollStepY)})}),this._domEvents().on("mousedown mousemove",function(e){"mousemove"===e.type&&1!==e.which||(this._enabledX&&this.setVal({x:(e.pageX-this._offset.left-this._tHalfWidth*this._mWidth)/(this._mWidth-this._tWidth*this._mWidth)}),this._enabledY&&this.setVal({y:(e.pageY-this._offset.top-this._tHalfHeight*this._mHeight)/(this._mHeight-this._tHeight*this._mHeight)}),this.repaint())}))}}},disableAxis:function(e){return"x"===e&&(this._enabledX=!1),"y"===e&&(this._enabledY=!1),this},enableAxis:function(e){return"x"===e&&(this._enabledX=!0),"y"===e&&(this._enabledY=!0),this},reflow:function(){return this._mHeight=this.domElem.innerHeight(),this._tHeight=this._elem("thumb").domElem.height()/this._mHeight,this._tTop=this._mHeight-this._elem("thumb").domElem.height(),this._tHalfHeight=this._tHeight/2,this._mWidth=this.domElem.innerWidth(),this._tWidth=this._elem("thumb").domElem.width()/this._mWidth,this._tLeft=this._mWidth-this._elem("thumb").domElem.width(),this._tHalfWidth=this._tWidth/2,this._offset=this.domElem.offset(),this},repaint:function(){return this._enabledX&&"number"!=typeof this._x||this._enabledY&&"number"!=typeof this._y?(this._elem("thumb").setMod("hidden",!0),this):(this._elem("thumb").delMod("hidden"),this._elem("thumb").domElem.css({left:this._tLeft*this._x,top:this._tTop*this._y,width:100*this._tWidth+"%",height:100*this._tHeight+"%"}),this)},setThumbSize:function(e){return this._elem("thumb").domElem.css(e),this.reflow().repaint(),this},getVal:function(){return{x:this._x,y:this._y}},setVal:function(e){return[void 0,this._x].indexOf(e.x)>-1&&[void 0,this._y].indexOf(e.y)>-1?this:(void 0!==e.x&&(this._x=e.x<0?0:e.x>1?1:e.x),void 0!==e.y&&(this._y=e.y<0?0:e.y>1?1:e.y),this.repaint()._emit("change"),this)}},{lazyInit:!0,onInit:function(){this._domEvents().on("mousedown",function(){})}}))});var BEMHTML;!function(e){function t(e){var t={};return t.apply=function(){return""},t}var n=!0;"object"==typeof module&&"object"==typeof module.exports&&(exports.BEMHTML=t({}),n=!1),"object"==typeof modules&&(modules.define("BEMHTML",[],function(e){e(t({}))}),n=!1),n&&(BEMHTML=t({}),e.BEMHTML=BEMHTML)}("undefined"!=typeof window?window:"undefined"!=typeof global?global:this);