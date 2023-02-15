import * as yup from 'yup';

export const validationSchemaCreateUserDto = yup.object({
	firstName: yup.string().required('First Name is required.'),
	lastName: yup.string().required('Last Name is requred.'),
	email: yup.string().required('Email is required.').email('Email not Valid.'),
	password: yup
		.string()
		.required('Password is required.')
		.min(5, 'Password should be at least 5 characters'),
});

export const validationSchemaUpdateUserDto = yup.object({
	firstName: yup.string().required('First Name is required.'),
	lastName: yup.string().required('Last Name is requred.'),
	email: yup.string().required('Email is required.').email('Email not Valid.'),
	password: yup.string().min(6, 'Password should be at least 6 characters'),
});
