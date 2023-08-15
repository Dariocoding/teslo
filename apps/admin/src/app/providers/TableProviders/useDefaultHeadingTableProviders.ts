import { translate } from "@/i18n";
import { HeaderDataTable } from "@/components/ui/DataTable";

export const useDefaultHeadingTableProviders = (): HeaderDataTable[] => [
  { title: translate("providers.label.name"), field: "name" },
  { title: translate("providers.label.phone1"), field: "phone1" },
  { title: translate("providers.label.phone2"), field: "phone2" },
  { title: translate("providers.label.email"), field: "email" },
  { title: translate("providers.label.actions"), field: "actions", center: true },
];
