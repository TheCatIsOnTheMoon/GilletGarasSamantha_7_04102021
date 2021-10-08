export function displayRecipes(recipes) {

    let recipesDisplayDOM = "";

    recipes.forEach(recipe => {
        recipesDisplayDOM += `
            <figure tabindex='0'>
                <div class="recipe-illustration"></div>
                <figcaption>
                    <div class="recipe-header">
                        <h2 class="recipe-title">${recipe.name}</h2>
                        <div class="recipe-time"><img src="img/clock.svg" alt="clock svg" aria-hidden="true"><strong>${recipe.time} min</strong></div>
                    </div>
                    <div class="recipe-content">
                        <ul class="recipe-ingredients">
                            ${recipe.ingredients.map((ingredient) => {
                                return "<li  class='ingredient'><strong>" + ingredient.ingredient + 
                                    "</strong><span class='ingredient-quantity'> " + ingredient.quantity + 
                                    "</span><span class='ingredient-unit'>"+" " + ingredient.unit + 
                                "</span></li>";}).join(' ')}
                        </ul>
                        <div class="recipe-instructions">${recipe.description}</div>
                    </div>
                </figcaption>
            </figure>       
        `
    });

    document.getElementById("section-results").innerHTML = recipesDisplayDOM;

    const ingredientsQuantity = document.querySelectorAll(".ingredient-quantity");
    const ingredientsUnit = document.querySelectorAll(".ingredient-unit");

    deleteUndefined(ingredientsQuantity)
    deleteUndefined(ingredientsUnit)

    function deleteUndefined(list) {
        list.forEach(element => {
            if (element.innerHTML === " undefined") {
                element.innerHTML = ``;
            };
        });
    }
}
