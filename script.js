//modules
import {recipes} from "./jsmodules/recipes.js";
import {displayRecipes} from "./jsmodules/displayrecipes.js";
import {displayDropdownLists} from "./jsmodules/dropdownlists.js";
import {displayTags} from "./jsmodules/displaytags.js";


let recipesList = recipes;

//DOM display
displayDropdownLists(recipesList);
displayRecipes(recipesList);
displayTags();



//event listeners
const inputResearchBar = document.getElementById("main-research-input");

inputResearchBar.addEventListener("input", () => {
    if (inputResearchBar.value.length >= 3) {
        globalResearch(recipes)
    }
});

document.addEventListener("click", (event) => {
    if (event.target.className === "list-element primary-color" ||
    event.target.className === "list-element secondary-color" ||
    event.target.className === "list-element tertiary-color" ||
    event.target.className === "delete-tag-btn") {
        globalResearch(recipes)
    }
});


function globalResearch(recipes) {

    //grab the elements needeed for research : input value and tags list
    let inputResearchBarContent = "";
    let tagValuesList = [];
    
    //get input value
    inputResearchBarContent = inputResearchBar.value
    //get selected tag list
    document.querySelectorAll(".tag").forEach(tag => {
        tagValuesList.push(tag.innerText)  
    });

    //launch filters
    tagFilter(tagValuesList)
    inputFilter(inputResearchBarContent)
        
    console.log(inputResearchBarContent, tagValuesList)

    function inputFilter(inputResearchBarContent) {

        if (inputResearchBarContent !== "") {

            let inputResearchResult = [];
    
            search(inputResearchBarContent, inputResearchResult);

            //remove duplicates //https://www.javascripttutorial.net/array/javascript-remove-duplicates-from-array/
            let newinputResearchResult = [...new Set(inputResearchResult)]

            displayRecipes(newinputResearchResult);
            displayDropdownLists(newinputResearchResult);
        }
    }

    function tagFilter(tagValuesList) {

        if (tagValuesList.length !== 0) {

            let tagResearchResult = [];
    
            tagValuesList.map(tag => {
                search(tag.slice(0, -1).toLowerCase(), tagResearchResult);
            })

            displayRecipes(tagResearchResult)
            displayDropdownLists(newinputResearchResult);
        }
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

    

}