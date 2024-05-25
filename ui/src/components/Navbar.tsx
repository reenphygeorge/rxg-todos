import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            rxg<span className="text-green-600">todos</span>
          </Link>

          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                <div className="h-8 w-px bg-zinc-200 hidden sm:block"></div>
                <Link
                  href="/api/auth/logout"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                    variant: "ghost",
                  })}
                >
                  Sign out
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/api/auth/register"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Sign Up
                </Link>
                <div className="h-8 w-px bg-zinc-200 hidden sm:block"></div>
                <Link
                  href="/api/auth/login"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Login
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};
export default Navbar;