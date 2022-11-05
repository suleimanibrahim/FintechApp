import Signup from './pages/Signup/Signup';
import Login from "./pages/login/Login";
import LocalTransfer from "./pages/localtransfer/LocalTransfer";
import BankTransfer from './pages/otherbanktransfer/OtherBankTransfer';
import LandingPage from './pages/landingpage/Landingpage';
import {Toaster} from 'react-hot-toast';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Dashboard from './pages/dashboard/Dashboard';
import UserProfile from './pages/User_profile/UserProfile';
import EmailVerification from './pages/emailverification/EmailVerification';
import VerifyEmailInput from './pages/login/VerifyEmailInput';
import ResetPassword from './pages/login/ResetPassword';
import PasswordResetVerification from './pages/login/PasswordResetVerification';
import FundWallet from './pages/fundwallet/FundWallet';


function App() {


  return (
    <>
    <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/forgot-password" element={<VerifyEmailInput />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/password-reset-verification" element={<PasswordResetVerification />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/bank-transfer" element={<BankTransfer />} />
          <Route path="/local-transfer" element={<LocalTransfer />} />
          <Route path="/fund-wallet" element={<FundWallet />} />
        </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;
