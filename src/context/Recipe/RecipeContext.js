import React, { useReducer } from "react";
import recAPI from "../../api/recipesAPI";

import createDataContext from "../createDataContext";
/*
  For each additional type of resource, we will create another Context variable, Provider component and Reducer.
*/

/*
  When we return some info from RecipeReducer it will cause the RecipeProvider to re-render, like the useState did.
*/
const RecipeReducer = (state, action) => {
  switch (action.type) {
    case "add_recipe":
      return [
        ...state, action.payload.newRecipe
      ]
      
    case "get_recipe":
      //TODO:
      /*
      return state.map((recipe) => {
        if (recipe.name === action.payload.name) {
          return
        }
      })
      */


    case "update_all_recipes":
      // TODO: objectify each object?
      return action.payload.recipes;

    case "delete_recipe":
    // return state without the item
    return state.filter((recipe) => recipe.id !== action.payload.id);

    case "edit_recipe":

    default:
      return state;
  }
};

const addRecipe = (dispatch) => {
  return async (url, userId, recipeName, callback) => {
    try {
      const response = await recAPI.put('/add', {
        url: url,
        userID: userId,
        name: recipeName
      }).then((response) => response.data);
      dispatch({
        type: "add_recipe",
        payload: { newRecipe: response }
      });

      if (callback) {
        callback();
      }
      
    } catch (err) {
      console.log(err);
    }
  }
};

const getRecipe = (dispatch) => {
  //TODO:
};

const getAllRecipes = (dispatch) => {
  return async (userId, callback) => {
    try {
      // get recipes from server
      const response = await recAPI
        .get(`/get-all/${userId}`)
        .then((response) => response.data);
      // update recipes context
      dispatch({
        type: "update_all_recipes",
        payload: { recipes: response },
      });
      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const deleteRecipe = (dispatch) => {
  return async (recipeId, userID) => {
    console.log(recipeId, userID);
    try {
      // delete from server
      const response = await recAPI
      .delete(`/delete`, {
        recipeId : recipeId,
        userID: userID,
      })
      dispatch({
        type: "delete_recipe",
        payload: { recipeId: recipeId, userId: userID }
      });
      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }



    dispatch({ type: "delete_recipe", payload: id });
  };
};

const editRecipe = (dispatch) => {
  //TODO:
};

// boilerplate of API CRUD method
/*
const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    try{
      await axios.post('cawcawawc', title, content);
    dispatch({
      type: "add_blogpost",
      payload: { title: title, content: content },
    });
    callback();
  } catch (e) {

  }
  };
};

*/

export const { Context, Provider } = createDataContext(
  RecipeReducer,
  { addRecipe, getRecipe, getAllRecipes, deleteRecipe, editRecipe },
  []
  /*[
    {
      url: "test url",
      ingredients: [
        { name: "סוכר", amount: "3", measurement: "כוס" },
        {
          name: "סודה לשתייה",
          amount: "1",
          measurement: "כפית",
        },
      ],
      id: 1,
      name: "עוגיות שוקולד ציפס",
      insertion_time: "2021-06-14",
      image_url:
        "https://img.mako.co.il/2021/03/31/flourless_brownie_cookies_autoOrient_i.jpg",
    },

    {
      url: "test url2",
      ingredients: [
        { name: "סוכר", amount: "4", measurement: "כוס" },
        {
          name: "סודה לשתייה",
          amount: "12",
          measurement: "כפית",
        },
      ],
      id: 2,
      name: "פיצה חושרמוטה",
      insertion_time: "2021-06-14",
      image_url:
        "https://img.mako.co.il/2021/06/07/pan_pizza1_re_autoOrient_i.jpg",
    },
  ]
  */
);
