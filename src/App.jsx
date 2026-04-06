import { Routes, Route, Navigate } from "react-router-dom";

// ================= PUBLIC =================
import Home from "./pages/public/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// ================= DASHBOARDS =================
import AdminDashboard from "./pages/admin/AdminDashboard";
import BorrowerDashboard from "./pages/borrower/BorrowerDashboard";
import LenderDashboard from "./pages/lender/LenderDashboard";

// ================= BORROWER =================
import BorrowerProfile from "./pages/borrower/BorrowerProfile";
import ApplyLoan from "./pages/borrower/ApplyLoan";
import MyLoans from "./pages/borrower/MyLoans";
import EmiSchedule from "./pages/borrower/EmiSchedule";


// ================= LENDER =================
import LenderProfile from "./pages/lender/LenderProfile";
import AssignedLoans from "./pages/lender/AssignedLoans";
import ActiveInvestments from "./pages/lender/ActiveInvestments";
import CompletedLoans from "./pages/lender/CompletedLoans";
import EmiReceived from "./pages/lender/EmiReceived";
import FundLoan from "./pages/lender/FundLoan";

// ================= ADMIN =================
import ManageLoans from "./pages/admin/ManageLoans";
import AssignLender from "./pages/admin/AssignLender";
import ViewAllUsers from "./pages/admin/ViewAllUsers";
import Reports from "./pages/admin/Reports";

// ================= AUTH =================
import ProtectedRoute from "./auth/ProtectedRoute";

// ================= LAYOUT =================
import Navbar from "./components/common/Navbar";

import AnalystDashboard from "./pages/analyst/AnalystDashboard";

function App() {
  return (
    <>
      {/* 🔥 NAVBAR (hide logic handled inside Navbar) */}
      <Navbar />

      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= ADMIN ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/manage-loans"
          element={
            <ProtectedRoute role="ADMIN">
              <ManageLoans />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/assign-lender"
          element={
            <ProtectedRoute role="ADMIN">
              <AssignLender />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="ADMIN">
              <ViewAllUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute role="ADMIN">
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* ================= BORROWER ================= */}
        <Route
          path="/borrower"
          element={
            <ProtectedRoute role="BORROWER">
              <BorrowerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/borrower/profile"
          element={
            <ProtectedRoute role="BORROWER">
              <BorrowerProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/borrower/apply-loan"
          element={
            <ProtectedRoute role="BORROWER">
              <ApplyLoan />
            </ProtectedRoute>
          }
        />

        <Route
          path="/borrower/my-loans"
          element={
            <ProtectedRoute role="BORROWER">
              <MyLoans />
            </ProtectedRoute>
          }
        />
        <Route
          path="/borrower/emi/:loanId"
          element={<EmiSchedule />}
        />


        {/* ================= LENDER ================= */}
        <Route
          path="/lender"
          element={
            <ProtectedRoute role="LENDER">
              <LenderDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lender/profile"
          element={
            <ProtectedRoute role="LENDER">
              <LenderProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lender/assigned-loans"
          element={
            <ProtectedRoute role="LENDER">
              <AssignedLoans />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lender/active-investments"
          element={
            <ProtectedRoute role="LENDER">
              <ActiveInvestments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lender/completed-loans"
          element={
            <ProtectedRoute role="LENDER">
              <CompletedLoans />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lender/emi-received"
          element={
            <ProtectedRoute role="LENDER">
              <EmiReceived />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lender/fund-loan/:loanId"
          element={
            <ProtectedRoute role="LENDER">
              <FundLoan />
            </ProtectedRoute>
          }
        />
          {/* ================= ANALYST ================= */}
        <Route
          path="/analyst/dashboard"
          element={
            <ProtectedRoute role="ANALYST">
              <AnalystDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
