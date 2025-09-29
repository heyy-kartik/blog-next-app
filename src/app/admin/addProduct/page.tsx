"use client";
import React from "react";

import { useState } from "react";
import Image from "next/image";
import { assets } from "@/Assets/assets";
import { Description } from "@radix-ui/react-dialog";
const page = () => {
  const [image, setimage] = useState<File | null>(null);
  const [data, setdata] = useState({
    title: " ",
    Description: "",
    category: "Startup ",
    author: "Alex Bennet",
    authorimg: "/author_img.png",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata((data) => ({
      ...data,
      [name]: value,
    }));
    console.log(data);
  };
  return (
    <React.Fragment>
      <div>
        <form className="pt-5 px-5 sm:pt-12 sm:pl-15">
          <p className="text-lg ">Upload THUMBNAIL </p>
          <label htmlFor="image" className="cursor-pointer">
            <Image
              className="mt-4"
              src={!image ? assets.upload_area : URL.createObjectURL(image)}
              width={140}
              alt=""
              height={140}
            />{" "}
          </label>
          <input
            onChange={(e) =>
              setimage(e.target.files ? e.target.files[0] : null)
            }
            type="file"
            name="Upload"
            id="image"
            hidden
            required
          />
          <h2 className="pt-3 pb-2 text-2xl">Blog Title </h2>
          <input
            className="p-2 border border-black "
            type="text"
            placeholder="Enter blog title"
          />
          <h3 className="pt-3 pb-2 text-lg">Blog Description </h3>
          <textarea
            className="p-2 w-full mt-4 px-4 py-3 border border-black"
            placeholder="Write Content here             "
          />
          <p className="text-xl mt-4"> Blog Category </p>
          <select
            name="category"
            className="w-40 mt-4 px-2 py-2 border border-black text-black"
          >
            <option value="Startup">Startup </option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
          <br />
          <button
            className="bg-black cursor-pointer px-4 text-white p-2  mt-4"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default page;
