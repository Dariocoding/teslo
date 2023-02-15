import DataTable, { HeaderDataTable } from '@teslo/react-ui/DataTable';
import RenderIf from '@teslo/react-ui/RenderIf';
import { PaymentMethod } from '@teslo/interfaces';
import { paymentMethodService } from '@teslo/services';
import classNames from 'classnames';
import * as React from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import FormPaymentMethod from '../Forms/FormPaymentMethod';
import { useFetchPaymentMethods } from '../hooks/useFetchPaymentMethods';
import defaultHeadingPaymentMethods from './heading';
import mapPaymentMethods from './mapPaymentMethods';
import { TablePlaceholder } from '@/components/placeholders';

interface ITablePaymentMethodsProps {
	heading?: HeaderDataTable[];
	setSelected: React.Dispatch<number>;
}

const ModalDeletePaymentMethod = React.lazy(() => import('./ModalDeletePaymentMethod'));

const TablePaymentMethods: React.FunctionComponent<ITablePaymentMethodsProps> = props => {
	const { heading, setSelected } = props;
	const [stateForm, setStateForm] = React.useState<'create' | 'update'>('create');
	const [tempPaymentMethod, setTempPaymentMethod] = React.useState<PaymentMethod>(null);
	const [showDeletePaymentMethod, setShowDeletePaymentMethod] = React.useState(false);
	const [isLoadingDeletePaymentMethod, setIsLoadingDeletePaymentMethod] =
		React.useState(false);
	const [tempPaymentMethodDelete, setTempPaymentMethodDelete] =
		React.useState<PaymentMethod>(null);

	const { isFetching, data: paymentMethods, setData, refetch } = useFetchPaymentMethods();

	function onSuccessForm(paymentMethod: PaymentMethod) {
		if (stateForm === 'create') {
			setData([paymentMethod, ...paymentMethods]);
		} else if (stateForm === 'update') {
			setData(
				paymentMethods.map(p =>
					p.idpaymentmethod === paymentMethod.idpaymentmethod
						? { ...paymentMethod }
						: p
				)
			);
		}
	}

	function deletePaymentMethod(paymentMethod: PaymentMethod) {
		setShowDeletePaymentMethod(true);
		setTempPaymentMethodDelete(paymentMethod);
	}

	function onCloseModalDelete() {
		setShowDeletePaymentMethod(false);
		setTempPaymentMethodDelete(null);
	}

	async function onAcceptModaDelete() {
		try {
			setIsLoadingDeletePaymentMethod(true);
			await paymentMethodService.deleteOne(
				tempPaymentMethodDelete.idpaymentmethod
			);
			setData(
				paymentMethods.filter(
					p =>
						p.idpaymentmethod !==
						tempPaymentMethodDelete.idpaymentmethod
				)
			);
			onCloseModalDelete();
			toast.success('Payment Method deleted successfully');
		} catch (error) {
			console.log(error);
			toast.error(
				error.response.data.message ||
					'There was an error deleting the user'
			);
		} finally {
			setIsLoadingDeletePaymentMethod(false);
		}
	}

	function updatePaymentMethod(paymentMethod: PaymentMethod) {
		setTempPaymentMethod(paymentMethod);
		setStateForm('update');
	}

	function createPaymentMethod() {
		setTempPaymentMethod(null);
		setStateForm('create');
	}

	function setViewOrdersByPaymentMethod(paymentMethod: PaymentMethod) {
		setSelected(paymentMethod.idpaymentmethod);
	}

	return (
		<div className="grid lg:grid-cols-5 gap-4">
			<div className="lg:col-span-3 overflow-x-auto">
				<div className="tile">
					<DataTable
						placeholder={<TablePlaceholder />}
						buttons={
							<>
								<button
									className="btn btn-primary btn-xs"
									onClick={
										createPaymentMethod
									}
								>
									<FaPlus />
								</button>
								<button
									className="btn btn-outline-alternative btn-xs"
									onClick={() => refetch()}
								>
									<AiOutlineReload />
								</button>
							</>
						}
						loading={isFetching}
						data={mapPaymentMethods({
							paymentMethods,
							updatePaymentMethod,
							deletePaymentMethod,
							setViewOrdersByPaymentMethod,
						})}
						heading={heading}
					/>
				</div>
			</div>
			<div className="lg:col-span-2">
				<div
					className={classNames(
						'tile mb-0 rounded-b-none text-white py-3',
						stateForm === 'create' && 'bg-blue-600',
						stateForm === 'update' && 'bg-red-600'
					)}
				>
					<h6>
						{stateForm === 'create'
							? 'Create Payment Method'
							: 'Update Payment Method'}
					</h6>
				</div>
				<div className="tile rounded-t-none">
					<FormPaymentMethod
						state={stateForm}
						onSuccess={onSuccessForm}
						paymentMethod={tempPaymentMethod}
					/>
				</div>
			</div>

			<RenderIf isTrue={showDeletePaymentMethod}>
				<ModalDeletePaymentMethod
					onAcceptDeletePaymentMethod={onAcceptModaDelete}
					onCloseModalDelete={onCloseModalDelete}
					isLoading={isLoadingDeletePaymentMethod}
					showModalDeletePaymentMethod={showDeletePaymentMethod}
					paymentMethod={tempPaymentMethodDelete}
				/>
			</RenderIf>
		</div>
	);
};

TablePaymentMethods.defaultProps = {
	heading: defaultHeadingPaymentMethods,
};

export default TablePaymentMethods;
