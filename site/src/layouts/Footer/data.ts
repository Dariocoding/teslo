export interface CustomLink {
	label: string;
	href: string;
	targetBlank?: boolean;
}

export interface WidgetFooterMenu {
	id: string;
	title: string;
	menus: CustomLink[];
}

export const widgetMenus: WidgetFooterMenu[] = [
	{
		id: '5',
		title: 'Getting started',
		menus: [
			{ href: '#', label: 'Release Notes' },
			{ href: '#', label: 'Upgrade Guide' },
			{ href: '#', label: 'Browser Support' },
			{ href: '#', label: 'Dark Mode' },
		],
	},
	{
		id: '1',
		title: 'Explore',
		menus: [
			{ href: '#', label: 'Prototyping' },
			{ href: '#', label: 'Design systems' },
			{ href: '#', label: 'Pricing' },
			{ href: '#', label: 'Security' },
		],
	},
	{
		id: '2',
		title: 'Resources',
		menus: [
			{ href: '#', label: 'Best practices' },
			{ href: '#', label: 'Support' },
			{ href: '#', label: 'Developers' },
			{ href: '#', label: 'Learn design' },
		],
	},
	{
		id: '4',
		title: 'Community',
		menus: [
			{ href: '#', label: 'Discussion Forums' },
			{ href: '#', label: 'Code of Conduct' },
			{ href: '#', label: 'Contributing' },
			{ href: '#', label: 'API Reference' },
		],
	},
];
