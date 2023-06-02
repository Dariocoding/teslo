import InputFormik from '@/components/@forms/InputFormik';
import { Form, Formik, FormikHelpers } from 'formik';
import * as React from 'react';
import UploadImagesProduct from './UploadImagesProduct';
import TextareaFormik from '@/components/@forms/TextareaFormik';
import SizesProduct from './SizesProduct';
import GenderProduct from './GenderProduct';
import CategoriesProduct from './CategoriesProduct';
import FormStatusProduct from './StatusProduct';
import ButtonFormik from '@/components/@forms/ButtonFormik';
import { Brand, Category, Product, ProductDto, Provider } from '@teslo/interfaces';
import { filesService, productsService } from '@teslo/services';
import toast from 'react-hot-toast';
import { compressImages } from '@/utils/compress.images';
import * as yup from 'yup';
import RenderIf from '@teslo/react-ui/RenderIf';
import ProvidersSelect from './ProvidersSelect';
import BrandsSelect from './BrandsSelect';

interface IFormProductProps {
	onSuccess?(product: Product, actions: FormikHelpers<ProductDto>): void;
	categories: Category[];
	brands: Brand[];
	providers: Provider[];
	product?: Product;
}

const validationSchemaFormProduct = yup.object({
	title: yup.string().required('Title is required'),
});

const FormProduct: React.FunctionComponent<IFormProductProps> = props => {
	const { onSuccess, categories, product: productToUpdate, brands, providers } = props;
	const status = productToUpdate ? 'update' : 'create';

	const initialValues: ProductDto = {
		title: productToUpdate?.title || '',
		//@ts-ignore
		images: productToUpdate?.images || ([] as File[]),
		sizes: productToUpdate?.sizes || [],
		stock: productToUpdate?.stock || 0,
		gender: productToUpdate?.gender || '',
		description: productToUpdate?.description || '',
		price: productToUpdate?.price || 0,
		categories: productToUpdate?.categories?.length
			? productToUpdate.categories.map(category => category.idcategory)
			: [],
		status: productToUpdate?.status || '',
		brand: productToUpdate?.brand?.idbrand || brands[0].idbrand || null,
		providers: productToUpdate?.providers?.length
			? productToUpdate.providers.map(provider => provider.idprovider)
			: [],
	};

	async function onSubmit(values: ProductDto, actions: FormikHelpers<ProductDto>) {
		const { images, ...productDto } = { ...values };
		//@ts-ignore
		const newImages: File[] = images.filter(image => typeof image !== 'string');
		//@ts-ignore
		const imagesAlreadyUploaded = images.filter(image => typeof image === 'string');
		let product: Product;
		productDto.categories = categories.filter(c =>
			productDto.categories.includes(c.idcategory)
		);
		productDto.brand = brands.find(c => c.idbrand === productDto.brand);
		productDto.providers = providers.filter(p =>
			//@ts-ignore
			productDto.providers.includes(p.idprovider)
		);

		try {
			if (status === 'create') {
				const req = await productsService.createProduct(productDto);
				product = req.data;
			} else if (status === 'update') {
				const req = await productsService.updateProduct(
					productToUpdate.id,
					{ ...productDto, images: imagesAlreadyUploaded }
				);
				product = req.data;
			}
		} catch (error) {
			console.log(error);
			toast.error(
				error.response.data.message ||
					`Error ${
						status === 'create' ? 'creating' : 'updating'
					} product`
			);
			return;
		}

		try {
			if (images.length > 0 && status === 'create') {
				const imagesCompressed = await compressImages(images as File[]);
				const promisesImagesUpload = imagesCompressed.map(async image => {
					const formData = new FormData();
					formData.append('file', image, image.name);
					const res = await filesService.uploadFileProduct(formData);
					return res.data.secureUrl;
				});

				const imagesUploaded = await Promise.all(promisesImagesUpload);

				const req = await productsService.updateProduct(product.id, {
					images: [
						...imagesUploaded,
						//@ts-ignore
						...images.filter(
							image => typeof image === 'string'
						),
					],
				});
				product = req.data;
			}

			if (newImages.length > 0 && status === 'update') {
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

			onSuccess?.(product, actions);
			toast.success(
				`Product ${
					status === 'create' ? 'created' : 'updated'
				} successfully`
			);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchemaFormProduct}
			enableReinitialize
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
							rows={3}
						/>

						<SizesProduct defaultOpen />

						<GenderProduct />

						<FormStatusProduct />

						<CategoriesProduct categories={categories} />
						<BrandsSelect brands={brands} />
						<ProvidersSelect providers={providers} />
					</div>
				</div>

				<ButtonFormik className="btn btn-primary btn-sm mt-6" full>
					<RenderIf isTrue={status === 'create'}>
						Create Product
					</RenderIf>
					<RenderIf isTrue={status === 'update'}>
						Update Product
					</RenderIf>
				</ButtonFormik>
			</Form>
		</Formik>
	);
};

export default FormProduct;
