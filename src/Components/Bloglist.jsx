"use client";
import { blog_data } from "@/Assets/assets";
import React from "react";
import Blogitem from "./Blogitem";
import { useState } from "react";
const Bloglist = () => {
  const [menu, setMenu] = React.useState("All");
  const [data, setData] = useState(null);
  const fetchBlogdata = () => {};
  useEffect(() => {
    fetchBlogdata();
  }, []);
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-6 my-8">
        <button
          onClick={() => setMenu("All")}
          className={
            menu === "All"
              ? "bg-black text-white py-2 px-4 "
              : "cursor-pointer hover:bg-gray-200 hover:rounded-sm  hover:px-4 hover:py-1"
          }
        >
          All
        </button>
        <button
          className={
            menu === "Technology"
              ? "cursor-pointer bg-black text-white py-2 px-4  hover:rounded-sm  hover:px-2 hover:py-1 "
              : "cursor-pointer hover:bg-gray-200 hover:rounded-sm hover:px-2 hver:py-1"
          }
          onClick={() => setMenu("Technology")}
        >
          Technology
        </button>
        <button
          className={
            menu === "Startup"
              ? "cursor-pointer bg-black text-white py-2 px-4 hover:py-2 hover:px-2 "
              : "cursor-pointer hover:bg-gray-200 hover:rounded-sm  hover:px-2 hover:py-1"
          }
          onClick={() => setMenu("Startup")}
        >
          Startup
        </button>
        <button
          className={
            menu === "Lifestyle"
              ? "cursor-pointer bg-black text-white py-2 px-4 hover:bg-black hover:rounded-sm  hover:px-2"
              : "cursor-pointer hover:bg-gray-200 hover:rounded-sm  hover:px-2 hover:py-1"
          }
          onClick={() => setMenu("Lifestyle")}
        >
          Lifestyle{" "}
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-1 gap-y10 mx-5 my-10 mb-16">
        {blog_data
          .filter((item) => (menu === "All" ? true : item.category === menu))
          .map((item, index) => {
            return (
              <Blogitem
                key={index}
                id={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                category={item.category}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Bloglist;
