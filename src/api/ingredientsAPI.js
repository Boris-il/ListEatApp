import axios from "axios";

export default axios.create({
  // the root URL we want to send request to.
  baseURL: "http://192.168.56.1:8080/Ingredient",
});
