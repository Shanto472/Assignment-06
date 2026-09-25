"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import Logo from "./Logo";

export default function Navbar(){
  const pathname=usePathname(); const {plan,saved,hydrated}=usePlan();
  const active=(href:string)=>href==="/"?pathname==="/":pathname.startsWith(href);
  return <header className="sticky top-0 z-50 border-b border-[#292c28] bg-[#0b0c0cf2] backdrop-blur">
    <nav className="container-shell flex min-h-[72px] items-center justify-between gap-4">
      <Logo/>
      <div className="hidden items-center gap-8 sm:flex">
        {[['/','Workout'],['/my-plan','My Plan']].map(([href,label])=><Link key={href} href={href} className={`relative py-6 text-sm font-semibold ${active(href)?'text-[#c9ff38]':'text-[#aeb2ac] hover:text-white'}`}>{label}{active(href)&&<span className="absolute inset-x-0 bottom-0 h-[2px] bg-[#c9ff38]"/>}</Link>)}
      </div>
      <div className="flex gap-2 text-[11px] font-extrabold uppercase tracking-wider">
        <Link href="/my-plan" className="rounded-full bg-[#c9ff38] px-3 py-2 text-black">Plan <span className="ml-1">{hydrated?plan.length:0}</span></Link>
        <Link href="/my-plan?tab=saved" className="rounded-full border border-[#686d65] px-3 py-2">Saved <span className="ml-1 lime">{hydrated?saved.length:0}</span></Link>
      </div>
    </nav>
    <div className="flex justify-center gap-8 border-t border-[#222520] py-2 sm:hidden"><Link href="/">Workout</Link><Link href="/my-plan">My Plan</Link></div>
  </header>
}
