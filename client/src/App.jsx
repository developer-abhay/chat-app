import { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllChats, fetchAllRequests, getAllUsers } from "./api/api";
import Loader from "./components/layout/Loaders";
import { initializeSocket, disconnectSocket, getSocket } from "./lib/socket";
import { login } from "./redux/UserSlice";

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
      await getAllUsers(dispatch);
      await fetchAllRequests(user._id, dispatch);
      await fetchAllChats(user._id, dispatch);
      setLoading(false);
    }

    let socket;

    if (user?._id) {
      setLoading(true);
      initializeSocket(user._id);
      console.log("connected");
      fetchInitialData();

      // Adding friend when request accepted
      socket = getSocket();
      socket.on("acceptFriendRequest", (data) => {
        const newFriends = [...user.friends, data.receiverId];
        dispatch(login({ ...user, friends: newFriends }));
      });

      //Updating chats when added to group
      socket.on("added-to-group", async (data) => {
        await fetchAllChats(user._id, dispatch);
      });

      //Updating chats when removed from group
      socket.on("removed-from-group", async (data) => {
        navigate("/");
        await fetchAllChats(user._id, dispatch);
      });
    }

    return () => {
      if (socket) {
        socket.off("acceptFriendRequest");
        socket.off("added-to-group");
        socket.off("removed-from-group");
      }
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
