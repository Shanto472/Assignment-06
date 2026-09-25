import type { Workout } from "@/types/workout";

export const API_URL = "https://api.abcz.workers.dev/api/fitlog";

const base = [
  [1,"Barbell Bench Press","Chest|Arms","Barbell, Bench","Intermediate",25,180,4,"6-8",4.8,"A compound press that builds chest thickness, triceps, and pressing power from a stable bench."],
  [2,"Pull-Up","Back|Arms","Pull-up Bar","Intermediate",15,120,4,"6-10",4.7,"Bodyweight vertical pull that hammers lats, biceps, and grip while improving relative strength."],
  [3,"Back Squat","Legs|Core","Barbell, Rack","Advanced",30,240,5,"5-8",4.9,"The king of lower-body lifts: quads, glutes, and spinal stability under a loaded bar."],
  [4,"Overhead Press","Shoulders|Arms","Barbell","Intermediate",20,150,4,"6-8",4.6,"Strict standing press that builds delts, triceps, and overhead stability without leg drive."],
  [5,"Dumbbell Bicep Curl","Arms","Dumbbells","Beginner",12,80,3,"10-12",4.3,"An isolation curl to thicken the biceps with a full stretch and a hard peak contraction."],
  [6,"Hollow-Body Plank","Core","Bodyweight","Beginner",10,60,3,"30-45s",4.4,"A braced plank variation that trains anti-extension through the entire anterior core."],
  [7,"Burpee","Full Body","Bodyweight","Intermediate",12,160,4,"8-12",4.2,"A high-output full-body drill that mixes a squat, plank, and jump for conditioning."],
  [8,"Conventional Deadlift","Back|Legs","Barbell","Advanced",28,260,4,"3-5",4.9,"Hip-hinge powerhouse for the posterior chain, grip, and total-body tension."],
  [9,"Push-Up","Chest|Arms|Core","Bodyweight","Beginner",10,90,3,"12-15",4.5,"A scalable pressing staple that trains chest, triceps, and a rigid trunk."],
  [10,"Walking Lunge","Legs","Dumbbells (optional)","Beginner",18,170,3,"10-12/leg",4.4,"Unilateral stepping pattern that builds quads, glutes, and balance under load."],
  [11,"Russian Twist","Core","Medicine Ball","Beginner",8,70,3,"16-20",4.1,"Rotational core work that trains the obliques while you stay balanced on the sit bones."],
  [12,"Kettlebell Swing","Full Body|Shoulders","Kettlebell","Intermediate",16,200,5,"12-15",4.7,"Explosive hip hinge that builds posterior power, grip, and conditioning in one move."],
] as const;

const images = [
  "portrait-anime-character-doing-fitness-exercising_23-2151666664.jpg",
  "3d-cartoon-fitness-man_23-2151691400.jpg","3d-cartoon-fitness-man_23-2151691401.jpg",
  "portrait-anime-character-doing-fitness-exercising_23-2151666703.jpg",
  "portrait-anime-character-doing-fitness-exercising_23-2151666702.jpg",
  "3d-cartoon-fitness-man_23-2151691489.jpg","3d-cartoon-business-character_1048-16544.jpg",
  "portrait-anime-character-doing-fitness-exercising_23-2151666704.jpg",
  "3d-cartoon-fitness-man_23-2151691429.jpg",
  "portrait-anime-character-doing-fitness-exercising_23-2151666701.jpg",
  "3d-cartoon-fitness-man_23-2151691487.jpg","3d-cartoon-fitness-man_23-2151691505.jpg",
];

const instructionSets = [
  ["Set your position with a tight brace and stable base.","Move through the full range with steady control.","Pause briefly at the strongest position.","Return under control and reset before the next rep."],
  ["Begin in a balanced position and secure your grip.","Brace your core before starting each repetition.","Drive smoothly through the working muscles.","Finish under control while maintaining alignment."],
];

export const fallbackWorkouts: Workout[] = base.map((w, i) => ({
  id:w[0], name:w[1], muscleGroups:w[2].split("|"), equipment:w[3], difficulty:w[4], duration:w[5],
  caloriesBurned:w[6], sets:w[7], reps:w[8], rating:w[9], description:w[10],
  image:`/workouts/workout-${i+1}.jpg`, instructions:instructionSets[i%2],
}));

export async function getWorkouts(): Promise<Workout[]> {
  try {
    const response = await fetch(API_URL, { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error("Workout API unavailable");
    const data: Workout[] = await response.json();
    return data.map((workout) => ({ ...workout, image: `/workouts/workout-${workout.id}.jpg` }));
  } catch {
    return fallbackWorkouts;
  }
}

export async function getWorkout(id: string): Promise<Workout | undefined> {
  const workouts = await getWorkouts();
  return workouts.find((workout) => workout.id === Number(id));
}
