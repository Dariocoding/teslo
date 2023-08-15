import * as React from "react";
import classNames from "classnames";
import RenderIf from "@/components/ui/RenderIf";
import ContentFormUser from "./ContentFormUser";
import AdvanceFormUser from "./AdvanceFormUser";

interface IFormUserNewOrderProps {
  classNameContainer?: string;
}

const FormUserNewOrder: React.FunctionComponent<IFormUserNewOrderProps> = (props) => {
  const { classNameContainer } = props;
  const [advanceConfig, setAdvanceConfig] = React.useState(false);
  const toggleAdvanceConfig = () => setAdvanceConfig(!advanceConfig);

  return (
    <div className={classNames("tile", classNameContainer)}>
      <RenderIf isTrue={!advanceConfig}>
        <ContentFormUser toggleAdvanceConfig={toggleAdvanceConfig} />
      </RenderIf>
      <RenderIf isTrue={advanceConfig}>
        <AdvanceFormUser toggleAdvanceConfig={toggleAdvanceConfig} />
      </RenderIf>
    </div>
  );
};

export default FormUserNewOrder;
