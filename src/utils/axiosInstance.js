import axios from "axios";

export default {
  config: axios.create({
    baseURL: "https://wave-league.herokuapp.com/api/v1",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  }),
};
