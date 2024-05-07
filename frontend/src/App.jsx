import { Routes, Route } from "react-router-dom";
import "./globals.css";
import SignupForm from "./_auth/forms/SignupForm";
import Home from "./pages/Home";
import AuthLayout from "./_auth/AuthLayout";
import LoginForm from "./_auth/forms/LoginForm";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Account from "./pages/Account";
import PostCreationScreen from "./pages/admin/PostCreationScreen";
import JobListings from "./pages/admin/JobListings";
import ScoutCandidates from "./pages/admin/ScoutCandidates";
import SearchOpportunities from "./pages/candidate/SearchOpportunities";
import DashboardHome from "./pages/DashboardHome";
import ReceivedApplications from "./pages/admin/ReceivedApplications";
import AppliedJobs from "./pages/candidate/AppliedJobs";
 
const App = () => {
  return (
    <main className="h-screen flex">
      <Routes>
        {/*Public Routes*/}
        
        <Route index={true} path="/" element={<Home/>}/>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<SignupForm />} />
        </Route>

        {/*Private Routes*/}
        <Route element={<PrivateRoute/>}>
        <Route element={<Dashboard/>}>
          {/*Recruiter Routes*/}
         <Route index={true} path="/dashboard" element={<DashboardHome/>}/>
         <Route path="/dashboard/account" element={<Account/>}/>
         <Route path="/dashboard/post" element={<PostCreationScreen/>}/>
         <Route path="/dashboard/joblistings" element={<JobListings/>}/>
         <Route path="/dashboard/candidates" element={<ScoutCandidates/>}/>
         <Route path="/dashboard/applications" element={<ReceivedApplications/>}/>
         {/*Candidate Routes*/}
         <Route path="/dashboard/search" element={<SearchOpportunities/>}/>
         <Route path="/dashboard/applied" element={<AppliedJobs/>}/>
         <Route path="/dashboard/myresume" element={<DashboardHome/>}/>


        </Route>
        </Route>
      </Routes>
    </main>
  );
};

export default App;