import InputFormik from '@/components/@forms/InputFormik';
import { useFormikContext } from 'formik';
import * as React from 'react';
import { ShowIf } from 'react-rainbow-components';
import { NewOrderValues } from '../index';

interface IFormUserNewOrderProps {}

const FormUserNewOrder: React.FunctionComponent<IFormUserNewOrderProps> = props => {
	const {} = props;
	const [stateNew, setStateNew] = React.useState(false);
	const {} = useFormikContext<NewOrderValues>();
	const onClickNewClient = () => {
		setStateNew(true);
	};

	return (
		<div className="tile max-w-[300px] lg:max-w-[375px]">
			<h6 className="flex items-center justify-between text-lg font-normal mb-4">
				<span>Datos de cliente</span>
				<button
					type="button"
					className="btn btn-success btn-xs"
					onClick={onClickNewClient}
				>
					Nuevo Cliente
				</button>
			</h6>
			<InputFormik
				name="dni"
				placeholder="DNI"
				classNameLabel="text-xs"
				label={'DNI'}
			/>
			<InputFormik
				label={'First Name'}
				name="first_name"
				placeholder="First Name"
				classNameLabel="text-xs"
				disabled={!stateNew}
			/>
			<InputFormik
				name="last_name"
				placeholder="Last Name"
				classNameLabel="text-xs"
				label={'Last Name'}
				disabled={!stateNew}
			/>
			<InputFormik
				name="email"
				placeholder="user@email.com"
				classNameLabel="text-xs"
				label={'Email'}
				disabled={!stateNew}
			/>

			<InputFormik
				name="phone"
				placeholder="04240000000"
				classNameLabel="text-xs"
				label={'Phone'}
				disabled={!stateNew}
			/>

			<ShowIf
				isTrue={stateNew}
				inAnimation="slideVertical"
				outAnimation="slideVertical"
			>
				<button type="button" className="w-full btn btn-sm btn-primary">
					Create User
				</button>
			</ShowIf>
		</div>
	);
};

export default FormUserNewOrder;
