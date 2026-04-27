import { createContext } from "react";

export const ContextFounder = createContext({user:null, mood:"dark", toggleMood:()=>{}, saveUser:()=>{}})