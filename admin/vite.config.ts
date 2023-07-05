import { defineConfig, loadEnv } from "vite";
import { dependencies } from "./package.json";
import react from "@vitejs/plugin-react-swc";
import checker from "vite-plugin-checker";
import path from "path";
import dotenv from "dotenv";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import Unfonts from "unplugin-fonts";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const topEnvFileLocation = path.join(__dirname, "..", ".env");

dotenv.config({ path: topEnvFileLocation });

const manifestForPlugin: Partial<VitePWAOptions> = {
	registerType: "prompt",
	includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
	manifest: {
		name: "Teslo's Shop",
		short_name: "Teslo",
		description: "Tienda de respuestos SPA",
		icons: [
			{
				src: "/AppImages/android/android-launchericon-192-192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/AppImages/android/android-launchericon-512-512.png",
				sizes: "512x512",
				type: "image/png",
			},
			{
				src: "/AppImages/ios/180.png",
				sizes: "180x180",
				type: "image/png",
				purpose: "apple touch icon",
			},
			{
				src: "/AppImages/windows11/Square44x44Logo.altform-unplated_targetsize-256.png",
				sizes: "256x256",
				type: "image/png",
				purpose: "any maskable",
			},
		],
		theme_color: "#171717",
		background_color: "#e8ebf2",
		display: "standalone",
		scope: "/",
		start_url: "/",
		orientation: "portrait",
	},
};

const externalPackages = ["@teslo/interfaces", "@teslo/services", "@teslo/react-ui"];

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
				requireReturnsDefault: "auto", // <---- this solves default issue
			}),
			Unfonts.vite({
				custom: {
					families: [
						{
							name: "Poppins",
							local: "Poppins",
							src: "./src/styles/fonts/Poppins/*.ttf",
						},
					],
					display: "auto",
					preload: true,
					prefetch: false,
					injectTo: "head-prepend",
				},
			}),
			VitePWA(manifestForPlugin),
		],
		resolve: {
			alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
		},
		optimizeDeps: {
			include: [...externalPackages],
		},
		build: {
			commonjsOptions: {
				include: [...externalPackages],
			},
			rollupOptions: {
				output: {
					manualChunks: {
						vendor: ["react", "react-router-dom", "react-dom"],
						...renderChunks(dependencies),
					},
				},
			},
		},
	});
};

function renderChunks(deps: Record<string, string>) {
	let chunks = {};
	Object.keys(deps).forEach(key => {
		if (["react", "react-router-dom", "react-dom"].includes(key)) return;
		chunks[key] = [key];
	});
	return chunks;
}
