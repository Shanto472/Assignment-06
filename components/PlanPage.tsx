"use client";
import { Suspense,useEffect,useMemo,useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck,faChevronDown,faDumbbell,faXmark } from "@fortawesome/free-solid-svg-icons";
import { usePlan } from "@/context/PlanContext";
import Stats from "./Stats";

type SortKey="duration"|"calories"|"rating";

function PlanContent(){
  const params=useSearchParams();
  const {plan,saved,hydrated,markDone,removeFromPlan,removeFromSaved}=usePlan();
  const [tab,setTab]=useState<"plan"|"saved">(params.get("tab")==="saved"?"saved":"plan");
  const [sort,setSort]=useState<SortKey>("duration");
  useEffect(()=>setTab(params.get("tab")==="saved"?"saved":"plan"),[params]);
  const activeItems=tab==="plan"?plan:saved;
  const items=useMemo(()=>[...activeItems].sort((a,b)=>sort==="rating"?b.rating-a.rating:sort==="calories"?b.caloriesBurned-a.caloriesBurned:a.duration-b.duration),[activeItems,sort]);
  const metrics=useMemo(()=>({exercises:activeItems.length,minutes:activeItems.reduce((s,w)=>s+w.duration,0),calories:activeItems.reduce((s,w)=>s+w.caloriesBurned,0)}),[activeItems]);
  if(!hydrated)return <div className="grid min-h-[50vh] place-items-center"><p className="animate-pulse uppercase tracking-widest text-[#a4a9a1]">Loading workouts…</p></div>;

  return <div className="container-shell py-12 md:py-14">
    <div><h1 className="text-4xl font-semibold uppercase">My Plan</h1><p className="mt-2 text-sm text-[#929891]">Cap of five lifts for today. Finish them, then load more.</p></div>
    <div className="my-8 grid overflow-hidden rounded-2xl border border-[#2a2f37] bg-[#15181e] sm:grid-cols-3">
      {[["Exercises",metrics.exercises],["Minutes",metrics.minutes],["Calories",metrics.calories]].map(([label,value],index)=><div key={String(label)} className={`px-7 py-7 ${index<2?'border-b border-[#282d34] sm:border-b-0 sm:border-r':''}`}><p className="text-xs text-[#8f958e]">{label}</p><p className={`display mt-2 text-4xl font-semibold ${index===0?'lime':''}`}>{value}</p></div>)}
    </div>
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex w-fit rounded-xl border border-[#2b3038] bg-[#171a20] p-1"><button onClick={()=>setTab("plan")} className={`rounded-lg px-5 py-2 text-xs font-bold ${tab==='plan'?'bg-[#292e38] text-white':'text-[#828881]'}`}>Today&apos;s Plan</button><button onClick={()=>setTab("saved")} className={`rounded-lg px-5 py-2 text-xs font-bold ${tab==='saved'?'bg-[#292e38] text-white':'text-[#828881]'}`}>Saved</button></div>
      <label className="relative flex items-center gap-3 text-xs text-[#777d76]"><span>Sort By</span><select value={sort} onChange={e=>setSort(e.target.value as SortKey)} className="h-11 appearance-none rounded-lg border border-[#2b3038] bg-[#14171c] px-4 pr-10 text-xs font-semibold text-white outline-none"><option value="duration">Duration</option><option value="calories">Calories</option><option value="rating">Rating</option></select><FontAwesomeIcon icon={faChevronDown} className="pointer-events-none absolute right-4 text-[10px]"/></label>
    </div>
    {items.length?<div className="space-y-3">{items.map(workout=>{const done="done" in workout&&Boolean(workout.done);return <article key={workout.id} className={`grid items-center gap-5 border border-[#30332f] bg-[#151716] p-3 sm:grid-cols-[130px_1fr_auto] ${done?'opacity-70':''}`}>
      <div className="relative aspect-[4/3] overflow-hidden bg-[#242724]"><Image src={workout.image} alt={workout.name} fill sizes="130px" className="object-cover"/>{done&&<span className="absolute inset-0 grid place-items-center bg-black/55 text-3xl lime"><FontAwesomeIcon icon={faCheck}/></span>}</div>
      <div><div className="flex flex-wrap gap-1.5">{workout.muscleGroups.map(t=><span className="tag" key={t}>{t}</span>)}</div><h2 className={`mt-2 text-xl font-semibold uppercase ${done?'line-through':''}`}>{workout.name}</h2><p className="mb-3 mt-1 text-sm text-[#8e938b]">{workout.equipment}</p><Stats duration={workout.duration} calories={workout.caloriesBurned} rating={workout.rating}/></div>
      <div className="flex flex-wrap gap-2 sm:max-w-[185px] sm:justify-end"><Link href={`/workouts/${workout.id}`} className="btn btn-ghost !min-h-9 !px-3 !py-1 text-[10px]">View Details</Link>{tab==='plan'&&<button onClick={()=>markDone(workout.id)} className={`btn !min-h-9 !px-3 !py-1 text-[10px] ${done?'border-[#6f852f] bg-[#263500] text-[#c9ff38]':'border-[#c9ff38] bg-[#c9ff38] text-black hover:bg-[#ddff7c]'}`}><FontAwesomeIcon icon={faCheck}/>{done?'Completed':'Mark as Done'}</button>}<button aria-label={`Remove ${workout.name}`} onClick={()=>tab==='plan'?removeFromPlan(workout.id):removeFromSaved(workout.id)} className="grid h-9 w-9 place-items-center border border-[#553531] text-[#ff7967] hover:bg-[#331a17]"><FontAwesomeIcon icon={faXmark}/></button></div>
    </article>})}</div>:<div className="border border-dashed border-[#3b3f39] px-5 py-20 text-center"><FontAwesomeIcon icon={faDumbbell} className="text-4xl text-[#464b44]"/><h2 className="mt-5 text-3xl font-semibold uppercase">Nothing here yet</h2><p className="mx-auto mt-3 max-w-md text-[#949990]">Browse the library and add a lift to get today moving.</p><Link href="/#library" className="btn btn-primary mt-6">Go to workouts</Link></div>}
  </div>
}
export default function PlanPage(){return <Suspense fallback={<div className="grid min-h-[60vh] place-items-center">Loading workouts…</div>}><PlanContent/></Suspense>}
