import { useState,useRef,useEffect } from "react";
import { getRecipeFromMistral } from "../iaAPI.js"
import MistralRecipe from "./MistralRecipe";
import IngredientList from "./IngredientList";

export default function Main() {
    // State variables
    const [ingredients,setIngredients] = useState([]); // Ingredients array    
    const [recipe,setRecipe] = useState(""); // Generated recipe
    const [loading,setLoading] = useState(false); // Waiting to get recipe; 'true' waiting, 'false' recipe received 
    

    // Reference to the recipe section
    const recipeSection = useRef(null);


    // Event handler functions
    function submitIngredient(formData) {
    /// Add ingredient from the form via action
        const newIngredient = formData.get("ingredient");
        
        if (!newIngredient) {// Check if array is not an empty string
            alert("Please enter an ingredient");
        }
        else if (ingredients.includes(newIngredient)) {// Check it is a new ingredient, it is not already in the array
            alert("Ingredient already entered!");
        }
        else {
            setIngredients(function(prevIng){
                return [...prevIng,newIngredient]
            })
        }
    }  
    
    function newRecipe() {
    /// Create a new recipe when clicked. Ingredients list and recipe resets
        setIngredients([]);
        setRecipe("");
        setLoading(false);
    }

    function removeIngredient(ingredient) {
    /// Function to delete the ingredient 'ingredient' from the array of ingredients
        setIngredients(function(prevIngredient) {
            return prevIngredient.filter(function(item) { //Filters each ingredient form the array
                return item !== ingredient; //Returns a new array without the specified ingredient
            })
        })
    }


    // Functions
    async function getRecipe(){
    /// Asynchronus function that receives the recipe when "Get recipe" button is pressed
        setLoading(true);
        const recipeMarkdown = await getRecipeFromMistral(ingredients); // Request recipe to Mistral
        console.log(recipeMarkdown);
        setRecipe(recipeMarkdown);
        setLoading(false);
    }


    // Efects
    useEffect(function(){
    /// When recipe is received, the view scrolls into the referenced section (Get recipe section)
        if (recipe !== "" && recipeSection.current !== null){
            recipeSection.current.scrollIntoView({behavior:"smooth"});
        }
    },[recipe]);

    return (
        <main className="main">
            {/* Form to add ingredients */}
            <form className="main-form-container" action={submitIngredient}>   
                {ingredients.length < 4 ? <p className="form-info">Please add at least 4 ingredients to generate a recipe.</p> : null}             
                <input 
                    className="main-form-input" 
                    type="text" 
                    placeholder="e.g. oregano" 
                    aria-label="Add ingredient"
                    name="ingredient">                    
                </input>
                <button className="main-form-input-submit-button" >Add ingredient</button>               
            </form>
            {/* Ingredients list */}
            {ingredients.length > 0 && <IngredientList ingredients={ingredients} getRecipe={getRecipe} ref={recipeSection} recipe={recipe} removeIngredient={removeIngredient} loading={loading}/>}
            {/* Recipe by Mistral */}
            {recipe ? <MistralRecipe recipe={recipe}/> : null}   
            {recipe ? <button className="new-recipe-button" onClick={newRecipe}>New recipe</button> : null}     
        </main>
    );
}