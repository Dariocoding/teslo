import { GenerarExcelType, GenerarPdfType } from "@teslo/interfaces";
import { toast } from "react-hot-toast";
import { IInfoDataTileProps } from "./InfoDataTile";
import {
  brandsService,
  categoriesService,
  filesService,
  paymentMethodService,
  productsService,
  providersService,
} from "@teslo/services";
import { formatter } from "@/utils";
import dayjs from "dayjs";

export type Actions = Omit<IInfoDataTileProps, "title">;

export const actionsProducts: Actions = {
  onClickPdf: async () => {
    const toastID = toast.loading("Exporting Products, Please wait...");
    try {
      const products = await productsService.getAllProducts();
      const data: GenerarPdfType = {
        name: "Products - " + dayjs().format("DD/MM/YYYY"),
        headers: [
          "Title",
          "Custom Cod.",
          "Cod.",
          "Price",
          "Stock",
          "Brand",
          "Categories",
          "Status",
        ],
        rows: products.data.map((product) => [
          product.title,
          product.customCode || "",
          product.code.toString(),
          product.price ? formatter.format(product.price) : "0",
          product.stock ? product.stock.toString() : (0).toString(),
          product.brand.title,
          product.categories.map((category) => category.title).join(", "),
          product.status || "",
        ]),
      };
      await baseFetchPdf(data, "Products", toastID);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      toast.dismiss(toastID);
    }
  },
  onClickCsv: async (enableClothesShopping) => {
    const toastID = toast.loading("Exporting Products, Please wait...");
    try {
      const products = await productsService.getAllProducts();
      const data: GenerarExcelType = {
        name: "Products - " + dayjs().format("DD-MM-YYYY"),
        columns: [
          { header: "Title" },
          { header: "custom Cod." },
          { header: "Cod." },
          { header: "Price" },
          { header: "Stock" },
          { header: "Brand" },
          { header: "Categories" },
          { header: "Providers" },
          { header: "Status" },
          { header: "Description" },
        ],

        data: products.data.map((product) =>
          [
            product.title,
            product.customCode || "empty",
            product.code.toString(),
            product.price ? formatter.format(product.price) : "0",
            product.stock ? product.stock.toString() : (0).toString(),
            product.brand.title || "",
            product.categories.map((category) => category.title).join(", "),
            product.providers.map((provider) => provider.name).join(", "),
            product.status || "",
            product.description || "",
            enableClothesShopping ? product.gender : null,
            enableClothesShopping ? product.sizes.map((size) => size).join(", ") : null,
          ].filter((p) => p !== null)
        ),
      };

      if (enableClothesShopping) {
        data.columns.push({ header: "Gender" });
        data.columns.push({ header: "Sizes" });
      }

      await baseFetchCsv(data, "Products", toastID);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      toast.dismiss(toastID);
    }
  },
  onClickExcel: async (enableClothesShopping) => {
    const toastID = toast.loading("Exporting Products, Please wait...");
    try {
      const products = await productsService.getAllProducts();
      const data: GenerarExcelType = {
        name: "Products - " + dayjs().format("DD-MM-YYYY"),
        columns: [
          { header: "Title" },
          { header: "custom Cod." },
          { header: "Cod." },
          { header: "Price" },
          { header: "Stock" },
          { header: "Brand" },
          { header: "Categories" },
          { header: "Providers" },
          { header: "Status" },
          { header: "Description" },
        ],

        data: products.data.map((product) =>
          [
            product.title,
            product.customCode || "empty",
            product.code.toString(),
            product.price ? formatter.format(product.price) : "0",
            product.stock ? product.stock.toString() : (0).toString(),
            product.brand.title || "",
            product.categories.map((category) => category.title).join(", "),
            product.providers.map((provider) => provider.name).join(", "),
            product.status || "",
            product.description || "",
            enableClothesShopping ? product.gender : null,
            enableClothesShopping ? product.sizes.map((size) => size).join(", ") : null,
          ].filter((p) => p !== null)
        ),
      };

      if (enableClothesShopping) {
        data.columns.push({ header: "Gender" });
        data.columns.push({ header: "Sizes" });
      }

      await baseFetchExcel(data, "Products", toastID);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      toast.dismiss(toastID);
    }
  },
  onClickJson: async () => {
    const products = await productsService.getAllProducts();
    baseExportJson(products, "Products");
  },
};

export const actionsCategories: Actions = {
  onClickPdf: async () => {
    const toastID = toast.loading("Exporting Categories, Please wait...");
    try {
      const categories = await categoriesService.getCategories();
      const data: GenerarPdfType = {
        name: "Categories",
        headers: ["Title", "Slug"],
        rows: categories.data.map((category) => [category.title, category.slug]),
      };
      await baseFetchPdf(data, "Categories", toastID);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      toast.dismiss(toastID);
    }
  },
  onClickCsv: async () => {
    const toastID = toast.loading("Exporting Categories, Please wait...");
    try {
      const categories = await categoriesService.getCategories();
      const data: GenerarExcelType = {
        name: "Categories - " + dayjs().format("DD-MM-YYYY"),
        columns: [{ header: "Title" }, { header: "Slug" }],
        data: categories.data.map((category) => [category.title, category.slug]),
      };

      await baseFetchCsv(data, "Categories", toastID);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      toast.dismiss(toastID);
    }
  },
  onClickExcel: async () => {
    const toastID = toast.loading("Exporting Categories, Please wait...");
    try {
      const categories = await categoriesService.getCategories();
      const data: GenerarExcelType = {
        name: "Categories - " + dayjs().format("DD-MM-YYYY"),
        columns: [{ header: "Title" }, { header: "Slug" }],
        data: categories.data.map((category) => [category.title, category.slug]),
      };

      await baseFetchExcel(data, "Categories", toastID);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      toast.dismiss(toastID);
    }
  },
  onClickJson: async () => {
    const categories = await categoriesService.getCategories();
    baseExportJson(categories, "Categories");
  },
};

export const actionsBrands: Actions = {
  onClickPdf: async () => {
    const toastID = toast.loading("Exporting Brands, Please wait...");
    try {
      const brands = await brandsService.getAll();
      const data: GenerarPdfType = {
        name: "Brands",
        headers: ["Title", "Slug"],
        rows: brands.data.map((brand) => [brand.title, brand.slug]),
      };
      await baseFetchPdf(data, "Brands", toastID);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      toast.dismiss(toastID);
    }
  },
  onClickCsv: async () => {
    const toastID = toast.loading("Exporting Brands, Please wait...");
    try {
      const brands = await brandsService.getAll();
      const data: GenerarExcelType = {
        name: "Brands - " + dayjs().format("DD-MM-YYYY"),
        columns: [{ header: "Title" }, { header: "Slug" }],
        data: brands.data.map((brand) => [brand.title, brand.slug]),
      };

      await baseFetchCsv(data, "Brands", toastID);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      toast.dismiss(toastID);
    }
  },
  onClickExcel: async () => {
    const toastID = toast.loading("Exporting Brands, Please wait...");
    try {
      const brands = await brandsService.getAll();
      const data: GenerarExcelType = {
        name: "Brands - " + dayjs().format("DD-MM-YYYY"),
        columns: [{ header: "Title" }, { header: "Slug" }],
        data: brands.data.map((brand) => [brand.title, brand.slug]),
      };

      await baseFetchExcel(data, "Brands", toastID);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      toast.dismiss(toastID);
    }
  },
  onClickJson: async () => {
    const brands = await brandsService.getAll();
    baseExportJson(brands, "Brands");
  },
};

export const actionsProviders: Actions = {
  onClickPdf: async () => {
    const toastID = toast.loading("Exporting Brands, Please wait...");
    try {
      const providers = await providersService.getAll();
      const data: GenerarPdfType = {
        name: "Providers",
        headers: ["Name", "Phone 1", "Phone 2", "Email", "Address"],
        rows: providers.data.map((provider) => [
          provider.name,
          provider.phone1,
          provider.phone2,
          provider.email,
          "Address",
        ]),
      };
      await baseFetchPdf(data, "Providers", toastID);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      toast.dismiss(toastID);
    }
  },
  onClickCsv: async () => {
    const toastID = toast.loading("Exporting Providers, Please wait...");
    try {
      const providers = await providersService.getAll();
      const data: GenerarExcelType = {
        name: "Providers - " + dayjs().format("DD-MM-YYYY"),
        columns: [
          { header: "Name" },
          { header: "Phone 1" },
          { header: "Phone 2" },
          { header: "Email" },
          { header: "Address" },
        ],
        data: providers.data.map((p) => [p.name, p.phone1, p.phone2, p.email, "Address"]),
      };

      await baseFetchCsv(data, "Providers", toastID);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      toast.dismiss(toastID);
    }
  },
  onClickExcel: async () => {
    const toastID = toast.loading("Exporting Providers, Please wait...");
    try {
      const providers = await providersService.getAll();
      const data: GenerarExcelType = {
        name: "Providers - " + dayjs().format("DD-MM-YYYY"),
        columns: [
          { header: "Name" },
          { header: "Phone 1" },
          { header: "Phone 2" },
          { header: "Email" },
          { header: "Address" },
        ],
        data: providers.data.map((p) => [p.name, p.phone1, p.phone2, p.email, "Address"]),
      };

      await baseFetchExcel(data, "Providers", toastID);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      toast.dismiss(toastID);
    }
  },
  onClickJson: async () => {
    const providers = await providersService.getAll();
    baseExportJson(providers, "Providers");
  },
};

export const actionsPaymentMethods: Actions = {
  onClickPdf: async () => {
    const toastID = toast.loading("Exporting Payment Methods, Please wait...");
    try {
      const paymentMethods = await paymentMethodService.getAll();
      paymentMethods.data[0][""];
      const data: GenerarPdfType = {
        name: "Payment Methods",
        headers: ["Title", "DNI", "Email", "Owner", "Phone", "Email"],
        rows: paymentMethods.data.map((p) => [p.title, p.dni, p.email, p.owner, p.phone]),
      };
      await baseFetchPdf(data, "Payment Methods", toastID);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      toast.dismiss(toastID);
    }
  },
  onClickCsv: async () => {
    const toastID = toast.loading("Exporting Payment Methods, Please wait...");
    try {
      const { data: paymentMethods } = await paymentMethodService.getAll();
      const data: GenerarExcelType = {
        name: "Payment Methods - " + dayjs().format("DD-MM-YYYY"),
        columns: [
          { header: "Title" },
          { header: "DNI" },
          { header: "Owner" },
          { header: "Phone" },
          { header: "Email" },
        ],
        data: paymentMethods.map((p) => [p.title, p.dni, p.email, p.owner, p.phone]),
      };

      await baseFetchCsv(data, "Payment Methods", toastID);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      toast.dismiss(toastID);
    }
  },
  onClickExcel: async () => {
    const toastID = toast.loading("Exporting Payment Methods, Please wait...");
    try {
      const { data: paymentMethods } = await paymentMethodService.getAll();
      const data: GenerarExcelType = {
        name: "Payment Methods - " + dayjs().format("DD-MM-YYYY"),
        columns: [
          { header: "Title" },
          { header: "DNI" },
          { header: "Owner" },
          { header: "Phone" },
          { header: "Email" },
        ],
        data: paymentMethods.map((p) => [p.title, p.dni, p.email, p.owner, p.phone]),
      };

      await baseFetchExcel(data, "Payment Methods", toastID);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      toast.dismiss(toastID);
    }
  },
  onClickJson: async () => {
    const paymentMethods = await paymentMethodService.getAll();
    baseExportJson(paymentMethods, "Payment Methods");
  },
};

export const baseFetchPdf = async (data: GenerarPdfType, nameFile: string, toastID?: string) => {
  try {
    const response = await filesService.pdf(data, { responseType: "arraybuffer" });
    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = window.URL.createObjectURL(blob);
    link.download = `${nameFile}.pdf`;
    link.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
    }, 0);
    toast.success("Success");
    toastID && toast.dismiss(toastID);
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  } finally {
    toast.dismiss(toastID);
  }
};

export const baseFetchExcel = async (
  data: GenerarExcelType,
  nameFile: string,
  toastID?: string
) => {
  try {
    const response = await filesService.excel(data, { responseType: "blob" });
    const link = document.createElement("a");
    document.body.appendChild(link);
    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    link.href = downloadUrl;
    link.setAttribute("download", `${nameFile}.xlsx`);
    link.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(link);
    }, 0);
    toast.success("Success");
    toastID && toast.dismiss(toastID);
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  } finally {
    toast.dismiss(toastID);
  }
};

export const baseFetchCsv = async (data: GenerarExcelType, nameFile: string, toastID?: string) => {
  try {
    const response = await filesService.excel(data, { responseType: "blob" }, { csv: true });
    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = downloadUrl;
    link.setAttribute("download", `${nameFile}.csv`);
    link.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
    }, 0);
    toast.success("Success");
    toastID && toast.dismiss(toastID);
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  } finally {
    toast.dismiss(toastID);
  }
};

export const baseExportJson = (data: any, nameFile: string) => {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
  const link = document.createElement("a");
  document.body.appendChild(link);
  link.href = jsonString;
  link.download = `${nameFile}.json`;
  link.click();
  link.remove();
  setTimeout(() => {
    window.URL.revokeObjectURL(link.href);
  }, 0);
};
