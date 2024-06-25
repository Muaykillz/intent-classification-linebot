import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="sidebar-toggle" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Navbar />
        <main className="flex min-h-screen flex-col gap-2 rounded-tl-xl border-base-300 bg-base-200 p-6 pb-4">
          <div className="flex h-full flex-col gap-6 rounded-lg border border-base-300 bg-base-100 p-12">
            {children}
          </div>
          <p className="text-end text-xs opacity-20">ⓒ 2024 Mudev</p>
        </main>
      </div>
      <Sidebar />
    </div>
  );
}

export default Layout;
