import AuthLayout from '@/layouts/AuthLayout';
import { validPaths } from '@/utils';
import * as React from 'react';
import { FaHome } from 'react-icons/fa';
import { Link, useSearchParams } from 'react-router-dom';
import { GiPoliceOfficerHead } from 'react-icons/gi';

interface IVerifyEmailProps {}

const VerifyEmail: React.FunctionComponent<IVerifyEmailProps> = props => {
	const {} = props;
	const [searchParams] = useSearchParams();

	const email = searchParams.get('email');
	const existEmail = Boolean(email);

	return (
		<AuthLayout showCard={false}>
			<div className="tile text-center p-0 w-full">
				<div className="border-b border-gray-200 px-4 py-4">
					<h6 className="text-start text-2xl font-semibold">
						{existEmail
							? 'Verify your email'
							: "Hey dude, please don't try to hack me"}
					</h6>
				</div>
				<div className="p-4">
					<span className="text-center flex items-center justify-start flex-col">
						<span className="mb-4">
							{existEmail ? (
								<img
									src="/img/others/verify-email-pending.png"
									alt="Verify Email Pending"
									className="w-44"
								/>
							) : (
								<GiPoliceOfficerHead className="text-6xl" />
							)}
						</span>
						<span className="text-gray-600">
							{existEmail
								? `We have sent an email to: ${email}`
								: "Keep trying, you won't be able to hack me"}
						</span>
						<span className="text-gray-500 text-sm">
							{existEmail
								? 'Please, check your inbox and click on the link to verify your email.'
								: 'Please, go back to home'}
						</span>

						<Link
							to={validPaths.home.path}
							className="btn btn-primary btn-sm mt-4 gap-2"
						>
							Go to Login <FaHome />
						</Link>
					</span>
				</div>
			</div>
		</AuthLayout>
	);
};

export default VerifyEmail;
