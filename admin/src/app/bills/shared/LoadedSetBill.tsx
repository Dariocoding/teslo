import * as React from "react";
import { RenderIf } from "react-rainbow-components";
import LoadingSetBill from "./LoadingSetBill";
import { Provider } from "@teslo/interfaces";
import { Link } from "react-router-dom";
import { validPaths } from "@/utils";

interface ILoadedSetBillProps {
	children?: React.ReactNode;
	isLoadingProviders: boolean;
	refetch: () => void;
	error?: any;
	providers: Provider[];
}

const LoadedSetBill: React.FunctionComponent<ILoadedSetBillProps> = props => {
	const { isLoadingProviders, refetch, error, providers } = props;
	return (
		<React.Fragment>
			<RenderIf isTrue={!error}>
				<RenderIf isTrue={isLoadingProviders}>
					<LoadingSetBill />
				</RenderIf>
				<RenderIf isTrue={!isLoadingProviders}>
					<RenderIf isTrue={providers.length}>{props.children}</RenderIf>
					<RenderIf isTrue={!providers.length}>
						<div className="max-w-[500px] mx-auto">
							<div className="tile">
								<div className="alert alert-danger">
									<div className="mb-3">
										<img
											src="/img/others/error.png"
											alt="Error"
											className="mx-auto w-28"
										/>
									</div>
									<p className="text-center font-semibold text-lg">
										No providers found
									</p>

									<div className="flex items-center justify-center mt-2">
										<Link
											to={validPaths.providers.path}
											className="btn btn-primary btn-sm px-8 mb-0"
										>
											Add new Provider
										</Link>
									</div>
								</div>
							</div>
						</div>
					</RenderIf>
				</RenderIf>
			</RenderIf>
			<RenderIf isTrue={error}>
				<div className="max-w-[500px] mx-auto">
					<div className="tile">
						<div className="alert alert-danger">
							<div className="mb-3">
								<img
									src="/img/others/error.png"
									alt="Error"
									className="mx-auto w-28"
								/>
							</div>
							<p className="text-center font-semibold text-lg">
								Have ocurred an fatal error
							</p>

							<div className="flex items-center justify-center mt-2">
								<button
									type="button"
									onClick={() => refetch()}
									disabled={isLoadingProviders}
									className="btn btn-primary btn-sm px-8 mb-0"
								>
									{isLoadingProviders ? "Loading..." : "Retry"}
								</button>
							</div>
						</div>
					</div>
				</div>
			</RenderIf>
		</React.Fragment>
	);
};

export default LoadedSetBill;
