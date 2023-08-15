import { Brand, Category } from "@teslo/interfaces";
import * as React from "react";

interface IHeaderFiltersProps {
  brands: Brand[];
  categories: Category[];
  q: string;
  setQ(q: string): void;
  brandSelected: string;
  setBrandSelected(selected: string): void;
  categorySelected: string;
  setCategorySelected(selected: string): void;
}

const HeaderFilters: React.FunctionComponent<IHeaderFiltersProps> = (props) => {
  const { categories, brands, q, setQ } = props;
  const { setBrandSelected, setCategorySelected, brandSelected, categorySelected } = props;

  return (
    <React.Fragment>
      <div className="mb-2">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="form-control form-control-sm"
        />
      </div>
      <div className="flex items-center justify-center gap-2 mb-4">
        <select
          className="form-control sm:text-sm text-xs px-2 py-2"
          value={brandSelected}
          onChange={(e) => setBrandSelected(e.target.value)}
        >
          <option value="">No Brand</option>
          {brands.map((brand) => (
            <option key={brand.idbrand} value={brand.idbrand}>
              {brand.title}
            </option>
          ))}
        </select>
        <select
          className="form-control sm:text-sm text-xs px-2 py-2"
          value={categorySelected}
          onChange={(e) => setCategorySelected(e.target.value)}
        >
          <option value="">No Category</option>
          {categories.map((category) => (
            <option key={category.idcategory} value={category.idcategory}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
    </React.Fragment>
  );
};

export default HeaderFilters;
