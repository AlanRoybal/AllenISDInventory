import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
<<<<<<< HEAD
import AddItem from "./pages/addItem/AddItem";
import ItemDetail from "./components/item/itemDetail/ItemDetail";
import EditItem from "./pages/editItem/EditItem";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
=======
>>>>>>> parent of 4dd676c (adding items to database functionality)

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);

  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />

        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />
<<<<<<< HEAD
        <Route
          path="/add-item"
          element={
            <Sidebar>
              <Layout>
                <AddItem />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/item-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <ItemDetail />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-item/:id"
          element={
            <Sidebar>
              <Layout>
                <EditItem />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/profile"
          element={
            <Sidebar>
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <Sidebar>
              <Layout>
                <EditProfile />
              </Layout>
            </Sidebar>
          }
        />
=======
>>>>>>> parent of 4dd676c (adding items to database functionality)
      </Routes>
    </BrowserRouter>
  );
}

export default App;