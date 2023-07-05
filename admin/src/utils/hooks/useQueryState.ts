import { QueryFunction, useQuery, UseQueryResult } from "@tanstack/react-query";
import React from "react";

const useQueryState = <T = unknown>(
	queryKey: string[],
	queryFn: QueryFunction<T, any>,
	initialData: any
): UseQueryResult<T, unknown> & {
	setData: React.Dispatch<React.SetStateAction<T>>;
	isLoading: boolean;
} => {
	const [firstLoad, setFirstLoad] = React.useState(false);
	const [isFetched, setIsFetched] = React.useState(false);
	const [data, setData] = React.useState(initialData);

	const query = useQuery(queryKey, queryFn, {
		initialData,
		staleTime: Infinity,
		enabled: false,
	});

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

	const isLoading =
		query.isFetching || !isFetched || !firstLoad || query.isRefetching || query.isLoading;

	//@ts-ignore
	return {
		...query,
		data: data || query.data,
		setData,
		isFetching: isLoading,
		isLoading,
	};
};

export default useQueryState;
