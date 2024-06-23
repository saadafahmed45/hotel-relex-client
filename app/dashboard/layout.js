import Sidebar from "../components/Sidebar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section className="px-8 flex">
      {/* Include shared UI here e.g. a header or sidebar */}
      <div className="w-[20%] ">
        <Sidebar />
      </div>

      <div className="p-4 w-screen bg-slate-200 ">{children}</div>
    </section>
  );
}
