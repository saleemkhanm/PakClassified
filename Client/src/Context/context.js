import { createContext } from "react";

export const advertismentContext=createContext({
    selectedAd:null,
    setSelectedAd:()=>{}
})