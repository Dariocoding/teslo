import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import path from 'path';
import dotenv from 'dotenv';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';

const topEnvFileLocation = path.join(__dirname, '..', '.env');

dotenv.config({ path: topEnvFileLocation });

const externalPackages = ['@teslo/interfaces', '@teslo/services', '@teslo/react-ui'];

// https://vitejs.dev/config/
export default ({ mode }) => {
	process.env = {
		...process.env,
		...loadEnv(mode, topEnvFileLocation),
	};

	return defineConfig({
		plugins: [
			react(),
			checker({ typescript: true }),

			//@ts-ignore
			replace({ preventAssignment: true }),
			//@ts-ignore
			commonjs({
				include: [/node_modules/, /packages/],
				requireReturnsDefault: 'auto', // <---- this solves default issue
			}),
		],
		resolve: {
			alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
		},
		optimizeDeps: {
			include: [...externalPackages],
		},
		build: {
			commonjsOptions: {
				include: [...externalPackages],
			},
		},
	});
};
