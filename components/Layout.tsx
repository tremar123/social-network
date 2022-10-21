import Link from "next/link";
import * as Avatar from "@radix-ui/react-avatar";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useTheme } from "next-themes";
import { BsChevronLeft } from "react-icons/bs";
import { useRouter } from "next/router";

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
  const router = useRouter();
  if (props.status === "authenticated")
    return (
      <Dropdown.Root>
        <Dropdown.Trigger asChild>
          <button className="avatar placeholder btn btn-circle btn-ghost rounded-full overflow-hidden">
            <Avatar.Root asChild>
              <div className="bg-neutral-focus text-neutral-content w-12">
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

        <Dropdown.Portal>
          <Dropdown.Content className="shadow p-1 bg-base-300 rounded-md">
            <Dropdown.Sub>
              <Dropdown.SubTrigger className="dropdown-item pl-6 relative">
                <BsChevronLeft className="absolute top-1/2 left-0 -translate-y-1/2" />
                Theme
              </Dropdown.SubTrigger>
              <Dropdown.Portal>
                <Dropdown.SubContent
                  sideOffset={4}
                  alignOffset={-4}
                  className="bg-base-300 p-1 rounded-md shadow"
                >
                  <Dropdown.Item
                    className="dropdown-sub-item"
                    onClick={() => setTheme("dark")}
                  >
                    Dark
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="dropdown-sub-item"
                    onClick={() => setTheme("light")}
                  >
                    Light
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="dropdown-sub-item"
                    onClick={() => setTheme("pastel")}
                  >
                    Pastel
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="dropdown-sub-item"
                    onClick={() => setTheme("night")}
                  >
                    Night
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="dropdown-sub-item"
                    onClick={() => setTheme("aqua")}
                  >
                    Aqua
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="dropdown-sub-item"
                    onClick={() => setTheme("forest")}
                  >
                    Forest
                  </Dropdown.Item>
                </Dropdown.SubContent>
              </Dropdown.Portal>
            </Dropdown.Sub>
            <Dropdown.Separator className="h-px bg-gray-500 my-1" />
            <Dropdown.Item
              className="dropdown-item pl-6"
              onClick={() => signOut()}
            >
              Sign Out
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Portal>
      </Dropdown.Root>
    );
  else if (props.status === "unauthenticated")
    return (
      <Link href={{ pathname: "/sign-in", query: { next: router.pathname } }}>
        <a className="btn btn-outline">Sign In</a>
      </Link>
    );
  else return null;
};
