import * as React from "react";

interface IHeaderFiltersProps {
  q: string;
  setQ(q: string): void;
}

const HeaderFilters: React.FunctionComponent<IHeaderFiltersProps> = (props) => {
  const { setQ, q } = props;
  return (
    <div className="mb-2">
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="form-control form-control-sm"
      />
    </div>
  );
};

export default HeaderFilters;
