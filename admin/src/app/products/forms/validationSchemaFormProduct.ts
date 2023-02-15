import * as yup from 'yup';

export const validationSchemaFormProduct = yup.object({
	title: yup.string().required('Title is required'),
});
