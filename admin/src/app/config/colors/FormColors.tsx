import * as React from "react";
import InputColor from "./InputColor";
import { useConfigApp } from "@/store";
import { configAppService } from "@teslo/services";
import { toast } from "react-hot-toast";
import Spinner from "@teslo/react-ui/Spinner";
import Checkbox from "@teslo/react-ui/Checkbox";
import { VscJson } from "react-icons/vsc";
import { CiImport } from "react-icons/ci";
import RenderIf from "@teslo/react-ui/RenderIf";
import classNames from "classnames";

interface IFormColorsProps {
	onSuccess?: () => void;
}

const FormColors: React.FunctionComponent<IFormColorsProps> = props => {
	const { onSuccess } = props;
	const { colors, setColors } = useConfigApp();
	const [loading, setLoading] = React.useState(false);

	const onSubmit = async () => {
		try {
			setLoading(true);
			await configAppService.update({ colorsAdmin: colors });
			toast.success("Colors updated");
			onSuccess();
		} catch (error) {
			console.log(error);
			toast.error("Error updating colors");
		} finally {
			setLoading(false);
		}
	};

	const exportsData = () => {
		const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
			JSON.stringify(colors)
		)}`;
		const link = document.createElement("a");
		link.href = jsonString;
		link.download = "colors.json";
		link.click();
	};

	const importData: React.ChangeEventHandler<HTMLInputElement> = e => {
		const fileReader = new FileReader();
		fileReader.readAsText(e.target.files[0], "UTF-8");
		fileReader.onload = e => {
			setColors(JSON.parse(e.target.result as string));
		};
	};

	return (
		<div>
			<div className="form-group">
				<h6 className="text-lg mb-1">Header colors</h6>
				<div className="grid lg:grid-cols-2 gap-x-4">
					<InputColor name="headerTop">Header Top</InputColor>
					<InputColor name="topLogoContainer">Top logo container</InputColor>
				</div>
			</div>
			<div className="form-group">
				<h6 className="text-lg mb-1">Sidebar colors</h6>
				<div className="grid lg:grid-cols-2 gap-x-4">
					<InputColor name="sidebarItemHover">Sidebar item hover</InputColor>
					<InputColor name="hoverNavToggle">Hover Nav Toggle</InputColor>
					<InputColor name="sidebarContainer">Sidebar container</InputColor>
					<InputColor name="sidebarDropdownCollapsedContainer">
						Sidebar dropdown collapsed container
					</InputColor>
					<InputColor name="sidebarItemDropdown">Sidebar item dropdown</InputColor>
					<InputColor name="textSubtitleSidebar">Sidebar Text subtitle</InputColor>
				</div>
			</div>
			<div>
				<h6 className="text-lg mb-1">Extras</h6>
				<div className="grid lg:grid-cols-2 gap-x-4">
					<InputColor name="loaderColor">Loader color</InputColor>
					<InputColor name="backgroundHome">Background Home</InputColor>
					<InputColor name="textColor">Text Color</InputColor>
					<div className="grid grid-cols-2">
						<div>
							<div className={classNames(colors.isThemed ? "mt-5" : "mt-10")}>
								<Checkbox
									onChange={() =>
										setColors({
											isThemed: !colors.isThemed,
										})
									}
									isChecked={colors.isThemed}
								>
									<span className="text-xs">Is themed</span>
								</Checkbox>
							</div>
							<RenderIf isTrue={colors.isThemed}>
								<span className="inline-block pt-1">
									<Checkbox
										onChange={() =>
											setColors({
												isThemeDarkLogin: !colors.isThemeDarkLogin,
											})
										}
										isChecked={colors.isThemeDarkLogin}
									>
										<span className="text-xs">Themed Login</span>
									</Checkbox>
								</span>
							</RenderIf>
						</div>
						<div>
							<div
								className={classNames(
									"form-group mb-0",
									colors.isThemed ? "mt-5" : "mt-10"
								)}
							>
								<Checkbox
									onChange={() =>
										setColors({
											isHeaderTop: !colors.isHeaderTop,
										})
									}
									isChecked={colors.isHeaderTop}
								>
									<span className="text-xs">Header Top</span>
								</Checkbox>
							</div>
							<span className="inline-block pt-1">
								<Checkbox
									onChange={() =>
										setColors({
											enableClothesShopping: !colors.enableClothesShopping,
										})
									}
									isChecked={colors.enableClothesShopping}
								>
									<span className="text-xs">Enable clothes shopping</span>
								</Checkbox>
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-3">
				<button
					className="btn btn-primary w-full btn-sm"
					type="button"
					onClick={onSubmit}
					disabled={loading}
				>
					{loading ? <Spinner /> : "Save changes"}
				</button>
				<div className="flex items-center">
					<button
						className="btn btn-outline-dark btn-xs w-1/2 gap-1"
						disabled={loading}
						onClick={exportsData}
					>
						Export as JSON <VscJson className="text-base" />
					</button>
					<input
						type="file"
						onChange={importData}
						className="hidden"
						id="file-json-input"
						accept="application/json"
					/>
					<button
						className="btn btn-outline-success btn-xs w-1/2 gap-1"
						disabled={loading}
						onClick={() => document.getElementById("file-json-input").click()}
					>
						Import as JSON <CiImport className="text-base" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default FormColors;
