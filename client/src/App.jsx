import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import "./index.css";
import Loaders from "./components/layout/Loaders";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllChats, fetchAllRequests, getAllUSers } from "./api/api";

const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));

const App = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user._id) {
      getAllUSers(dispatch);
      fetchAllRequests(user._id, dispatch);
      fetchAllChats(user._id, dispatch);
    }
  }, [user]);

  return (
    <Router>
      <Suspense fallback={<Loaders />}>
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
            <Route path="/" element={<Home user={user} />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/group" element={<Groups />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
