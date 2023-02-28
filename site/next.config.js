require('dotenv').config({ path: '../.env' });

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},

	env: {
		API_URL: process.env.API_URL,
	},
};

module.exports = nextConfig;
