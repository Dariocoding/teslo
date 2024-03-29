import { View } from "@react-pdf/renderer";
import { Product } from "@teslo/interfaces";
import JsBarcode from "jsbarcode";
import * as React from "react";

interface IMyBarCodeProps {
  product: Product;
  customWidth?: number;
  customHeight?: number;
}

const MyBarCode: React.FunctionComponent<IMyBarCodeProps> = (props) => {
  const { product, customHeight, customWidth } = props;
  const canvas = document.createElement("canvas");
  const data: any = {};
  JsBarcode(data, product.code?.toString());
  JsBarcode(canvas, product.code?.toString());
  const barWidth = data.encodings[0].options.width;
  const barHeight = data.encodings[0].options.height;
  const barWidthRatio = barWidth / barHeight;
  const realHeight = customHeight || 40;
  const heightRatio = barHeight / realHeight;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "flex-start",
        height: `${realHeight}px`,
        width: `${customWidth || 200}px`,
      }}
    >
      {data.encodings[0].data.split("").map((bar, index) => (
        <View
          key={index}
          style={{
            margin: 0,
            width: `${realHeight * barWidthRatio}px`,
            height: `${barHeight / heightRatio}px`,
            backgroundColor: Number(bar) ? "black" : "white",
          }}
        />
      ))}
    </View>
  );
};

export default MyBarCode;
