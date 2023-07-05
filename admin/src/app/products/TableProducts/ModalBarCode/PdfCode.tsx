import * as React from "react";
import { Document, PDFViewer, Page, View, Text } from "@react-pdf/renderer";
import { Product } from "@teslo/interfaces";
import MyBarCode from "../../shared/MyBarCode";

interface IPdfBarCodeProps {
	product: Product;
}

const PdfBarCode: React.FunctionComponent<IPdfBarCodeProps> = props => {
	const { product } = props;
	return (
		<PDFViewer style={{ height: "500px", width: "100%" }}>
			<Document>
				<Page size="A4">
					<View
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							marginTop: "10px",
						}}
					>
						<MyBarCode product={product} />
						<Text style={{ marginTop: "10px", fontSize: "12px" }}>{product.code}</Text>
					</View>
				</Page>
			</Document>
		</PDFViewer>
	);
};

export default PdfBarCode;
