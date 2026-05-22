import { MemberLandingPage } from "@/components/members/MemberlandingPage";
import Navbar from "./Navbar";

function Dashboard() {

  return (
    <>
      <Navbar/>
      <div className="mt-2"></div>
      <MemberLandingPage/>
    </>
  );
}

export default Dashboard;
