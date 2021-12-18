import useSWR, { KeyedMutator } from "swr";

import { fetchSWR } from "../../utils/fetcher";

type SWRHookRetrunType<T> = {
  loading: boolean;
  error: Error;
  mutate: KeyedMutator<T | any>;
} & { [k: string]: T | null };

type useSWRHookType = <T>(params: {
  endpoint: string;
  dataName: string;
  withToken: boolean;
}) => SWRHookRetrunType<T>;

export const useSWRHook: useSWRHookType = ({
  endpoint,
  dataName,
  withToken,
}) => {
  const { data, error, mutate } = useSWR(
    { url: endpoint, withToken },
    fetchSWR
  );
  const loading = !data && !error;
  return { loading, error, [dataName]: data, mutate };
};
