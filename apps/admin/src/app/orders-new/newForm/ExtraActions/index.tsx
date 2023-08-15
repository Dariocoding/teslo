import * as React from "react";
import ActionOrder from "./ActionOrder";
import { PiBookBookmarkDuotone, PiSealCheckDuotone } from "react-icons/pi";
import ModalServiceAction from "./ModalServiceAction";
import { translate } from "@/i18n";

interface IExtraActionsProps {
  className?: string;
}

const ExtraActions: React.FunctionComponent<IExtraActionsProps> = (props) => {
  const { className } = props;
  const [showModal, setShowModal] = React.useState(false);
  return (
    <div className={className}>
      <ActionOrder
        onClick={() => setShowModal(true)}
        className="bg-white text-black uppercase text-xl font-bold hover:bg-rose-50 cursor-pointer gap-1"
      >
        <PiBookBookmarkDuotone /> {translate("orders.title.add.service")} <PiSealCheckDuotone />
      </ActionOrder>
      <ModalServiceAction onClose={() => setShowModal(false)} showModal={showModal} />
    </div>
  );
};

export default ExtraActions;
