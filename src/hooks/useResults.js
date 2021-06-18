import React, { useState, useEffect } from "react";
import server from "../api/server";

export default () => {
  // state for results
  const [results, setResults] = useState([]);
  // state for error message
  const [errorMessage, seterrorMessage] = useState("");

  /* useEffect is a hook (function) that allows us to run code just one
    time when our component is first rendered on the screen.
    useEffect gets 2 params:
    1. object that refers to the function we want to run.
    2. how many times we want it to run. By default: each time when rendering.
  */
  useEffect(() => {
    searchAPI("steak");
  }, []);

  // function that initiates the request
  const searchAPI = async (searchTerm) => {
    try {
      const response = await server.get("/search", {
        params: {
          limit: 50,
          term: searchTerm,
          location: "new york",
        },
      });
      // response.data will actually have the json data.
      setResults(response.data.businesses);
    } catch (e) {
      seterrorMessage("Something went wrong");
    }
  };
  // return the data that we use in SearchScreen's JSX.
  return [searchAPI, results, errorMessage];
};
