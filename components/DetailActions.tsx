"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark,faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { usePlan } from "@/context/PlanContext";
import type { Workout } from "@/types/workout";
export default function DetailActions({workout}:{workout:Workout}){const {addToPlan,saveForLater,inPlan,isSaved,plan}=usePlan();const planDisabled=inPlan(workout.id)||plan.length>=5;return <div className="flex flex-col gap-3 sm:flex-row"><button onClick={()=>addToPlan(workout)} disabled={planDisabled} className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-45"><FontAwesomeIcon icon={faCalendarPlus}/>{inPlan(workout.id)?"In today's plan":plan.length>=5?"Plan is full":"Add to today's plan"}</button><button onClick={()=>saveForLater(workout)} disabled={isSaved(workout.id)} className="btn btn-ghost disabled:cursor-not-allowed disabled:opacity-45"><FontAwesomeIcon icon={faBookmark}/>{isSaved(workout.id)?"Saved":"Save for later"}</button></div>}
