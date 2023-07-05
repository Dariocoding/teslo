import { translate } from "@/i18n";
import Upload from "@teslo/react-ui/Upload";
import * as React from "react";
import { FcImageFile } from "react-icons/fc";

interface IUploadImagesProps {}

const UploadImages: React.FunctionComponent<IUploadImagesProps> = props => {
	const {} = props;
	const files = [];
	return (
		<div className="form-group">
			<Upload multiple showList fileList={files}>
				<div className="my-8 text-center">
					<div className="text-6xl mb-4 flex justify-center">
						<FcImageFile />
					</div>
					<p className="font-semibold">
						<span className="text-gray-800 dark:text-white">
							{translate("app.dropYourImageOr")}{" "}
						</span>
						<span className="text-blue-500">{translate("app.browse")}</span>
					</p>
					<p className="mt-1 opacity-60 dark:text-white">
						{translate("app.support")}: jpeg, jpg, png, webp
					</p>
				</div>
			</Upload>
		</div>
	);
};

export default UploadImages;
