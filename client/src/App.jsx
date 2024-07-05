import { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import "./index.css";
import Loaders from "./components/layout/Loaders";
import AppLayout from "./components/layout/AppLayout";

const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));

const App = () => {
  const [user, setUser] = useState(false);
  return (
    <Router>
      <Suspense fallback={<Loaders />}>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route element={<ProtectRoute user={user} />}>
            <Route path="/" element={<AppLayout />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/group" element={<Groups />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
