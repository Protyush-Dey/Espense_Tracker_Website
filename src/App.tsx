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
import { useEffect } from "react";
import { useUser } from "./context/user.tsx";
import type { ApiType } from "./types/api.ts";
import type { User } from "./types/authType.ts";



function App() {
  const { data, isLoading } = useQuery<ApiType<User>>({
    queryKey: ["me"],
    queryFn: me,
    retry: false,          
    refetchOnWindowFocus: false,
  });
  const { setUser ,user } = useUser();
  useEffect(() => {
     if (data) setUser(data.data);
  }, [data]);
  
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
    {/* <LoginPage/> */}
    {/* <SignupPage/> */}
    {/* <Workspace/> */}
    <Routes>
      {!user ?
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
