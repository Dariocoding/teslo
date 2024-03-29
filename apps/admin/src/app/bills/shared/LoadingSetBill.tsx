import { translate } from "@/i18n";
import * as React from "react";

interface ILoadingSetBillProps {}

const LoadingSetBill: React.FunctionComponent<ILoadingSetBillProps> = props => {
	const {} = props;

	return (
		<div className="tile">
			<div className="mb-4">
				<h6 className="text-lg font-semibold mb-1.5 inline-block">
					{translate("settings.enterprise.title")}
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
						{translate("providers.title")}
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
						{translate("products.title")}
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
						{translate("products.label.images")}
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
