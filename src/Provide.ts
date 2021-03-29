
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) xxxxst. All rights reserved.
 *  Licensed under the MIT License
 *--------------------------------------------------------------------------------------------
*/

import type { Vue } from 'vue-class-component';

//attribute decorator
export default function Provide() {
	return (target: Vue, key: string) => {
		var obj = target.constructor["__o"] || (target.constructor["__o"] = {});
		var objProvide = obj.provide || (obj.provide = {});
		
		objProvide[key] = null;
	}
}
