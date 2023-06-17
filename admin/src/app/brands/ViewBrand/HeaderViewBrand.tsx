import { translate } from "@/i18n";
import { Brand } from "@teslo/interfaces";
import dayjs from "dayjs";
import * as React from "react";
import { FaPen, FaTrash } from "react-icons/fa";

interface IHeaderViewBrandProps {
  brand: Brand;
  onUpdate(): void;
  onDelete(): void;
}

const HeaderViewBrand: React.FunctionComponent<IHeaderViewBrandProps> = (props) => {
  const { brand, onDelete, onUpdate } = props;

  return (
    <div className="grid lg:grid-cols-12 lg:gap-8 gap-4">
      <div className="tile lg:col-span-4">
        <div className="flex items-center justify-center mb-4">
          <h6>{brand.title}</h6>
        </div>
        <div className="flex flex-col justify-end w-full h-full items-end">
          <button onClick={onUpdate} className="mx-auto w-full btn btn-primary btn-sm">
            {translate("app.edit")} <FaPen className="ml-2" />
          </button>

          <button className="mx-auto w-full btn btn-danger btn-sm" onClick={onDelete}>
            {translate("app.delete")} <FaTrash className="ml-2" />
          </button>
        </div>
      </div>
      <div className="tile lg:col-span-8">
        <h4 className="mb-6">{brand.title}</h4>
        <div className="text-sm space-y-3">
          <p>
            <span className="font-bold">ID:</span> {brand.idbrand}
          </p>

          <p>
            <span className="font-bold">Date Created:</span>{" "}
            {dayjs(brand.dateCreated).format("DD/MM/YYYY HH:mm:ss")}
          </p>

          <p>
            <span className="font-bold">Slug:</span> {brand.slug}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeaderViewBrand;
