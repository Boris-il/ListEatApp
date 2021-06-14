/* We are going to export a plain function from this file. 
    Note: this file starts with lowercase letter.
*/
import React, { useReducer } from "react";

/* 
    There are 3 things we need to customize when we create a Context (new type of resource):
    1. Reducer function
    2. actions 
    3. initial state we use reducer with
*/
export default (reducer, actions, initialState) => {
  const Context = React.createContext();

  /*
    here we create a component that accepts another component (as an argument) that will be shown inside the BlogProvider.
    the Provider will accept some info and make it available to all child components.
*/
  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // actions === {addBlogPost: (dispatch) => {return () => {}}}
    const boundActions = {};
    for (let key in actions) {
      // key === 'addBlogPost'
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
