import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Overlay, Input, ListItem, Icon, Button } from 'react-native-elements';

import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Context as IngredientsContext } from '../context/Ingredients/IngredientsContext';
import { Context as RecipeContext } from '../context/Recipe/RecipeContext';

import SearchBar from '../components/SearchBar';
import { TouchableOpacity } from 'react-native';

const ShoppingScreen = () => {
  // state for search filtering query
  const [term, setTerm] = useState('');
  // global context
  const { state, getAllIngredients, deleteIngredient } =
    useContext(IngredientsContext);
  //const { state, addRecipe, getRecipe, getAllRecipes, deleteRecipe } =
  //  useContext(RecipeContext);
  const [expanded, setExpanded] = useState(false);
  //const [expandState, setExpandState] = useState([]);
  // required for api sync in useEffect
  let isRendered = useRef(false);
  // fetch loading state
  const [isLoading, setIsLoading] = useState(true);

  // user IDz
  const userId = '123';

  useEffect(() => {
    isRendered = true;
    getAllIngredients(`${userId}`, () => {
      setIsLoading(!isLoading);
      //initState();
    });
    return () => {
      isRendered = false;
    };
  }, []);

  // const initState = () => {
  //   let newState = [];
  //   state.map((item) => {
  //     let obj = { id: item.id, status: false };
  //     newState = [...newState, obj];
  //   });
  //   setExpandState(newState);
  // };

  // const getItem = (item_id) => {
  //   expandState.map((row) => {
  //     if (item_id === row.id) {
  //       console.log('pressed on: ', row.id, 'status is: ', row.status);
  //       let obj = { id: item_id, status: !row.status };
  //       let newState = [...newState, obj];
  //       return newState;
  //     }
  //   });
  // };

  // const checkExpended = (item_id) => {
  //   expandState.map((row) => {
  //     if (item_id === row.id) {
  //       console.log(row.id);
  //       return row.status;
  //     }
  //   });
  // };

  const keyExtractor = (recipe, index) => index.toString();

  const renderItem = ({ item }) => {
    return (
      <ListItem.Accordion
        content={
          <>
            <ListItem.Chevron style={styles.itemChevron} />
            <ListItem.Content>
              <View style={{ marginLeft: 10 }}>
                <TouchableOpacity
                  onPress={() => deleteIngredient(item.id, userId)}>
                  <FontAwesome5 name='trash' size={24} />
                </TouchableOpacity>
              </View>
            </ListItem.Content>
            <ListItem.Content style={{ alignItems: 'flex-end' }}>
              <View style={{ marginRight: 10 }}>
                <ListItem.Title
                  style={styles.itemText}
                  numberOfLines={2}
                  textBreakStrategy='simple'>
                  {item.ingredient.name}
                </ListItem.Title>
                <ListItem.Subtitle>
                  {item.ingredient.amount} {item.ingredient.measurement}
                </ListItem.Subtitle>
              </View>
            </ListItem.Content>

            <ListItem.CheckBox />
          </>
        }
        noIcon
        bottomDivider
        //isExpanded={checkExpended}
        // onPress={() => {
        //   getItem(item.id);
        // }}
      >
        <Text>expanded</Text>
      </ListItem.Accordion>
    );
  };

  return (
    <View>
      <SearchBar
        term={term}
        type='חיפוש מרכיבים'
        onTermChange={(newTerm) => setTerm(newTerm)}
      />
      {isLoading ? (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' color='#0000ff' />
        </View>
      ) : (
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          data={state.filter((ingredient) =>
            ingredient.name.toLowerCase().includes(term.toLowerCase() || '')
          )}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    alignSelf: 'flex-end',
  },
  itemText: {
    marginLeft: -50,
    textAlign: 'right',
    borderColor: 'red',
    borderWidth: 1,
    fontSize: 17,
    fontWeight: 'bold',
  },
  itemChevron: {
    transform: [{ rotateY: '180deg' }],
  },
});

export default ShoppingScreen;

/*
    <TouchableOpacity onPress={function () { props.navigation.navigate("List") }}
    >
      <Text>Go to List Demo</Text>
    </TouchableOpacity>

*/
