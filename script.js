//modules
import {recipes} from "./jsmodules/recipes.js";
import {displayRecipes} from "./jsmodules/displayrecipes.js";
import {displayDropdownLists} from "./jsmodules/dropdownlists.js";
import {displayTags} from "./jsmodules/displaytags.js";

//DOM display
displayDropdownLists(recipes);
displayRecipes(recipes);
displayTags();

//research
const globalResearchBar = document.getElementById("main-research-input");

//https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event
globalResearchBar.addEventListener("input", () => {
    if (globalResearchBar.value.length >= 3) {
        globalResearch(globalResearchBar.value)
    }
});

function globalResearch(value) {

    let globalResearchResult = [];

    for (let recipeIndex = 0; recipeIndex < recipes.length; recipeIndex++) {
        //research into recipes names
        if (recipes[recipeIndex].name.toLowerCase().includes(value)) {
            globalResearchResult.push(recipes[recipeIndex])
        };

        //research into recipes appliances
        if (recipes[recipeIndex].appliance.toLowerCase().includes(value)) {
            globalResearchResult.push(recipes[recipeIndex])
        };

        //research into recipes ingredients
        for (let ingredientsIndex = 0; ingredientsIndex < recipes[recipeIndex].ingredients.length; ingredientsIndex++) {
            if (recipes[recipeIndex].ingredients[ingredientsIndex].ingredient.toLowerCase().includes(value)) {
                globalResearchResult.push(recipes[recipeIndex])
            } 
        }

        //research into recipes ustensils
        for (let ustensilsIndex = 0; ustensilsIndex < recipes[recipeIndex].ustensils.length; ustensilsIndex++) {
            if (recipes[recipeIndex].ustensils[ustensilsIndex].toLowerCase().includes(value)) {
                globalResearchResult.push(recipes[recipeIndex])
            } 
        }   
    }

    //remove duplicates
    let newGlobalResearchResult = [...new Set(globalResearchResult)]

    //display result
    return displayRecipes(newGlobalResearchResult);
}