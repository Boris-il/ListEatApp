import ingrAPI from '../../api/ingredientsAPI';
import createDataContext from '../createDataContext';

const IngredientsReducer = (state, action) => {
  switch (action.type) {
    case 'add_ingredient':
      return [...state, action.payload.newIngredient];

    case 'delete_ingredient':
      return state.filter((ingr) => ingr.id !== action.payload.id);

    case 'update_all_ingredients':
      return action.payload.ingredients;

    case 'delete_recipe':
    //TODO:

    case 'edit_ingredient':
    //TODO:

    default:
      return state;
  }
};

const addIngredient = (dispatch) => {
  return async (ingredient, userId, callback) => {
    try {
      const response = await ingrAPI
        .put('/add', {
          Ingredient: ingredient,
          UserID: userId,
        })
        .then((response) => response.data);
      dispatch({
        type: 'add_ingredient',
        payload: { newIngredient: response },
      });

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const deleteIngredient = (dispatch) => {
  return async (ingredientId, userId, callback) => {
    try {
      const response = await ingrAPI
        .delete(`/delete`, {
          data: { IngredientID: ingredientId, userID: userId },
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.status);
          }
        });
      dispatch({
        type: 'delete_ingredient',
        payload: { ingredient: ingredientId },
      });
      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const getAllIngredients = (dispatch) => {
  return async (userId, callback) => {
    try {
      const response = await ingrAPI
        .get(`/get-all/${userId}`)
        .then((response) => response.data);
      dispatch({
        type: 'update_all_ingredients',
        payload: { ingredients: response },
      });
      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const { Context, Provider } = createDataContext(
  IngredientsReducer,
  { addIngredient, getAllIngredients, deleteIngredient },
  []
);
