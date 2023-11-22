import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import "./App.css";
import MainPage from "./pages/MainPage";
import AvinashTallapaneni from "./components/AvinashTallapaneni";

function App() {
  return (
    <div className="h-screen bg_body flex justify-center items-center">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mainpage" element={<MainPage />} />
      </Routes>
      <AvinashTallapaneni />
    </div>
  );
}

export default App;
