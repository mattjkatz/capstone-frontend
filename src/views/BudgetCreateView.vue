<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newBudget: {},
    };
  },
  methods: {
    budgetCreate() {
      axios
        .post("/budgets", this.newBudget, (this.newBudget.user_id = localStorage.getItem("userId")))
        .then((response) => {
          console.log(response.data);
          this.$router.push("/finance-create");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(this.errors);
        });
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="card o-hidden border-0 shadow-lg my-5">
      <div class="card-body p-0">
        <!-- Nested Row within Card Body -->
        <div class="row">
          <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
          <div class="col-lg-7">
            <div class="p-5">
              <div class="text-center">
                <h1 class="h3 text-gray-900 mb-5">Create your Budget!</h1>
                <p class="p text-gray-600 mb-3">Let's start by giving it a name:</p>
              </div>
              <form class="user" v-on:submit.prevent="budgetCreate()">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-user"
                    id="exampleInputEmail"
                    placeholder="Budget Name"
                    v-model="newBudget.name"
                  />
                </div>
                <hr />
                <!-- <a class="btn btn-primary btn-user btn-block" type="submit" value="Submit">Register Account</a> -->
                <input
                  class="btn btn-primary btn-user btn-block"
                  href="/finance-create"
                  type="submit"
                  value="Create Budget"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Page Heading -->
</template>

<style>
.center-row {
  margin: auto;
  width: 50%;
  padding: 10px;
}
.column {
  float: left;
  width: 50%;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}
.right-column {
  text-align: right;
}
.center-align {
  text-align: center;
  align-items: center;
  margin: auto;
  align-content: center;
  align-self: center;
}
</style>
