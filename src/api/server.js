import axios from "axios";

export default axios.create({
  // the root URL we want to send request to.
  baseURL: "http://192.168.56.1:8080",

  // specifying header
  /*
  headers: {
    Authorization:
      "Bearer u1cBq8nXSRHQZk45x9j_JcWDiR_p6_4rD-NluIvYYsuBfE9bnq5mvuTLX0cqZ_LcMn_PCZD7ossCTEiyIRBh9pZr-xoiofVnQ8WjO539bq3sSePBEgNkBhINi2uyYHYx",
  },
  */
});
