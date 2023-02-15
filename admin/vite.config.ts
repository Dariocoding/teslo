import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import path from 'path';
import dotenv from 'dotenv';

const topEnvFileLocation = path.join(__dirname, '..', '.env');

dotenv.config({ path: topEnvFileLocation });

// https://vitejs.dev/config/
export default ({ mode }) => {
	process.env = {
		...process.env,
		...loadEnv(mode, topEnvFileLocation),
	};

	return defineConfig({
		plugins: [react(), checker({ typescript: true })],
		resolve: {
			alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
		},
		optimizeDeps: {
			include: ['@teslo/interfaces', '@teslo/services', '@teslo/react-ui'],
		},
		build: {
			commonjsOptions: {
				include: [
					'@teslo/interfaces',
					'@teslo/services',
					'@teslo/react-ui',
				],
			},
		},
	});
};
