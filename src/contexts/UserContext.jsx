import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { ContextFounder } from "./UserConrtrxt";


export function UserContextProvider({children}){
    const [user,setUser] = useState(null);
    const [mood,setMood] = useState("dark");
    const toggleMood = () => {
        setMood(mood === "light" ? "dark" : "light");
    }
    const saveUser = () => {
        const token = localStorage.getItem("token");
        const decodedToken =token? jwtDecode(token):null;
        setUser(decodedToken);
        
    }
    useEffect(() => {
        (()=>{saveUser()})();
        console.log(user);

    },[])

    return (
        <ContextFounder.Provider value={{ user, saveUser, mood, toggleMood }}>
            {children}
        </ContextFounder.Provider>
    )
}