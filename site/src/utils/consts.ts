export const envs = {
	API_URL: process.env.API_URL,
};

export const PF = {
	product: (img: string) => envs.API_URL + 'files/product/' + img,
};

export const INITIAL_VALUES_PRODUCT_HOME = 8;
export const viewPaths = {
	viewProduct: (slug: string) => '/product/' + slug,
	cart: '/cart',
	login: '/auth/login',
	signup: '/auth/signup',
	home: '/',
	account: '/account',
	savelist: '/account-savelist',
};

export const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});

export const breakpoints = {
	mobile: 0,
	sm: 640,
	md: 748,
	lg: 1024,
	xl: 1280,
	'2xl': 1536,
};
