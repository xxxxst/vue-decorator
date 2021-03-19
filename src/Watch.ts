
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) xxxxst. All rights reserved.
 *  Licensed under the MIT License
 *--------------------------------------------------------------------------------------------
*/

import { Vue } from 'vue-class-component';

interface WathOption {
	name?: string;
	deep?: boolean;
	immediate?: boolean;
	flush?: "pre" | "post" | "sync";
}

export const DEEP = 0x1;
export const IMMEDIATE = 0x2;

// Function decorator
export default function Watch(option?: WathOption | number) {
	return (target: Vue, key: string, descriptor: any) => {
		var obj = target.constructor["__o"] || (target.constructor["__o"] = {});
		var objWatch = obj.watch || (obj.watch = {});

		// Wath attribute name
		var name = "";
		if (typeof (option) == "object") {
			name = option.name || "";
		}
		if (name == "") {
			name = key.substr(0, key.length - "Changed".length);
		}

		// parse option
		var tmp: any = {};
		if (typeof (option) == "object") {
			// option is WathOption
			for (var key in option) {
				if (key == "name") {
					continue;
				}
				tmp[key] = option[key];
			}
		} else if (typeof (option) == "number") {
			// option is number
			if (option & DEEP) {
				tmp.deep = true;
			}

			if (option & IMMEDIATE) {
				tmp.immediate = true;
			}
		}

		tmp.handler = descriptor.value;
		objWatch[name] = tmp;
	}
}
