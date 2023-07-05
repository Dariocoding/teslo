import { useConfigEnterpriseStore } from "@/store";
import * as React from "react";
import { toast } from "react-hot-toast";
import { Form, Formik, FormikHelpers, useFormikContext } from "formik";
import FormUserNewOrder from "../FormUser";
import FormProducts from "../FormProducts";
import {
	DetailOrderTemp,
	OrderDto,
	PaymentMethod,
	Product,
	Size,
	StatusOrder,
	User,
} from "@teslo/interfaces";
import Loader, { hideLoader, showLoader } from "@/components/ui/Loader";
import StatusOrderOverForm from "./StatusOrderOverForm";
import { useInitFormContainer } from "./useInitFormContainer";
import { ordersService } from "@teslo/services";
import ReferenceOverForm from "./ReferenceOverForm";
import { useIntl } from "react-intl";

export interface IFormContainerOrderProps {
	tempProducts?: DetailOrderTemp[];
}

interface TempProduct extends Partial<Product> {}

export interface NewOrderValues {
	user: User;
	tempProduct: TempProduct;
	searchProduct: string;
	tempQty: number;
	tempSize: Size;
	products: DetailOrderTemp[];
	paymentMethod: PaymentMethod;
	status: StatusOrder;
	tempReference: string;
}

const onKeyDown: React.KeyboardEventHandler<HTMLFormElement> = keyEvent => {
	if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
		keyEvent.preventDefault();
	}
};

const FormContainerOrder: React.FunctionComponent<IFormContainerOrderProps> = props => {
	const {} = props;
	const { formatMessage: t } = useIntl();
	const { configEnterprise } = useConfigEnterpriseStore();
	const { initialValues, loading, paymentMethods } = useInitFormContainer(props);

	if (loading) return <Loader loading />;

	const onSubmit = async (values: NewOrderValues, actions: FormikHelpers<NewOrderValues>) => {
		try {
			if (!values.user.iduser) {
				toast.error(t({ id: "orders.error.customer.required" }));
				return;
			}

			if (!values.products?.length) {
				toast.error(t({ id: "orders.error.products.required" }));
				return;
			}
			showLoader();
			const subtotal = values.products.reduce((prev: number, curr: DetailOrderTemp) => {
				return prev + curr.product.price * curr.qty;
			}, 0);
			const IVA = ((subtotal * configEnterprise.iva) / 100).toFixed(2);
			const total = subtotal + parseFloat(IVA);
			const order: OrderDto = {
				iva: configEnterprise.iva,
				//@ts-ignore
				customer: values.user,
				status: values.status,
				paymentMethod: values.paymentMethod,
				reference: values.tempReference,
				detail: values.products.map(p => ({
					quantity: p.qty,
					product: p.product,
					total: p.product.price,
				})),
				total,
				subtotal,
			};

			const req = await ordersService.createOrderBySeller(order);
			toast.success("Order created successfully!!");
			actions.resetForm();
			actions.setFieldValue("products", []);
		} catch (error) {
			console.log(error);
		} finally {
			hideLoader();
		}
	};

	return (
		<Formik onSubmit={onSubmit} initialValues={initialValues}>
			<Form className="p-4 relative h-full" onKeyDown={onKeyDown}>
				<div className="flex items-start justify-center gap-4">
					<div className="w-full">
						<div>
							<FormUserNewOrder classNameContainer="max-w-[1100px] w-full mx-auto" />
						</div>

						<div>
							<FormProducts
								classNameContainer="max-w-[1200px] w-full mx-auto"
								paymentMethods={paymentMethods}
							/>
						</div>
					</div>
				</div>
				<StatusOrderOverForm />
				<ReferenceOverForm />
			</Form>
		</Formik>
	);
};

export default FormContainerOrder;

export const useOrdersFormContext = () => useFormikContext<NewOrderValues>();
