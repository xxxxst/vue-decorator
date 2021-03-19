
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) xxxxst. All rights reserved.
 *  Licensed under the MIT License
 *--------------------------------------------------------------------------------------------
*/

import { Vue } from 'vue-class-component';

//attribute decorator
export default function Model() {
	return (target: Vue, key: string) => {
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
	}
}
