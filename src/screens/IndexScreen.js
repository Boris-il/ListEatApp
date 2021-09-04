import { Navigation } from '@material-ui/icons';
import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import RecipesImage from '../../assets/recipes.jpg';
import IngredientsImage from '../../assets/shopping.jpg';

/* button can contain only text while TouchableOpacity can store any element.
  the button is a little less powerful and has little configurations available.

  props is a system to pass data from a parent to a child

  state is a system to track a piece of data that will change over time.
  if that data changes, our app will 'rerender'
*/
const HomeScreen = (props) => {
  const resolveImage = (img) => {
    return Image.resolveAssetSource(img).uri;
  };

  menuOptions = [
    {
      section: 'recipes',
      name: 'המתכונים שלי',
      screen: 'Recipes',
      img: RecipesImage,
    },
    {
      section: 'shopping',
      name: 'רשימת הקניות שלי',
      screen: 'Ingredients',
      img: IngredientsImage,
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listView}
        vertical
        showsHorizontalScrollIndicator={false}
        data={menuOptions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                alignItems: 'center',
                marginTop: 50,
              }}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate(item.screen);
                }}>
                <View style={styles.container2}>
                  <Image
                    style={styles.image}
                    source={{ uri: resolveImage(item.img) }}
                  />
                  <Text style={styles.name}> {item.name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },

  container: { marginTop: 15 },

  container2: { marginTop: -10 },

  image: {
    width: 300,
    height: 200,
    borderRadius: 6,
    marginBottom: 5,
  },

  name: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

/*
    <TouchableOpacity onPress={function () { props.navigation.navigate("List") }}
    >
      <Text>Go to List Demo</Text>
    </TouchableOpacity>

*/
