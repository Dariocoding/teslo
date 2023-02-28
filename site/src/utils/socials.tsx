import { FaYoutube, FaFacebook, FaTelegram, FaTwitter, FaGoogle } from 'react-icons/fa';

export interface SocialType {
	name: string;
	icon: React.ReactNode;
	href: string;
}

export const socials: SocialType[] = [
	{ name: 'Facebook', icon: <FaFacebook />, href: '#' },
	{ name: 'Youtube', icon: <FaYoutube />, href: '#' },
	{ name: 'Telegram', icon: <FaTelegram />, href: '#' },
	{ name: 'Twitter', icon: <FaTwitter />, href: '#' },
];

export interface LoginSocial {
	name: string;
	href: string | React.ReactNode;
	icon: string;
	className: string;
}

export const loginSocials: LoginSocial[] = [
	{
		name: 'Continue with Facebook',
		href: <FaFacebook className="flex-shrink-0" />,
		icon: '/images/Facebook.svg',
		className: 'btn-primary',
	},
	{
		name: 'Continue with Twitter',
		href: '#',
		icon: '/images/Twitter.svg',
		className: 'btn-warning',
	},
	{
		name: 'Continue with Google',
		href: <FaGoogle className="flex-shrink-0" />,
		icon: '/images/Google.svg',
		className: 'btn-danger',
	},
];
