import Sidebar from "../components/Sidebar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section className="px-8 flex">
      {/* Include shared UI here e.g. a header or sidebar */}
      <Sidebar />

      <div className="p-8">{children}</div>
    </section>
  );
}
