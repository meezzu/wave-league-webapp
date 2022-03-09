<template>
  <nav
    class="nav relative z-20 text-white border-gray-200 overflow-y-visible transition duration-700 ease-in-out drop-shadow-md"
  >
    <div
      class="px-4 sm:px-8 md:px-12 lg:px-24 py-4 flex flex-wrap justify-between items-center mx-auto"
    >
      <!-- website logo section  -->
      <div class="flex w-1/12">
        <a href="#">
          <img
            src="../../assets/icons/wave-league-logo.svg"
            alt="wave league logo"
            height="60"
            width="60"
          />
        </a>
      </div>

      <!-- menu items  -->
      <div
        class="menu hidden justify-between items-center text-sm w-full lg:flex md:w-auto md:order-1"
      >
        <ul class="menu-list text-sm flex flex-col mt-4 md:flex-row md:space-x-12 md:mt-0">
          <li class="menu-list-item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="menu-list-item">
            <router-link to="/">Squad</router-link>
          </li>
          <li class="menu-list-item">
            <router-link to="/">Points</router-link>
          </li>
          <li class="menu-list-item">
            <router-link to="/">Transfers</router-link>
          </li>
          <li class="menu-list-item">
            <router-link to="/">Ranking</router-link>
          </li>
        </ul>
      </div>

      <!-- cta section  -->
      <div class="flex items-center text-sm md:order-2 space-x-8 md:space-x-4">
        <a class="hidden lg:flex py-2 pr-4 pl-3 text-white" href="#">
          <img src="@/assets/icons/bell.svg" alt="notifications" />
        </a>

        <div class="profile flex items-center gap-x-4">
          <p class="font-semibold text-sm">Raymond</p>
          <img src="@/assets/imgs/raymond.png" alt="profile picture" />
        </div>

        <label class="hamburger flex lg:hidden" for="check">
          <input id="check" v-model="showMobileMenu" type="checkbox" />
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
    </div>

    <!-- mobile menu  -->
    <div
      v-show="showMobileMenu"
      class="z-21 pt-16 bg-primary text-sm transition duration-300"
      :class="{'h-screen': showMobileMenu}"
    >
      <ul class="flex flex-col items-center">
        <li>
          <a href="#" class="block py-8 text-white" aria-current="page">Home</a>
        </li>
        <li>
          <a href="#" class="block py-8 text-white">How to Play</a>
        </li>
        <li>
          <a href="#" class="block py-8 text-white">Sign In</a>
        </li>

        <li class="block py-8" @click="showMobileMenu = false">
          <img src="@/assets/icons/close-icon-white.svg" alt="close menu" height="40" width="40" />
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AuthNavbarSection",
  data() {
    return {
      showMobileMenu: false,
      scrollPosition: null,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
  methods: {
    toggleMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },

    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
  },

  beforeUnmount() {
    this.scrollPosition = null;
    window.removeEventListener("scroll", this.updateScroll);
  },
};
</script>

<style lang="scss" scoped>
.nav {
  background: linear-gradient(180deg, #000022 0%, #004f86 60.13%, #013e67 100%);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);

  .hamburger {
    flex-direction: column;
    width: 30px;
    cursor: pointer;

    span {
      background: #fff;
      border-radius: 6px;
      height: 2px;
      margin: 4px 0;
      transition: 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
    }

    span:nth-of-type(1) {
      width: 100%;
    }

    span:nth-of-type(2) {
      width: 75%;
    }

    span:nth-of-type(3) {
      width: 100%;
    }

    input[type="checkbox"] {
      display: none;
    }

    input[type="checkbox"]:checked ~ span:nth-of-type(1) {
      transform-origin: center;
      width: 100%;
      transform: rotatez(45deg) translate(0px, 6px);
    }

    input[type="checkbox"]:checked ~ span:nth-of-type(2) {
      transform-origin: centre;
      width: 100%;
      transform: rotatez(-45deg) translate(0px, -8px);
    }

    input[type="checkbox"]:checked ~ span:nth-of-type(3) {
      // transform-origin: bottom;
      // width: 50%;
      // transform: translate(30px, -11px) rotatez(45deg);
      display: none;
    }
  }

  .menu {
    &-list {
    }

    &-list-item {
      list-style-type: none;
      text-decoration: none;
      background: $secondary;
      font-size: 14px;
      line-height: 18px;
      margin-bottom: -80px;
      border: 4px solid white;
      border-radius: 100%;
      height: 90px;
      width: 90px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
