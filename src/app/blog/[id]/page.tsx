"use client";
import React from "react";

const page = ({ params }: any) => {
  const [data, setdata] = React.useState("");
  const fetchblogdata = () => {
    fetch(`/api/blog/${params.id}`)
      .then((res) => res.json())
      .then((data) => setdata(data));
  };
  return <div>Blog Post {params.id}</div>;
};

export default page;
