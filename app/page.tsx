import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown,faDumbbell } from "@fortawesome/free-solid-svg-icons";
import Library from "@/components/Library";
import { getWorkouts } from "@/lib/workouts";
export default async function Home(){const workouts=await getWorkouts();return <>
  <section className="bg-[#0b0d10] px-3 pb-6 pt-28 md:pt-56"><div className="container-shell grid min-h-[400px] items-center gap-8 rounded-2xl border border-[#292d34] bg-[#15181e] px-8 py-12 md:px-14 lg:grid-cols-[1fr_310px]">
    <div><p className="mb-5 text-[10px] font-extrabold tracking-[.14em] lime">WORKOUT LIBRARY</p><h1 className="max-w-2xl text-[clamp(2.7rem,5vw,4.6rem)] font-bold uppercase leading-[.92] tracking-[-.035em]">Train with intent. Log<br className="hidden sm:block"/> every set.</h1><p className="mt-5 max-w-xl text-sm leading-6 text-[#9ba19a]">FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.</p><Link href="#library" className="btn btn-primary mt-6 !min-h-10 !px-5 text-[10px]"><FontAwesomeIcon icon={faDumbbell}/>Browse Workouts<FontAwesomeIcon icon={faArrowDown}/></Link></div>
    <div className="relative mx-auto h-[280px] w-full max-w-[280px]"><Image src="/hero-workout.png" alt="Anatomical athlete using a seated row machine" fill priority sizes="280px" className="object-contain"/></div>
  </div></section><Library workouts={workouts}/></>}
