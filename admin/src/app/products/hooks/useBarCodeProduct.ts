import { Product } from "@teslo/interfaces";
import JsBarcode from "jsbarcode";
import React from "react";

export const useBarCodeProduct = (product: Product) => {
	const [canvasJSBarCode, setCanvasJSBarCode] = React.useState<HTMLCanvasElement>(null);
	const [copied, setCopied] = React.useState(false);

	React.useEffect(() => {
		if (copied) {
			setTimeout(() => {
				setCopied(false);
			}, 1000);
		}
	}, [copied]);

	React.useEffect(() => {
		const render = () => {
			if (!product.code) return;
			const canvas = document.createElement("canvas");
			JsBarcode(canvas, product.code?.toString(), {
				displayValue: false,
			});
			setCanvasJSBarCode(canvas);
		};

		render();
	}, [product]);

	const srcJsBarCode = canvasJSBarCode?.toDataURL?.();

	const copyImageJsBarCode = async () => {
		const img = await writeToCanvas(srcJsBarCode);
		try {
			await navigator.clipboard.write([
				new ClipboardItem({
					[img.type]: img,
				}),
			]);

			setCopied(true);
		} catch (e) {
			console.log("Copy failed: " + e);
		}
	};

	return {
		srcJsBarCode,
		copyImageJsBarCode,
		copied,
		setCopied,
	};
};

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

function writeToCanvas(src: string): Promise<Blob> {
	const img = new Image();

	return new Promise((res, rej) => {
		fetch(src)
			.then(res => res.blob())
			.then(imgBlob => {
				const imgURL = URL.createObjectURL(imgBlob);
				img.src = imgURL;
			})
			.then(() => {
				img.onload = function () {
					canvas.width = img.naturalWidth;
					canvas.height = img.naturalHeight;
					ctx.drawImage(img, 0, 0);
					canvas.toBlob(blob => {
						res(blob);
					}, "image/png");
				};
			});
	});
}
