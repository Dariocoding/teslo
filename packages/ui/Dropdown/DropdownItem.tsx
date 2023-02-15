import { Menu } from "@headlessui/react";
import classNames from "classnames";
import * as React from "react";

interface IDropdownItemProps {
  children?: React.ReactNode;
  className?: string;
  classNameIsActive?: string;
  onClick?(): void;
}

const DropdownItem: React.FunctionComponent<IDropdownItemProps> = (props) => {
  const { className, classNameIsActive, onClick } = props;
  const spanClassName = (active: boolean) => {
    return classNames(
      "block px-4 py-2 text-sm cursor-pointer",
      { "bg-gray-100": active, "text-gray-700": !active },
      classNameIsActive && active ? classNameIsActive : "",
      className
    );
  };
  return (
    <Menu.Item>
      {({ active }) => (
        <span className={spanClassName(active)} onClick={onClick}>
          {props.children}
        </span>
      )}
    </Menu.Item>
  );
};

export default DropdownItem;
