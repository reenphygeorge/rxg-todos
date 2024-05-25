import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";

const LandingPage = () => (
  <>
    <div className="px-6 lg:px-0 lg:pt-4">
      <div className="flex flex-col items-center justify-center flex-1 w-full px-6 mt-32">
        <h2 className="text-4xl font-bold mb-4 text-center">
          Organize Your Life with Todo App
        </h2>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Manage your tasks efficiently and effectively with our simple and
          intuitive interface.
        </p>
        <Link
          href="/api/auth/register"
          className={buttonVariants({
            size: "lg",
            className: "hidden sm:flex items-center gap-1",
          })}
        >
          Get Started
        </Link>
      </div>
    </div>
  </>
);

export default LandingPage;
