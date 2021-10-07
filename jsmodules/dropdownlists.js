export function displayDropdownLists(recipes) {

    ingredientsList(recipes)
    appliancesList(recipes)
    ustensilsList(recipes)

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
    function displayDropdownList(list, elementID) {
        let dropdownListDOM = "";
        
        list.map(element => {
            dropdownListDOM += `<li>${element}</li> `
        });

        document.getElementById(elementID).innerHTML = dropdownListDOM;
    }

    //compile lists functions
    function ingredientsList(recipes) {

        let result = [];
        for (let index = 0; index < recipes.length; index++) {
            recipes[index].ingredients.map(ingredient => {
                result.push(ingredient.ingredient)
            })
        }

        let ingredientsList = [];
        removeDuplicates(result, ingredientsList)
        displayDropdownList(ingredientsList, "list-ingredients")
    }

    function appliancesList(recipes) {

        let result = [];
        for (let index = 0; index < recipes.length; index++) {
            result.push(recipes[index].appliance)
        }

        let appliancesList = [];
        removeDuplicates(result, appliancesList)
        displayDropdownList(appliancesList, "list-appliances")
    }

    function ustensilsList(recipes) {

        let result = [];
        for (let index = 0; index < recipes.length; index++) {
            recipes[index].ustensils.map(ustensil => {
                result.push(ustensil)
            })
        }

        let ustensilsList = [];
        removeDuplicates(result, ustensilsList)
        displayDropdownList(ustensilsList, "list-ustensils")
    }

    function removeDuplicates(list, newList) {
        list.forEach(element => {
            if (!newList.includes(element)) {
                newList.push(element)
            }
        });
    }
}