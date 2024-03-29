import { Provider, ValidRoles } from "@teslo/interfaces";
import * as React from "react";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { providerPages } from "../config";
import AuthorityCheck from "@/components/AuthorityCheck";

interface IActionsTableProvidersProps {
  provider: Provider;
  onClickUpdateProvider(provider: Provider): void;
  onClickDeleteProvider(provider: Provider): void;
}

const ActionsTableProviders: React.FunctionComponent<IActionsTableProvidersProps> = (props) => {
  const { provider, onClickDeleteProvider, onClickUpdateProvider } = props;

  const handleUpdateProvider = () => onClickUpdateProvider(provider);
  const handleDeleteProvider = () => onClickDeleteProvider(provider);

  return (
    <React.Fragment>
      <Link
        to={providerPages.viewProvider.fnPath(provider.idprovider)}
        className="btn btn-success btn-xs"
      >
        <FaEye />
      </Link>
      <AuthorityCheck validRoles={[ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR]}>
        <button className="btn btn-primary btn-xs" onClick={handleUpdateProvider}>
          <FaPen />
        </button>

        <button className="btn btn-danger btn-xs" onClick={handleDeleteProvider}>
          <FaTrash />
        </button>
      </AuthorityCheck>
    </React.Fragment>
  );
};

export default ActionsTableProviders;
