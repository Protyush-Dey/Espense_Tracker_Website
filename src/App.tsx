import { Route, Routes } from "react-router";
import "./App.css";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";



function App() {
  return (
    <>
    {/* <LoginPage/>
    <SignupPage/> */}
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
    </>
  );
}

export default App;
