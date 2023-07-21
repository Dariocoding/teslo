import { capitalize, formatter, PF, validPaths } from "@/utils";
import { Gender, Product, ValidRoles } from "@teslo/interfaces";
import dayjs from "dayjs";
import { ProductTable } from "../config";
import ActionsProducts, { IActionsProductsProps } from "./ActionsProducts";
import RenderIf from "@/components/ui/RenderIf";
import Checkbox from "@/components/ui/Checkbox";
import { Link } from "react-router-dom";
import AuthorityCheck from "@/components/AuthorityCheck";

interface IMapProductsProps extends Omit<IActionsProductsProps, "product"> {
  products: Product[];
  currentItemsSelected: string[];
  setCurrentItemsSelected: (items: string[]) => void;
  setProductImageLightBox(product: string): void;
}

const validRolesToVisitProviders = [ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR];
const validRolesToViewProvider = [ValidRoles.SELLER, ValidRoles.USER];

const mapProducts = (props: IMapProductsProps): ProductTable[] => {
  const { products, currentItemsSelected, setCurrentItemsSelected, setProductImageLightBox } =
    props;

  const imageProduct = (product: Product) =>
    product.images.length
      ? PF + "/product/" + product.images[product.images.length - 1]
      : "/img/others/box.png";

  return products.map((product) => ({
    ...product,
    checkSelected: (
      <div className="hidden items-center justify-center lg:flex">
        <Checkbox
          isChecked={currentItemsSelected.includes(product.id)}
          onChange={() =>
            currentItemsSelected.includes(product.id)
              ? setCurrentItemsSelected(currentItemsSelected.filter((item) => item !== product.id))
              : setCurrentItemsSelected([...currentItemsSelected, product.id])
          }
          enableMarginRight={false}
        />
      </div>
    ),
    priceFormatted: formatter.format(product.price),
    sizesFormatted: product.sizes.join(", "),
    image: (
      <img
        onClick={() => setProductImageLightBox(imageProduct(product))}
        src={imageProduct(product)}
        className={
          "lg:w-16 w-24 rounded-md mx-auto cursor-pointer transition hover:scale-110 duration-300"
        }
        loading={"lazy"}
      />
    ),
    dateFormatted: dayjs(product.dateCreated).format("DD/MM/YYYY"),
    gender: capitalize(product.gender) as Gender,
    actions: <ActionsProducts {...props} product={product} />,
    categoriesFormatted: product.categories?.length ? (
      <ul className="text-xs">
        {product.categories.map((c) => (
          <li key={c.idcategory}>
            <Link to={validPaths.viewCategory.fnPath(c.idcategory)} className="link-table">
              {c.title}
            </Link>
          </li>
        ))}
      </ul>
    ) : null,
    providersFormatted: product.providers?.length ? (
      <ul className="text-xs">
        {product.providers.map((p) => (
          <li key={p.idprovider}>
            <AuthorityCheck validRoles={validRolesToVisitProviders}>
              <Link to={validPaths.viewProvider.fnPath(p.idprovider)} className="link-table">
                {p.name}
              </Link>
            </AuthorityCheck>
            <AuthorityCheck validRoles={validRolesToViewProvider}>{p.name}</AuthorityCheck>
          </li>
        ))}
      </ul>
    ) : null,
    titleFormatted: (
      <div className="flex flex-col max-w-[110px] whitespace-pre-wrap">
        <div className="text-sm mb-1">
          <Link to={validPaths.viewProduct.fnPath(product.id)} className="link-table">
            {product.title}
          </Link>
        </div>
        <RenderIf isTrue={product.customCode}>
          <div className="text-xs font-bold mb-1">{product.customCode}</div>
        </RenderIf>
        <div className="text-xs">{product.code}</div>
      </div>
    ),

    brandFormatted: product.brand && (
      <Link to={validPaths.viewBrand.fnPath(product.brand.idbrand)} className="link-table">
        {product.brand.title}
      </Link>
    ),
  }));
};

export default mapProducts;
