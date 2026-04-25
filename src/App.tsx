import { Route, Routes } from "react-router";
import LoginPage from "./Pages/AuthPages/LoginPage.tsx";
import SignupPage from "./Pages/AuthPages/SignupPage.tsx";
import AuthPge from "./Pages/AuthPge.tsx";
// import { useState } from "react";
 import Workspace from "./Pages/Workspace";
import { DashBoard } from "./Pages/WorkspaceSubPages/DashBoard.tsx";
import PasswordChange from "./Pages/AuthPages/PasswordChange.tsx";
import { useQuery } from "@tanstack/react-query";
import { me } from "./api/auth.api.ts";



function App() {
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: me,
    retry: false,          
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading...</div>; // or a spinner

  const isLoggedIn = !data;
  console.log(data);
  
  // const [islogin,setLogin] = useState<boolean>(!false);
  return (
    <>
    {/* <LoginPage/> */}
    {/* <SignupPage/> */}
    {/* <Workspace/> */}
    <Routes>
      {isLoggedIn ?
      <Route path="/" element={<AuthPge/>}>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgetPass" element={<PasswordChange/>} />

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
