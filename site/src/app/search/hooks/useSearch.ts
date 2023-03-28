import React from 'react';
import { debounceTime, distinctUntilChanged, filter, ReplaySubject, Subscription } from 'rxjs';

const onSearch$ = new ReplaySubject<string>().pipe(
	filter(searchTerm => searchTerm.length > 2),
	debounceTime(500),
	distinctUntilChanged()
);

export const useSearch = (query: string, onSearch: (value: string) => Promise<void>) => {
	const search$ = React.useRef<Subscription>();

	React.useEffect(() => {
		search$.current = onSearch$.subscribe(onSearch);
		return () => {
			if (search$.current) {
				search$.current.unsubscribe();
			}
		};
	}, []);

	React.useEffect(() => {
		//@ts-ignore
		search$.current.next(query);
	}, [query]);
};
