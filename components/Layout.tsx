import Link from "next/link";
import * as Avatar from "@radix-ui/react-avatar";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useTheme } from "next-themes";

export const Layout = (props: { children: JSX.Element }) => {
  const { data, status } = useSession();
  return (
    <>
      <div className="navbar bg-base-200 bg-opacity-80 backdrop-blur">
        <div className="flex-1">
          <Link href="/">
            <a className="btn btn-ghost">social-network</a>
          </Link>
        </div>
        <div className="flex-none">
          <User data={data} status={status} />
        </div>
      </div>
      <main>{props.children}</main>
    </>
  );
};

const User = (props: {
  data: Session | null;
  status: "authenticated" | "loading" | "unauthenticated";
}) => {
  const { setTheme } = useTheme();
  if (props.status === "authenticated")
    return (
      <Dropdown.Root>
        <Dropdown.Trigger asChild>
          <button className="avatar placeholder btn btn-circle btn-ghost">
            <Avatar.Root asChild>
              <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                <Avatar.Image src={props.data?.user?.image!} />
                <Avatar.Fallback delayMs={200} className="text-2xl">
                  {props.data?.user?.name
                    ?.split(" ")
                    .map((word) => word[0])
                    .join("")}
                </Avatar.Fallback>
              </div>
            </Avatar.Root>
          </button>
        </Dropdown.Trigger>

        <Dropdown.Portal className="dropdown">
          <Dropdown.Content className="dropdown-content menu shadow bg-base-300 rounded-box p-3">
            <Dropdown.Sub>
              <Dropdown.SubTrigger>Theme</Dropdown.SubTrigger>
              <Dropdown.Portal>
                <Dropdown.SubContent>
                  <Dropdown.Item onClick={() => setTheme("dark")}>
                    Dark
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setTheme("light")}>
                    Light
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setTheme("pastel")}>
                    Pastel
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setTheme("night")}>
                    Night
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setTheme("aqua")}>
                    Aqua
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setTheme("forest")}>
                    Forest
                  </Dropdown.Item>
                </Dropdown.SubContent>
              </Dropdown.Portal>
            </Dropdown.Sub>
            <Dropdown.Separator />
            <Dropdown.Item onClick={() => signOut()}>Sign Out</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Portal>
      </Dropdown.Root>
    );
  else if (props.status === "unauthenticated")
    return (
      <Link href="/sign-in">
        <a className="btn btn-outline">Sign In</a>
      </Link>
    );
  else return null;
};
