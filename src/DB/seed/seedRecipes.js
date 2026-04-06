import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import cloudinary from "../../utils/file-uploads/cloud-config.js";
import { Recipe } from "../models/recipe.model.js";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const connectDB = async()=>{
  await mongoose.connect(process.env.DB_URL);
  console.log("DB connected");
};
// upload image helper
// const uploadImage = async (imageName) => {
//   const imagePath = path.join(__dirname, "images", imageName);
//   const {secure_url, public_id} = await cloudinary.uploader.upload(
//     imagePath,
//     {folder: "healthy-app/recipes"}
//   );
//   return {secure_url, public_id};
// };
const uploadImage = async (imageName) => {
  try {
    const imagePath = path.join(__dirname, "images", imageName);

    const { secure_url, public_id } =
      await cloudinary.uploader.upload(imagePath, {
        folder: "healthy-app/recipes",
      });

    return { secure_url, public_id };
  } catch (err) {
    console.log("Image upload failed:", imageName, err.message);
    return {
      secure_url: "https://dummy.com/image.jpg",
      public_id: "dummy_id",
    };
  }
};
const seedRecipes = async() =>{
  try{
  await connectDB();
   console.log("1- DB connected");
  await Recipe.deleteMany();
  console.log("2- Old recipes deleted");
  console.log("3- Start uploading images...");
  const images = {
  salmon: await uploadImage("salmon.jpg"),
  quinoa: await uploadImage("quinoa.jpg"),
  grilledChicken: await uploadImage("grill-chicken.jpg"),
  chickenRice: await uploadImage("chicken-rice.jpg"),
  oatmeal: await uploadImage("oatmeal.jpg"),
  eggsToast: await uploadImage("eggs-toast.jpg"),
  yogurtBerry: await uploadImage("yogurt-berry.jpg"),
  beefStirFry: await uploadImage("beef-stir-fry.jpg"),
  tunaPasta: await uploadImage("tuna-pasta.jpg"),
  turkeyMeatballs: await uploadImage("turkey-meatballs.jpg"),
  shrimpRice: await uploadImage("shrimp-rice.jpg"),
  salmonSweetPotato: await uploadImage("salmon-sweet-potato.jpg"),
  yogurtSnack: await uploadImage("yogurt-snack.jpg"),
  applePB: await uploadImage("apple-pb.jpg"),
  proteinShake: await uploadImage("protein-shake.jpg"),
};
   console.log("4- Images uploaded");
  const recipes =[

{
  name: "Zesty Lemon Salmon",
  description: "A refreshing, protein-rich salmon dish packed with omega-3 fatty acids, perfect for a balanced lunch.",
  image: images.salmon,
  mealType: "lunch",
  calories: 450,
  cookingTime: 20,
  dietTags: ["high_protein", "low_carb", "gluten_free"],
  macros: { protein: 35, carbohydrates: 10, fats: 15 },
  ingredients: [
    { name: "Atlantic Salmon Fillet", quantity: "180g" },
    { name: "Lemon Juice & Zest", quantity: "1/2 lemon" },
    { name: "Extra Virgin Olive Oil", quantity: "1 tbsp" },
    { name: "Fresh Dill", quantity: "5g" },
  ],
  steps: [
  { order: 1, description: "Preheat oven to 180°C." },
  { order: 2, description: "Season salmon with lemon juice, zest, and olive oil." },
  { order: 3, description: "Place salmon in a baking dish and bake 15–20 minutes." },
  { order: 4, description: "Garnish with fresh dill and serve." },
],
  
},

{
  name: "Grilled Chicken Rice Bowl",
  description: "A balanced lunch bowl rich in lean protein and complex carbohydrates.",
  image: images.chickenRice,
  mealType: "lunch",
  calories: 560,
  cookingTime: 25,
  dietTags: ["high_protein"],
  macros: { protein: 42, carbohydrates: 55, fats: 14 },
  ingredients: [
    { name: "Grilled Chicken Breast", quantity: "160g" },
    { name: "Cooked White Rice", quantity: "1 cup" },
    { name: "Steamed Broccoli", quantity: "1 cup" },
    { name: "Olive Oil", quantity: "1 tbsp" },
  ],
  steps: [
  { order: 1, description: "Season chicken and grill until fully cooked." },
  { order: 2, description: "Cook white rice according to package instructions." },
  { order: 3, description: "Steam broccoli lightly." },
  { order: 4, description: "Assemble bowl with rice, chicken, broccoli, drizzle olive oil." },
],

},

{
  name: "Protein Oatmeal with Peanut Butter",
  description: "A hearty breakfast combining complex carbs and healthy fats.",
  image: images.oatmeal,
  mealType: "breakfast",
  calories: 420,
  cookingTime: 10,
  dietTags: [],
  macros: { protein: 20, carbohydrates: 45, fats: 14 },
  ingredients: [
    { name: "Rolled Oats", quantity: "1/2 cup (dry)" },
    { name: "Milk (low fat)", quantity: "1 cup" },
    { name: "Peanut Butter", quantity: "1 tbsp" },
    { name: "Banana", quantity: "1 small" },
  ],
  steps: [
  { order: 1, description: "Cook oats with milk over medium heat." },
  { order: 2, description: "Slice banana and stir into oats." },
  { order: 3, description: "Top with peanut butter and serve warm." },
],

},

{
  name: "Scrambled Eggs with Whole Wheat Toast",
  description: "A classic high-protein breakfast.",
  image: images.eggsToast,
  mealType: "breakfast",
  calories: 390,
  cookingTime: 10,
  dietTags: ["high_protein"],
  macros: { protein: 26, carbohydrates: 30, fats: 18 },
  ingredients: [
    { name: "Whole Eggs", quantity: "3 large" },
    { name: "Whole Wheat Bread", quantity: "2 slices" },
    { name: "Butter or Olive Oil", quantity: "1 tsp" },
  ],
  steps: [
  { order: 1, description: "Heat pan with butter or olive oil." },
  { order: 2, description: "Whisk eggs and cook on medium heat while stirring." },
  { order: 3, description: "Toast bread slices." },
  { order: 4, description: "Serve eggs with toast." },
],

},

{
  name: "Greek Yogurt Berry Bowl",
  description: "Protein-rich breakfast with antioxidants.",
  image: images.yogurtBerry,
  mealType: "breakfast",
  calories: 340,
  cookingTime: 5,
  dietTags: ["high_protein", "gluten_free"],
  macros: { protein: 24, carbohydrates: 32, fats: 10 },
  ingredients: [
    { name: "Greek Yogurt (low fat)", quantity: "250g" },
    { name: "Mixed Berries", quantity: "1 cup" },
    { name: "Honey", quantity: "1 tsp" },
  ],
  steps: [
  { order: 1, description: "Add yogurt to bowl." },
  { order: 2, description: "Top with mixed berries." },
  { order: 3, description: "Drizzle honey and serve." },
],

},

{
  name: "Quinoa Power Bowl",
  description: "Fiber-rich quinoa bowl with plant protein.",
  image: images.quinoa,
  mealType: "lunch",
  calories: 510,
  cookingTime: 20,
  dietTags: ["vegan", "gluten_free"],
  macros: { protein: 22, carbohydrates: 58, fats: 18 },
  ingredients: [
    { name: "Cooked Quinoa", quantity: "1 cup" },
    { name: "Chickpeas", quantity: "1/2 cup" },
    { name: "Avocado", quantity: "1/2 piece" },
  ],
  steps: [
  { order: 1, description: "Cook quinoa according to instructions." },
  { order: 2, description: "Mix quinoa with chickpeas." },
  { order: 3, description: "Add sliced avocado on top." },
  { order: 4, description: "Serve fresh." },
],

},

{
  name: "Beef Stir Fry with Vegetables",
  description: "Protein-dense lean beef meal.",
  image: images.beefStirFry,
  mealType: "lunch",
  calories: 620,
  cookingTime: 25,
  dietTags: ["high_protein", "low_carb"],
  macros: { protein: 40, carbohydrates: 45, fats: 22 },
  ingredients: [
    { name: "Lean Beef Strips", quantity: "170g" },
    { name: "Bell Peppers", quantity: "1 cup" },
    { name: "Onion", quantity: "1 medium" },
    { name: "Soy Sauce", quantity: "1 tbsp" },
    { name: "Olive Oil", quantity: "1 tbsp" },
  ],
  steps: [
  { order: 1, description: "Cook quinoa according to instructions." },
  { order: 2, description: "Mix quinoa with chickpeas." },
  { order: 3, description: "Add sliced avocado on top." },
  { order: 4, description: "Serve fresh." },
],

},

{
  name: "Tuna Pasta Salad",
  description: "Balanced pasta dish rich in protein.",
  image: images.tunaPasta,
  mealType: "lunch",
  calories: 580,
  cookingTime: 15,
  dietTags: ["high_protein"],
  macros: { protein: 38, carbohydrates: 60, fats: 14 },
  ingredients: [
    { name: "Cooked Whole Wheat Pasta", quantity: "1.5 cups" },
    { name: "Canned Tuna (in water)", quantity: "160g" },
    { name: "Olive Oil", quantity: "1 tbsp" },
    { name: "Cherry Tomatoes", quantity: "1/2 cup" },
  ],
  steps: [
  { order: 1, description: "Cook pasta and let cool." },
  { order: 2, description: "Mix tuna with olive oil." },
  { order: 3, description: "Combine pasta, tuna, tomatoes." },
  { order: 4, description: "Serve chilled." },
],

},

{
  name: "Grilled Chicken Salad",
  description: "High-protein light dinner.",
  image: images.grilledChicken,
  mealType: "dinner",
  calories: 380,
  cookingTime: 20,
  dietTags: ["high_protein", "low_carb", "gluten_free"],
  macros: { protein: 42, carbohydrates: 12, fats: 14 },
  ingredients: [
    { name: "Grilled Chicken Breast", quantity: "150g" },
    { name: "Mixed Greens", quantity: "2 cups" },
    { name: "Olive Oil", quantity: "1 tbsp" },
  ],
  steps: [
  { order: 1, description: "Grill chicken until cooked through." },
  { order: 2, description: "Prepare mixed greens in bowl." },
  { order: 3, description: "Slice chicken and place on greens." },
  { order: 4, description: "Drizzle olive oil and serve." },
],

},

{
  name: "Turkey Meatballs with Mashed Potatoes",
  description: "Comforting high-protein dinner.",
  image: images.turkeyMeatballs,
  mealType: "dinner",
  calories: 520,
  cookingTime: 30,
  dietTags: ["high_protein"],
  macros: { protein: 36, carbohydrates: 42, fats: 18 },
  ingredients: [
    { name: "Lean Ground Turkey", quantity: "180g" },
    { name: "Potatoes", quantity: "250g" },
    { name: "Olive Oil", quantity: "1 tbsp" },
  ],
  steps: [
  { order: 1, description: "Form turkey into meatballs." },
  { order: 2, description: "Cook meatballs in oven or pan." },
  { order: 3, description: "Boil potatoes and mash." },
  { order: 4, description: "Serve together." },
],

},

{
  name: "Grilled Shrimp with Rice",
  description: "Light protein-rich dinner.",
  image: images.shrimpRice,
  mealType: "dinner",
  calories: 470,
  cookingTime: 20,
  dietTags: ["high_protein", "gluten_free"],
  macros: { protein: 38, carbohydrates: 50, fats: 10 },
  ingredients: [
    { name: "Grilled Shrimp", quantity: "180g" },
    { name: "Cooked White Rice", quantity: "1 cup" },
  ],
  steps: [
  { order: 1, description: "Form turkey into meatballs." },
  { order: 2, description: "Cook meatballs in oven or pan." },
  { order: 3, description: "Boil potatoes and mash." },
  { order: 4, description: "Serve together." },
],

},

{
  name: "Baked Salmon with Sweet Potato",
  description: "Nutrient-dense dinner.",
  image: images.salmonSweetPotato,
  mealType: "dinner",
  calories: 480,
  cookingTime: 25,
  dietTags: ["high_protein", "gluten_free"],
  macros: { protein: 34, carbohydrates: 38, fats: 18 },
  ingredients: [
    { name: "Baked Salmon Fillet", quantity: "170g" },
    { name: "Sweet Potato", quantity: "200g" },
  ],
  steps: [
  { order: 1, description: "Season shrimp and grill." },
  { order: 2, description: "Cook rice." },
  { order: 3, description: "Serve shrimp over rice." },
],

},

{
  name: "Greek Yogurt with Honey & Almonds",
  description: "High-protein snack.",
  image: images.yogurtSnack,
  mealType: "snack",
  calories: 220,
  cookingTime: 5,
  dietTags: ["high_protein", "gluten_free"],
  macros: { protein: 18, carbohydrates: 18, fats: 9 },
  ingredients: [
    { name: "Greek Yogurt (plain)", quantity: "200g" },
    { name: "Honey", quantity: "1 tsp" },
  ],
  steps: [
  { order: 1, description: "Add yogurt to bowl." },
  { order: 2, description: "Top with honey." },
  { order: 3, description: "Add almonds and serve." },
],

},

{
  name: "Apple with Peanut Butter",
  description: "Simple snack.",
  image: images.applePB,
  mealType: "snack",
  calories: 210,
  cookingTime: 3,
  dietTags: ["gluten_free"],
  macros: { protein: 6, carbohydrates: 24, fats: 12 },
  ingredients: [
    { name: "Apple", quantity: "1 medium" },
    { name: "Peanut Butter", quantity: "1 tbsp" },
  ],
  steps: [
  { order: 1, description: "Slice apple." },
  { order: 2, description: "Serve with peanut butter." },
],

},

{
  name: "Protein Shake with Milk",
  description: "Post-workout snack.",
  image: images.proteinShake,
  mealType: "snack",
  calories: 260,
  cookingTime: 2,
  dietTags: ["high_protein", "gluten_free"],
  macros: { protein: 30, carbohydrates: 18, fats: 6 },
  ingredients: [
    { name: "Whey Protein Powder", quantity: "1 scoop" },
    { name: "Low Fat Milk", quantity: "1 cup" },
  ],
  steps: [
  { order: 1, description: "Slice apple." },
  { order: 2, description: "Serve with peanut butter." },
],

}

];
  console.log("5- Start inserting recipes...");
  await Recipe.insertMany(recipes);
  console.log("6- Recipes inserted successfully");
console.log("Recipes seeded successfully");
process.exit();

  } catch (error) {
  console.error("SEED ERROR:", error);
  process.exit(1);
}

};
seedRecipes();
