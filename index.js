const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data.json");

const MONGODB_URI =
  "mongodb+srv://pdellacassa:7deabril-@cluster0.tevzt.mongodb.net/test";

let newRecipe = {
  title: "Chivito",
  level: "Easy Peasy",
  ingredients: ["Steak", "Bread", "Egg", "Jam", "Cheese", "Tomato", "Lettuce"],
  cuisine: "Uruguayan",
  dishType: "other",
  image: "https://img.cocinarico.es/2020-07/chivito-uruguayo-1.jpg",
  duration: 30,
  creator: "Uruguayan people",
  created: "1960-01-01",
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {newRecipe;})
  .then(() => console.log(newRecipe.title))
  // Run your code here, after you have insured that the connection was made    Recipe.create({
  .then(() => Recipe.insertMany(data))
  .then((recipes) => recipes.forEach((element) => console.log(element.title)))
  .then(() => Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }), console.log(`The recipe Rigatoni alla Genovese is updated`))
  .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))
  .then(() => console.log("it deleted succsessfully"))
  .then(() => mongoose.connection.close())
  .catch((error) => {console.error("Error connecting to the database", error);});
