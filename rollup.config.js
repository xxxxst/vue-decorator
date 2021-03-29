
import typescript from 'rollup-plugin-typescript2';
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { cleandir  } from 'rollup-plugin-cleandir';
import { nodeResolve } from '@rollup/plugin-node-resolve';
// import css from "rollup-plugin-import-css";
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import dts from "rollup-plugin-dts";

var isCreateDts = process.env.CREATE_DTS==1;

var outputSource = [
	{ file: "dist/vue-decorator.cjs.js", format: "cjs" },
	// { file: "dist/vue-decorator.esm.js", format: "esm", sourcemap: true, plugins: [terser({ format: { comments: false } })] },
	{ file: "dist/vue-decorator.esm.js", format: "esm", sourcemap: true },
];
var outputDts = [
	{ file: "dist/vue-decorator.d.ts", format: "es" },
];

var config = {
	input: 'src/index.ts',
	context: "window",
	moduleContext: "window",
	output: isCreateDts ? outputDts : outputSource,
	plugins: [
		peerDepsExternal({
            includeDependencies: true,
        }),
		isCreateDts ? undefined : cleandir('./dist/'),
		json(),
		typescript(),
		// css(),
		commonjs(),
		nodeResolve({
			browser: true,
			extensions: ['.js', '.ts'],
			modulesOnly: false,
			preferredBuiltins: false
		}),
		isCreateDts ? dts() : undefined,
	]
};

export default config;
