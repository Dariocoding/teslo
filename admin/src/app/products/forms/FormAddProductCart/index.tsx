import ButtonFormik from '@/components/@forms/ButtonFormik';
import InputFormik from '@/components/@forms/InputFormik';
import SelectFormik from '@/components/@forms/SelectFormik';
import { useNotificationAddToCart } from '@/components/ui/NotificationAddToCart/useNotificationAddToCart';
import { useCartStore } from '@/store';
import { PF, capitalize } from '@/utils';
import { Product } from '@teslo/interfaces';
import RenderIf from '@teslo/react-ui/RenderIf';
import { Form, Formik, FormikHelpers } from 'formik';
import * as React from 'react';

interface IFormAddProductCartProps {
	product: Product;
	onSuccess?: () => void;
}

const FormAddProductCart: React.FunctionComponent<IFormAddProductCartProps> = props => {
	const { product, onSuccess } = props;
	const notifyAddToCart = useNotificationAddToCart();

	const INITIAL_VALUES = {
		qty: 1,
		size: product.sizes?.length ? product.sizes[0] : null,
	};

	const onSubmit = (
		values: typeof INITIAL_VALUES,
		actions: FormikHelpers<typeof INITIAL_VALUES>
	) => {
		notifyAddToCart(product, {
			qty: values.qty,
			image: PF + '/product/' + product.images[0],
			size: values.size,
		});
		onSuccess?.();
		actions.setSubmitting(false);
	};

	return (
		<Formik onSubmit={onSubmit} initialValues={INITIAL_VALUES}>
			<Form>
				<InputFormik
					name="qty"
					label="Qty"
					type="number"
					decimalValues={false}
				/>

				<RenderIf isTrue={product.sizes?.length}>
					<SelectFormik
						name="size"
						label="Size"
						options={product.sizes.map(item => ({
							value: item,
							label: capitalize(item),
						}))}
					/>
				</RenderIf>

				<ButtonFormik className="btn-primary w-full btn-sm mb-0">
					Add to cart
				</ButtonFormik>
			</Form>
		</Formik>
	);
};

export default FormAddProductCart;
