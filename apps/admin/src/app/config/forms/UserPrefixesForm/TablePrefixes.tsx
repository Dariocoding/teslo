import * as React from "react";
import { FaPen, FaTrash } from "react-icons/fa";

interface ITablePrefixesProps {
  onClickActionsPrefix: (index: number, action: "update" | "delete") => void;
  prefixes: string[];
}

const TablePrefixes: React.FC<ITablePrefixesProps> = (props) => {
  const { prefixes, onClickActionsPrefix } = props;
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th className="text-center">Prefix</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {prefixes?.map?.((prefix, index) => (
            <tr key={index}>
              <td className="text-center">{prefix}</td>
              <td>
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    className="btn btn-xs btn-success"
                    onClick={() => onClickActionsPrefix(index, "update")}
                  >
                    <FaPen />
                  </button>
                  <button
                    type="button"
                    onClick={() => onClickActionsPrefix(index, "delete")}
                    className="btn btn-xs btn-danger"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablePrefixes;
