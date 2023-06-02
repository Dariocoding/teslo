import ButtonFormik from '@/components/@forms/ButtonFormik';
import InputFormik from '@/components/@forms/InputFormik';
import { formatter } from '@/utils';
import { BillDto } from '@teslo/interfaces';
import RenderIf from '@teslo/react-ui/RenderIf';
import { useFormikContext } from 'formik';
import * as React from 'react';
import { FaPen } from 'react-icons/fa';
import { getValidationsBillForm } from './getValidationsBillForm';

interface ITotalsBillFormProps {}

const TotalsBillForm: React.FunctionComponent<ITotalsBillFormProps> = props => {
	const {} = props;
	const [editingTask, setEditingTask] = React.useState(false);
	const { values } = useFormikContext<BillDto>();

	const toggleEditingTask = () => setEditingTask(!editingTask);

	React.useEffect(() => {
		if (editingTask) {
			document.getElementById('tax')?.focus();
		}
	}, [editingTask]);

	const { subtotal, total, disabledSubmit } = getValidationsBillForm(values);

	return (
		<div className="tile p-0 uppercase shadow-none mb-0">
			<div className="p-4 bg-gray-700 bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg rounded-md">
				<div className="flex items-center justify-between mb-4">
					<h6 className="text-sm font-semibold inline-block">
						Subtotal
					</h6>
					<span>{subtotal ? formatter.format(subtotal) : '-'}</span>
				</div>
				<div className="flex items-center justify-between">
					<h6 className="text-sm font-semibold inline-block">
						I.V.A
					</h6>
					<RenderIf isTrue={!editingTask}>
						<div>
							<span className="text-xs">
								{values.tax}%
							</span>
							<span
								onClick={toggleEditingTask}
								className="text-blue-500 text-xs normal-case ml-1 hover:text-blue-700 transition cursor-pointer"
							>
								Edit
							</span>
						</div>
					</RenderIf>
					<RenderIf isTrue={editingTask}>
						<div className="flex items-center max-w-[100px]">
							<InputFormik
								decimalValues={false}
								type="number"
								name="tax"
								className="mb-0"
								classNameInput="form-control-sm"
								showError={false}
								showSuccess={false}
							/>
						</div>
					</RenderIf>
				</div>
			</div>
			<div className="p-4 bg-gray-900 bg-opacity-90 text-white backdrop-filter backdrop-blur-lg">
				<div className="flex items-center justify-between gap-1">
					<h6 className="text-xs font-semibold inline-block">
						Total
					</h6>
					<span className="text-sm">
						{formatter.format(
							total - (values.delivery || 0) || 0
						)}{' '}
						<RenderIf isTrue={values.delivery}>
							+ {formatter.format(values.delivery)} ={' '}
							{formatter.format(total)}
						</RenderIf>
					</span>
				</div>
			</div>

			<div className="flex gap-4 justify-between items-center">
				<div></div>
				<div className="w-1/2 pb-4">
					<RenderIf isTrue={!editingTask}>
						<ButtonFormik
							disabled={disabledSubmit}
							className="uppercase w-full btn-sm btn-dark rounded-md mt-2 shadow-none disabled:cursor-not-allowed"
						>
							Submit
						</ButtonFormik>
					</RenderIf>
					<RenderIf isTrue={editingTask}>
						<button
							type="button"
							className="btn btn-warning w-full text-sm btn-xs rounded-md mt-2 gap-1.5"
							onClick={toggleEditingTask}
						>
							Edit Tax <FaPen className="text-xs" />
						</button>
					</RenderIf>
				</div>
			</div>
		</div>
	);
};

export default TotalsBillForm;
