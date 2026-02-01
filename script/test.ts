
// Wrapper to test the calculation logic from console
import { calculateCalories, type CalculationInput } from "../client/src/lib/calc";

console.log("Running calculation tests...");

// Test Case 1: Average Male
const maleInput: CalculationInput = {
  gender: "male",
  age: 25,
  weight: 80,
  height: 180,
  activityLevel: "1.55",
  goalWeightLoss: 0, // maintenance
  weeks: 1
};

const resultMale = calculateCalories(maleInput);
// Manual BMR check: 10*80 + 6.25*180 - 5*25 + 5 = 800 + 1125 - 125 + 5 = 1805
console.assert(resultMale.bmr === 1805, `Expected BMR 1805, got ${resultMale.bmr}`);
console.assert(resultMale.tdee === Math.round(1805 * 1.55), `Expected TDEE ${Math.round(1805 * 1.55)}, got ${resultMale.tdee}`);
console.log("Test 1 (Male Maintenance) Passed");

// Test Case 2: Female Weight Loss
const femaleInput: CalculationInput = {
  gender: "female",
  age: 30,
  weight: 70,
  height: 165,
  activityLevel: "1.2",
  goalWeightLoss: 5,
  weeks: 10
};

const resultFemale = calculateCalories(femaleInput);
// Manual BMR check: 10*70 + 6.25*165 - 5*30 - 161 = 700 + 1031.25 - 150 - 161 = 1420.25 -> 1420
// TDEE: 1420.25 * 1.2 = 1704.3 -> 1704
// Total Deficit: 5 * 7700 = 38500
// Daily Deficit: 38500 / 70 = 550
// Target: 1704 - 550 = 1154
console.assert(resultFemale.dailyDeficit === 550, `Expected Daily Deficit 550, got ${resultFemale.dailyDeficit}`);
console.log("Test 2 (Female Weight Loss) Passed");

// Test Case 3: Safety Warning
const unsafeInput: CalculationInput = {
  ...maleInput,
  goalWeightLoss: 20, // Huge goal
  weeks: 4 // Short time
};
// Deficit: 20 * 7700 / 28 = 5500 kcal/day -> Should be unsafe
const resultUnsafe = calculateCalories(unsafeInput);
console.assert(resultUnsafe.isUnsafe === true, "Expected unsafe warning");
console.log("Test 3 (Safety Warning) Passed");

console.log("All tests passed!");
