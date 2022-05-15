<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newIncome: {},
      newSpending: {},
      frequencies: ["One Time", "Monthly", "Annualy"],
      taxes: ["Income", "Captial Gains", "N/A"],
    };
  },
  methods: {
    incomeCreate() {
      axios
        .post("/finances", this.newIncome, (this.newIncome.transaction_type = "income"))
        .then((response) => {
          console.log(response.data);
          this.$router.push("/");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(this.errors);
        });
    },
    spendingCreate() {
      axios
        .post("/finances", this.newSpending, (this.newIncome.transaction_type = "spending"))
        .then((response) => {
          console.log(response.data);
          this.$router.push("/");
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
              <div class="">
                <h1 class="h3 text-gray-900 mb-5 text-center">Now Let's Plan Some Finances!</h1>
                <p class="p text-gray-600 mb-3">Add your income:</p>
              </div>
              <form class="user" v-on:submit.prevent="incomeCreate(), spendingCreate()">
                <div class="form-group row">
                  <div class="col-sm-6 mb-3 mb-sm-0">
                    <input
                      type="text"
                      class="form-control form-control-user"
                      id=""
                      placeholder="Name of Income"
                      v-model="newIncome.name"
                    />
                  </div>
                  <div class="col-sm-6">
                    <input
                      type="number"
                      class="form-control form-control-user"
                      id=""
                      placeholder="Dollar Amount"
                      v-model="newIncome.amount"
                    />
                  </div>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Frequency</label>
                  </div>
                  <select class="custom-select" v-model="newIncome.frequency" id="inputGroupSelect01">
                    <option v-for="frequency in frequencies" v-bind:key="frequency.id" value="frequency">
                      {{ frequency }}
                    </option>
                  </select>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Taxes</label>
                  </div>
                  <select class="custom-select" v-model="newIncome.tax" id="inputGroupSelect01">
                    <option v-for="tax in taxes" v-bind:key="tax.id" value="Taxes">
                      {{ tax }}
                    </option>
                  </select>
                </div>
                <!-- <a class="btn btn-primary btn-user btn-block" type="submit" value="Submit">Register Account</a> -->

                <a class="center-align" href="/">Log another source of income +</a>
                <hr />
                <div>
                  <p class="p text-gray-600 mb-3">Add your budgeted spendings:</p>
                </div>

                <div class="form-group row">
                  <div class="col-sm-6 mb-3 mb-sm-0">
                    <input
                      type="text"
                      class="form-control form-control-user"
                      id=""
                      placeholder="Name of Spending"
                      v-model="newSpending.name"
                    />
                  </div>
                  <div class="col-sm-6">
                    <input
                      type="number"
                      class="form-control form-control-user"
                      id=""
                      placeholder="Dollar Amount"
                      v-model="newSpending.amount"
                    />
                  </div>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Frequency</label>
                  </div>
                  <select class="custom-select" v-model="newSpending.frequency" id="inputGroupSelect01">
                    <option v-for="frequency in frequencies" v-bind:key="frequency.id" value="frequency">
                      {{ frequency }}
                    </option>
                  </select>
                </div>
                <input
                  class="btn btn-primary btn-user btn-block"
                  href="/"
                  type="submit"
                  value="Finish Creating Budget"
                />
              </form>
              <a class="center-align" href="/">Log more spending +</a>
              <hr />
              <!-- <a class="btn btn-primary btn-user btn-block" type="submit" value="Submit">Register Account</a> -->
              <!-- <input class="btn btn-primary btn-user btn-block" href="/" type="submit" value="Finish Creating Budget" /> -->
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
