import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import { Overlay, Input, ListItem, Icon, Button } from 'react-native-elements';
import {
  MaterialIcons,
  FontAwesome5,
  Foundation,
  Entypo,
  Ionicons,
} from '@expo/vector-icons';
import Clipboard from 'expo-clipboard';
import { Context as RecipeContext } from '../context/Recipe/RecipeContext';
import SearchBar from '../components/SearchBar';
import RecipeDetails from '../components/RecipeDetails';
import ActionButton from '../components/ActionButton';

const RecipesScreen = ({ navigation }) => {
  // state for search filtering query
  const [term, setTerm] = useState('');
  // state for api call results
  const [result, setResult] = useState(null);
  // state for api call error message
  const [errorMessage, setErrorMessage] = useState('');
  // global context
  const { state, addRecipe, getRecipe, getAllRecipes, deleteRecipe } =
    useContext(RecipeContext);
  // required for api sync in useEffect
  let isRendered = useRef(false);
  // fetch loading state
  const [isLoading, setIsLoading] = useState(true);
  const [isCopyLoading, setIsCopyLoading] = useState(false);
  const [isSendLoading, setIsSendLoading] = useState(false);

  // overlay visiblity state
  const [visible, setVisible] = useState(false);
  // clipboard text fetch
  const [copiedText, setCopiedText] = useState('');
  // text state for copied url
  const [urlText, setUrlText] = useState('');
  // text state for name of recipe
  const [recipeName, setRecipeName] = useState('');

  // user ID
  const userId = '3';

  /*const fetchCopiedText = async () => {
    setLoaded(false);
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
    setLoaded(true);
  };
  */

  const fetchCopiedText = async () => {
    setIsCopyLoading(true);
    const text = await Clipboard.getStringAsync();
    console.log(text);
    setCopiedText(text);
    setIsCopyLoading(false);
    handleClipboard(text);
  };

  const toggleOverlay = () => {
    setVisible(!visible);
    setUrlText('');
    setRecipeName('');
  };

  useEffect(() => {
    isRendered = true;
    getAllRecipes(`${userId}`, () => {
      setIsLoading(!isLoading);
    });
    return () => {
      isRendered = false;
    };
  }, []);

  /**
   if (!result) {
    return null;
  }
  */

  const handleClipboard = (text) => {
    if (copiedText.length > 0) {
      // Use text from clipboard
      setUrlText(text);
      ToastAndroid.show('הועתק בהצלחה', ToastAndroid.SHORT);
    } else {
      // Clipboard is empty
      ToastAndroid.show('לא נמצא קישור', ToastAndroid.SHORT);
    }
  };

  const parseRecipe = () => {
    setIsSendLoading(true);
    addRecipe(urlText, userId, recipeName);
    setIsSendLoading(false);
    // close overlay
    toggleOverlay();
  };

  const showSubmitButton = () => {
    if (urlText.length > 0 && recipeName.length > 0) {
      return <Button title='שמור מתכון' raised onPress={parseRecipe} />;
    } else {
      return (
        <Button title='שמור מתכון' disabled raised onPress={parseRecipe} />
      );
    }
  };

  const keyExtractor = (recipe, index) => index.toString();

  const renderItem = ({ item }) => {
    return (
      <ListItem.Swipeable
        leftContent={
          <Button
            title='פתח'
            onPress={() => navigation.navigate('RecipeInfo', { id: item.id })}
            icon={<Foundation name='info' size={36} color='white' />}
            buttonStyle={{ minHeight: '100%' }}
            titleStyle={{ marginHorizontal: 6, fontSize: 17 }}
          />
        }
        rightContent={
          <Button
            title='מחק'
            onPress={() => deleteRecipe(item.id, userId)}
            icon={<FontAwesome5 name='trash' size={24} color='white' />}
            buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
            titleStyle={{ marginHorizontal: 6, fontSize: 17 }}
          />
        }>
        <ListItem.Chevron style={styles.itemChevron} />
        <ListItem.Content style={{ alignItems: 'flex-end' }}>
          <ListItem.Title style={styles.itemText}>
            {item.recipeName}
          </ListItem.Title>
          <ListItem.Subtitle>{item.id}</ListItem.Subtitle>
        </ListItem.Content>
        <MaterialIcons name='fastfood' size={26} color='black' />
      </ListItem.Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar
        term={term}
        type='חיפוש מתכון'
        onTermChange={(newTerm) => setTerm(newTerm)}
        onTermSubmit={() => {}}
      />
      {isLoading ? (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' color='#0000ff' />
        </View>
      ) : (
        <View style={{ borderColor: 'red', borderWidth: 0, flex: 1 }}>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={state.filter((recipe) =>
              recipe.recipeName.toLowerCase().includes(term.toLowerCase() || '')
            )}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
          <ActionButton onPressing={toggleOverlay} />
          <Overlay
            isVisible={visible}
            onBackdropPress={toggleOverlay}
            animationType='slide'
            overlayStyle={styles.overlay}>
            <View>
              <Input
                style={{ marginTop: 15, textAlign: 'right' }}
                label='הוספת מתכון חדש'
                placeholder=' הכנס קישור'
                placeholderTextColor='#d1d1e0'
                onChangeText={setUrlText}
                value={urlText}
                rightIcon={
                  <Entypo
                    style={{ marginTop: 10 }}
                    name='link'
                    size={24}
                    color='black'
                  />
                }
              />
              <TouchableOpacity
                style={{ marginTop: -15 }}
                onPress={fetchCopiedText}>
                <Text style={{ fontSize: 14 }}>הדבק קישור מועתק</Text>
              </TouchableOpacity>
              <Input
                style={{ marginTop: 30, textAlign: 'right' }}
                placeholder=' הכנס שם למתכון'
                placeholderTextColor='#d1d1e0'
                onChangeText={setRecipeName}
                value={recipeName}
                rightIcon={
                  <Ionicons
                    name='md-text'
                    style={{ marginTop: 25 }}
                    size={23}
                    color='black'
                  />
                }
              />
            </View>

            {isCopyLoading ? (
              <View>
                <ActivityIndicator size='large' color='#0000ff' />
              </View>
            ) : (
              showSubmitButton()
            )}
          </Overlay>
        </View>
      )}
    </View>
  );
};

/**
 *
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0,
    borderColor: 'red',
  },

  overlay: {
    flex: 1,
    position: 'absolute',
    top: 80,
    right: 60,
    bottom: 40,
    left: 60,
    backgroundColor: '#f0f5f5',
    opacity: 0.95,
  },
  copiedText: {
    color: 'red',
  },
  itemText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  itemChevron: {
    transform: [{ rotateY: '180deg' }],
  },
});

export default RecipesScreen;

/*
    <TouchableOpacity onPress={function () { props.navigation.navigate("List") }}
    >
      <Text>Go to List Demo</Text>
    </TouchableOpacity>

*/
