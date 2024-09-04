import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <section className="flex flex-col px-4 py-2 md:flex-row md:px-8">
      {/* Include shared UI here e.g. a header or sidebar */}
      <div className="mb-8 w-full md:mb-0 md:w-[20%]">
        <Sidebar />
      </div>

      <div className="w-full p-4 md:w-[80%]">{children}</div>
    </section>
  );
}
