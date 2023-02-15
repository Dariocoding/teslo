import React, { FunctionComponent } from 'react';
import { FaSearch } from 'react-icons/fa';
import RenderIf from '../RenderIf';

interface ISearchDataTableProps {
	setQ(value: string): void;
	q: string;
	showSearch?: boolean;
	buttons?: React.ReactNode;
}

const SearchDataTable: FunctionComponent<ISearchDataTableProps> = props => {
	const { setQ, q, showSearch, buttons } = props;
	return (
		<RenderIf isTrue={showSearch || buttons}>
			<div className="flex lg:justify-between justify-center lg:flex-row flex-col text-center mb-4">
				<div>{buttons}</div>

				<RenderIf isTrue={showSearch}>
					<div className="relative">
						<input
							type="text"
							className="form-control pr-7 form-control-sm"
							placeholder="Search..."
							autoComplete="off"
							value={q}
							onChange={e => setQ(e.target.value)}
						/>
						<span className="absolute right-2.5 top-2.5 text-sm">
							<FaSearch />
						</span>
					</div>
				</RenderIf>
			</div>
		</RenderIf>
	);
};

export default SearchDataTable;
