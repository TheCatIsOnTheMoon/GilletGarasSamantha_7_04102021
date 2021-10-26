//modules
import {recipes} from "./jsmodules/recipes.js";
import {displayRecipes} from "./jsmodules/displayrecipes.js";
import {dropdownLists} from "./jsmodules/dropdownlists.js";
import {displayTags} from "./jsmodules/displaytags.js";

//Base DOM display
dropdownLists(recipes);
displayRecipes(recipes);
displayTags();

//event listeners
const inputResearchBar = document.getElementById("main-research-input");

inputResearchBar.addEventListener("input", () => {
    if (inputResearchBar.value < 3) {
        return false;
    }
    research(recipes)
});

document.addEventListener("click", (event) => {
    if (event.target.className === "list-element primary-color" ||
        event.target.className === "list-element secondary-color" ||
        event.target.className === "list-element tertiary-color" ||
        event.target.className === "delete-tag-btn") {
        research(recipes)
    }
});

// research function
function research(recipes) {

    //initializing
    let filteredRecipes = recipes;

    //grab the elements needeed for research : input value and tags list

    let inputContent = inputResearchBar.value.toLowerCase() //get input value

    let selectedTags = [];
    document.querySelectorAll(".tag").forEach(tag => {
        selectedTags.push(tag.innerText) //get selected tag list
    });

    //filtres
    if (inputContent.length < 3 && selectedTags.length === 0) {

        filteredRecipes = recipes;

    } else {

        if (inputContent.length < 3) {

            filteredRecipes = recipes;
        }

        if (inputContent.length >= 3) {

            filteredRecipes = recipes.filter((recipe) => {

                // verify if input content is into recipe name or description
                if (recipe.name.toLowerCase().includes(inputContent) ||
                    recipe.description.toLowerCase().includes(inputContent)) {
                    return recipe;
                };

                // verify if input content is into recipe ingredients
                let filteredRecipesIngredients = recipe.ingredients.filter(ingredient => {
                    if (ingredient.ingredient.toLowerCase().includes(inputContent)) {
                        return recipe;
                    }
                });

                //https://stackoverflow.com/questions/49698136/es5-filter-inside-filter
                if (filteredRecipesIngredients.length > 0) {
                    return true

                } else {
                    return false;
                };
            });
        }

        if (selectedTags.length !== 0) {

            filteredRecipes = filteredRecipes.filter((recipe) => {

                // selected tags filter
                let filterForEachTag = selectedTags.map(selectedtag => {

                    // .trim() to delete extra spaces before and after
                    let tag = selectedtag.trim().toLowerCase();

                    // verify if tag is into recipe appliance
                    if (recipe.appliance.toLowerCase().includes(tag)) {
                        return true;
                    };

                    // verify if tag is into recipe ingredients
                    let filteredRecipesIngredients = recipe.ingredients.filter(ingredient => {
                        if (ingredient.ingredient.toLowerCase().includes(tag)) {
                            return true;
                        }
                    });

                    // verify if tag is into recipe ustensils
                    let filteredRecipesUstensils = recipe.ustensils.filter(ustensil => {
                        if (ustensil.toLowerCase().includes(tag)) {
                            return true;
                        }
                    });

                    //https://stackoverflow.com/questions/49698136/es5-filter-inside-filter
                    if (filteredRecipesIngredients.length > 0 || filteredRecipesUstensils.length > 0) {
                        return true
                    }
                    return false
                })

                // verify that ALL the selected tag are in the recipe, if yes : display
                if (filterForEachTag.every(verifyTagPresence)) {
                    return recipe;
                }

                function verifyTagPresence(tag) {
                    if (tag === true) {
                        return true
                    }
                    return false
                }
            });
        }
    }

    // displays
    displayRecipes(filteredRecipes);
    dropdownLists(filteredRecipes);
}