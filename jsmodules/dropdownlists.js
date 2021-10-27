export function dropdownLists(recipes) {

    // close lists when click outside
    document.addEventListener("click", (event) => {
        closeDetailsLists(event)
    });

    function closeDetailsLists(event) {
        document.querySelectorAll(".research-list").forEach(element => {
            if (!element.contains(event.target)) {
                element.removeAttribute("open");
            }
        });
    };

    //display lists
    function displayDropdownList(list, elementID, color) {
        let dropdownListDOM = "";
        
        list.map(element => {
            dropdownListDOM += `<li class="list-element ${color}">${element}</li> `
        });

        return document.getElementById(elementID).innerHTML = dropdownListDOM;
    }

    //compile lists
    ingredientsList(recipes)
    appliancesList(recipes)
    ustensilsList(recipes)

    function ingredientsList(recipes) {

        let result = [];
        for (let index = 0; index < recipes.length; index++) {
            recipes[index].ingredients.map(ingredient => {
                result.push(ingredient.ingredient.toLowerCase())
            })
        }

        let ingredientsList = [];
        removeDuplicates(result, ingredientsList)
        displayDropdownList(ingredientsList, "list-ingredients", "secondary-color")

        return ingredientsList
    }

    function appliancesList(recipes) {

        let result = [];
        for (let index = 0; index < recipes.length; index++) {
            result.push(recipes[index].appliance.toLowerCase())
        }

        let appliancesList = [];
        removeDuplicates(result, appliancesList)
        displayDropdownList(appliancesList, "list-appliances", "tertiary-color")

        return appliancesList
    }

    function ustensilsList(recipes) {

        let result = [];
        for (let index = 0; index < recipes.length; index++) {
            recipes[index].ustensils.map(ustensil => {
                result.push(ustensil.toLowerCase())
            })
        }

        let ustensilsList = [];
        removeDuplicates(result, ustensilsList)
        displayDropdownList(ustensilsList, "list-ustensils", "primary-color")

        return ustensilsList
    }

    function removeDuplicates(list, newList) {
        list.forEach(element => {
            if (!newList.includes(element)) {
                newList.push(element)
            }
        });
    }

    //
    //filtre for tags input research
    //

    //DOM
    const ingredientsResearchInput = document.getElementById("ingredients-research-input");
    const appliancesResearchInput = document.getElementById("appliances-research-input");
    const ustensilsResearchInput = document.getElementById("ustensils-research-input");

    //variables
    let displayedIngredientList = ingredientsList(recipes);
    let displayedAppliancesList = appliancesList(recipes);
    let displayedUstensilsList = ustensilsList(recipes);

    //events
    ingredientsResearchInput.addEventListener("input", () => {
        research(ingredientsResearchInput, displayedIngredientList, "list-ingredients", "secondary-color")
    });

    appliancesResearchInput.addEventListener("input", () => {
        research(appliancesResearchInput, displayedAppliancesList, "list-appliances", "tertiary-color")
    });

    ustensilsResearchInput.addEventListener("input", () => { 
        research(ustensilsResearchInput, displayedUstensilsList, "list-ustensils", "primary-color")
    });

    //filter function
    function research(inputName, list, elementID, color) {

        let inputContent = inputName.value.toLowerCase() //get input value

        const filteredList = list.filter((listElement) => {
            if (listElement.includes(inputContent)) {
                return listElement
            }
        })
        return displayDropdownList(filteredList, elementID, color)
    }
}