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

    let globalResearchResultList = [];

    recipes.map(recipe => {
     
        //research into recipes names
        if (recipe.name.includes(value)) {
            globalResearchResultList.push(recipe)
        };

        //research into recipes ingredients
        recipe.ingredients.map(ingredient => {
            if (ingredient.ingredient.includes(value)) {
                globalResearchResultList.push(recipe)
            } 
        });

        //research into recipes appliances
        if (recipe.appliance.includes(value)) {
            globalResearchResultList.push(recipe)
        };

        //research into recipes ustensils
        recipe.ustensils.map(ustensil => {
            if (ustensil.includes(value)) {
                globalResearchResultList.push(recipe)
            } 
        });

        //remove duplicates
        //https://www.javascripttutorial.net/array/javascript-remove-duplicates-from-array/
        // a Set is a collection of unique values. To remove duplicates from an array:
        // first, convert an array of duplicates to a Set. The new Set will implicitly remove duplicate elements.
        // then, convert the set back to an array.
        // application here :
        let newGlobalResearchResultList = [...new Set(globalResearchResultList)]

        //display result
        console.log(newGlobalResearchResultList);
    })
}