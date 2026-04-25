import ky from "ky";

// console.log(import.meta.env.VITE_SERVER_URL);
const api = ky.create({
    prefixUrl : import.meta.env.VITE_SERVER_URL,
    credentials :"include",
    headers:{
        "Content-Type" : "application/json",
    },
});

export default api;