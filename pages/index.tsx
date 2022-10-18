import { Layout } from "../components/Layout";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return <div></div>;
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
