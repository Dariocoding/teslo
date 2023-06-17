import HeaderDashboard from "@/layouts/HeaderDashboardLayout";
import * as React from "react";
import TableCategories from "./TableCategories";
import { FaClipboardList } from "react-icons/fa";
import { validPaths } from "@/utils";
import { translate } from "@/i18n";

interface ICategoriesPageProps {}

const CategoriesPage: React.FunctionComponent<ICategoriesPageProps> = (props) => {
  const {} = props;

  return (
    <HeaderDashboard
      to={validPaths.dashboard.path}
      title={translate("categories.title")}
      icon={<FaClipboardList />}
      breadcrumbs={[
        { label: translate("dashboard.title"), to: validPaths.home.path },
        { label: translate("categories.title") },
      ]}
    >
      <div className="tile">
        <TableCategories />
      </div>
    </HeaderDashboard>
  );
};

export default React.memo(CategoriesPage);
