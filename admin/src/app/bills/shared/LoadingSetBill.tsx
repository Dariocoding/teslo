import { useConfigEnterpriseStore } from '@/store';
import * as React from 'react';

interface ILoadingSetBillProps {}

const LoadingSetBill: React.FunctionComponent<ILoadingSetBillProps> = props => {
	const {} = props;
	const { configEnterprise } = useConfigEnterpriseStore();

	return (
		<div className="tile">
			<div className="mb-4">
				<h6 className="text-lg font-semibold mb-1.5 inline-block">
					Enterprise
				</h6>
				<div className="animate-pulse flex flex-col">
					<div className="flex-1 space-y-4 py-1">
						<div className="h-3 bg-gray-400 rounded w-full"></div>
						<div className="h-3 bg-gray-400 rounded w-full"></div>
					</div>
				</div>
			</div>

			<div className="flex flex-wrap justify-start items-center gap-6 mb-4">
				<div className="w-full lg:w-1/5">
					<h6 className="text-lg font-semibold mb-1.5 inline-block">
						Providers
					</h6>
					<div className="animate-pulse flex flex-col">
						<div className="flex-1 space-y-4 py-1">
							<div className="h-3 bg-gray-400 rounded w-full"></div>
							<div className="h-3 bg-gray-400 rounded w-full"></div>
							<div className="h-3 bg-gray-400 rounded w-full"></div>
							<div className="h-3 bg-gray-400 rounded w-full"></div>
							<div className="h-3 bg-gray-400 rounded w-full"></div>
							<div className="h-3 bg-gray-400 rounded w-full"></div>
						</div>
					</div>
				</div>
				<div className="w-full lg:w-9/12 flex-grow">
					<h6 className="text-lg font-semibold mb-1.5 inline-block">
						Products
					</h6>
					<div className="animate-pulse flex flex-col">
						<div className="flex-1 space-y-4 py-1">
							<div className="h-3 bg-gray-400 rounded w-full"></div>
							<div className="h-3 bg-gray-400 rounded w-full"></div>
							<div className="h-3 bg-gray-400 rounded w-full"></div>
							<div className="h-3 bg-gray-400 rounded w-full"></div>
							<div className="h-3 bg-gray-400 rounded w-full"></div>
							<div className="h-3 bg-gray-400 rounded w-full"></div>
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-wrap justify-start items-center gap-6">
				<div className="w-full lg:w-1/5">
					<h6 className="text-lg font-semibold mb-1.5 inline-block">
						Images
					</h6>
					<div className="animate-pulse flex flex-col">
						<div className="flex-1 space-y-4 py-1">
							<div className="h-3 bg-gray-400 rounded w-full"></div>
							<div className="h-3 bg-gray-400 rounded w-full"></div>
							<div className="h-3 bg-gray-400 rounded w-full"></div>
							<div className="h-3 bg-gray-400 rounded w-full"></div>
							<div className="h-3 bg-gray-400 rounded w-full"></div>
							<div className="h-3 bg-gray-400 rounded w-full"></div>
						</div>
					</div>
				</div>
				<div className="w-full lg:w-1/4">
					<h6 className="text-lg font-semibold mb-1.5">Totals</h6>
					<div className="animate-pulse flex flex-col">
						<div className="flex-1 space-y-4 py-1">
							<div className="h-3 bg-gray-400 rounded w-full"></div>
							<div className="h-3 bg-gray-400 rounded w-full"></div>
							<div className="h-3 bg-gray-400 rounded w-full"></div>
							<div className="h-3 bg-gray-400 rounded w-full"></div>
							<div className="h-3 bg-gray-400 rounded w-full"></div>
							<div className="h-3 bg-gray-400 rounded w-full"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoadingSetBill;
