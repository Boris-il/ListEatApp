// old imports
import HomeScreen from "./src/old/HomeScreen";
import ComponentsScreen from "./src/old/ComponentsScreen";
import ListScreen from "./src/old/ListScreen";
import ImageScreen from "./src/old/ImageScreen";
import ReducerCounterScreen from "./src/old/ReducerCounterScreen";
import ColorScreen from "./src/old/ColorScreen";
import ReducerSquareScreen from "./src/old/ReducerSquareScreen";
import TextScreen from "./src/old/TextScreen";
import BoxScreen from "./src/old/BoxScreen";
import IndexScreen from "./src/screens/IndexScreen";
// old imports end
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Provider as RecipeProvider } from "./src/context/Recipe/RecipeContext";
import RecipesScreen from "./src/screens/RecipesScreen";
import ShoppingScreen from "./src/screens/ShoppingScreen";
import RecipeInfoScreen from "./src/screens/RecipeInfoScreen";

// StackNavigator is an object that decides what to show on the screen at any given time
const navigator = createStackNavigator(
  {
    Index: IndexScreen,
    Recipes: RecipesScreen,
    Shopping: ShoppingScreen,
    RecipeInfo: RecipeInfoScreen,
  },
  {
    // initial is the home screen
    initialRouteName: "Index",
    defaultNavigationOptions: {
      title: "ListEat",
    },
  }
);

const App = createAppContainer(navigator);

export default () => {
  return (
    <SafeAreaProvider>
      <RecipeProvider>
        <App />
      </RecipeProvider>
    </SafeAreaProvider>
  );
};
//export default createAppContainer(navigator);
