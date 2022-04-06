<template>
  <div class="account flex flex-col items-center justify-center w-full">
    <div class="header w-full h-40 p-2 flex justify-around items-end">
      <h3 class="text-white text-2xl font-semibold self-end">Account Manager</h3>

      <div>
        <p class="bg-black text-white self-end pl-8 py-2.5 rounded-t">
          You are currently logged in as Raymond Tukpe
          <span
            class="bg-secondary ml-4 p-3 rounded-t px-8"
          >Logout</span>
        </p>
      </div>
    </div>

    <div class="card p-16 w-7/12 m-32 flex flex-col gap-y-24">
      <div class="flex justify-between items-center">
        <div>
          <p class="text-primary font-semibold text-lg">Update profile</p>
          <small
            class="text-grey3"
          >You can change your name, email address, interests, team and password.</small>
        </div>

        <div>
          <button
            class="text-white bg-primary font-medium rounded-lg text-sm px-8 py-2 text-center"
          >Edit</button>
        </div>
      </div>

      <div class="flex justify-between items-center">
        <div>
          <p class="text-primary font-semibold text-lg">Delete Account</p>
          <small class="text-grey3">Delete your account permanently</small>
        </div>

        <div>
          <button
            class="text-white bg-primary font-medium rounded-lg text-sm px-8 py-2 text-center"
          >Delete</button>
        </div>
      </div>

      <div class="flex justify-between items-center">
        <div>
          <p class="text-primary font-semibold text-lg">Feedback</p>
          <small class="text-grey3">Need help setting up your account? Send a message.</small>
        </div>

        <div>
          <button
            class="text-white bg-primary font-medium rounded-lg text-sm px-8 py-2 text-center"
          >Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.account {
  // min-height: calc(100vh - (#{$footer-height} + #{$nav-height}));
  .header {
    background-image: url("../../assets/imgs/panel-blue.png");
    background-repeat: no-repeat;
    background-size: cover;
  }

  .card {
    background: #ffffff;
    box-shadow: -4px -4px 15px rgba(216, 216, 216, 0.15),
      4px 4px 15px rgba(169, 168, 168, 0.15);
    border-radius: 8px;
  }
}
</style>