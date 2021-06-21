import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { Overlay } from "react-native-elements";
import axios from "axios";
import Clipboard from "expo-clipboard";
import recAPI from "../api/recipesAPI";
import { Context as RecipeContext } from "../context/Recipe/RecipeContext";
import SearchBar from "../components/SearchBar";
import RecipeDetails from "../components/RecipeDetails";
import ActionButton from "../components/ActionButton";
import { VisibilityRounded } from "@material-ui/icons";

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

  // overlay visiblity state
  const [visible, setVisible] = useState(false);
  // clipboard text fetch
  const [copiedText, setCopiedText] = useState("");

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
    setCopiedText(text);
    setIsCopyLoading(false);
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    isRendered = true;
    getAllRecipes("12", () => {
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

  const handleAddRecipe = () => {
    Alert.alert("", "new recipe");
    //TODO: Open an overlay for recipe url insertion and call addRecipe()
  };

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
            <TouchableOpacity onPress={fetchCopiedText}>
              <Text>Read from clipboard</Text>
            </TouchableOpacity>
            {isCopyLoading ? (
              <View>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : (
              <Text style={styles.copiedText}>{copiedText}</Text>
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
    justifyContent: "center",
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
