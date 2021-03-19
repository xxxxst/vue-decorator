
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) xxxxst. All rights reserved.
 *  Licensed under the MIT License
 *--------------------------------------------------------------------------------------------
*/

import { Component, computed } from 'vue';
import { createDecorator, Vue, VueConstructor } from 'vue-class-component';

//class decorator
export default function Comp(comps?: Record<string, Component>) {
	comps = comps || {};

	return (target: VueConstructor<Vue>) => {
		var obj = target["__o"] || (target["__o"] = {});

		// Component
		var objComp = obj.components || (obj.components = {});
		for (var key in comps) {
			objComp[key] = comps[key];
		}
		
		var needProxyComp = false;

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

		// Inject
		var mapInject = {};
		if (obj.inject) {
			needProxyComp = true;
			for (var i = 0; i < obj.inject.length; ++i) {
				mapInject[obj.inject[i]] = true;
			}
		}
		
		// Model
		var objProp = obj.props || (obj.props = {});
		if (!needProxyComp) {
			for (var key in objProp) {
				if (objProp[key]._isModel) {
					needProxyComp = true;
					break;
				}
			}
		}

		createDecorator((componentOptions, handler) => {
			var mixins = componentOptions.mixins || (componentOptions.mixins = []);

			function initModel(obj) {
				var oldProxy = obj["_"].proxy;
				obj["_"].proxy = new Proxy(oldProxy, {
					get: (target2, key2) => {
						// console.info("provide", key2, mapInject);
						if (key2 in mapInject) {
							return target2[key2].value;
						} else {
							return target2[key2];
						}
					},
					set: (target2, key2: any, value) => {
						if (!(key2 in objProp)) {
							target2[key2] = value;
						} else if (objProp[key2]._isModel) {
							target2.$emit("update:" + key2, value);
						} else {
							target2[key2] = value;
						}
						return true;
					},
				});
			}

			mixins.push({
				data: function () {
					// Prop
					for (var key in objProp) {
						// default value
						this["_"].props[key] = this["_"].props[key] || objProp[key].default;
					}
					// init Model
					if (needProxyComp) {
						initModel(this);
					}

					return {};
				}
			});
		})(target.prototype, key);

		return class extends target {
			constructor(...args) {
				super(...args);

				var objProp = obj.props || (obj.props = {});
				for (var key in objProp) {
					objProp[key].default = this[key];
				}
			}
		} as any;
	}
}
