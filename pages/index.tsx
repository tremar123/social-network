import type { NextPage } from "next";
import { Layout } from "../components/Layout";
import { NewPost } from "../components/NewPost";

const Home: NextPage = () => {
  return (
    <Layout>
      <NewPost />
    </Layout>
  );
};

export default Home;
