import classNames from 'classnames';
import Label from '../label';
import { getIn, useFormikContext } from 'formik';
import * as React from 'react';
import Select from 'react-tailwindcss-select';

export interface OptionReactSelect {
	value: string | number | boolean;
	label: string;
}

interface ISelectFormikProps {
	label?: React.ReactNode;
	className?: string;
	classNameSelect?: string;
	classNameLabel?: string;
	disabled?: boolean;
	name: string;
	placeholder?: string;
	required?: boolean;
	showSuccess?: boolean;
	showError?: boolean;
	forceErrorMessage?: string;
	options?: OptionReactSelect[];
	multiple?: boolean;
	onChange?: (option: OptionReactSelect | OptionReactSelect[], lastState: any) => any;
}

const SelectFormik: React.FunctionComponent<ISelectFormikProps> = props => {
	const {
		label,
		className,
		name,
		classNameLabel,
		disabled,
		placeholder,
		required,
		showError,
		showSuccess,
		forceErrorMessage,
		options,
		multiple,
		onChange,
	} = props;
	const { errors, touched, values, setFieldValue } = useFormikContext();
	const value = getIn(values, name);
	const error = getIn(errors, name);
	const isTouched = getIn(touched, name);
	const validateError = (error && isTouched && showError) || Boolean(forceErrorMessage);
	const validateSuccess = !error && isTouched && showSuccess && !validateError;

	function handleChange(option: OptionReactSelect | OptionReactSelect[]) {
		if (onChange) {
			setFieldValue(name, onChange(option, value));
			return;
		}
		if (!Array.isArray(option)) {
			setFieldValue(name, option.value);
		}
	}
	const valuesMultiple = value as (string | number | boolean)[];
	const selected = multiple
		? options.filter(opt => valuesMultiple?.some(value => value === opt.value))
		: options.find(opt => opt.value === value);

	return (
		<div
			className={classNames(
				'form-group',
				validateError ? 'form-group-error' : null,
				validateSuccess ? 'form-group-success' : null,
				className
			)}
		>
			<Label htmlFor={name} required={required} className={classNameLabel}>
				{label}
			</Label>

			<Select
				isClearable={false}
				isMultiple={multiple}
				isDisabled={disabled}
				placeholder={placeholder}
				primaryColor={null}
				//@ts-ignore
				value={selected}
				//@ts-ignore
				onChange={handleChange}
				// @ts-ignore
				options={options}
			/>
		</div>
	);
};

SelectFormik.defaultProps = { options: [] };

export default SelectFormik;
