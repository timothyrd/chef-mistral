export default function IngredientList(prop) {
/**  
 * Igredients list
 * prop:
 *  - ingredients: Array of the ingredients
 *  - recipe: boolean that indicates if the recipe has been generated; 'true' generated, 'alse' not generated
 *  - ref: reference to section
 *  - getRecipe: function that requests the recipe
 *  - loading: boolean that indicates if waiting to receive the recipe; 'true' when waiting, 'false' recipe received.
**/
    // Map over ingredients array and display in an unordered list each ingredient
    const ingredientsList = prop.ingredients.map(function(item){
        return <li key={item} className="ingredient-item">{item} {!prop.recipe && <button onClick={() => prop.removeIngredient(item)} className="delete-ingredient">&times;</button>}</li>
        // Each ingredient can be removed if the recipe has not been requested yet
    });

    return (
        <section className="ingredient-list-section">
            <div className="main-ingredients-container">
                <h2 className="ingredient-title">Ingredients on hand:</h2>
                <ul className="ingredients-list">{ingredientsList}</ul>
                {prop.ingredients.length >= 4 && <div className="get-recipe-container">
                    <div ref={prop.ref}>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={prop.getRecipe}>{!prop.loading ? "Get a recipe" : <span className="loader"></span>}</button>
                </div>}
            </div>
        </section>
    );
}