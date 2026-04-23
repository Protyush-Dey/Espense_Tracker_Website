import { Route, Routes } from "react-router";
import LoginPage from "./Pages/AuthPages/LoginPage.tsx";
import SignupPage from "./Pages/AuthPages/SignupPage.tsx";
import AuthPge from "./Pages/AuthPge.tsx";
import { useState } from "react";
 import Workspace from "./Pages/Workspace";
import { DashBoard } from "./Pages/WorkspaceSubPages/DashBoard.tsx";



function App() {
  const [islogin,setLogin] = useState<boolean>(!false);
  return (
    <>
    {/* <LoginPage/> */}
    {/* <SignupPage/> */}
    {/* <Workspace/> */}
    <Routes>
      {islogin?
      <Route path="/" element={<AuthPge/>}>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      </Route>:
      <Route path="/" element={<Workspace/>}>
      <Route path="/" element={<DashBoard/>} />
      </Route>
      }
    </Routes>
    </>
  );
}

export default App;
