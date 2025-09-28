import { NextResponse } from "next/server";
import { writeFile } from "fs/promises"; // Import writeFile
import { ConnectDB } from "@/lib/config/db"; // Adjust import path as needed

const LoadDB = async () => {
  await ConnectDB();
};
LoadDB();

async function GET(request) {
  return NextResponse.json({
    msg: "API Working",
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
      // Fix: Remove extra curly braces from template literals
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: imgUrl, // Use the processed image URL, not the original file
      authorImg: formData.get("authorImg"),
    };

    // TODO: Save BlogData to database
    console.log("Blog Data:", BlogData);

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
