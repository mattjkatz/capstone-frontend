<script>
export default {
  data: function () {
    return {
      newSessionParams: {},
      errors: [],
    };
  },
  methods: {},
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
            <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
            <div class="col-lg-6">
              <div class="p-5">
                <div class="text-center">
                  <h1 class="h2 text-gray-900 mb-4">Hi! Ready to track your finances?</h1>
                </div>
                <hr />
                <p class="p text-gray-900 mb-9">New? Create a new account and start budgeting</p>
                <form action="/signup">
                  <input class="btn btn-primary btn-user btn-block" type="submit" value="Sign Up" />
                </form>
                <hr />
                <p class="p text-gray-900 mb-9">Returning? Login in and track your spending</p>
                <form action="/login">
                  <input class="btn btn-primary btn-user btn-block" type="submit" value="Log In" />
                </form>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
