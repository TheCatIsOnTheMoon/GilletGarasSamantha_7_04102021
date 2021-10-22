//modules
import {
    recipes
} from "./jsmodules/recipes.js";
import {
    displayRecipes
} from "./jsmodules/displayrecipes.js";
import {
    dropdownLists
} from "./jsmodules/dropdownlists.js";
import {
    displayTags
} from "./jsmodules/displaytags.js";


//DOM display
dropdownLists(recipes);
displayRecipes(recipes);
displayTags();

//event listeners
const inputResearchBar = document.getElementById("main-research-input");

inputResearchBar.addEventListener("input", () => {
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

//initializing
let filteredRecipes = recipes;

function research(recipes) {



    // ************************* grab the elements needeed for research : input value and tags list *************************************

    let inputContent = inputResearchBar.value.toLowerCase() //get input value

    let selectedTags = [];
    document.querySelectorAll(".tag").forEach(tag => {
        selectedTags.push(tag.innerText) //get selected tag list
    });

    // console.log(inputContent, selectedTags) // OK, exemple in console: string [ "array " ]\





    // ********************************** filtre  *****************************************************

    if (inputContent.length < 3 && selectedTags.length === 0) {

        filteredRecipes = recipes;

    } else {

        if (inputContent.length >= 3) {

            filteredRecipes = recipes.filter((recipe) => {

                // input content into recipe name or description ?
                if (recipe.name.toLowerCase().includes(inputContent) ||
                    recipe.description.toLowerCase().includes(inputContent)) {
                    return recipe;
                };

                // input content into recipe ingredients ?
                let filteredRecipesIngredients = recipe.ingredients.filter(ingredient => {
                    if (ingredient.ingredient.toLowerCase().includes(inputContent)) {
                        return recipe;
                    }
                });

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

                    let tag = selectedtag.slice(0, -1).toLowerCase();

                    // tag into recipe appliance ?
                    if (recipe.appliance.toLowerCase().includes(tag)) {
                        return true;
                    };

                    // tag content into recipe ingredients ?
                    let filteredRecipesIngredients = recipe.ingredients.filter(ingredient => {
                        if (ingredient.ingredient.toLowerCase().includes(tag)) {
                            return true;
                        }
                    });

                    // tag content into recipe ustensils ?
                    let filteredRecipesUstensils = recipe.ustensils.filter(ustensil => {
                        if (ustensil.toLowerCase().includes(tag)) {
                            return true;
                        }
                    });

                    //https://stackoverflow.com/questions/49698136/es5-filter-inside-filter
                    if (filteredRecipesIngredients.length > 0 || filteredRecipesUstensils.length > 0) {
                        return true
                    } else {
                        return false;
                    };
                })

                if (filterForEachTag[0]) {
                    return recipe;
                }
            });
        }
    }
    displayRecipes(filteredRecipes);
    dropdownLists(filteredRecipes);
}

//maybe needed later :
// remove duplicates //https://www.javascripttutorial.net/array/javascript-remove-duplicates-from-array/
// let newinputResearchResult = [...new Set(inputResearchResult)]