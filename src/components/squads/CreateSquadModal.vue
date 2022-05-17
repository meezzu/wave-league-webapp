<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container relative rounded">
          <div class="modal-header text-center font-semibold text-base">Enter Squad</div>

          <div class="modal-body">
            <form
              @submit.prevent="handleSubmit"
              class="text-center flex flex-col justify-center items-center"
            >
              <label for="squad-name text-xs text-gray1 mb-2">Add Squad Name</label>
              <input
                type="text"
                name="squad-name"
                id="squad-name"
                v-model="squadName"
                class="w-full mt-2 px-8 py-2 outline-none rounded border"
              />
              <small class="text-grey4 text-xs mt-1">30 maximum characters</small>
              <small v-if="formError" class="text-xs text-red-500 mt-1">{{ formError }}</small>

              <button
                type="submit"
                class="text-white mt-6 bg-primary font-medium rounded-lg text-base px-8 py-2 text-center"
              >Create Squad</button>
            </form>
          </div>

          <div class="modal-footer"></div>

          <img
            class="absolute top-[-12px] right-[-12px]"
            src="../../assets/icons/delete-primary.svg"
            @click="$emit('close')"
            alt="cancel"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref } from "vue";
export default {
  emits: ["submitted"],
  setup(props, ctx) {
    const squadName = ref("");
    const formError = ref("");
    const handleSubmit = () => {
      formError.value = "";
      if (squadName.value.length > 30)
        return (formError.value = "Squad name must be less than 30 characters");
      if (!squadName.value.length)
        return (formError.value = "Please enter a name for your squad");
      formError.value = "";
      ctx.emit("submitted", squadName.value);
    };

    return { squadName, handleSubmit, formError };
  },
};
</script>


<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 400px;
  width: auto;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;

  @media only screen and (max-width: 600px) {
    max-width: 80%;
  }
}

.modal-header {
  margin-top: 0;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>