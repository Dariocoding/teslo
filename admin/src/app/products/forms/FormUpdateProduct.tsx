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
import TagsProduct from './TagsProduct';
import UploadImagesProduct from './UploadImagesProduct';
import { validationSchemaFormProduct } from './validationSchemaFormProduct';

interface IFormUpudateProductProps {
	onSuccess?(product: Product): void;
	categories: Category[];
	product: Product;
}

const FormUpudateProduct: React.FunctionComponent<IFormUpudateProductProps> = props => {
	const { onSuccess, categories, product } = props;

	const initialValues: ProductDto = {
		tags: product.tags,
		title: product.title,
		//@ts-ignore
		images: product.images as File[],
		sizes: product.sizes,
		stock: product.stock,
		gender: product.gender,
		description: product.description,
		price: product.price,
		category: product.category.idcategory,
	};

	async function onSubmit(values: ProductDto) {
		const { images, ...productDto } = { ...values };
		//@ts-ignore
		const imagesAlreadyUploaded = images.filter(image => typeof image === 'string');
		let product: Product;
		productDto.category = categories.find(c => c.idcategory === productDto.category);

		try {
			const req = await productsService.updateProduct(props.product.id, {
				...productDto,
				images: imagesAlreadyUploaded,
			});
			product = req.data;
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message || 'Error creating product');
			return;
		}

		try {
			//@ts-ignore
			const newImages: File[] = images.filter(image => typeof image !== 'string');
			if (newImages.length > 0) {
				const newImagesCompressed = await compressImages(newImages);
				const promisesImagesUpload = newImagesCompressed.map(
					async image => {
						const formData = new FormData();
						formData.append('file', image, image.name);
						const res = await filesService.uploadFileProduct(
							formData
						);
						return res.data.secureUrl;
					}
				);

				const imagesProduct = [
					...(await Promise.all([...promisesImagesUpload])),
					...imagesAlreadyUploaded,
				];

				const req = await productsService.updateProduct(product.id, {
					images: imagesProduct,
				});
				product = req.data;
			}
			onSuccess?.(product);
			toast.success('Product updated successfully');
		} catch (error) {
			console.log(error);
		}
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

						<SizesProduct />

						<GenderProduct />

						<TagsProduct />

						<CategoriesProduct categories={categories} />
					</div>
				</div>
				<ButtonFormik className="btn btn-primary btn-sm mt-6" full>
					Update Product
				</ButtonFormik>
			</Form>
		</Formik>
	);
};

export default FormUpudateProduct;
