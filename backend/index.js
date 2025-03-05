import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import Recipe from "./models/recipe.model.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// accepts json data from body (a middleware)
app.use(express.json());

// Debugging - Check if .env is loading properly if its says undefined move .env to root directory
// console.log("PORT:", process.env.PORT);
// console.log("DB_URL:", process.env.DB_URL);

const main = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("✅ MongoDB Connected");

        /* ---------- Routes ---------- */
        app.get("/", (req, res) => res.send("✅ Database Connected" + "<br>" + "🚀 Server Activated..."));
        
        // creating recipe
        app.post("/api/recipe/add", async (req, res) => {
            try {
                const { productTitle, category, subCategory, description, mainProductImage, ingredientsList, ingredientsListsImages, instructions } = req.body;
        
                // Basic Validation
                if (!productTitle || !category || !subCategory || !description || !mainProductImage) {
                    return res.status(400).json({ message: "❌ Missing required fields. Ensure all mandatory fields are filled." });
                }
        
                // Check ingredientsList
                if (!Array.isArray(ingredientsList) || ingredientsList.length === 0) {
                    return res.status(400).json({ message: "❌ ingredientsList must be a non-empty array." });
                }
        
                for (const ingredient of ingredientsList) {
                    if (!ingredient.name || !ingredient.quantity) {
                        return res.status(400).json({ message: "❌ Each ingredient must have a name and quantity." });
                    }
                }
        
                // Check instructions
                if (!Array.isArray(instructions) || instructions.length === 0) {
                    return res.status(400).json({ message: "❌ instructions must be a non-empty array." });
                }
        
                for (const step of instructions) {
                    if (!step.text) {
                        return res.status(400).json({ message: "❌ Each instruction step must have text." });
                    }
                }
        
                // Ensure mainProductImage is a valid URL
                const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

                if (!urlRegex.test(mainProductImage)) {
                    return res.status(400).json({ message: "❌ Invalid URL format for mainProductImage." });
                }
        
                // Ensure ingredientsListsImages (if provided) are valid URLs
                if (ingredientsListsImages && !ingredientsListsImages.every(img => urlRegex.test(img))) {
                    return res.status(400).json({ message: "❌ All ingredient images must be valid URLs." });
                }
        
                // Save to database
                const newRecipe = new Recipe(req.body);
                await newRecipe.save();
        
                res.status(201).json({ message: "✅ Recipe created successfully!", recipe: newRecipe });
        
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "❌ Server error. Please try again later." });
            }
        });

        // getting all recipes
        app.get("/api/recipe/fetch-all", async (req, res) => {
            try {
                const recipes = await Recipe.find({});
                // console.log(recipes);
                res.status(201).json({success:true, message: "✅ Found Some Recipes", storedRecipes: recipes})

            } catch (error) {
                console.log("❌ Could not find any Recipes");
                res.status(404).json({ success:false, message:"❌ Recipe not found" })
            }
        })
        
        // deleting a recipe
        app.delete("/api/recipe/delete/:id", async (req, res) => {
            const { id } = req.params;
            // console.log(id)

            try {
                const recipeIdFound = await Recipe.findById(id);
                if (!recipeIdFound) {
                    return res.status(404).json({ success: false, message: "❌ Recipe not found" });
                }
        
                // Attempt to delete the recipe
                const deletedRecipe = await Recipe.findByIdAndDelete(id);
                if (deletedRecipe) {
                    res.status(200).json({ success: true, message: "✅ Successfully deleted recipe", recipeDeleted: deletedRecipe });
                } else {
                    res.status(403).json({ success: false, message: "❌ Not allowed to delete the recipe" });
                }
                
            } catch (error) {
                console.log(error);
                res.status(500).json({ success: false, message: "❌ Failed to delete recipe due to server error" });
            }
        })

        // update a recipe
        app.put("/api/recipe/update/:id", async (req, res) => {
            const { id } = req.params;
            const recipe = req.body;

            try {
                const foundRecipeId = await Recipe.findById(id);

                if (foundRecipeId) {
                    const updatedRecipe = await Recipe.findByIdAndUpdate(id, recipe, { new:true })
                    // console.log(updatedRecipe); -> gives you updated recipe
                    res.status(200).json({success:true, message:"✅ Updated Recipe", old: recipe, new: updatedRecipe})
                }

                if (!foundRecipeId) {
                    res.status(200).json({success:true, message:"❌ No recipe of that ID found"})
                }

                
            } catch (error) {
                console.log(error);
                res.status(500).json({ success: false, message: "❌ Failed to Update recipe due to Server error" });
                
            }
        })

        // Ports
        app.listen(port, () => {
            console.log(`🚀 Server Operational at: http://localhost:${port}`);
        });
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // Exit if DB connection fails
    }
};

main();
