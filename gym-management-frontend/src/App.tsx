import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { MemberLandingPage } from "./components/members/MemberlandingPage";
import FeeslandingPage from "./components/fees/feesLandingPage";
import { AttendancelandingPage } from "./components/attandance/AttendancelandingPage";

function App() {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
        />

        <Route
          path="/signup"
          element={!isAuthenticated ? <SignUp /> : <Navigate to="/dashboard" />}
        />

        {/* Protected Nested Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index={true} element={<MemberLandingPage />} />
          <Route path="fees" element={<FeeslandingPage />} />
          <Route path= "attendance" element={<AttendancelandingPage/>}/>
        </Route>
        {/* Default Route */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
