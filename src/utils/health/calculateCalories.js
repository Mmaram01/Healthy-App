export const calculateDailyCalories = ({
  gender,
  age,
  height,
  weight,
  activityLevel,
  goal,
})=>{
  let bmr;
  if(gender === "male"){
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else{
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const activityMultiplier ={
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very: 1.725
  };
  const tdee = bmr * activityMultiplier[activityLevel];
  let calories = tdee;

  if(goal === "lose"){
    calories = tdee - 900;   
  }

  if(goal === "gain"){
    calories = tdee + 700;  
  }

  if(goal === "maintain"){
    calories = tdee;
  }

  return{
    dailyCalories: Math.round(calories),
    tdee: Math.round(tdee)
  };

};