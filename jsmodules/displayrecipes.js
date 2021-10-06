export function displayRecipes(recipes) {

    let recipesDisplayDOM = "";

    recipes.map(recipe => {
        recipesDisplayDOM += `
            <figure>
                <div class="recipe-illustration"></div>
                <figcaption>
                    <div class="recipe-header">
                        <h2 class="recipe-title">${recipe.name}</h2>
                        <div class="recipe-time"><img src="img/clock.svg" alt=""><strong>${recipe.time} min</strong></div>
                    </div>
                    <div class="recipe-content">
                        <ul class="recipe-ingredients">
                        ${recipe.ingredients.map(ingredient => 
                            "<li><a href='#' class='ingredient' tabindex='0'><strong>" 
                                + ingredient.ingredient + ":</strong> " + ingredient.quantity + " " + ingredient.unit +
                            "</a></li>").join(' ')}
                        </ul>
                        <div class="recipe-instructions">${recipe.description}</div>
                    </div>
                </figcaption>
            </figure>
        `
    });
    
    document.getElementById("section-results").innerHTML = recipesDisplayDOM;
}