
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) xxxxst. All rights reserved.
 *  Licensed under the MIT License
 *--------------------------------------------------------------------------------------------
*/

import { Component, computed, ComponentOptions } from 'vue';
import { createDecorator, Vue, VueConstructor } from 'vue-class-component';

function mix(obj, ...args) {
	for (var i = 0; i < args.length; ++i) {
		for (var key in args[i]) {
			var argTmp = args[i][key];

			if (typeof (argTmp) != "object" || argTmp == null) {
				obj[key] = argTmp;
				continue;
			}

			if (!obj[key] || typeof (obj[key]) != "object" || obj[key] == null) {
				obj[key] = argTmp;
				continue;
			}

			if ((obj[key] instanceof Array) && (argTmp instanceof Array)) {
				for (var j = 0; j < argTmp.length; ++j) {
					obj[key].push(argTmp[j]);
				}
				continue;
			}

			mix(obj[key], argTmp);
		}
	}
}

//class decorator
export default function Comp(comps?: Record<string, Component>, options?: ComponentOptions) {
	comps = comps || {};

	return (target: VueConstructor<Vue>) => {
		var obj = target["__o"] || (target["__o"] = {});

		// Component
		var objComp = obj.components || (obj.components = {});
		for (var key in comps) {
			objComp[key] = comps[key];
		}

		var cfgData = {
			mapInject: {},
			objProp: {},
		};

		// Provide
		if (obj.provide) {
			var objProvide = obj.provide;
			obj.provide = function () {
				var rst = {};
				for (var key in objProvide) {
					rst[key] = computed(() => this[key]);
				}
				return rst;
			}
		}

		var isRegistVH = false;
		// Inject
		if (obj.inject) {
			for (var i = 0; i < obj.inject.length; ++i) {
				cfgData.mapInject[obj.inject[i]] = true;
				isRegistVH = true;
			}
		}

		// Model
		var objProp = obj.props || (obj.props = {});
		for (var key in objProp) {
			if (objProp[key]._isModel) {
				isRegistVH = true;
				break;
			}
		}
		cfgData.objProp = objProp;

		for (var key in options) {
			
			if (typeof (options[key]) != "object" || options[key] == null) {
				obj[key] = options[key];
				continue;
			}

			if (!obj[key] || typeof (obj[key]) != "object" || obj[key] == null) {
				obj[key] = options[key];
				continue;
			}
			
			if ((key == "emits") && (options.emits instanceof Array)) {
				for(var i = 0 ;i < options.emits.length; ++i) {
					var it = options.emits[i];
					obj.emits[it] = null;
				}
				continue;
			}

			if ((obj[key] instanceof Array) && (options[key] instanceof Array)) {
				for (var i = 0; i < options[key].length; ++i) {
					obj[key].push(options[key][i]);
				}
				continue;
			}

			mix(obj[key], options[key]);
		}
		// mix(obj, options);

		createDecorator((componentOptions, handler) => {
			var mixins = componentOptions.mixins || (componentOptions.mixins = []);

			mixins.push({
				data: function () {
					// Prop
					for (var key in objProp) {
						// default value
						this["_"].props[key] = this["_"].props[key] || objProp[key].default;
					}
					if (isRegistVH) {
						this["_"]["_vd_"] = cfgData;
					}

					return {};
				}
			});
		})(target.prototype, key);

		class VueComponentHandler extends target {
			constructor(...args) {
				super(...args);

				// var objProp = obj.props || (obj.props = {});
				for (var key in objProp) {
					objProp[key].default = this[key];
				}
			}
		};

		delete target["__o"];
		VueComponentHandler["__o"] = obj;

		return VueComponentHandler as any;
	}
}
