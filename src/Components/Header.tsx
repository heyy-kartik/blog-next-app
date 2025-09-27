import React from "react";
import Image from "next/image";
import { assets } from "@/Assets/assets";
import { ModeToggle } from "./toggle-dark";
const Header = () => {
  return (
    <header className="w-full px-4 md:px-12 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto ">
        <Image
          src={assets.logo}
          className="w-[130px]"
          width={180}
          height={100}
          alt="Header Image"
        />

        <button className="flex items-center    gap-2 absolute right-50 px-3 py-2 font-medium cursor-pointer shadow-lg bg-white hover:bg-gray-50  border border-gray-200 transition-colors duration-200">
          Get Started
          <Image src={assets.arrow} alt="arrow icon" className="w-4 h-4" />
        </button>
        <ModeToggle />
      </div>
      <div className="text-center max-w-3xl mx-auto mt-10 ">
        {" "}
        <h1 className="text-3xl font-semibold text-center mr-7 ">
          Latest Blogs
        </h1>
        <p className=" text-sm mt-7 text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
          distinctio optio quae eveniet, debitis ipsam voluptatum aliquam
          laborum dicta magni alias quos, labore maxime veniam! Deserunt officia
          distinctio possimus inventore.{" "}
        </p>
        <form
          action=""
          className="flex justify-center mt-8 max-w-[600px] scale-75 gap-3 shadow-[-7px_10px_0px_#000] "
        >
          <input
            className="border border-gray-300  pl-4 w-full  focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Enter your Email"
          ></input>

          <button
            type="submit"
            className="bg-gray-300 text-black px-4 py-4 active:bg-gray-600 active:text-white font-medium text-lg transition-colors duration-200"
          >
            Subscribe
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
