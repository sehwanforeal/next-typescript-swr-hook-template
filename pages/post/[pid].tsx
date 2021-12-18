import type { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

import { usePost } from "../../hooks/post/usePost";
import Link from "next/link";

const Post: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;
  const { post, loading, error } = usePost(Number(pid));

  if (error) {
    router.push("/404");
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {loading ? (
          <>loading...</>
        ) : (
          <>
            <h1 className={styles.title}>{post?.title ?? "empty title"}</h1>
            <div>post id : {post?.id ?? "no id given"}</div>
            <div className={styles.grid}>
              <a key={`postKey`} className={styles.card}>
                <p>{post?.body ?? "empty post"}</p>
              </a>
            </div>
          </>
        )}
        <button>
          <Link href="/">back to home</Link>
        </button>
      </main>
    </div>
  );
};

export default Post;
