import InputFormik from "@/components/@forms/InputFormik";
import { Form, Formik, FormikHelpers } from "formik";
import * as React from "react";
import UploadImagesProduct from "./UploadImagesProduct";
import TextareaFormik from "@/components/@forms/TextareaFormik";
import SizesProduct from "./SizesProduct";
import GenderProduct from "./GenderProduct";
import CategoriesProduct from "./CategoriesProduct";
import FormStatusProduct from "./StatusProduct";
import ButtonFormik from "@/components/@forms/ButtonFormik";
import { Brand, Category, Product, ProductDto, Provider } from "@teslo/interfaces";
import { filesService, productsService } from "@teslo/services";
import toast from "react-hot-toast";
import { compressImages } from "@/utils/compress.images";
import * as yup from "yup";
import RenderIf from "@/components/ui/RenderIf";
import ProvidersSelect from "./ProvidersSelect";
import BrandsSelect from "./BrandsSelect";
import { translate } from "@/i18n";
import { useIntl } from "react-intl";
import { useConfigApp } from "@/store";

interface IFormProductProps {
  onSuccess?(product: Product, actions: FormikHelpers<ProductDto>): void;
  categories: Category[];
  brands: Brand[];
  providers: Provider[];
  product?: Product;
}

const FormProduct: React.FunctionComponent<IFormProductProps> = (props) => {
  const { onSuccess, categories, product: productToUpdate, brands, providers } = props;
  const { colors } = useConfigApp();
  const { formatMessage: t } = useIntl();
  const status = productToUpdate ? "update" : "create";

  const initialValues: ProductDto = {
    customCode: productToUpdate?.customCode || "",
    title: productToUpdate?.title || "",
    //@ts-ignore
    images: productToUpdate?.images || ([] as File[]),
    sizes: productToUpdate?.sizes || [],
    stock: productToUpdate?.stock || 0,
    gender: productToUpdate?.gender || "",
    description: productToUpdate?.description || "",
    price: productToUpdate?.price || 0,
    categories: productToUpdate?.categories?.length
      ? productToUpdate.categories.map((category) => category.idcategory)
      : [],
    status: productToUpdate?.status || "",
    brand: productToUpdate?.brand?.idbrand || brands[0].idbrand || null,
    providers: productToUpdate?.providers?.length
      ? productToUpdate.providers.map((provider) => provider.idprovider)
      : [],
  };

  async function onSubmit(values: ProductDto, actions: FormikHelpers<ProductDto>) {
    const { images, ...productDto } = { ...values };
    if (!productDto.customCode?.trim()) productDto.customCode = null;
    //@ts-ignore
    const newImages: File[] = images.filter((image) => typeof image !== "string");
    //@ts-ignore
    const imagesAlreadyUploaded = images.filter((image) => typeof image === "string");
    let product: Product;
    productDto.categories = categories.filter((c) => productDto.categories.includes(c.idcategory));
    productDto.brand = brands.find((c) => c.idbrand === productDto.brand);
    productDto.providers = providers.filter((p) =>
      //@ts-ignore
      productDto.providers.includes(p.idprovider)
    );

    try {
      if (status === "create") {
        const req = await productsService.createProduct(productDto);
        product = req.data;
      } else if (status === "update") {
        const req = await productsService.updateProduct(productToUpdate.id, {
          ...productDto,
          //@ts-ignore
          images: imagesAlreadyUploaded,
        });
        product = req.data;
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.message ||
          `Error ${status === "create" ? "creating" : "updating"} product`
      );
      return;
    }

    try {
      if (images.length > 0 && status === "create") {
        const imagesCompressed = await compressImages(images as File[]);
        const promisesImagesUpload = imagesCompressed.map(async (image) => {
          const formData = new FormData();
          formData.append("file", image, image.name);
          const res = await filesService.uploadFileProduct(formData);
          return res.data.secureUrl;
        });

        const imagesUploaded = await Promise.all(promisesImagesUpload);

        const req = await productsService.updateProduct(product.id, {
          // @ts-ignore
          images: [
            ...imagesUploaded,
            //@ts-ignore
            ...images.filter((image) => typeof image === "string"),
          ],
        });
        product = req.data;
      }

      if (newImages.length > 0 && status === "update") {
        const newImagesCompressed = await compressImages(newImages);
        const promisesImagesUpload = newImagesCompressed.map(async (image) => {
          const formData = new FormData();
          formData.append("file", image, image.name);
          const res = await filesService.uploadFileProduct(formData);
          return res.data.secureUrl;
        });

        const imagesProduct = [
          ...(await Promise.all([...promisesImagesUpload])),
          ...imagesAlreadyUploaded,
        ];

        const req = await productsService.updateProduct(product.id, {
          // @ts-ignore
          images: imagesProduct,
        });
        product = req.data;
      }

      onSuccess?.(product, actions);
      const messageSuccess = t({
        id: status === "create" ? "products.add.success" : "products.edit.success",
      });
      toast.success(messageSuccess);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.message ||
          `Error ${status === "create" ? "creating" : "updating"} product`
      );
    }
  }

  const validationSchemaFormProduct = yup.object({
    title: yup.string().required(translate("products.error.name.required")),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchemaFormProduct}
      enableReinitialize
    >
      <Form>
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <InputFormik
              label={translate("products.label.code")}
              name="customCode"
              placeholder={translate("products.placeholder.customCode")}
              className="lg:max-w-[350px]"
            />

            <InputFormik
              label={translate("products.label.name")}
              name={"title"}
              required
              placeholder={translate("products.placeholder.name")}
            />

            <InputFormik
              type={"number"}
              label={translate("products.label.price")}
              name={"price"}
              required
              placeholder={translate("products.placeholder.price")}
            />

            <InputFormik
              type={"number"}
              label={translate("products.label.stock")}
              name={"stock"}
              required
              placeholder={translate("products.placeholder.stock")}
              decimalValues={false}
            />

            <UploadImagesProduct />
          </div>
          <div>
            <TextareaFormik
              name="description"
              placeholder={translate("products.placeholder.description")}
              label={translate("products.label.description")}
              rows={5}
            />

            <RenderIf isTrue={colors.enableClothesShopping}>
              <SizesProduct />
              <GenderProduct />
            </RenderIf>

            <FormStatusProduct />

            <CategoriesProduct categories={categories} />
            <BrandsSelect brands={brands} />
            <ProvidersSelect providers={providers} />
          </div>
        </div>

        <ButtonFormik className="btn btn-primary btn-sm mt-6" full>
          {translate(status === "create" ? "products.add.title" : "products.edit.title")}
        </ButtonFormik>
      </Form>
    </Formik>
  );
};

export default FormProduct;
