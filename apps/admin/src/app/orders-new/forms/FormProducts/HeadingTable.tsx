import { translate } from "@/i18n";
import { useConfigApp } from "@/store";
import RenderIf from "@/components/ui/RenderIf";
import classNames from "classnames";
import React from "react";
import { useIntl } from "react-intl";

const HeadingTable = () => {
  const [refThead, setRefThead] = React.useState<HTMLTableSectionElement>(null);
  const { formatMessage: t } = useIntl();
  const isTempTable = refThead && document.getElementById("tableTempProduct")?.contains?.(refThead);
  const { colors } = useConfigApp();

  return (
    <thead className="bg-blue-600 bg-opacity-10 backdrop-filter backdrop-blur-lg" ref={setRefThead}>
      <tr>
        <th className="px-2 py-2 w-[130px] max-w-[130px]">{translate("products.label.code")}</th>
        <th className="px-2 py-2 w-[130px]">
          {translate(isTempTable ? "products.single" : "products.title")}
        </th>
        <RenderIf isTrue={colors.enableClothesShopping}>
          <th className={classNames("px-2 py-2 w-[130px]", "text-center")}>
            {translate(isTempTable ? "products.label.sizes" : "products.label.size")}{" "}
          </th>
        </RenderIf>
        <th className="px-2 py-2 w-[130px] text-center">
          {isTempTable ? t({ id: "products.label.stock" }) : ""}
        </th>
        <th className="px-2 py-2 w-[115px] text-center">{translate("products.label.price")}</th>
        <th className="px-2 py-2 w-[130px] text-center">{translate("orders.label.qty")}</th>
        <th className="px-2 py-2 w-[130px] text-center">{translate("orders.label.total")}</th>
        <th className="px-2 py-2 w-[130px] text-center">
          {translate(isTempTable ? "orders.label.action" : "orders.label.actions")}
        </th>
      </tr>
    </thead>
  );
};

export default React.memo(HeadingTable);
