import { loginSocials } from '@/utils';
import RenderIf from '@teslo/react-ui/RenderIf';
import classNames from 'classnames';
import * as React from 'react';

interface IAuthLayoutProps {
	title: React.ReactNode;
	footer?: React.ReactNode;
	children?: React.ReactNode;
}

const AuthLayout: React.FunctionComponent<IAuthLayoutProps> = props => {
	const { footer, children, title } = props;
	return (
		<div className="container mb-24 lg:mb-32">
			<div className="max-w-md mx-auto space-y-6 shadow-lg rounded-lg p-6 mt-12">
				<h2 className="mb-14 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 justify-center">
					{title}
				</h2>

				{children}

				{footer}

				<div className="relative text-center">
					<span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
						OR
					</span>
					<div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
				</div>

				<div className="grid gap-3">
					{loginSocials.map((item, index) => (
						<>
							{typeof item.href === 'string' ? (
								<a
									key={index}
									href={item.href}
									className={classNames(
										item.className,
										'flex w-full rounded-lg bg-primary-50 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]'
									)}
								>
									<img
										className="flex-shrink-0"
										src={item.icon}
										alt={item.name}
									/>
									<h3 className="flex-grow text-center text-sm font-medium sm:text-sm">
										{item.name}
									</h3>
								</a>
							) : (
								<button
									type="button"
									className={classNames(
										item.className,
										'flex w-full rounded-lg bg-primary-50 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]'
									)}
								>
									{item.href}
									<h3 className="flex-grow text-center text-sm font-medium sm:text-sm">
										{item.name}
									</h3>
								</button>
							)}
						</>
					))}
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;
