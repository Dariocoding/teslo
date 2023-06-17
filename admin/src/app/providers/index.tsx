import HeaderDashboard from "@/layouts/HeaderDashboardLayout";
import { validPaths } from "@/utils";
import * as React from "react";
import { FaPeopleCarry } from "react-icons/fa";
import TableProviders from "./TableProviders";
import { useFetchProviders } from "./hooks/useFetchProviders";
import { translate } from "@/i18n";

interface IProvidersPageProps {}

const ProvidersPage: React.FunctionComponent<IProvidersPageProps> = (props) => {
  const {} = props;
  const { data, setData, isLoading } = useFetchProviders();
  return (
    <HeaderDashboard
      to={validPaths.dashboard.path}
      title={translate("providers.title")}
      icon={<FaPeopleCarry />}
      breadcrumbs={[
        { label: translate("dashboard.title"), to: validPaths.home.path },
        { label: translate("providers.title") },
      ]}
    >
      <div className="tile">
        <TableProviders providers={data} setProviders={setData} isLoading={isLoading} />
      </div>
    </HeaderDashboard>
  );
};

export default ProvidersPage;
