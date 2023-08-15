import HeaderDashboard from "@/layouts/HeaderDashboardLayout";
import * as React from "react";
import DataTableBrands from "./TableBrands";
import { validPaths } from "@/utils";
import { FaTags } from "react-icons/fa";
import { translate } from "@/i18n";

interface IBrandsPageProps {}

const BrandsPage: React.FunctionComponent<IBrandsPageProps> = (props) => {
  const {} = props;
  return (
    <HeaderDashboard
      to={validPaths.dashboard.path}
      title={translate("brands.title")}
      icon={<FaTags />}
      breadcrumbs={[
        { label: translate("dashboard.title"), to: validPaths.home.path },
        { label: translate("brands.title") },
      ]}
    >
      <div className="tile">
        <DataTableBrands />
      </div>
    </HeaderDashboard>
  );
};

export default BrandsPage;
