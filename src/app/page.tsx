import Header from "@/components/Header";

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
