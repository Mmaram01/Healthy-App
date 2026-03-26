export const calculateWeightProgress = ({
  currentWeight,
  targetKg,
  weeks,
  type
})=>{
  const progress =[];
  const changePerWeek =targetKg / weeks;
  for(let i = 1;i<= weeks; i++){
    let weight;
    if(type=== "lose"){weight = currentWeight - (changePerWeek * i);
    } else {
      weight = currentWeight + (changePerWeek * i);
    }
    progress.push({week: i,expectedWeight:Number(weight.toFixed(1))});
  }

  return progress;
};