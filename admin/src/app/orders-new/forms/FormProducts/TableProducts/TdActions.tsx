import RenderIf from "@teslo/react-ui/RenderIf";
import classNames from "classnames";
import * as React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface ITdActionsProps {
	handleClickEdit: () => void;
	handleClickDelete: () => void;
	isEditing: boolean;
}

const TdActions: React.FunctionComponent<ITdActionsProps> = props => {
	const { handleClickDelete, handleClickEdit, isEditing } = props;
	return (
		<td>
			<div className="flex items-center justify-center">
				<button
					type="button"
					className={classNames(
						"btn btn-xs btn-outline-primary mb-0 shadow-none",
						isEditing && "w-full editing-product"
					)}
					onClick={handleClickEdit}
				>
					<FaEdit />
				</button>
				<RenderIf isTrue={!isEditing}>
					<button
						type="button"
						className="btn btn-xs btn-outline-danger mb-0 shadow-none"
						onClick={handleClickDelete}
					>
						<FaTrash />
					</button>
				</RenderIf>
			</div>
		</td>
	);
};

export default TdActions;
