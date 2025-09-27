"use client";
import { assets, blog_data } from "@/Assets/assets";
import React, { useEffect, useState } from "react";
import Image from "next/image";
//
interface BlogData {
  id: number;
  title: string;
  description: string;
  image: any; // or StaticImageData if you're using Next.js images
  date: number;
  category: string;
  author: string;
  author_img: any; // or StaticImageData
}

interface PageProps {
  params: {
    id: string;
  };
}

const page = ({ params }: PageProps) => {
  // Change state type from string to BlogData or null
  const [data, setData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBlogData = () => {
    const blogId = parseInt(params.id);

    // Use find() instead of a for loop - much more efficient
    const foundBlog = blog_data.find((blog) => blog.id === blogId);

    if (foundBlog) {
      setData(foundBlog);
      console.log("Data found:", foundBlog);
    } else {
      console.log("Blog not found");
      setData(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Blog post not found</div>;
  }

  return (
    <React.Fragment>
      <div className="w-full px-4 md:px-12 py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Image
            src={assets.logo}
            className="w-[130px]"
            width={180}
            height={100}
            alt="Header Image"
          />

          <button className="flex items-center gap-2 px-6 py-3 font-medium cursor-pointer shadow-lg bg-white hover:bg-gray-50  border border-gray-200 transition-colors duration-200">
            Get Started
            <Image src={assets.arrow} alt="arrow icon" className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
        <div className="text-gray-600 mb-6">
          <span>By {data.author}</span> •<span>{data.category}</span> •
          <span>{new Date(data.date).toLocaleDateString()}</span>
        </div>
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <p className="text-gray-800 leading-relaxed">{data.description}</p>
      </div>
    </React.Fragment>
  );
};

export default page;
