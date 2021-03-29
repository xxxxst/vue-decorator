
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) xxxxst. All rights reserved.
 *  Licensed under the MIT License
 *--------------------------------------------------------------------------------------------
*/

import type { Vue } from 'vue-class-component';

//attribute decorator
export default function Inject() {
	return (target: Vue, key: string) => {
		var obj = target.constructor["__o"] || (target.constructor["__o"] = {});
		var arrInject = obj.inject || (obj.inject = []);
		
		arrInject.push(key);
	}
}
