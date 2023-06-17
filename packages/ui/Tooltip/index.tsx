import React, { useId } from "react";
import { PlacesType, Tooltip as ReactTooltip } from "react-tooltip";
import classNames from "classnames";
import "react-tooltip/dist/react-tooltip.css";
import RenderIf from "../RenderIf";

interface Props {
  children?: React.ReactNode;
  message?: string;
  placement?: PlacesType;
  className?: string;
  onClick?(): void;
}

const ToolTip: React.FunctionComponent<Props> = (props) => {
  const { children, message, placement = "top", className, onClick } = props;
  const [tooltip, showTooltip] = React.useState(true);
  const id = useId();

  return (
    <React.Fragment>
      <span
        id={id}
        className={classNames("inline-block", className)}
        onClick={onClick}
        onMouseEnter={() => showTooltip(true)}
        onMouseLeave={() => {
          showTooltip(false);
          setTimeout(() => showTooltip(true), 50);
        }}
      >
        {children}
      </span>

      <RenderIf isTrue={tooltip}>
        <ReactTooltip anchorId={id} place={placement} content={message} />
      </RenderIf>
    </React.Fragment>
  );
};

export default ToolTip;
