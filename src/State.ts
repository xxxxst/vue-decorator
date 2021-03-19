
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) xxxxst. All rights reserved.
 *  Licensed under the MIT License
 *--------------------------------------------------------------------------------------------
*/

import { createDecorator, Vue } from 'vue-class-component';

//attribute decorator
export default function State(attrName?: string) {
	function create(target: Vue, key: string) {
		var name: string = attrName || key;
		name = name.trim();

		var getVal = null;
		var setVal = null;

		var ch = ".";
		if (name.charAt(0) == "[") {
			ch = "";
		}
		
		/* eslint-disable */
		getVal = eval(`(function() { return this.$store.state${ch}${name}; })`);
		setVal = eval(`(function(val) { this.$store.state${ch}${name}=val; })`);
		/* eslint-disable */

		function initAttr(obj) {
			Object.defineProperty(obj, key, {
				enumerable: true,
				configurable: true,
				get: () => { return getVal.call(obj); },
				set: (value: any) => { setVal.call(obj, value); },
			});
		}

		createDecorator((componentOptions, handler) => {
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
