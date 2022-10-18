import Link from "next/link";
import * as Avatar from "@radix-ui/react-avatar";

export const Layout = (props: { children: JSX.Element }) => {
  return (
    <>
      <div className="navbar bg-base-200 bg-opacity-80 backdrop-blur">
        <div className="flex-1">
          <Link href="/">
            <a className="btn btn-ghost">social-network</a>
          </Link>
        </div>
        <div className="flex-none">
          <Link href="/sign-in">
            <a className="btn btn-outline">Sign In</a>
          </Link>
          {/* <div className="avatar placeholder"> */}
          {/*   <Avatar.Root asChild> */}
          {/*     <div className="bg-neutral-focus text-neutral-content rounded-full w-12"> */}
          {/*       <Avatar.Image /> */}
          {/*       <Avatar.Fallback className="text-2xl">TR</Avatar.Fallback> */}
          {/*     </div> */}
          {/*   </Avatar.Root> */}
          {/* </div> */}
        </div>
      </div>
      <main>{props.children}</main>
    </>
  );
};
