import { NextResponse } from "next/server";
import { writeFile } from "fs/promises"; // Import writeFile
import { ConnectDB } from "@/lib/config/db"; // Adjust import path as needed
import BlogModel from "@/lib/models/blogModels";
const LoadDB = async () => {
  await ConnectDB();
};
LoadDB();

export async function GET(request) {
  const blogs = await BlogModel.find({});
  return NextResponse.json({
    blogs,
  });
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const timeStamp = Date.now();

    const image = formData.get("image");

    // Validate image exists
    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const imageBytedata = await image.arrayBuffer();
    const buffer = Buffer.from(imageBytedata);
    const path = `./public/${timeStamp}_${image.name}`;

    // Fix: Add 'await' keyword before writeFile
    await writeFile(path, buffer);

    const imgUrl = `/${timeStamp}_${image.name}`;
    console.log(imgUrl);

    const BlogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: imgUrl,
      authorimg: formData.get("authorimg"), // Fixed: should be authorimg not authorImg
    };

    // Save BlogData to database
    await BlogModel.create(BlogData);
    console.log("Blog Data saved to database:", BlogData);

    return NextResponse.json({
      success: true,
      message: "Blog created successfully",
      data: BlogData,
    });
  } catch (error) {
    console.error("Error processing blog post:", error);
    return NextResponse.json(
      { error: "Failed to process blog post" },
      { status: 500 }
    );
  }
}

// Export GET as well
export { GET };
