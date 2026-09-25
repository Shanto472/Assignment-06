import Image from "next/image";
import Link from "next/link";
import type { Workout } from "@/types/workout";
import Stats from "./Stats";
export default function WorkoutCard({workout}:{workout:Workout}){return <Link href={`/workouts/${workout.id}`} className="group overflow-hidden border border-[#2b2e2a] bg-[#151716] transition hover:-translate-y-1 hover:border-[#6c7f32]">
  <div className="relative aspect-[4/3] overflow-hidden bg-[#242723]"><Image src={workout.image} alt={workout.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover grayscale-[15%] transition duration-500 group-hover:scale-105 group-hover:grayscale-0"/><div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#151716] to-transparent"/></div>
  <div className="-mt-8 relative p-5 pt-0"><div className="mb-3 flex flex-wrap gap-1.5">{workout.muscleGroups.map(tag=><span className="tag" key={tag}>{tag}</span>)}</div><h3 className="text-xl font-semibold uppercase tracking-tight group-hover:text-[#c9ff38]">{workout.name}</h3><p className="mb-5 mt-2 text-sm text-[#92978f]">{workout.equipment}</p><div className="border-t border-[#30332f] pt-4"><Stats duration={workout.duration} calories={workout.caloriesBurned} rating={workout.rating}/></div></div>
 </Link>}
