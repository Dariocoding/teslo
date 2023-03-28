import ButtonFormik from '@/components/@forms/ButtonFormik';
import InputFormik from '@/components/@forms/InputFormik';
import TextareaFormik from '@/components/@forms/TextareaFormik';
import { compressImages } from '@/utils/compress.images';
import { File } from '@/utils/extends';
import { Category, Product, ProductDto } from '@teslo/interfaces';
import { filesService, productsService } from '@teslo/services';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { toast } from 'react-toastify';
import CategoriesProduct from './CategoriesProduct';
import GenderProduct from './GenderProduct';
import SizesProduct from './SizesProduct';
import FormStatusProduct from './StatusProduct';
import UploadImagesProduct from './UploadImagesProduct';
import { validationSchemaFormProduct } from './validationSchemaFormProduct';

interface IFormCreateProductProps {
	onSuccess?(product: Product): void;
	categories: Category[];
}

const FormCreateProduct: React.FunctionComponent<IFormCreateProductProps> = props => {
	const { onSuccess, categories } = props;

	const initialValues: ProductDto = {
		title: '',
		//@ts-ignore
		images: [] as File[],
		sizes: ['L'],
		stock: 0,
		gender: 'men',
		description: '',
		price: 0,
		category: categories[0].idcategory,
		status: null,
	};

	async function onSubmit(values: ProductDto) {
		const { images, ...productDto } = { ...values };
		let product: Product;

		productDto.category = categories.find(c => c.idcategory === productDto.category);

		try {
			const req = await productsService.createProduct(productDto);
			product = req.data;
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message || 'Error creating product');
			return;
		}

		try {
			if (images.length > 0) {
				const imagesCompressed = await compressImages(images as File[]);
				const promisesImagesUpload = imagesCompressed.map(async image => {
					const formData = new FormData();
					formData.append('file', image, image.name);
					const res = await filesService.uploadFileProduct(formData);
					return res.data.secureUrl;
				});

				const imagesUploaded = await Promise.all(promisesImagesUpload);

				const req = await productsService.updateProduct(product.id, {
					images: imagesUploaded,
				});
				product = req.data;
			}

			onSuccess?.(product);
			toast.success('Product created successfully');
		} catch (error) {}
	}

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchemaFormProduct}
		>
			<Form>
				<div className="grid lg:grid-cols-2 gap-4 lg:gap-8">
					<div>
						<InputFormik
							label={'Name'}
							name={'title'}
							required
							placeholder="Type the name of the product"
						/>

						<InputFormik
							type={'number'}
							label={'Price'}
							name={'price'}
							required
							placeholder="Type the price of the product"
						/>

						<InputFormik
							type={'number'}
							label={'Stock'}
							name={'stock'}
							required
							placeholder="Type the stock of the product"
							decimalValues={false}
						/>

						<UploadImagesProduct />
					</div>
					<div>
						<TextareaFormik
							name="description"
							placeholder="Type a description of the product"
							label={'Description'}
						/>

						<SizesProduct defaultOpen />

						<GenderProduct />

						<CategoriesProduct categories={categories} />

						<FormStatusProduct />
					</div>
				</div>

				<ButtonFormik className="btn btn-primary btn-sm mt-6" full>
					Create Product
				</ButtonFormik>
			</Form>
		</Formik>
	);
};

export default FormCreateProduct;
