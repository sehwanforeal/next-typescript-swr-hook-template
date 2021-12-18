import { postAPI } from "../../utils/api-endpoint";
import { useSWRHook } from "../common/useSWRHook";

import { post } from "../../utils/types";

export const usePost = (id: number) => {
  return useSWRHook<post>({
    endpoint: postAPI(id),
    dataName: "post",
    withToken: false,
  });
};
