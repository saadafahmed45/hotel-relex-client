import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <section className="flex flex-col md:flex-row px-4 md:px-8 py-8 md:py-16">
      {/* Include shared UI here e.g. a header or sidebar */}
      <div className="w-full md:w-[20%] mb-8 md:mb-0">
        <Sidebar />
      </div>

      <div className="w-full md:w-[80%] p-4">
        {children}
      </div>
    </section>
  );
}