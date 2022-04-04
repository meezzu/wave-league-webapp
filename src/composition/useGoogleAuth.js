import { ref } from "vue";

export default function useGoogleAuth() {
  const googleProfile = ref({});
  const errorState = ref(null);
  const googleLoading = ref(false);

  const googleAuthentication = () => {
    return new Promise((resolve, reject) => {
      googleLoading.value = true;
      const gapi = window.gapi; // the google script in index.html creates this gapi window object
      const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID; // client id of our app from google console
      const apiKey = import.meta.env.VITE_GOOGLE_API_KEY; // api key of our app from google console
      const discoveryDocs = [import.meta.env.VITE_GOOGLE_DISCOVERY_DOCS]; // array of discovery docs from google console
      const scope = import.meta.env.VITE_GOOGLE_SCOPE; // response scope

      gapi.load("client:auth2", () => {
        // init gapi client with google credentials
        gapi.client
          .init({
            apiKey,
            client_id,
            discoveryDocs,
            scope,
          })
          .then(() => {
            // if the user is already signed in to a google account in the browser, get the user profile and route user to homepage
            if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
              googleProfile.value = gapi.auth2.getAuthInstance().currentUser.get();
              googleLoading.value = false;
              resolve();
            } else {
              gapi.auth2
                .getAuthInstance()
                .signIn()
                .then(() => {
                  googleProfile.value = gapi.auth2.getAuthInstance().currentUser.get();
                  googleLoading.value = false;
                  resolve();
                })
                .catch((err) => {
                  googleLoading.value = false;
                  errorState.value = err;
                  console.error(err);
                  reject(err);
                });
            }
          })
          .catch((err) => {
            googleLoading.value = false;
            errorState.value = err;
            console.error(err);
            reject(err);
          });
      });
    });
  };

  return {
    googleAuthentication,
    googleProfile,
    errorState,
    googleLoading,
  };
}
