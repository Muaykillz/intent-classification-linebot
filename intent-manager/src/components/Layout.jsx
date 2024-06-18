import Navbar from './Navbar';
import Sidebar from './Sidebar';

function Layout({ children }) {
  return (
    <div className="drawer lg:drawer-open bg-base-200">
      <input id="sidebar-toggle" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Navbar />
        <main className="m-6 p-6 h-screen bg-base-100 rounded-lg flex flex-col gap-6">{children}</main>
      </div>
      <Sidebar />
    </div>
  );
}

export default Layout;