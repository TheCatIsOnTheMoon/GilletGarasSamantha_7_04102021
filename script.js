//modules
import {recipes} from "./jsmodules/recipes.js";
import {displayRecipes} from "./jsmodules/displayrecipes.js";
import {displayDropdownLists} from "./jsmodules/dropdownlists.js";
import {displayTags} from "./jsmodules/displaytags.js";

//DOM display
displayDropdownLists(recipes);
displayRecipes(recipes);
displayTags();