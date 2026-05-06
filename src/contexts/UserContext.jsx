import { jwtDecode } from "jwt-decode";
import {  useEffect, useState } from "react";
import { ContextFounder } from "./UserConrtrxt";


export function UserContextProvider({children}){
    const [user,setUser] = useState(null);
    const [mood,setMood] = useState("light");
    const toggleMood = () => {
        setMood(mood === "light" ? "dark" : "light");
        localStorage.setItem('mood',mood === "light" ? "dark" : "light")
    }
    const saveUser = () => {
        const token = localStorage.getItem("token");
        let decodedToken; 
        try{
        decodedToken = jwtDecode(token)
        }
        catch{
            decodedToken = null
        }
        setUser(decodedToken);
        const mood = localStorage.getItem('mood');
        setMood(mood);
    }
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    }
    useEffect(() => {
        (()=>{saveUser()})();

    },[])

    return (
        <ContextFounder.Provider value={{ user, saveUser, mood, toggleMood,logout }}>
            {children}
        </ContextFounder.Provider>
    )
}