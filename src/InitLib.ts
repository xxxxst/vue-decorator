
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) xxxxst. All rights reserved.
 *  Licensed under the MIT License
 *--------------------------------------------------------------------------------------------
*/

// @ts-ignore
import { RuntimeHook } from 'vue';

// get hook
RuntimeHook.getPublicInstanceProxyHandlers.push(function (instance, key: any) {
	var ctx = instance;
	var rst = {
		handler: false,
		data: null,
	}

	if (!ctx["_vd_"]) {
		return rst;
	}

	if (key in ctx["_vd_"].mapInject) {
		rst.handler = true;
		rst.data = ctx[key].value;
	}

	return rst;
});

// set hook
RuntimeHook.setPublicInstanceProxyHandlers.push(function (instance, key: any, val: any) {
	var ctx = instance;
	var rst = {
		handler: false,
		success: true,
	}

	if (!ctx["_vd_"]) {
		return rst;
	}

	rst.handler = true;
	rst.success = true;

	if ((key in ctx["_vd_"].objProp) && ctx["_vd_"].objProp[key]._isModel) {
		instance.emit("update:" + key, val);
	} else {
		rst.handler = false;
		rst.success = false;
	}

	return rst;
});
