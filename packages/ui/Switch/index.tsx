import classNames from 'classnames';
import * as React from 'react';
import { Switch as ReactSwitch } from '@headlessui/react';

interface ISwitchProps {
	isChecked?: boolean;
	onChange?(value: boolean): void;
}

const Switch: React.FunctionComponent<ISwitchProps> = props => {
	const { isChecked, onChange } = props;
	return (
		<ReactSwitch
			checked={isChecked}
			onChange={onChange}
			className={classNames(
				isChecked ? 'bg-blue-600' : 'bg-gray-300',
				'relative inline-flex h-6 w-11 items-center rounded-full'
			)}
		>
			<span
				className={classNames(
					isChecked ? 'translate-x-6' : 'translate-x-1',
					'inline-block h-4 w-4 transform rounded-full bg-white transition'
				)}
			/>
		</ReactSwitch>
	);
};

export default Switch;
