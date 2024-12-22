import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./features/authSlice";
import { Header, Footer } from './components';
import { Outlet, useNavigate, useLocation } from "react-router-dom";

function App() {
  const [loading, setLoadingStatus] = useState(true);
  // at first when app loads get the user status
  const isLoggedIn = useSelector(state => state.authSliceReducer.status);
  const navigate = useNavigate();
  const location = useLocation();  // Get current route location

  useEffect(() => {
    // check whether user is logged in if yes then go to dashboard else Login
    try {
      if (isLoggedIn) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.log("App.jsx useEffect and getCurrentUser :: error", error);
    } finally {
      setLoadingStatus(false);
    }
  }, [isLoggedIn, navigate]);

  // Check if the current route is '/login'
  const isLoginPage = location.pathname === '/login';

  return !loading ? (
    <div className="flex flex-col min-h-screen">
      {!isLoginPage && <Header />}
      <main className="flex-grow mt-20">
        <Outlet />
      </main>
      {!isLoginPage && <Footer />}
    </div>
  ) : (
    <div className="w-full h-screen flex justify-center items-center">Loading ...</div>
  );
}

export default App;
