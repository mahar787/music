import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <nav
      style={{
        backgroundColor: "rgba(255,255,255,.2)",
        backdropFilter: "blur(10px)",
      }}
      className="flex justify-between items-center px-6 py-4  shadow-md fixed w-full z-50"
    >
      <div className="flex items-center gap-3">
        <Image src="/logo.png" width={40} height={40} alt="Logo" />
        <h1 className="text-xl  font-bold text-main text-[#F24901]">
          Rhythimc Bytes
        </h1>
      </div>

      <ul className="flex gap-6 font-medium text-black">
        <Link
          href={"/"}
          className="hover:text-main cursor-pointer transition text-[#F24901] "
        >
          Home
        </Link>
      </ul>
    </nav>
  );
};

export default Header;
