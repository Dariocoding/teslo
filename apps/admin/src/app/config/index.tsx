import HeaderDashboard from "@/layouts/HeaderDashboardLayout";
import * as React from "react";
import Card from "./Card";
import dataOptions, { DataOption } from "./data/data-options";
import { validPaths } from "@/utils";
import { FaCogs } from "react-icons/fa";
import EnterpriseForm from "./forms/EnterpriseForm";
import { useConfigApp, useModalStore } from "@/store";
import { translate } from "@/i18n";
import AuthorityCheck from "@/components/AuthorityCheck";
import { RenderIf } from "@/components/ui";

const UserPrefixesForm = React.lazy(() => import("./forms/UserPrefixesForm"));
const DeveloperOptionsModal = React.lazy(() => import("./forms/DeveloperOptions"));

interface IConfigPageProps {}

const ConfigPage: React.FC<IConfigPageProps> = (props) => {
  const {} = props;
  const { setModal } = useModalStore();

  function openModalUserPrefixes() {
    setModal({
      title: "User prefixes",
      children: (
        <React.Suspense fallback={<></>}>
          <UserPrefixesForm />
        </React.Suspense>
      ),
    });
  }

  function openModalDeveloperOptions() {
    setModal({
      title: "Developer Options",
      children: (
        <React.Suspense fallback={<></>}>
          <DeveloperOptionsModal />
        </React.Suspense>
      ),
    });
  }

  const onClickOption = (id: DataOption["id"]) => {
    if (id === "user-prefixes") return openModalUserPrefixes;
    if (id === "developer-options") return openModalDeveloperOptions;
    return null;
  };

  return (
    <HeaderDashboard
      title={translate("settings.title")}
      breadcrumbs={[
        { label: translate("dashboard.title"), to: validPaths.home.path },
        { label: translate("settings.title") },
      ]}
      to={validPaths.home.path}
      icon={<FaCogs />}
    >
      <div className="grid lg:grid-cols-3 gap-4">
        <div>
          <div className="tile">
            <h2 className="text-xl font-bold text-center mb-3">
              {translate("settings.enterPriseData.title")}
            </h2>

            <EnterpriseForm />
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="grid lg:grid-cols-2 gap-4">
            {dataOptions.map((option, idx) => (
              <CheckRenderCard key={idx} {...{ option }}>
                <Card {...option} key={idx} onClick={(() => onClickOption(option.id))()} />
              </CheckRenderCard>
            ))}
          </div>
        </div>
      </div>
    </HeaderDashboard>
  );
};

export default ConfigPage;

interface ICheckRenderCardProps {
  children?: React.ReactNode;
  option: DataOption;
}

const CheckRenderCard: React.FunctionComponent<ICheckRenderCardProps> = (props) => {
  const { option } = props;
  const { colors } = useConfigApp();

  let render = true;
  if (option.id === "user-prefixes") {
    render = colors.enablePrefixesUser;
  }

  return (
    <RenderIf isTrue={render}>
      <AuthorityCheck validRoles={option.permission}>{props.children}</AuthorityCheck>
    </RenderIf>
  );
};
