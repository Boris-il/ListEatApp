import ingrAPI from '../../api/ingredientsAPI';
import createDataContext from '../createDataContext';

const IngredientsReducer = (state, action) => {
  switch (action.type) {
    case 'add_ingredient':
      return [...state, action.payload.newIngredient];

    case 'delete_ingredient':
      // return state without the item
      return state.filter(
        (ingredient) => ingredient.id !== action.payload.ingredientId
      );

    case 'update_all_ingredients':
      return action.payload.ingredients;

    case 'edit_ingredient': {
      newState = state.map((item) => {
        if (item.id === action.payload.ingredientId) {
          return {
            ...item,
            ingredient: {
              ...item.ingredient,
              amount: action.payload.newAmount,
              measurement: action.payload.newMeasurement,
            },
          };
        } else {
          return item;
        }
      });
      return newState;
    }

    case 'init_expanded': {
      let newState = [...state];
      newState = newState.map((ingredient) => {
        return {
          ...ingredient,
          expanded: 'false',
        };
      });
      return newState;
    }

    default:
      return state;
  }
};

const initExpanded = (dispatch) => {
  return async () => {
    dispatch({
      type: 'init_expanded',
    });
  };
};

const editIngredient = (dispatch) => {
  return async (ingredientId, userId, newAmount, newMeasurement, callback) => {
    if (newAmount === '') {
      return;
    }
    dispatch({
      type: 'edit_ingredient',
      payload: { ingredientId, userId, newAmount, newMeasurement },
    });
    try {
      const response = await ingrAPI.post(`/change-amount`, {
        user_id: userId,
        ingredient_id: ingredientId,
        new_amount: newAmount,
        new_measurement: newMeasurement,
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
        payload: { ingredientId: ingredientId },
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
  {
    initExpanded,
    getAllIngredients,
    deleteIngredient,
    editIngredient,
  },
  []
);
