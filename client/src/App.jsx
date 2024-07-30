import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllChats, fetchAllRequests, getAllUSers } from "./api/api";
import Loader from "./components/layout/Loaders";
import { initializeSocket, disconnectSocket } from "./lib/socket";

const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));

const App = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchInitialData() {
      await getAllUSers(dispatch);
      await fetchAllRequests(user._id, dispatch);
      await fetchAllChats(user._id, dispatch);
      setLoading(false);
    }

    if (user?._id) {
      setLoading(true);
      initializeSocket(user._id);
      console.log("connected");
      fetchInitialData();
    }

    return () => {
      disconnectSocket();
    };
  }, [user]);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />

          <Route element={<ProtectRoute user={user} />}>
            <Route
              path="/"
              element={loading ? <Loader /> : <Home user={user} />}
            />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/group" element={<Groups />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
