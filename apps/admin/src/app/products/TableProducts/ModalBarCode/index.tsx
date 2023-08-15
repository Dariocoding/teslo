import { Product } from "@teslo/interfaces";
import * as React from "react";
import { FaCopy, FaFilePdf } from "react-icons/fa";
import { useModalStore } from "@/store";
import RenderIf from "@/components/ui/RenderIf";
import { useBarCodeProduct } from "../../hooks/useBarCodeProduct";
import ToolTip from "@/components/ui/Tooltip";
import { useIntl } from "react-intl";

const PdfBarCode = React.lazy(() => import("./PdfCode"));

interface IModalBarCodeProps {
  product: Product;
}

type State = "pdf" | "normal";
const ModalBarCode: React.FunctionComponent<IModalBarCodeProps> = (props) => {
  const { product } = props;
  const { formatMessage: t } = useIntl();
  const [state, setState] = React.useState<State>("normal");
  const { setSize } = useModalStore();

  const handleClickState = (newState: State) => {
    if (newState === "normal") {
      setSize("md");
    } else if (newState === "pdf") {
      setSize("lg");
    }
    setState(newState);
  };

  const { srcJsBarCode, copyImageJsBarCode, copied } = useBarCodeProduct(product);

  return (
    <div className="flex items-center justify-center flex-col">
      <RenderIf isTrue={state === "pdf"}>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => handleClickState("normal")}
        >
          {t({ id: "app.goBack" })}
        </button>
        <React.Suspense fallback={<>Loading...</>}>
          <PdfBarCode product={product} />
        </React.Suspense>
      </RenderIf>
      <RenderIf isTrue={state === "normal"}>
        <span>
          <img src={srcJsBarCode} alt="" />
        </span>
        <img src="" id="imgBarCode" alt="" />
        <div className="flex items-center justify-center mt-3">
          <button
            type="button"
            className="btn btn-danger btn-sm gap-2"
            onClick={() => handleClickState("pdf")}
          >
            PDF <FaFilePdf />
          </button>

          <ToolTip
            className="btn btn-info btn-sm cursor-pointer"
            onClick={copyImageJsBarCode}
            message={copied ? `${t({ id: "app.copied" })} 🙌` : t({ id: "app.clickToCopy" })}
          >
            <span className="flex items-center gap-2">
              {t({ id: "app.copy" })} <FaCopy />
            </span>
          </ToolTip>
        </div>
      </RenderIf>
    </div>
  );
};

export default ModalBarCode;
