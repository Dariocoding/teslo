import { Category } from "@teslo/interfaces";
import dayjs from "dayjs";
import { CategoryDataTable } from "../config";
import ActionsCategory from "./ActionCategorys";

interface IMapCategoriesProps {
  categories: Category[];
  onUpdateCategory(category: Category): void;
  onDeleteCategory(category: Category): void;
}

const mapCategories = (props: IMapCategoriesProps): CategoryDataTable[] =>
  props.categories.map((category) => ({
    ...category,
    dateFormatted: dayjs(category.dateCreated).format("DD/MM/YYYY HH:mm:ss"),
    actions: <ActionsCategory category={category} {...props} />,
  }));

export default mapCategories;
