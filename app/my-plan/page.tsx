import type { Metadata } from "next";
import PlanPage from "@/components/PlanPage";
export const metadata:Metadata={title:"My Plan",description:"Build and track today's workout plan."};
export default function Page(){return <PlanPage/>}
