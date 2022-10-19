import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";

const SignInPage: NextPage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="navbar fixed top-0">
        <div className="flex-1">
          <Link href="/">
            <a className="btn btn-ghost">social-network</a>
          </Link>
        </div>
      </div>
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-4xl mb-6 font-bold">SIGN IN</h1>
          <button
            className="btn bg-gray-700 hover:bg-gray-800 border-1 border-gray-400 hover:border-gray-400 gap-2"
            onClick={() => signIn("github", { callbackUrl: "/" })}
          >
            <BsGithub className="h-5 w-5" />
            Sign in with github
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
