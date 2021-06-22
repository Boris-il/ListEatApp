import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid
} from "react-native";
import { Overlay, Input } from "react-native-elements";
import axios from "axios";
import Clipboard from "expo-clipboard";
import recAPI from "../api/recipesAPI";
import { Context as RecipeContext } from "../context/Recipe/RecipeContext";
import SearchBar from "../components/SearchBar";
import RecipeDetails from "../components/RecipeDetails";
import ActionButton from "../components/ActionButton";
import { VisibilityRounded } from "@material-ui/icons";
import { Entypo } from '@expo/vector-icons'; 

const RecipesScreen = ({ navigation }) => {
  // state for search bar query
  const [term, setTerm] = useState("");
  // state for api call results
  const [result, setResult] = useState(null);
  // state for api call error message
  const [errorMessage, setErrorMessage] = useState("");
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
  const [copiedText, setCopiedText] = useState("");
  // text state for copied url
  const [urlText, setUrlText] = useState("")

  // user ID
  const userId = "1234"

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
    setUrlText("")
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
      ToastAndroid.show('הועתק בהצלחה', ToastAndroid.SHORT)
    } else {
      // Clipboard is empty
      ToastAndroid.show('לא נמצא קישור', ToastAndroid.SHORT)
    }
  }

  const parseRecipe = () => {
    setIsSendLoading(true);
    addRecipe(urlText, userId, "test recipe1");
    setIsSendLoading(false);

  }

  return (
    <View style={styles.container}>
      <SearchBar
        term={term}
        type="חיפוש מתכון"
        onTermChange={(newTerm) => setTerm(newTerm)}
        //TODO: Search recipe by user-given name
        onTermSubmit={() => {}}
      />
      {isLoading ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={{ borderColor: "red", borderWidth: 2, flex: 1 }}>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={state}
            keyExtractor={(recipe) => recipe.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  //TODO: Navigate to screen with the ingredients
                  onPress={() =>
                    navigation.navigate("RecipeInfo", { id: item.id })
                  }
                >
                  <Text>{item.id}</Text>
                </TouchableOpacity>
              );
            }}
          />
          <ActionButton onPressing={toggleOverlay} />
          <Overlay
            isVisible={visible}
            onBackdropPress={toggleOverlay}
            animationType="slide"
            overlayStyle={styles.overlay}
          >
            <Input style={{marginTop: 5, textAlign: 'right'}}
            label='הוספת מתכון חדש'
            placeholder=' הכנס קישור'
            placeholderTextColor='#d1d1e0'
            onChangeText={setUrlText}
            value={urlText}
            rightIcon={
              <Entypo name="link" size={24} color="black" />
            }
            />
            <TouchableOpacity onPress={fetchCopiedText}>
              <Text style={{fontSize: 14}}>הכנס קישור מועתק</Text>
            </TouchableOpacity>
            {isCopyLoading ? (
              <View>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : (
              <Button
              title="תן לי"
        onPress={parseRecipe}
              />
              //handleClipboard()
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
    borderWidth: 2,
    borderColor: "red",
  },

  overlay: {
    position: "absolute",
    top: 80,
    right: 60,
    bottom: 40,
    left: 60,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f0f5f5",
    opacity: 0.95,
  },
  copiedText: {
    color: "red",
  },
});

export default RecipesScreen;

/*
    <TouchableOpacity onPress={function () { props.navigation.navigate("List") }}
    >
      <Text>Go to List Demo</Text>
    </TouchableOpacity>

*/
