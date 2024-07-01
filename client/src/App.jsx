import "./index.css";
import ChatScreen from "./components/ChatScreen/ChatScreen";
import SideBar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/LoginPage/Login";
const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <div className="app-body">
                <SideBar />
                <ChatScreen />
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
