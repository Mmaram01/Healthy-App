export const calculateWeightChangeDuration = ({
  tdee,
  dailyCalories,
  targetKg,
  type,
}) => {

  let changePerDay;

  if (type === "lose") {
    changePerDay = tdee - dailyCalories;
  }

  if (type === "gain") {
    changePerDay = dailyCalories - tdee;
  }

  const totalCalories = targetKg * 7700;

  const days = Math.ceil(totalCalories / changePerDay);
  const weeks = Math.ceil(days / 7);
  const months = Math.ceil(days / 30);

  return { days, weeks, months };
};