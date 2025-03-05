import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    productTitle: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    mainProductImage: {
      type: String, // URL of the main product image
      required: true,
    },
    ingredientsList: [
        {
          name: { type: String, required: true },
          quantity: {
            amount: { type: Number, required: true }, // Numeric value
            unit: { type: String, required: true } // E.g., grams, cups, tbsp
          }
        }
    ],
    ingredientsListsImages: [
      {
        type: String, // URLs of images for each ingredient
      },
    ],
    instructions: [
      {
        step: { type: Number, required: true }, // Step number
        text: { type: String, required: true }, // Instruction text
        image: { type: String }, // Optional image for the step
      },
    ],
  },
  {
    timestamps: true,
  }
);

// mongoose should create a collection called "Recipe" and should be based of off "recipeSchema"
const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
