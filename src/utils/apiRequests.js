import axios from "axios";
import useAuthStore from "../stores/auth";

const authStore = useAuthStore();
const baseUrl = "https://wave-league.herokuapp.com/api/v1/";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${authStore.accessToken}`,
};

export const loginPlayer = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.post(`${baseUrl}/players/login`, data);
      resolve(response.data.data);
    } catch (error) {
      reject(error.response.data);
    }
  });
};

export const registerPlayer = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.post(`${baseUrl}/players/signup`, data);
      resolve(response.data.data);
    } catch (error) {
      reject(error.response.data);
    }
  });
};

export const getPlayerSquad = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/players/${data}/squad`, headers)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};


