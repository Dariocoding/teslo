import ButtonFormik from "@/components/@forms/ButtonFormik";
import InputFormik from "@/components/@forms/InputFormik";
import { translate } from "@/i18n";
import { Product, ProductDto } from "@teslo/interfaces";
import { productsService } from "@teslo/services";
import { Form, Formik } from "formik";
import * as React from "react";
import { toast } from "react-hot-toast";
import { useIntl } from "react-intl";
import * as yup from "yup";

interface IFormQuickEditProductProps {
	product: Product;
	onSuccess?: (product: Product) => void;
}

const FormQuickEditProduct: React.FunctionComponent<IFormQuickEditProductProps> = props => {
	const { product, onSuccess } = props;
	const { formatMessage: t } = useIntl();

	const INITIAL_VALUES: ProductDto = {
		title: product.title,
		price: product.price,
		stock: 0,
	};

	const onSubmit = async (values: ProductDto) => {
		try {
			const stock = product.stock + values.stock;
			const req = await productsService.updateProduct(product.id, {
				title: values.title,
				stock,
				price: values.price,
			});
			onSuccess?.(req.data);
			toast.success(t({ id: "products.edit.success" }));
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message || error.message);
		}
	};

	const validationSchema = yup.object({
		title: yup.string().required(translate("products.error.name.required")),
	});

	return (
		<Formik<ProductDto>
			initialValues={INITIAL_VALUES}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{formikState => (
				<Form>
					<InputFormik
						label={translate("products.label.name")}
						name={"title"}
						required
						placeholder={translate("products.placeholder.name")}
					/>

					<InputFormik
						type={"number"}
						label={translate("products.label.price")}
						name={"price"}
						required
						placeholder={translate("products.placeholder.price")}
					/>

					<InputFormik
						type={"number"}
						label={translate("products.label.stock")}
						name={"stock"}
						required
						placeholder={translate("products.placeholder.stock")}
						decimalValues={false}
					/>

					<div className="form-group">
						<span>
							<span className="font-bold text-sm">Total stock:</span>{" "}
							<span className="text-xs">
								{product.stock + (formikState.values.stock || 0)}
							</span>
						</span>
					</div>

					<ButtonFormik className="btn-primary btn-sm mb-0 mr-0" full>
						{translate("app.save")}
					</ButtonFormik>
				</Form>
			)}
		</Formik>
	);
};

export default FormQuickEditProduct;
