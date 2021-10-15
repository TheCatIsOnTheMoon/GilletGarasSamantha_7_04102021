//modules
import {recipes} from "./jsmodules/recipes.js";
import {displayRecipes} from "./jsmodules/displayrecipes.js";
import {displayDropdownLists} from "./jsmodules/dropdownlists.js";
import {displayTags} from "./jsmodules/displaytags.js";

//DOM display
displayDropdownLists(recipes);
displayRecipes(recipes);
displayTags();

//research-bar input
const globalResearchBar = document.getElementById("main-research-input");

globalResearchBar.addEventListener("input", () => {
    if (globalResearchBar.value.length >= 3) {
        globalResearch(globalResearchBar.value)
    } else {
        displayRecipes(recipes);
    }
});

//get selct tags list
document.addEventListener("click", (event) => {

    let tagValuesList = [];

    if (event.target.className === "list-element primary-color" ||
    event.target.className === "list-element secondary-color" ||
    event.target.className === "list-element tertiary-color" ||
    event.target.className === "delete-tag-btn") {
        document.querySelectorAll(".tag").forEach(tag => {
            tagValuesList.push(tag.innerText);
            
        });
        // let newTagValuesList = [...new Set(tagValuesList)]
        
        return tagResearch(tagValuesList);
    }
});

// research functions
function tagResearch(tags) {
    if (tags.length === 0 && globalResearchBar.value.length < 3) {
        displayRecipes(recipes);
    } else {
        let tagResearchResult = [];

    tags.map(tag => {
        search(tag.slice(0, -1).toLowerCase(), tagResearchResult);
    })

    // console.log(tagResearchResult)
    //display result
    return displayRecipes(tagResearchResult);
    }

    
}

function globalResearch(value) {

    let globalResearchResult = [];

    search(value, globalResearchResult);

    //remove duplicates //https://www.javascripttutorial.net/array/javascript-remove-duplicates-from-array/
    let newGlobalResearchResult = [...new Set(globalResearchResult)]
    // console.log(newGlobalResearchResult)
    //display result
    return displayRecipes(newGlobalResearchResult);
}

function search(value, list) {

    recipes.map(recipe => {
        
        // research into recipes names
        if (recipe.name.toLowerCase().includes(value)) {
            list.push(recipe)
        };

        // research into recipes appliances
        if (recipe.appliance.toLowerCase().includes(value)) {
            list.push(recipe)
        };

        // research into recipes ingredients
        recipe.ingredients.map(ingredient => {
            if (ingredient.ingredient.toLowerCase().includes(value)) {
                list.push(recipe)
            } 
        });

        // research into recipes ustensils
        recipe.ustensils.map(ustensil => {
            if (ustensil.toLowerCase().includes(value)) {
                list.push(recipe)
            } 
        });
    })
}