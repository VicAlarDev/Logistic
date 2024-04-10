import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
  type QueryKey,
} from "@tanstack/react-query";
import axios from "axios";

/**
 * Custom hook for fetching data from a specified URL using axios.
 *
 * @template TData - The type of the fetched data.
 * @template TError - The type of the error, if any, that occurred during the fetch.
 * @param {string} url - The URL to fetch the data from.
 * @param {QueryKey} queryKey - The key used to identify the query in the query cache.
 * @param {Omit<UseQueryOptions<TData, TError, TData, QueryKey>, "queryKey" | "queryFn">} [queryOptions] - Additional options for the useQuery hook.
 * @returns {UseQueryResult<TData, TError>} - The result of the useQuery hook.
 */
export function useFetchData<TData = unknown, TError = unknown>(
  url: string,
  queryKey: QueryKey,
  queryOptions?: Omit<
    UseQueryOptions<TData, TError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >,
): UseQueryResult<TData, TError> {
  return useQuery<TData, TError, TData, QueryKey>({
    ...queryOptions,
    queryKey,
    queryFn: async () => {
      const { data } = await axios.get(url);
      return data;
    },
  });
}
