import InputFormik from "@/components/@forms/InputFormik";
import SearchList from "@/components/@forms/SearchList";
import { formatter } from "@/utils";
import { BillDto, DetailBillDto, Product } from "@teslo/interfaces";
import RenderIf from "@/components/ui/RenderIf";
import classNames from "classnames";
import { useFormikContext } from "formik";
import * as React from "react";
import { TbWashDrycleanOff } from "react-icons/tb";
import { MdCleaningServices } from "react-icons/md";
import { ShowIf } from "react-rainbow-components";
import { useGridDetail } from "./useGridDetail";
import { translate } from "@/i18n";
import { FaBox } from "react-icons/fa";
import DrawerProducts from "@/app/orders-new/newForm/GridInsertClientProduct/DrawerProducts";

interface IGridDetailProps {
  detail: DetailBillDto;
  idx: number;
}

const GridDetail: React.FunctionComponent<IGridDetailProps> = (props) => {
  const { detail, idx } = props;
  const { values, setValues } = useFormikContext<BillDto>();
  const [showDrawerProducts, setShowDrawerProducts] = React.useState(false);
  const {
    onBlur,
    onFocus,
    stateProducts,
    onTrashProduct,
    focused,
    onCleanProduct,
    nameInput,
    nameInputPrice,
    nameInputQty,
    codeProductInput,
    ammount,
    selected,
    setSelected,
    onClickResult,
  } = useGridDetail(detail, idx);

  const onClickProductDrawer = (product: Product) => {
    setValues({
      ...values,
      details: [
        ...values.details.map((d, indexSelf) => (idx === indexSelf ? { ...d, product } : d)),
      ],
    });
    setShowDrawerProducts(false);
  };

  return (
    <div className="grid xl:grid-cols-7 lg:col-span-8 gap-x-4 gap-y-2">
      <div className="xl:col-span-1 lg:col-span-4">
        <SearchList
          onClickResult={onClickResult}
          classNameContainer="min-w-[300px] search-list-products"
          results={stateProducts.map((product) => ({
            label: product.title,
            value: product.id,
          }))}
          onBlur={onBlur}
          onFocus={onFocus}
          focused={focused}
          selected={selected}
          setSelected={setSelected}
        >
          <InputFormik
            name={codeProductInput}
            label={translate("products.label.code")}
            className="mb-0"
            classNameInput="form-control-sm"
            classNameLabel="text-xs"
            showError={false}
            showSuccess={false}
            autoComplete="off"
          />
        </SearchList>
      </div>
      <div className="col-span-2">
        <InputFormik
          name={nameInput}
          label={translate("products.single")}
          className="mb-0"
          classNameInput="form-control-sm"
          classNameLabel="text-xs"
          showError={false}
          showSuccess={false}
          disabled={true}
        />
      </div>
      <div>
        <InputFormik
          type="number"
          decimalValues={false}
          name={nameInputQty}
          label={translate("products.label.stock")}
          className="mb-0"
          classNameInput="form-control-sm"
          classNameLabel="text-xs"
          showError={false}
          showSuccess={false}
          disabled={!detail.product?.title}
        />
      </div>
      <div>
        <InputFormik
          type="number"
          decimalValues={true}
          name={nameInputPrice}
          label={translate("products.label.price")}
          className="mb-0"
          classNameInput="form-control-sm"
          classNameLabel="text-xs"
          showError={false}
          showSuccess={false}
          disabled={!detail.product?.title}
        />
      </div>
      <div className="text-sm">
        <h6 className="text-xs font-normal">{translate("bills.label.totalPrice")}</h6>{" "}
        <span className="mt-3 block">{ammount ? formatter.format(ammount) : "-"}</span>
      </div>
      <div className="text-sm">
        <h6 className="text-xs font-normal">{translate("bills.label.actions")}</h6>{" "}
        <div className="mt-1.5 flex items-center justify-start">
          <button
            type="button"
            disabled={values.details.length === 1}
            className={classNames(
              values.details.length > 1
                ? "btn-outline-danger"
                : "border-gray-300 border text-gray-400 hover:bg-gray-300 hover:text-gray-100",
              "btn btn-xs shadow-none cursor-pointer mb-0"
            )}
            onClick={onTrashProduct}
          >
            <TbWashDrycleanOff />
          </button>
          <RenderIf isTrue={!detail.product?.title}>
            <button
              type="button"
              className={classNames(
                "btn btn-xs shadow-none cursor-pointer mb-0 btn-outline-warning"
              )}
              onClick={() => setShowDrawerProducts(true)}
            >
              <FaBox />
            </button>
          </RenderIf>
          <RenderIf isTrue={detail.product?.title}>
            <button
              type="button"
              className={classNames(
                "btn btn-xs shadow-none cursor-pointer mb-0 btn-outline-warning"
              )}
              onClick={onCleanProduct}
            >
              <MdCleaningServices />
            </button>
          </RenderIf>
        </div>
      </div>
      <DrawerProducts
        showPriceTooltip={false}
        {...{ showDrawerProducts, setShowDrawerProducts, onClickProductDrawer }}
      />
    </div>
  );
};

export default GridDetail;
