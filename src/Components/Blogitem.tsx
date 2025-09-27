import React from "react";
import Image from "next/image";
import { assets, blog_data } from "@/Assets/assets";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";
interface BlogitemProps {
  title?: string;
  description?: string;
  image?: string | StaticImport;
  category?: string;
  id?: number;
}
const Blogitem = ({
  title,
  description,
  image,
  category,
  id,
}: BlogitemProps) => {
  return (
    <div className="max-w-[330px] sm:max-w-[300px]  ml-5  mt-10 border border-gray-800 hover:shadow-[-7px_7px_0px_#000] transition-shadow duration-300">
      <Link href={`/blog/${id}`}>
        {" "}
        <Image
          alt="blog-img"
          width={400}
          height={400}
          src={image || blog_data[0].image}
          className="border border-black w-full h-[200px] object-cover"
        />
      </Link>
      <p className="ml-5 mt-4 px-1 inline-block bg-black text-white text-sm">
        {category}
      </p>
      <div className="mt-3 px-5">
        <h4 className="text-lg font-semibold tracking-tight text-gray-800 ">
          {title}
        </h4>
        <p className="text-sm tracking-tight text-gray-600 mb-3">
          {description}
        </p>
        <Link
          href={`/blog/${id}`}
          className="inline-flex  py-2 font-semibold text-center items-center gap-3 mb-5"
        >
          Read More
          <Image
            alt="just the Arrow "
            src={assets.arrow}
            width={12}
            height={10}
            className=""
          />
        </Link>
      </div>
    </div>
  );
};

export default Blogitem;
