import * as React from 'react';
import './SearchList.css';
import SearchResult from './SearchResult';
import classNames from 'classnames';
import RenderIf from '@teslo/react-ui/RenderIf';
import LoaderSearchList from './LoaderSearchList';

export interface ISearchResult {
	value: string | number;
	label: string;
}

interface ISearchListProps {
	results: ISearchResult[];
	classNameContainer?: string;
	loading?: boolean;
	onClickResult: (value: string | number) => void;
}

const SearchList: React.FunctionComponent<ISearchListProps> = props => {
	const { results, classNameContainer, loading, onClickResult } = props;
	return (
		<div className="relative">
			<div className={classNames('absolute z-50 w-full', classNameContainer)}>
				<div className="results-list">
					<RenderIf isTrue={!loading}>
						{results.map((result, id) => (
							<SearchResult
								result={result}
								key={id}
								onClickResult={onClickResult}
							/>
						))}
					</RenderIf>
					<LoaderSearchList loading={loading} />
				</div>
			</div>
		</div>
	);
};

export default SearchList;
