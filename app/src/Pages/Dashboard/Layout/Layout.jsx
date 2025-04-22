import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

const DashboardLayout = () => {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="w-full bg-gray-800 ml-16 md:ml-56 min-h-screen ">
        <Navbar />
        <main className="">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
