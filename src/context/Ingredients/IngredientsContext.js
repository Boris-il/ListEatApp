import ingAPI from '../../api/recipesAPI';
import createDataContext from '../createDataContext';

const IngredientsReducer = (state, action) => {
  switch (action.type) {
    case 'add_ingredients':
    //TODO:

    case 'delete_ingredient':
    //TODO:

    case 'update_all_ingredients':
    //TODO:

    case 'delete_recipe':
    //TODO:

    case 'edit_ingredient':
    //TODO:

    default:
      return state;
  }
};

export const { Context, Provider } = createDataContext(
  IngredientsReducer,
  {},
  []
);
