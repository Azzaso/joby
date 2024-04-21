import { Routes, Route } from "react-router-dom";
import "./globals.css";
import SignupForm from "./_auth/forms/SignupForm";
import Home from "./pages/Home";
import AuthLayout from "./_auth/AuthLayout";
import LoginForm from "./_auth/forms/LoginForm";
import Dashboard from "./pages/Dashboard";
import Widget from "./components/Widget";
import PrivateRoute from "./components/PrivateRoute";
import Account from "./pages/Account";
import PostCreationScreen from "./pages/admin/PostCreationScreen";
import JobListings from "./pages/admin/JobListings";
import ScoutCandidates from "./pages/admin/ScoutCandidates";
 

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
         <Route index={true} path="/dashboard" element={<Widget/>}/>
         <Route path="/dashboard/account" element={<Account/>}/>
         <Route path="/dashboard/post" element={<PostCreationScreen/>}/>
         <Route path="/dashboard/joblistings" element={<JobListings/>}/>
         <Route path="/dashboard/candidates" element={<ScoutCandidates/>}/>
        </Route>
        </Route>
      </Routes>
    </main>
  );
};

export default App;