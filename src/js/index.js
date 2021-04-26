import Search from './models/Search'
import Recipe from "./models/Recipe";
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {elements, renderLoader, clearLoader} from "./views/base";

/**
Global state of the app
 -- Search Object
 -- Current recipe object
 --Shopping list object
 --Liked recipe
*/

const state = {};

// SEARCH CONTROLLER
const controlSearch = async () => {
  // 1. Get query from view
  const query = searchView.getInput() //TODO

  if (query){
    // 2. New search object and add to state
    state.search = new Search(query)

    // 3. Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // 4. Search for recipe
      await state.search.getResults();

      // 5. Render results on UI
      clearLoader();
      searchView.renderResults(state.search.result)

    }catch(e){
      alert(e);
      clearLoader();
    }
  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch()
});


elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if(btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage)
    console.log(goToPage)
  }
})


// RECIPE CONTROLLER

const controlRecipe = async () => {
  // Get ID from URL
  const id = window.location.hash.replace('#', '');
  console.log(id)

  if(id){
    // Prepare UI for changes
    recipeView.clearRecipe()
    renderLoader(elements.recipe);

    //Highlight the selected search item
    if(state.search){
      searchView.highlightSelected(id);
    }

    // Create new Recipe object
      state.recipe = new Recipe(id)

    try {
      // Get recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);
      console.log(state.recipe)
    }catch(e){
        alert('From index Recipe Block' + '\n' + e);
    }
  }


}




['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipe));










