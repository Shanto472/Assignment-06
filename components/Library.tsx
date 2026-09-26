import type { Workout } from "@/types/workout";
import WorkoutCard from "./WorkoutCard";
export default function Library({workouts}:{workouts:Workout[]}){
  return <section id="library" className="scroll-mt-24 border-t border-[#242724] py-20">
    <div className="container-shell"><div className="mb-10"><p className="mb-3 text-xs font-bold tracking-[.25em] lime">12 MOVEMENTS · ALL LEVELS</p><h2 className="section-title">THE LIBRARY</h2><p className="mt-3 text-[#969b94]">Twelve lifts covering every major muscle group.</p></div>
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{workouts.map(workout=><WorkoutCard workout={workout} key={workout.id}/>)}</div>
    </div></section>}
