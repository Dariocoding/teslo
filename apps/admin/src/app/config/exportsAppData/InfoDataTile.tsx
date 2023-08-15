import * as React from "react";
import { FaFileCsv, FaFileExcel, FaFilePdf } from "react-icons/fa";
import { VscJson } from "react-icons/vsc";

export interface IInfoDataTileProps {
	onClickExcel?: (enableClothesShopping?: boolean) => void;
	onClickCsv?: (enableClothesShopping?: boolean) => void;
	title: React.ReactNode;
	onClickPdf?: (enableClothesShopping?: boolean) => void;
	onClickJson?: () => void;
	children?: React.ReactNode;
}

const InfoDataTile: React.FunctionComponent<IInfoDataTileProps> = props => {
	const { title, onClickCsv, onClickExcel, onClickPdf, onClickJson } = props;
	return (
		<div>
			<h6 className="text-center">{title}</h6>
			{props.children}
			<div className="mt-2 flex flex-row flex-wrap items-start justify-center">
				<button
					className="btn btn-sm btn-danger gap-2"
					type="button"
					onClick={() => onClickPdf()}
				>
					PDF <FaFilePdf />
				</button>
				<button
					className="btn btn-sm btn-success gap-2"
					type="button"
					onClick={() => onClickExcel()}
				>
					Excel <FaFileExcel />
				</button>
				<button
					className="btn btn-sm btn-info gap-2"
					type="button"
					onClick={() => onClickCsv()}
				>
					CSV <FaFileCsv />
				</button>

				<button
					className="btn btn-sm btn-alternative gap-2"
					type="button"
					onClick={() => onClickJson()}
				>
					JSON <VscJson />
				</button>
			</div>
		</div>
	);
};

export default InfoDataTile;
