
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) xxxxst. All rights reserved.
 *  Licensed under the MIT License
 *--------------------------------------------------------------------------------------------
*/

import { Vue } from 'vue-class-component';

//attribute decorator
export default function Prop() {
	return (target: Vue, key: string) => {
		var obj = target.constructor["__o"] || (target.constructor["__o"] = {});
		var objProp = obj.props || (obj.props = {});
		
		objProp[key] = {
			type: [Object, Array, String, Number, Boolean, Function],
			default: undefined
		};
	}
}
