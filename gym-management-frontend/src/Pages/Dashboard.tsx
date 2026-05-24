import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";

function Dashboard() {

  return (
    <>
      <Navbar/>
      <div className="mt-2"></div>
      <Outlet/>
  
    </>
  );
}

export default Dashboard;
