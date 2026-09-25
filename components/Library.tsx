"use client";
import { useMemo,useState } from "react";
import { faChevronDown,faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Workout } from "@/types/workout";
import WorkoutCard from "./WorkoutCard";
export default function Library({workouts}:{workouts:Workout[]}){
  const [sort,setSort]=useState("duration"); const [query,setQuery]=useState("");
  const list=useMemo(()=>workouts.filter(w=>`${w.name} ${w.muscleGroups.join(' ')}`.toLowerCase().includes(query.toLowerCase())).toSorted((a,b)=>sort==="rating"?b.rating-a.rating:sort==="calories"?b.caloriesBurned-a.caloriesBurned:a.duration-b.duration),[workouts,sort,query]);
  return <section id="library" className="scroll-mt-24 border-t border-[#242724] py-20">
    <div className="container-shell"><div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="mb-3 text-xs font-bold tracking-[.25em] lime">12 MOVEMENTS · ALL LEVELS</p><h2 className="section-title">THE LIBRARY</h2><p className="mt-3 text-[#969b94]">Twelve lifts covering every major muscle group.</p></div><div className="flex flex-col gap-3 sm:flex-row"><label className="flex items-center gap-2 border border-[#343833] bg-[#121412] px-4"><FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#757b72]"/><input aria-label="Search workouts" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search name or tag" className="h-11 w-full bg-transparent text-sm outline-none"/></label><label className="relative flex items-center border border-[#343833] bg-[#121412]"><span className="pl-4 text-xs uppercase text-[#848a81]">Sort by</span><select value={sort} onChange={e=>setSort(e.target.value)} className="h-11 appearance-none bg-transparent px-3 pr-9 text-sm font-bold uppercase outline-none"><option className="bg-black" value="duration">Duration</option><option className="bg-black" value="calories">Calories</option><option className="bg-black" value="rating">Rating</option></select><FontAwesomeIcon icon={faChevronDown} className="pointer-events-none absolute right-3 text-xs lime"/></label></div></div>
    {list.length?<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map(workout=><WorkoutCard workout={workout} key={workout.id}/>)}</div>:<div className="border border-[#30332f] p-12 text-center text-[#999e96]">No workouts match “{query}”.</div>}
    </div></section>}
