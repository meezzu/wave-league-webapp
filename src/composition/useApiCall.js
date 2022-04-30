import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

export default function useApiCall() {
  const baseUrl = import.meta.env.VITE_BASE_URL || "https://api.waveleague.com/api/v1/";
  const authorisedCall = axios.create();
  const loading = ref(false);
  const router = useRouter();

  // request interceptors to add bearer token to every requst on this instance
  authorisedCall.interceptors.request.use((request) => {
    const authStore = useAuthStore();
    request.headers.Authorization = `Bearer ${authStore.accessToken}`;
    return request;
  });

  // response interceptors to log user out when the token is no longer valid
  authorisedCall.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        const authStore = useAuthStore();

        authStore.userSignedIn = false;
        router.push({ name: "auth-sign-in" });
        localStorage.removeItem("state");
      }
    }
  );

  const loginPlayer = async (data) => {
    loading.value = true;
    return await axios
      .post(`${baseUrl}/players/login`, data)
      .then((response) => {
        loading.value = false;
        return response.data.data;
      })
      .catch((error) => {
        loading.value = false;
        throw error;
      });
  };

  const registerPlayer = async (data) => {
    loading.value = true;
    return await axios
      .post(`${baseUrl}/players/signup`, data)
      .then((response) => {
        loading.value = false;
        return response.data.data;
      })
      .catch((error) => {
        loading.value = false;
        throw error;
      });
  };

  const getPlayerSquad = async (data) => {
    loading.value = true;
    return await authorisedCall
      .get(`${baseUrl}/players/${data}/squad`)
      .then((response) => {
        loading.value = false;
        return response.data.data;
      })
      .catch((error) => {
        loading.value = false;
        throw error;
      });
  };

  const createSquad = async (data) => {
    loading.value = true;
    return await authorisedCall
      .post(`${baseUrl}/squads`, data)
      .then((response) => {
        loading.value = false;
        return response.data.data;
      })
      .catch((error) => {
        loading.value = false;
        throw error;
      });
  };

  const getAllArtistes = async (query) => {
    loading.value = true;
    const queryParams = new URLSearchParams(query).toString();
    return await authorisedCall
      .get(`${baseUrl}/artistes?${queryParams}`)
      .then((response) => {
        loading.value = false;
        return response.data.data;
      })
      .catch((error) => {
        loading.value = false;
        throw error;
      });
  };

  const addToSquad = async (data) => {
    loading.value = true;
    const artistes = data.artistes.currentSquad.map((artiste) => artiste._id);

    return await authorisedCall
      .post(`${baseUrl}squads/${data.squadId}/add-artistes`, { artistes })
      .then((response) => {
        loading.value = false;
        return response.data.data;
      })
      .catch((error) => {
        loading.value = false;
        throw error;
      });
  };

  const removeFromSquad = async (data) => {
    loading.value = true;
    return await authorisedCall
      .post(`${baseUrl}squads/${data.squadId}/remove-artistes`, data.artistes)
      .then((response) => {
        loading.value = false;
        return response.data.data;
      })
      .catch((error) => {
        loading.value = false;
        throw error;
      });
  };

  const substituteArtiste = async (data) => {
    loading.value = true;
    return await authorisedCall
      .post(`${baseUrl}squads/${data.squadId}/substitute`, data.artistes)
      .then((response) => {
        loading.value = false;
        return response.data.data;
      })
      .catch((error) => {
        loading.value = false;
        throw error;
      });
  };

  const transferArtistes = async (data) => {
    loading.value = true;
    return await authorisedCall
      .post(`${baseUrl}squads/${data.squadId}/replace-artistes`, data.artistes)
      .then((response) => {
        loading.value = false;
        return response.data.data;
      })
      .catch((error) => {
        loading.value = false;
        throw error;
      });
  };

  return {
    loginPlayer,
    registerPlayer,
    getPlayerSquad,
    createSquad,
    getAllArtistes,
    addToSquad,
    removeFromSquad,
    substituteArtiste,
    transferArtistes,
    loading
  };
}
