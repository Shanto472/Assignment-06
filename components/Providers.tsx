"use client";
import { Toaster } from "react-hot-toast";
import { PlanProvider } from "@/context/PlanContext";
export default function Providers({children}:{children:React.ReactNode}){
  return <PlanProvider>{children}<Toaster position="top-right" toastOptions={{style:{background:"#20231f",color:"#fff",border:"1px solid #42473f"},success:{iconTheme:{primary:"#c9ff38",secondary:"#111"}}}}/></PlanProvider>;
}
