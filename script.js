//modules
import {recipes} from "./jsmodules/recipes.js";
import {displayRecipes} from "./jsmodules/displayrecipes.js";
import {displayDropdownLists} from "./jsmodules/dropdownlists.js";

//DOM display
displayDropdownLists(recipes);
displayRecipes(recipes);