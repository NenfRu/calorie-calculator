/**
 * Logic for Calorie Calculator
 */

export interface CalculationInput {
  gender: "male" | "female";
  age: number;
  weight: number; // kg
  height: number; // cm
  activityLevel: string; // string key to map to float
  goalWeightLoss: number; // kg
  weeks: number;
}

export interface CalculationResult {
  bmr: number;
  tdee: number;
  dailyDeficit: number;
  targetCalories: number;
  kgPerWeek: number;
  isUnsafe: boolean;
}

const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  "1.2": 1.2,
  "1.375": 1.375,
  "1.55": 1.55,
  "1.725": 1.725,
  "1.9": 1.9,
};

export function calculateCalories(input: CalculationInput): CalculationResult {
  const { gender, age, weight, height, activityLevel, goalWeightLoss, weeks } = input;

  // 1. Calculate BMR (Mifflin-St Jeor)
  let bmr: number;
  if (gender === "male") {
    // BMR = 10*weight + 6.25*height - 5*age + 5
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    // BMR = 10*weight + 6.25*height - 5*age - 161
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // 2. Calculate TDEE
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.2;
  const tdee = bmr * multiplier;

  // 3. Calculate Deficits
  const totalDeficit = goalWeightLoss * 7700; // ~7700 kcal per kg of fat
  const dailyDeficit = totalDeficit / (weeks * 7);

  // 4. Target Calories
  const targetCalories = tdee - dailyDeficit;

  // 5. Estimated pace
  const kgPerWeek = (dailyDeficit * 7) / 7700;

  // 6. Safety check (>1000 deficit is generally considered aggressive/unsafe without supervision)
  const isUnsafe = dailyDeficit > 1000 || targetCalories < (gender === 'male' ? 1500 : 1200);

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    dailyDeficit: Math.round(dailyDeficit),
    targetCalories: Math.round(targetCalories),
    kgPerWeek: parseFloat(kgPerWeek.toFixed(2)),
    isUnsafe,
  };
}

// === TESTS (Client-side usage) ===
// Run this file or check console on app load if desired
/*
const test1 = calculateCalories({
  gender: 'male',
  age: 25,
  weight: 80,
  height: 180,
  activityLevel: '1.55',
  goalWeightLoss: 5,
  weeks: 10
});
console.assert(test1.bmr > 1500, "BMR should be reasonable for male");
console.assert(test1.targetCalories < test1.tdee, "Target should include deficit");

console.log("Tests loaded");
*/
