'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vueClassComponent = require('vue-class-component');

vue.RuntimeHook.getPublicInstanceProxyHandlers.push(function (instance, key) {
    var ctx = instance;
    var rst = {
        handler: false,
        data: null,
    };
    if (!ctx["_vd_"]) {
        return rst;
    }
    if (key in ctx["_vd_"].mapInject) {
        rst.handler = true;
        rst.data = ctx[key].value;
    }
    return rst;
});
vue.RuntimeHook.setPublicInstanceProxyHandlers.push(function (instance, key, val) {
    var ctx = instance;
    var rst = {
        handler: false,
        success: true,
    };
    if (!ctx["_vd_"]) {
        return rst;
    }
    rst.handler = true;
    rst.success = true;
    if ((key in ctx["_vd_"].objProp) && ctx["_vd_"].objProp[key]._isModel) {
        instance.emit("update:" + key, val);
    }
    else {
        rst.handler = false;
        rst.success = false;
    }
    return rst;
});

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function extend(obj) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    for (var i = 0; i < args.length; ++i) {
        for (var key in args[i]) {
            if (typeof (args[i][key]) != "object" || args[i][key] == null) {
                obj[key] = args[i][key];
                continue;
            }
            if (!obj[key] || typeof (obj[key]) != "object" || obj[key] == null) {
                obj[key] = args[i][key];
                continue;
            }
            extend(obj[key], args[i][key]);
        }
    }
}
function Comp(comps, options) {
    comps = comps || {};
    return function (target) {
        var obj = target["__o"] || (target["__o"] = {});
        var objComp = obj.components || (obj.components = {});
        for (var key in comps) {
            objComp[key] = comps[key];
        }
        var cfgData = {
            mapInject: {},
            objProp: {},
        };
        if (obj.provide) {
            var objProvide = obj.provide;
            obj.provide = function () {
                var _this = this;
                var rst = {};
                for (var key in objProvide) {
                    rst[key] = vue.computed(function () { return _this[key]; });
                }
                return rst;
            };
        }
        var isRegistVH = false;
        if (obj.inject) {
            for (var i = 0; i < obj.inject.length; ++i) {
                cfgData.mapInject[obj.inject[i]] = true;
                isRegistVH = true;
            }
        }
        var objProp = obj.props || (obj.props = {});
        for (var key in objProp) {
            if (objProp[key]._isModel) {
                isRegistVH = true;
                break;
            }
        }
        cfgData.objProp = objProp;
        extend(obj, options);
        vueClassComponent.createDecorator(function (componentOptions, handler) {
            var mixins = componentOptions.mixins || (componentOptions.mixins = []);
            mixins.push({
                data: function () {
                    for (var key in objProp) {
                        this["_"].props[key] = this["_"].props[key] || objProp[key].default;
                    }
                    if (isRegistVH) {
                        this["_"]["_vd_"] = cfgData;
                    }
                    return {};
                }
            });
        })(target.prototype, key);
        var VueComponentHandler = (function (_super) {
            __extends(VueComponentHandler, _super);
            function VueComponentHandler() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, args) || this;
                for (var key in objProp) {
                    objProp[key].default = _this[key];
                }
                return _this;
            }
            return VueComponentHandler;
        }(target));
        VueComponentHandler["__o"] = obj;
        return VueComponentHandler;
    };
}

function Inject() {
    return function (target, key) {
        var obj = target.constructor["__o"] || (target.constructor["__o"] = {});
        var arrInject = obj.inject || (obj.inject = []);
        arrInject.push(key);
    };
}

function Model() {
    return function (target, key) {
        var obj = target.constructor["__o"] || (target.constructor["__o"] = {});
        var objMd = obj.props || (obj.props = {});
        var objEmit = obj.emits || (obj.emits = {});
        var keyFun = "update:" + key;
        objMd[key] = {
            type: [Object, Array, String, Number, Boolean, Function],
            _isModel: true,
            default: undefined
        };
        objEmit[keyFun] = null;
    };
}

function Prop() {
    return function (target, key) {
        var obj = target.constructor["__o"] || (target.constructor["__o"] = {});
        var objProp = obj.props || (obj.props = {});
        objProp[key] = {
            type: [Object, Array, String, Number, Boolean, Function],
            default: undefined
        };
    };
}

function Provide() {
    return function (target, key) {
        var obj = target.constructor["__o"] || (target.constructor["__o"] = {});
        var objProvide = obj.provide || (obj.provide = {});
        objProvide[key] = null;
    };
}

var DEEP = 0x1;
var IMMEDIATE = 0x2;
function Watch(option) {
    return function (target, key, descriptor) {
        var obj = target.constructor["__o"] || (target.constructor["__o"] = {});
        var objWatch = obj.watch || (obj.watch = {});
        var name = "";
        if (typeof (option) == "object") {
            name = option.name || "";
        }
        if (name == "") {
            name = key.substr(0, key.length - "Changed".length);
        }
        var tmp = {};
        if (typeof (option) == "object") {
            for (var key in option) {
                if (key == "name") {
                    continue;
                }
                tmp[key] = option[key];
            }
        }
        else if (typeof (option) == "number") {
            if (option & DEEP) {
                tmp.deep = true;
            }
            if (option & IMMEDIATE) {
                tmp.immediate = true;
            }
        }
        tmp.handler = descriptor.value;
        objWatch[name] = tmp;
    };
}

function State(attrName) {
    function create(target, key) {
        var name = attrName || key;
        name = name.trim();
        var getVal = null;
        var setVal = null;
        var ch = ".";
        if (name.charAt(0) == "[") {
            ch = "";
        }
        getVal = eval("(function() { return this.$store.state" + ch + name + "; })");
        setVal = eval("(function(val) { this.$store.state" + ch + name + "=val; })");
        function initAttr(obj) {
            Object.defineProperty(obj, key, {
                enumerable: true,
                configurable: true,
                get: function () { return getVal.call(obj); },
                set: function (value) { setVal.call(obj, value); },
            });
        }
        vueClassComponent.createDecorator(function (componentOptions, handler) {
            var mixins = componentOptions.mixins || (componentOptions.mixins = []);
            mixins.push({
                data: function () {
                    initAttr(this);
                    return {};
                }
            });
        })(target, key);
    }
    return create;
}

exports.Comp = Comp;
exports.DEEP = DEEP;
exports.IMMEDIATE = IMMEDIATE;
exports.Inject = Inject;
exports.Model = Model;
exports.Prop = Prop;
exports.Provide = Provide;
exports.State = State;
exports.Watch = Watch;
