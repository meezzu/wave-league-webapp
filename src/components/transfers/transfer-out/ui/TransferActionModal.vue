<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container relative p-2 rounded">
          <div class="modal-header text-center font-semibold text-base"></div>

          <div class="modal-body flex flex-col justify-center items-center gap-y-6">
            <AppButton text="Transfer Out" @clicked="$emit('startTransfer')" />
            <AppButton text="View Information" @clicked="$emit('viewInfo')" />
          </div>

          <div class="modal-footer"></div>

          <img
            class="absolute top-[-12px] right-[-12px] cursor-pointer"
            src="@/assets/icons/delete-primary.svg"
            @click="$emit('close')"
            alt="cancel"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import AppButton from "../../../global/AppButton.vue";
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 10;
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
    width: 80%;
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