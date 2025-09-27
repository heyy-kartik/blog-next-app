import Image from "next/image";
import Header from "@/Components/Header";
import Blogitem from "@/Components/Blogitem";
import Bloglist from "@/Components/Bloglist";
export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Bloglist />
      {/* Add your main content here */}
    </div>
  );
}
