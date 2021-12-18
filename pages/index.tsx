import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";

import { usePostList } from "../hooks/post/usePostList";

const Home: NextPage = () => {
  const { postList, loading, mutate } = usePostList();

  if (loading) {
    return <>loading</>;
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Next.js-Typescript-SWR-Hooks-Template</h1>
        <p className={styles.description}>
          posts <button onClick={() => mutate()}>click to refresh</button>
        </p>
        <div className={styles.grid}>
          {postList?.map((post) => (
            <a key={`postKey_${post.id}`} className={styles.card}>
              <h2>{post.title}&rarr;</h2>
              <Link href={`/post/${post.id}`}>view post</Link>
            </a>
          )) ?? <>no post...</>}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          This is a Next.js project bootstrapped with create-next-app
        </a>
      </footer>
    </div>
  );
};

export default Home;
