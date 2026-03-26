export const calculateMacros = (dailyCalories) => {
  return {
    protein: Math.round((dailyCalories * 0.3) / 4),
    carbohydrates: Math.round((dailyCalories * 0.4) / 4),
    fats: Math.round((dailyCalories * 0.3) / 9),
  };
};
