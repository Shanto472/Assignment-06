import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata:Metadata={title:{default:"FitLog — Workout Library",template:"%s | FitLog"},description:"Train with intent. Log every set."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Providers><Navbar/><main className="min-h-[calc(100vh-150px)]">{children}</main><Footer/></Providers></body></html>}
