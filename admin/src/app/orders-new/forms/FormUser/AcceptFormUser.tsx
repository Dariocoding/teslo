import { translate } from "@/i18n";
import classNames from "classnames";
import * as React from "react";
import { FaSave, FaSpinner } from "react-icons/fa";
import RenderIf from "@/components/ui/RenderIf";
import { useOrdersFormContext } from "../FormContainer";

interface IAcceptFormUserProps {
  loading: boolean;
  stateNew: boolean;
  handleCreateClient(): void;
}

const AcceptFormUser: React.FunctionComponent<IAcceptFormUserProps> = (props) => {
  const { stateNew, handleCreateClient, loading } = props;
  const { values } = useOrdersFormContext();
  const showButtonCreate = Boolean(!values.user.iduser && stateNew);

  return (
    <div
      className={classNames(
        "flex items-center justify-center transition-all overflow-hidden",
        showButtonCreate ? "h-auto opacity-100 mt-6" : "h-0 opacity-0"
      )}
    >
      <button
        type="button"
        onClick={handleCreateClient}
        className="btn btn-primary btn-xs gap-1.5 mx-auto mb-0"
        disabled={loading}
      >
        <RenderIf isTrue={!loading}>
          {translate("app.save")} <FaSave />
        </RenderIf>

        <RenderIf isTrue={loading}>
          <FaSpinner className="animate-spin" />
        </RenderIf>
      </button>
    </div>
  );
};

export default AcceptFormUser;
