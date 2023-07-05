import { Product } from "@teslo/interfaces";
import Modal from "@teslo/react-ui/Modal";
import * as React from "react";
import { Document, PDFViewer, Page, View, Text } from "@react-pdf/renderer";
import MyBarCode from "../MyBarCode";

interface IModalBarCodesProps {
	products: Product[];
	showModal: boolean;
	onClose: () => void;
}

const ModalBarCodes: React.FunctionComponent<IModalBarCodesProps> = props => {
	const { products, showModal, onClose } = props;

	const listOfProducts = dividirArray(products, 18);

	return (
		<Modal size="lg" title={"Bar Codes"} showModal={showModal} onClose={onClose}>
			<PDFViewer style={{ height: "500px", width: "100%" }}>
				<Document title="BarCodes">
					{listOfProducts.map(products => (
						<Page size="A4">
							<View
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									marginTop: "10px",
									flexWrap: "wrap",
									gap: "10px",
									marginLeft: "15px",
									marginRight: "15px",
									flexDirection: "row",
								}}
							>
								{products.map(product => (
									<View key={product.id} style={{ width: "auto" }}>
										<MyBarCode product={product} />
										<Text
											style={{
												marginTop: "5px",
												fontSize: "8px",
												textAlign: "center",
											}}
										>
											{product.title}
										</Text>
										<Text
											style={{
												marginTop: "2px",
												fontSize: "8px",
												textAlign: "center",
											}}
										>
											{product.code}
										</Text>
									</View>
								))}
							</View>
						</Page>
					))}
				</Document>
			</PDFViewer>
		</Modal>
	);
};

export default ModalBarCodes;

function dividirArray<T>(array: T[], tamano: number): T[][] {
	const resultados = [];

	while (array.length) {
		resultados.push(array.splice(0, tamano));
	}

	return resultados;
}
