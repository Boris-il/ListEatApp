import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Text, View } from "react-native";
import { getActiveChildNavigationOptions } from "react-navigation";
import server from "../api/server";

const TestConnectionScreen = ({}) => {
  // default object for the result is null
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  let isRendered = useRef(false);

  const userId = "1";

  const getResult = async (id) => {
    try {
      const response = server.get(`/recipe/get-all/12`);
      //const response = await server.get(`/recipe/get-all/12`);
      setResult(response.data);
    } catch (e) {
      console.log("error");

      setErrorMessage("Something went wrong");
    }
  };

  useEffect(() => {
    isRendered = true;
    const response = server
      .get(`/recipe/get-all/12`)
      .then((response) => {
        console.log(response.data);
        if (isRendered) {
          setResult(response.data);
        }
        return null;
      })
      .catch((err) => console.log(err));
    return () => {
      isRendered = false;
    };

    //const response = await server.get(`/recipe/get-all/12`);
  }, []);

  if (!result) {
    return null;
  }

  return (
    <View>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <Text>{result.id}</Text>
    </View>
  );
};

export default TestConnectionScreen;
