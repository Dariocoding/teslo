import { translate } from "@/i18n";
import * as React from "react";
import InfoDataTile, { IInfoDataTileProps } from "./InfoDataTile";
import { actionsBrands, actionsCategories, actionsPaymentMethods, actionsProviders } from "./utils";
import ExportBillOrders from "./ExportsBillOrders";
import ExportsProducts from "./ExportsProducts";

interface IExportsDataAppProps {}

type Actions = Omit<IInfoDataTileProps, "title">;

const ExportsDataApp: React.FunctionComponent<IExportsDataAppProps> = props => {
	const {} = props;

	return (
		<React.Fragment>
			<div className="tile max-w-[1200px] mx-auto">
				<div className="flex flex-wrap items-start justify-between gap-x-12 gap-y-4">
					<ExportsProducts />
					<InfoDataTile title={translate("categories.title")} {...actionsCategories} />
					<InfoDataTile title={translate("brands.title")} {...actionsBrands} />
					<InfoDataTile title={translate("providers.title")} {...actionsProviders} />
					<InfoDataTile
						title={translate("paymentMethods.title")}
						{...actionsPaymentMethods}
					/>
				</div>
			</div>
			<div className="tile max-w-[500px] mx-auto flex items-center justify-center">
				<div className="flex flex-wrap items-start justify-center gap-x-12 gap-y-4 mt-4">
					<ExportBillOrders />
				</div>
			</div>
		</React.Fragment>
	);
};

export default ExportsDataApp;
