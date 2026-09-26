import Link from "next/link";
import Image from "next/image";
export default function Logo(){return <Link href="/" className="flex items-center gap-2"><Image src="/logo.png" alt="FitLog logo" width={28} height={28} className="h-7 w-7 object-contain" priority/><span className="display text-lg font-bold tracking-[.08em]">FITLOG</span></Link>}
