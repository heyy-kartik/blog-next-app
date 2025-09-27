import Image from "next/image";
import Header from "@/components/Header";
import Blogitem from "@/components/Blogitem";
import Bloglist from "@/components/Bloglist";
export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Bloglist />
      {/* Add your main content here */}
    </div>
  );
}
