/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', '../packages/ui/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	important: true,
	theme: {
		extend: {
			container: {
				center: true,
				padding: {
					DEFAULT: '1rem',
					xl: '40px',
					'2xl': '128px',
				},
			},
			animation: {
				'spin-slow': 'spin 3s linear infinite',
				'bounce-right': 'bounceRight 1s infinite',
				'bounce-left': 'bounceLeft 1s infinite',
			},
			keyframes: {
				bounceLeft: {
					'0%': { transform: 'translateX(0)' },
					'20%': { transform: 'translateX(0)' },
					'50%': { transform: 'translateX(0)' },
					'80%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(0)' },
					'40%': { transform: 'translateX(10px)' },
					'60%': { transform: 'translateX(5px)' },
				},
				bounceRight: {
					'0%': { transform: 'translateX(0)' },
					'20%': { transform: 'translateX(0)' },
					'50%': { transform: 'translateX(0)' },
					'80%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(0)' },
					'40%': { transform: 'translateX(-10px)' },
					'60%': { transform: 'translateX(-5px)' },
				},
			},
		},
	},
	plugins: [],
};
