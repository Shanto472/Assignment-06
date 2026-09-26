"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import type { PlanItem, Workout } from "@/types/workout";

type PlanContextType = {
  plan: PlanItem[]; saved: Workout[]; hydrated: boolean;
  addToPlan: (workout: Workout) => void; saveForLater: (workout: Workout) => void;
  removeFromPlan: (id: number) => void; removeFromSaved: (id: number) => void;
  markDone: (id: number) => void; inPlan: (id: number) => boolean; isSaved: (id: number) => boolean;
};

const PlanContext = createContext<PlanContextType | null>(null);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan,setPlan] = useState<PlanItem[]>([]);
  const [saved,setSaved] = useState<Workout[]>([]);
  const [hydrated,setHydrated] = useState(false);

  useEffect(() => {
    try {
      setPlan(JSON.parse(localStorage.getItem("fitlog-plan") || "[]"));
      setSaved(JSON.parse(localStorage.getItem("fitlog-saved") || "[]"));
    } catch { localStorage.removeItem("fitlog-plan"); localStorage.removeItem("fitlog-saved"); }
    setHydrated(true);
  },[]);
  useEffect(() => { if(hydrated) localStorage.setItem("fitlog-plan",JSON.stringify(plan)); },[plan,hydrated]);
  useEffect(() => { if(hydrated) localStorage.setItem("fitlog-saved",JSON.stringify(saved)); },[saved,hydrated]);

  const addToPlan = useCallback((workout: Workout) => {
    if(plan.some(item=>item.id===workout.id)){ toast.error("Already in today's plan"); return; }
    if(saved.some(item=>item.id===workout.id)){ toast.error("Remove this workout from Saved first"); return; }
    if(plan.length>=5){ toast.error("Today's plan is capped at five lifts"); return; }
    setPlan(current=>[...current,{...workout,done:false}]);
    toast.success("Added to today's plan",{id:`plan-${workout.id}`});
  },[plan,saved]);
  const saveForLater = useCallback((workout: Workout) => {
    if(saved.some(item=>item.id===workout.id)){ toast.error("Already saved for later"); return; }
    if(plan.some(item=>item.id===workout.id)){ toast.error("Remove this workout from today's plan first"); return; }
    setSaved(current=>[...current,workout]);
    toast.success("Saved for later",{id:`saved-${workout.id}`});
  },[plan,saved]);
  const removeFromPlan = (id:number) => { setPlan(p=>p.filter(x=>x.id!==id)); toast.success("Removed from today's plan"); };
  const removeFromSaved = (id:number) => { setSaved(p=>p.filter(x=>x.id!==id)); toast.success("Removed from saved"); };
  const markDone = (id:number) => { setPlan(p=>p.map(x=>x.id===id?{...x,done:!x.done}:x)); toast.success("Workout status updated"); };
  const value = useMemo(()=>({plan,saved,hydrated,addToPlan,saveForLater,removeFromPlan,removeFromSaved,markDone,inPlan:(id:number)=>plan.some(x=>x.id===id),isSaved:(id:number)=>saved.some(x=>x.id===id)}),[plan,saved,hydrated,addToPlan,saveForLater]);
  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan(){ const value=useContext(PlanContext); if(!value) throw new Error("usePlan must be inside PlanProvider"); return value; }
