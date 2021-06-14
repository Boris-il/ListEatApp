import React, { useReducer } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import ColorCounter from "./ColorCounter";

const COLOR_INCREMENT = 15;

/* Reducer = function that manages changes to an object. 
    arg1: "state" object that has all of our state in it.
    arg2: "action"
      type: string that describes the exact change operation we want to make.
      payload: some data that is critical to the change operation.

    notes:
    1. We never change arg1 directly.
    2. We must always return a value to be used as arg1.
    3. Better define reducer outside the component func to avoid confusion of variable 'state'.
    4. It is best fit to use Reducer when we want to change state of numerous fields of an object

*/
const reducer = (state, action) => {
  // state === {red: int, green: int, blue: int} object
  // action === { type: 'change_red' or 'change_blue' or 'change_green', payload: 15 or -15 } object

  switch (action.type) {
    case "change_red":
      return state.red + action.payload > 255 || state.red + action.payload < 0
        ? state
        : { ...state, red: state.red + action.payload };
    case "change_green":
      if (
        state.green + action.payload > 255 ||
        state.green + action.payload < 0
      ) {
        return state;
      }
      // A new object returned as a new state.
      return { ...state, green: state.green + action.payload };
    case "change_blue":
      if (
        state.blue + action.payload > 255 ||
        state.blue + action.payload < 0
      ) {
        return state;
      }
      return { ...state, blue: state.blue + action.payload };
    // As default, return current state.
    default:
      return state;
  }
};

const ReducerSquareScreen = () => {
  /* 'state' gets the object we passed as initial value.
     'dispatch' = run my reducer
  */
  const [state, dispatch] = useReducer(reducer, { red: 0, green: 0, blue: 0 });
  const { red, green, blue } = state;
  return (
    <View>
      <ColorCounter
        color="Red"
        // The dispatch argument is the 'action' param in the reducer func.
        onIncrease={() =>
          dispatch({ type: "change_red", payload: COLOR_INCREMENT })
        }
        onDecrease={() =>
          dispatch({ type: "change_red", payload: -COLOR_INCREMENT })
        }
      />
      <ColorCounter
        color="Blue"
        onIncrease={() =>
          dispatch({ type: "change_blue", payload: COLOR_INCREMENT })
        }
        onDecrease={() =>
          dispatch({ type: "change_blue", payload: -COLOR_INCREMENT })
        }
      />
      <ColorCounter
        color="Green"
        onIncrease={() =>
          dispatch({ type: "change_green", payload: COLOR_INCREMENT })
        }
        onDecrease={() =>
          dispatch({ type: "change_green", payload: -COLOR_INCREMENT })
        }
      />

      <View
        style={{
          height: 150,
          width: 150,
          backgroundColor: `rgb(${red},${green},${blue})`,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ReducerSquareScreen;
