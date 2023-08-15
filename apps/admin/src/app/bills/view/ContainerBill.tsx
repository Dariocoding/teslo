import { TablePlaceholder } from "@/components/placeholders";
import { validPaths } from "@/utils";
import RenderIf from "@/components/ui/RenderIf";
import * as React from "react";
import { Link } from "react-router-dom";

interface IContainerBillProps {
  children?: React.ReactNode;
  isLoading?: boolean;
  error?: any;
}

const ContainerBill: React.FunctionComponent<IContainerBillProps> = (props) => {
  const { isLoading, error } = props;
  return (
    <React.Fragment>
      <RenderIf isTrue={isLoading}>
        <div className="tile max-w-[900px] mx-auto">
          <TablePlaceholder />
        </div>
      </RenderIf>
      <RenderIf isTrue={!isLoading}>
        <RenderIf isTrue={error}>
          <div className="tile">
            <div className="text-center">
              <div>
                <img src="/img/others/error.png" alt="Error message" className="w-28 mx-auto" />
              </div>
              <div className="mt-4">
                <h1 className="text-2xl font-semibold">Error</h1>
                <p>There was an error while fetching the bill</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Link to={validPaths.bills.path} className="btn btn-sm btn-primary mt-4">
                Go back
              </Link>
            </div>
          </div>
        </RenderIf>
        <RenderIf isTrue={!error}>{props.children}</RenderIf>
      </RenderIf>
    </React.Fragment>
  );
};

export default ContainerBill;
