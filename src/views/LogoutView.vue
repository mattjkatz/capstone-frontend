<script>
import axios from "axios";
export default {
  methods: {
    logout: function () {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("jwt");
      this.$router.push("/");
    },
  },
};
</script>

<template>
  <!-- Outer Row -->
  <div class="row justify-content-center">
    <div class="col-xl-10 col-lg-12 col-md-9">
      <div class="card o-hidden border-0 shadow-lg my-5">
        <div class="card-body p-0">
          <!-- Nested Row within Card Body -->
          <div class="row">
            <div class="col-lg-6 d-none d-lg-block bg-logout-image"></div>
            <div class="col-lg-6">
              <div class="p-5">
                <div class="text-center">
                  <h1 class="h4 text-gray-900 mb-4">See You Later!</h1>
                </div>
                <form class="user" v-on:submit.prevent="logout()">
                  <input class="btn btn-primary btn-user btn-block" href="/" type="submit" value="Logout of Account" />
                </form>
                <hr />
                <div class="text-center">
                  <a class="small" href="forgot-password.html">Login to a Different Account?</a>
                </div>
                <div class="text-center">
                  <a class="small" href="/signup">Register a New Account?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
