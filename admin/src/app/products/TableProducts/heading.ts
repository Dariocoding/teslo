import { HeaderDataTable } from '@teslo/react-ui/DataTable';

const defaultHeadingProducts: HeaderDataTable[] = [
	{ title: 'Image', field: 'image', center: true },
	{ title: 'Name', field: 'titleFormatted' },
	{ title: 'Gender', field: 'gender', center: true },
	{ title: 'Sizes', field: 'sizesFormatted', center: true },
	{ title: 'Price', field: 'priceFormatted', center: true },
	{ title: 'Stock', field: 'stock', center: true },
	{ title: 'Categories', field: 'categoriesFormatted', center: true },
	{ title: 'Brand', field: 'brand.title', center: true },
	{ title: 'Providers', field: 'providersFormatted', center: true },
	{ title: 'Status', field: 'status', center: true },
	{ title: 'Date Created', field: 'dateFormatted', center: true },
	{ title: 'Actions', field: 'actions', center: true },
];

export default defaultHeadingProducts;
