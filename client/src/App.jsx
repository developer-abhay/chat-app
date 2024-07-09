import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import "./index.css";
import Loaders from "./components/layout/Loaders";
import { useSelector } from "react-redux";

const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));

const App = () => {
  const user = useSelector((state) => state.user);

  return (
    <Router>
      <Suspense fallback={<Loaders />}>
        <Routes>
          <Route path="/login" element={<Login user={user} />} />
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
