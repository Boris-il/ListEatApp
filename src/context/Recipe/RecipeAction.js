import axios from "axios";

export const getAllRecipes = (dispatch) => {
  return async (userId) => {
    try {
      await recAPI
        .get(`/get-all/${userId}`)
        .then((response) => response.data)
        .then();
      dispatch({
        type: "get_all_recipes",
        payload: { userId: userId },
      });
      callback();
    } catch (e) {}
  };
};
