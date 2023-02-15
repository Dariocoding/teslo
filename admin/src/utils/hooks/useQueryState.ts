import { QueryFunction, useQuery, UseQueryResult } from '@tanstack/react-query';
import React from 'react';
const twentyFourHoursInMs = 1000 * 60 * 60 * 24;

const useQueryState = <T = unknown>(
	queryKey: string[],
	queryFn: QueryFunction<T, any>,
	initialData: any
): UseQueryResult<T, unknown> & { setData: React.Dispatch<T> } => {
	const [firstLoad, setFirstLoad] = React.useState(false);
	const [isFetched, setIsFetched] = React.useState(false);

	const query = useQuery(queryKey, queryFn, {
		initialData,
		refetchOnWindowFocus: false,
		refetchOnMount: true,
		refetchOnReconnect: false,
		retry: false,
		staleTime: twentyFourHoursInMs,
	});

	const [data, setData] = React.useState(query.data);

	React.useEffect(() => {
		query.refetch();
	}, []);

	React.useEffect(() => {
		setData(query.data);
		if (firstLoad) {
			setIsFetched(true);
		} else {
			setFirstLoad(true);
		}
	}, [query.data, query.isFetching]);

	return {
		...query,
		data: data || query.data,
		setData,
		isFetching: query.isFetching || !isFetched || !firstLoad,
	};
};

export default useQueryState;
