<template>
  <section class="sign-in flex justify-center items-center p-2">
    <div
      class="card flex flex-col justify-center text-center items-center bg-grey5 p-8 text-black rounded-lg w-full sm:w-10/12 md:w-9/12 lg:w-7/12"
    >
      <div class="card__logo mt-12">
        <img
          src="@/assets/icons/wave-league-logo-orange.svg"
          alt="wave league logo"
          width="120"
          height="120"
        />
      </div>

      <div class="card__body mt-12 flex flex-col items-center justify-center">
        <div class="text-secondary font-medium text-2xl">Welcome Back!</div>

        <div class="text-base text-gray-500 text-center mt-8">
          Sign in to your account to continue with
          <a href="#" class="text-secondary">Wave League</a>
        </div>

        <!-- <div class="card__btn mt-12">
          <button
            v-if="!googleLoading"
            class="flex items-center space-x-4 bg-white text-primary shadow rounded-lg py-3 px-16"
            @click="authenticateUser"
          >
            <img
              src="@/assets/icons/google-icon.svg"
              alt="sign in with google"
              width="40"
              height="40"
            />
            <span>Log in with Google</span>
          </button>

          <div v-if="googleLoading">
            <img
              src="../../assets/icons/loader-rolling.svg"
              alt="loading indicator"
              height="60"
              width="60"
            />
          </div>
        </div>-->

        <div class="mt-12" id="google__btn"></div>
      </div>

      <div class="card__footer mt-16">
        <div class="text-sm text-black2 font-semibold">COPYRIGHT © 2022 WAVE LEAGUE</div>
      </div>
    </div>
  </section>
</template>

<script>
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";
import useApiCall from "@/composition/useApiCall";
import { onMounted, onBeforeMount } from "vue";

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const { loginPlayer, registerPlayer } = useApiCall();

    onBeforeMount(() => {
      let googleIdentityScript = document.createElement("script");
      googleIdentityScript.setAttribute(
        "src",
        "https://accounts.google.com/gsi/client"
      );
      googleIdentityScript.setAttribute("async", "");
      googleIdentityScript.setAttribute("defer", "");
      document.head.appendChild(googleIdentityScript);
    });

    onMounted(() => {
      window.addEventListener("load", () => {
        const google = window.google;
        google.accounts.id.initialize({
          client_id:
            "133086316885-9dm96sme28aos140tsvco7ogflpinoi6.apps.googleusercontent.com",
          callback: handleCredentialResponse,
        });
        google.accounts.id.renderButton(
          document.getElementById("google__btn"),
          { theme: "outline", size: "large" } // customization attributes
        );
        google.accounts.id.prompt(); // also display the One Tap dialog
      });
    });

    function parseJwt(token) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    }

    function handleCredentialResponse(response) {
      const googleUser = parseJwt(response.credential);
      authStore.googleUser = googleUser;

      checkExistingUser();
    }

    function checkExistingUser() {
      loginPlayer({ email: authStore.googleUser.email })
        .then((response) => {
          authStore.waveProfile = response;
          authStore.userSignedIn = true;
          return router.push({ name: "pick-squad" });
        })
        .catch((error) => {
          if (error.response.data.error_code === 302) {
            return initRegisterNewUser();
          } else console.error(error);
        });
    }

    function initRegisterNewUser() {
      const payload = {
        email: authStore.googleUser.email,
        player_name: `${authStore.googleUser?.name}`,
      };
      registerPlayer(payload)
        .then((response) => {
          authStore.waveProfile = response;
          authStore.userSignedIn = true;
          router.push({ name: "pick-squad" });
        })
        .catch((error) => {
          console.error(error);
        });
    }

    return {};
  },
};
</script>

<style lang="scss" scoped>
.sign-in {
  height: 100vh;

  .card {
    background-image: url("@/assets/icons/fluid-shape-top-right.svg"),
      url("@/assets/icons/symphony-top-right.svg"),
      url("@/assets/icons/fluid-shape-top-left.svg"),
      url("@/assets/icons/symphony-top-left.svg");
    background-position: right top, right top, left top, left top;
    background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
  }
}
</style>
