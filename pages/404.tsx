import type { NextPage } from "next";
import Link from "next/link";

const NotFoundPage: NextPage = () => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-error">404</h1>
          <p className="py-6 text-xl">Page not found</p>
          <Link href="/">
            <a className="btn btn-neutral">Home</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
