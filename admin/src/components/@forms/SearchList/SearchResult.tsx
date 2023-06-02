import * as React from 'react';
import { ISearchResult } from '.';

interface ISearchResultProps {
	result: ISearchResult;
	onClickResult: (value: string | number) => void;
}

const SearchResult: React.FunctionComponent<ISearchResultProps> = props => {
	const { result, onClickResult } = props;
	return (
		<div
			className="search-result text-sm cursor-pointer hover:bg-gray-100 transition"
			onClick={e => onClickResult(result.value)}
		>
			{result.label}
		</div>
	);
};

export default SearchResult;
