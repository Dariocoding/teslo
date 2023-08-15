import { translate } from "@/i18n";
import { useConfigEnterpriseStore } from "@/store";
import * as React from "react";

interface IEnterpriseInfoProps {}

const EnterpriseInfo: React.FunctionComponent<IEnterpriseInfoProps> = props => {
	const {} = props;
	const { configEnterprise } = useConfigEnterpriseStore();
	return (
		<div>
			<h6 className="text-lg font-semibold mb-1.5 inline-block">
				{translate("settings.enterpriseInfo.title")}
			</h6>
			<div className="flex flex-col text-sm">
				<div className="grid lg:grid-cols-2 lg:gap-1.5 gap-1 text-xs print:grid-cols-2">
					<div>
						<span className="font-bold">{translate("providers.label.name")}:</span>{" "}
						{configEnterprise.name || "No registered name"}
					</div>
					<div className="lg:text-end print:text-end">
						<span className="font-bold">{translate("providers.label.email")}:</span>{" "}
						{configEnterprise.email || "No registered email"}
					</div>
					<div>
						<span className="font-bold">{translate("providers.label.address")}:</span>{" "}
						{configEnterprise.address || "No registered address"}
					</div>
					<div className="lg:text-end print:text-end">
						<span className="font-bold">{translate("users.label.phone")}:</span>{" "}
						{configEnterprise.phone || "No registered phone"}
					</div>
				</div>
			</div>
		</div>
	);
};

export default EnterpriseInfo;
