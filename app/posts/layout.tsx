import { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";

export default function PostLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row p-6 gap-6">
      <aside className="w-full md:w-1/4">
        <Sidebar />
      </aside>
      <section className="flex-1">{children}</section>
    </div>
  );
}