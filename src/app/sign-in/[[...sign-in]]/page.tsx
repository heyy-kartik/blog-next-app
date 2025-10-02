import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
// Remove this line:
// import backgroundBlog from "@/public/backgroundBlog.jpg";

export default function Page() {
  return (
    <div className="relative flex justify-center items-center min-h-screen">
      <Image
        src="/backgroundBlog.jpg" // Just use the direct path
        alt="Background"
        fill
        className="object-cover bg-cover -z-10"
      />
      <SignIn />
    </div>
  );
}
