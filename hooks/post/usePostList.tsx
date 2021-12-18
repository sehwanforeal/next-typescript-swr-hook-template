import { postListAPI } from "../../utils/api-endpoint";
import { useSWRHook } from "../common/useSWRHook";

import { postList } from "../../utils/types";

export const usePostList = () => {
  return useSWRHook<postList>({
    endpoint: postListAPI(),
    dataName: "postList",
    withToken: false,
  });
};
