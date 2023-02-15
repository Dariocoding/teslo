import { FaCheck } from 'react-icons/fa';
import useSound from 'use-sound';
import { FunctionComponent } from 'react';
import classNames from 'classnames';

interface ICheckboxProps {
	isChecked: boolean;
	onChange(isChecked?: boolean): void;
	children?: React.ReactNode;
}

const Checkbox: FunctionComponent<ICheckboxProps> = props => {
	const { isChecked, onChange } = props;
	const [play] = useSound(['/sounds/checkbox.wav'], {
		sprite: { in: [500, 1000], out: [1500, 2000] },
	});

	return (
		<span
			className="flex items-center cursor-pointer"
			onClick={() => {
				play({ id: isChecked ? 'in' : 'out' });
				onChange(!isChecked);
			}}
		>
			<div
				className={classNames('rounded mr-2 w-4 h-4', {
					'border border-black': !isChecked,
				})}
			>
				<div
					className={classNames(
						'absolute z-10 bg-blue-600 w-4 h-4 flex items-center justify-center rounded transition duration-75',
						{ 'scale-0': !isChecked, 'scale-100': isChecked }
					)}
				>
					<FaCheck size={8} className={'text-gray-50'} />
				</div>
			</div>
			<label className="select-none mb-0">{props.children}</label>
		</span>
	);
};

export default Checkbox;
