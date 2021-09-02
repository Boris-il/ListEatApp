import IndexScreen from './src/screens/IndexScreen';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider as PaperProvider } from 'react-native-paper';

import { Provider as RecipeProvider } from './src/context/Recipe/RecipeContext';
import { Provider as IngredientsProvider } from './src/context/Ingredients/IngredientsContext';
import RecipesScreen from './src/screens/RecipesScreen';
import IngredientsScreen from './src/screens/IngredientsScreen';
import RecipeInfoScreen from './src/screens/RecipeInfoScreen';

// StackNavigator is an object that decides what to show on the screen at any given time
const navigator = createStackNavigator(
  {
    Index: IndexScreen,
    Recipes: RecipesScreen,
    Ingredients: IngredientsScreen,
    RecipeInfo: RecipeInfoScreen,
  },
  {
    // initial is the home screen
    initialRouteName: 'Index',
    defaultNavigationOptions: {
      title: 'ListEat',
    },
  }
);

const App = createAppContainer(navigator);

export default () => {
  return (
    <SafeAreaProvider>
      <IngredientsProvider>
        <RecipeProvider>
          <PaperProvider>
            <App />
          </PaperProvider>
        </RecipeProvider>
      </IngredientsProvider>
    </SafeAreaProvider>
  );
};
//export default createAppContainer(navigator);
