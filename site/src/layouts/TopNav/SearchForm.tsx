'use client';
import * as React from 'react';
import { BsSearch } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { viewPaths } from '@/utils';

interface ISearchFormProps {}

const SearchForm: React.FunctionComponent<ISearchFormProps> = props => {
	const {} = props;
	const router = useRouter();
	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		router.push(viewPaths.search(e.target.value));
	};

	return (
		<div className="flex-1 text-slate-900 dark:text-slate-200">
			<div className="bg-slate-50 dark:bg-slate-800 flex items-center space-x-1 py-2 px-4 rounded-xl h-full">
				<BsSearch />
				<input
					onChange={onSearch}
					type="search"
					placeholder="Type and press enter"
					className="border-none bg-transparent pl-1 focus:outline-none focus:ring-0 w-full text-sm "
				/>
			</div>
			<input type="submit" hidden value="" />
		</div>
	);
};

export default SearchForm;
