import axios, { Method, AxiosRequestConfig } from "axios";
import { CustomNetworkError } from "./error";

const ACCESS_TOKEN_KEY = "access_token";

type FetcherParams<R = any> = {
  method: Method;
  url: string;
  data?: R;
  withToken?: boolean;
};

// D = Data response
// R = Request data of fetching body
type FetcherFn = <D, R = {}>(params: FetcherParams<R>) => Promise<D>;

type FetcherUsingFnParams = Omit<FetcherParams, "method">;

const fetcher: FetcherFn = async ({ method, url, data, withToken }) => {
  const requestInit: AxiosRequestConfig = {
    method,
    url,
    data: JSON.stringify(data) ?? null,
    headers: { "Content-Type": "application/json" },
  };

  const getToken = () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) {
      throw new Error(`can't find "${ACCESS_TOKEN_KEY}" in localStorage`);
    }
    return token;
  };

  if (withToken) {
    const token = getToken();
    requestInit.headers!.Authorization = token;
  }

  try {
    const res = await axios.request(requestInit);
    return res.hasOwnProperty("data") ? res.data : res;
  } catch (error: any) {
    return Promise.reject(
      new CustomNetworkError(
        `--- Fetch failed in {My App} ---
        ${error.message ?? `no error context provided`}`
      )
    );
  }
};

export const fetchGet = async <D>({
  url,
  withToken = true,
}: FetcherUsingFnParams) => await fetcher<D>({ method: "GET", url, withToken });

export const fetchPost = async <D, R>({
  url,
  data,
  withToken = true,
}: FetcherUsingFnParams) =>
  await fetcher<D, R>({ method: "POST", url, data, withToken });

export const fetchSWR = async ({ url, withToken }: FetcherUsingFnParams) =>
  await fetcher({ method: "GET", url, withToken });
