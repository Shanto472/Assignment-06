"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark,faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { usePlan } from "@/context/PlanContext";
import type { Workout } from "@/types/workout";
export default function DetailActions({workout}:{workout:Workout}){const {addToPlan,saveForLater,inPlan,isSaved,plan}=usePlan();const planned=inPlan(workout.id);const saved=isSaved(workout.id);const planDisabled=planned||saved||plan.length>=5;return <div className="flex flex-col gap-3 sm:flex-row"><button onClick={()=>addToPlan(workout)} disabled={planDisabled} className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-45"><FontAwesomeIcon icon={faCalendarPlus}/>{planned?"In today's plan":saved?"Already saved":plan.length>=5?"Plan is full":"Add to today's plan"}</button><button onClick={()=>saveForLater(workout)} disabled={saved||planned} className="btn btn-ghost disabled:cursor-not-allowed disabled:opacity-45"><FontAwesomeIcon icon={faBookmark}/>{saved?"Saved":planned?"Already in plan":"Save for later"}</button></div>}
