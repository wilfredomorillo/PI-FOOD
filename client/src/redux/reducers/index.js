import {
  GET_ALL_RECIPES,
  GET_RECIPE_BY_ID,
  GET_RECIPE_BY_NAME,
  GET_DIETS,
  CREATE_RECIPE,
  FILTER_BY_DIETS,
  FILTER_BY_ORDER,
  ORDER_BY_SCORE,
  ERROR_MSSG,
  NOT_FOUND,
  CHANGE_MSG,
  PUT_RECIPE,
  DELETE_RECIPE,
} from "../actions/index.js";

const initialState = {
  recipes: [],
  recipeDetail: [],
  diets: [],
  stateToFilters: [],
  msg: "",
  errorMsg: "",
  createMsg: "",
  recipeChangedMsg: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        stateToFilters: action.payload,
        errorMsg: "",
        createMsg: "",
      };
    case GET_RECIPE_BY_ID:
      return {
        ...state,
        recipeDetail: action.payload,
      };
    case GET_RECIPE_BY_NAME:
      return {
        ...state,
        recipes: action.payload,
      };
    case CREATE_RECIPE:
      return {
        ...state,
        createMsg: action.payload,
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case FILTER_BY_ORDER:
      const recipeInOrder =
        action.payload === "up"
          ? state.recipes.sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      return {
        ...state,
        recipes:
          action.payload === ""
            ? state.stateToFilters.sort(function (a, b) {
                if (a.id > b.id) return 1;
                if (a.id < b.id) return -1;
                return 0;
              })
            : recipeInOrder,
      };
    case FILTER_BY_DIETS:
      const allRecipes2 = state.stateToFilters;
      const filterByDiets = allRecipes2.filter((recipe) => {
        if (recipe.diets.length > 0) {
          if (recipe.diets.find((element) => element === action.payload))
            return recipe;
        }
        return 0;
      });
      return {
        ...state,
        recipes: action.payload === "" ? state.stateToFilters : filterByDiets,
      };
    case ORDER_BY_SCORE:
      const orderByScore =
        action.payload === "Hsc"
          ? state.recipes.sort((a, b) => {
              if (a.healthScore - b.healthScore < 0) return 1;
              else return -1;
            })
          : action.payload === "Dsc"
          ? state.recipes.sort((a, b) => {
              if (a.healthScore - b.healthScore > 0) return 1;
              else return -1;
            })
          : state.stateToFilters.sort(function (a, b) {
              if (a.id > b.id) return 1;
              if (a.id < b.id) return -1;
              return 0;
            });
      return {
        ...state,
        recipes: orderByScore,
      };
    case ERROR_MSSG:
      return {
        ...state,
        msg: action.payload,
        recipes: [],
      };
    case NOT_FOUND: {
      return {
        ...state,
        errorMsg: action.payload,
        recipeDetail: [],
      };
    }
    case CHANGE_MSG: {
      return {
        ...state,
        createMsg: action.payload,
      };
    }
    case PUT_RECIPE: {
      return {
        ...state,
        recipeChangedMsg: action.payload,
      };
    }
    case DELETE_RECIPE: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
