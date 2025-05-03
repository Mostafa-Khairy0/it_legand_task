import { RootNav } from "@/components";

export default function CourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-[5px] py-[5px] sm:px-[10px] sm:py-[10px] md:px-[20px] md:py-[15px] h-[100vh] w-[100vw]">
      <RootNav />
      {children}
    </div>
  );
}
