import AuthorityCheck from "@/components/AuthorityCheck";
import { protectedRoutes } from "@/utils";
import { Brand, ValidRoles } from "@teslo/interfaces";
import * as React from "react";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

interface IActionsBrandProps {
  brand: Brand;
  onUpdateBrand(brand: Brand): void;
  onDeleteBrand(brand: Brand): void;
}

const ActionsBrand: React.FunctionComponent<IActionsBrandProps> = (props) => {
  const { brand, onDeleteBrand, onUpdateBrand } = props;

  const handleClickUpdate = () => onUpdateBrand(brand);
  const handleClickDelete = () => onDeleteBrand(brand);

  return (
    <div>
      <Link to={protectedRoutes.viewBrand.fnPath(brand.idbrand)} className="btn btn-success btn-xs">
        <FaEye />
      </Link>
      <AuthorityCheck validRoles={[ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR]}>
        <button className="btn btn-primary btn-xs" onClick={handleClickUpdate}>
          <FaPen />
        </button>
        <button className="btn btn-danger btn-xs" onClick={handleClickDelete}>
          <FaTrash />
        </button>
      </AuthorityCheck>
    </div>
  );
};

export default ActionsBrand;
