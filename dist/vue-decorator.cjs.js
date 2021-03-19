"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var vue=require("vue"),vueClassComponent=require("vue-class-component"),extendStatics=function(t,e){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)};function __extends(t,e){function r(){this.constructor=t}extendStatics(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}function Comp(t){return t=t||{},function(e){var r=e.__o||(e.__o={}),n=r.components||(r.components={});for(var o in t)n[o]=t[o];var i=!1;if(r.provide){var c=r.provide;r.provide=function(){var t=this,e={};for(var r in c)e[r]=vue.computed((function(){return t[r]}));return e}}var a={};if(r.inject){i=!0;for(var u=0;u<r.inject.length;++u)a[r.inject[u]]=!0}var s=r.props||(r.props={});if(!i)for(var o in s)if(s[o]._isModel){i=!0;break}return vueClassComponent.createDecorator((function(t,e){(t.mixins||(t.mixins=[])).push({data:function(){for(var t in s)this._.props[t]=this._.props[t]||s[t].default;return i&&function(t){var e=t._.proxy;t._.proxy=new Proxy(e,{get:function(t,e){return e in a?t[e].value:t[e]},set:function(t,e,r){return e in s&&s[e]._isModel?t.$emit("update:"+e,r):t[e]=r,!0}})}(this),{}}})}))(e.prototype,o),function(t){function e(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var o=t.apply(this,e)||this,i=r.props||(r.props={});for(var c in i)i[c].default=o[c];return o}return __extends(e,t),e}(e)}}function Inject(){return function(t,e){var r=t.constructor.__o||(t.constructor.__o={});(r.inject||(r.inject=[])).push(e)}}function Model(){return function(t,e){var r=t.constructor.__o||(t.constructor.__o={}),n=r.props||(r.props={}),o=r.emits||(r.emits={}),i="update:"+e;n[e]={type:[Object,Array,String,Number,Boolean,Function],_isModel:!0,default:void 0},o[i]=null}}function Prop(){return function(t,e){var r=t.constructor.__o||(t.constructor.__o={});(r.props||(r.props={}))[e]={type:[Object,Array,String,Number,Boolean,Function],default:void 0}}}function Provide(){return function(t,e){var r=t.constructor.__o||(t.constructor.__o={});(r.provide||(r.provide={}))[e]=null}}var DEEP=1,IMMEDIATE=2;function Watch(t){return function(e,r,n){var o=e.constructor.__o||(e.constructor.__o={}),i=o.watch||(o.watch={}),c="";"object"==typeof t&&(c=t.name||""),""==c&&(c=r.substr(0,r.length-"Changed".length));var a={};if("object"==typeof t)for(var r in t)"name"!=r&&(a[r]=t[r]);else"number"==typeof t&&(t&DEEP&&(a.deep=!0),t&IMMEDIATE&&(a.immediate=!0));a.handler=n.value,i[c]=a}}function State(attrName){function create(target,key){var name=attrName||key;name=name.trim();var getVal=null,setVal=null,ch=".";function initAttr(t){Object.defineProperty(t,key,{enumerable:!0,configurable:!0,get:function(){return getVal.call(t)},set:function(e){setVal.call(t,e)}})}"["==name.charAt(0)&&(ch=""),getVal=eval("(function() { return this.$store.state"+ch+name+"; })"),setVal=eval("(function(val) { this.$store.state"+ch+name+"=val; })"),vueClassComponent.createDecorator((function(t,e){(t.mixins||(t.mixins=[])).push({data:function(){return initAttr(this),{}}})}))(target,key)}return create}exports.Comp=Comp,exports.DEEP=DEEP,exports.IMMEDIATE=IMMEDIATE,exports.Inject=Inject,exports.Model=Model,exports.Prop=Prop,exports.Provide=Provide,exports.State=State,exports.Watch=Watch;