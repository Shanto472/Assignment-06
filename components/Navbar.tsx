"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import Logo from "./Logo";

export default function Navbar(){
  const pathname=usePathname(); const {plan,saved,hydrated}=usePlan();
  const active=(href:string)=>href==="/"?pathname==="/":pathname.startsWith(href);
  return <header className="sticky top-0 z-50 border-b border-[#202329] bg-[#0c0e11f2] backdrop-blur">
    <nav className="container-shell flex min-h-[58px] items-center justify-between gap-4">
      <Logo/>
      <div className="hidden items-center gap-8 sm:flex">
        {[['/','Workouts'],['/my-plan','My Plan']].map(([href,label])=><Link key={href} href={href} className={`rounded-full px-5 py-2 text-xs font-semibold ${active(href)?'bg-[#263500] text-[#c9ff00]':'text-[#939990] hover:text-white'}`}>{label}</Link>)}
      </div>
      <div className="flex gap-4 text-[11px] font-medium text-[#b0b5ad]">
        <Link href="/my-plan">Plan <span className="ml-1 inline-grid h-5 w-5 place-items-center rounded-full bg-[#c9ff00] font-bold text-black">{hydrated?plan.length:0}</span></Link>
        <Link href="/my-plan?tab=saved">Saved <span className="ml-1 inline-grid h-5 w-5 place-items-center rounded-full border border-[#444a50]">{hydrated?saved.length:0}</span></Link>
      </div>
    </nav>
    <div className="flex justify-center gap-8 border-t border-[#222520] py-2 text-xs sm:hidden"><Link href="/">Workouts</Link><Link href="/my-plan">My Plan</Link></div>
  </header>
}
