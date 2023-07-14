import * as React from "react";
import { IMenuItem, SubNavItem } from "../data/data-menu";
import HorizontalMenuSpan from "./HorizontalMenuSpan";
import Dropdown from "@teslo/react-ui/Dropdown";
import DropdownItem from "@teslo/react-ui/Dropdown/DropdownItem";
import { useNavigate } from "react-router-dom";
import { FaCircleNotch } from "react-icons/fa";
import AuthorityCheck from "@/components/AuthorityCheck";

interface IHorizontalMenuCollapsedItemProps {
  item: IMenuItem;
  idx?: number;
}

const HorizontalMenuCollapsedItem: React.FC<
  IHorizontalMenuCollapsedItemProps
> = (props) => {
  const { item } = props;
  return (
    <Dropdown
      isRelativeContainer={false}
      displayButton={<HorizontalMenuSpan item={item} idx={props.idx} />}
    >
      {item.subNav.map((item, idx) => (
        <AuthorityCheck validRoles={item.permissions}>
          <CollpasedItem item={item} key={idx} />
        </AuthorityCheck>
      ))}
    </Dropdown>
  );
};

interface ICollpasedItemProps {
  item: SubNavItem;
}

const CollpasedItem: React.FunctionComponent<ICollpasedItemProps> = (props) => {
  const { item } = props;
  const navigate = useNavigate();
  const handleClick = () => navigate(item.path);
  return (
    <DropdownItem onClick={handleClick}>
      <span className="flex items-center">
        <span>
          <FaCircleNotch className="mr-1.5 text-xs" />
        </span>

        <span>{item.title()}</span>
      </span>
    </DropdownItem>
  );
};

export default HorizontalMenuCollapsedItem;
