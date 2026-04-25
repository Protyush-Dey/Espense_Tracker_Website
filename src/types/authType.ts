export interface LoginPayload {
    loginInfo: string,
    password: string,
}

export interface SignUpPayload {
    userName: string,
    fullName: string,
    email: string,
    password: string,
}

export interface User {
    id:string,
    userName: string,
    fullName: string,
    email: string,
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}