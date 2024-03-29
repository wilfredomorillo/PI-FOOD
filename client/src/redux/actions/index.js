import axios from "axios";
export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_RECIPE_BY_ID = "GET_RECIPE_BY_ID";
export const GET_RECIPE_BY_NAME = "GET_RECIPE_BY_NAME";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const FILTER_BY_DIETS = "FILTER_BY_DIETS";
export const FILTER_BY_ORDER = "FILTER_BY_ORDER";
export const ORDER_BY_SCORE = "ORDER_BY_SCORE";
export const FILTER_BY_SEARCHBAR = "FILTER_BY_SEARCHBAR";
export const ERROR_MSSG = "ERROR_MSSG";
export const NOT_FOUND = "NOT_FOUND";
export const CHANGE_MSG = "CHANGE_MSG";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const PUT_RECIPE = "PUT_RECIPE";
export const DELETE_RECETES= "DELETE_RECETES"
export const CLEAN="CLEAN"
export const CLEANER= 'CLEANER'
export const getAllRecipes = () => {
  return async function (dispatch) {
    let recipes = await axios.get("/recipes/");
    return dispatch({ type: GET_ALL_RECIPES, payload: recipes.data });
  };
};
export const getAllRecipesById = (id) => {
  return async function (dispatch) {
    
    try {
     const {data} = await axios.get(`/recipes/${id}`);
      return dispatch({ type: GET_RECIPE_BY_ID, payload: data });
    } catch (error) {
      return dispatch({ type: NOT_FOUND, payload: error.response.data });
    }
  };
};

export const getAllRecipesByName = (name) => {
  return async function (dispatch) {
    if (name === "") {
      return dispatch({ type: ERROR_MSSG });
    }
    try {
      let recipeByName = await axios.get(`/recipes?name=${name}`);
      return dispatch({ type: GET_RECIPE_BY_NAME, payload: recipeByName.data });
    } catch (error) {
      return dispatch({ type: ERROR_MSSG, payload: error.response.data });
    }
  };
};

export const getDiets = () => {
  return async function (dispatch) {
    const diets = await axios.get("/diets");
    return dispatch({ type: GET_DIETS, payload: diets.data });
  };
};

export const createRecipe = (recipe) => {
  return async function (dispatch) {
    try {
      const createRecipe = await axios.post("/recipes",recipe);
      return dispatch({ type: CREATE_RECIPE, payload: createRecipe.data });
    } catch (error) {
      return dispatch({ type: CHANGE_MSG, payload: error.response.data });
    }
  };
};

export function getFilterByDiets(payload) {
  return {
    type: FILTER_BY_DIETS,
    payload: payload,
  };
}

export function filterByOrder(payload) {
  return {
    type: FILTER_BY_ORDER,
    payload: payload,
  };
}

export function orderByScore(payload) {
  return {
    type: ORDER_BY_SCORE,
    payload: payload,
  };
}

export function deletes(id){
  return async function(dispatch){
      try{
          const deletes= await axios.delete (`/recipes/${id}`)
          return dispatch({
              type: 'DELETE_RECETES',
              payload: deletes
          })
      
      }catch (err){
          console.error(err)
      }
  }
}

export function clean() {
  return {
      type: 'CLEAN',
      payload: {},
  };
}

export function cleaner() {
  return {
      type: 'CLEANER',
      payload: {},
  };
}