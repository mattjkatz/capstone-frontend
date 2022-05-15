<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newFinance: {},
      frequencies: ["One Time", "Monthly", "Annualy"],
      taxes: ["Income", "Captial Gains", "N/A"],
    };
  },
  methods: {
    financeCreate() {
      axios
        .post("/finances", this.newFinance)
        .then((response) => {
          console.log(response.data);
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
              <form class="user" v-on:submit.prevent="financeCreate()">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-user"
                    id=""
                    placeholder="Name of Income"
                    v-model="newFinance.name"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-user"
                    id=""
                    placeholder="Income Category"
                    v-model="newFinance.category"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="number"
                    class="form-control form-control-user"
                    id=""
                    placeholder="Dollar Amount"
                    v-model="newFinance.amount"
                  />
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Frequency</label>
                  </div>
                  <select class="custom-select" v-model="newFinance.frequency" id="inputGroupSelect01">
                    <option v-for="frequency in frequencies" v-bind:key="frequency.id" value="frequency">
                      {{ frequency }}
                    </option>
                  </select>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Taxes</label>
                  </div>
                  <select class="custom-select" v-model="newFinance.tax" id="inputGroupSelect01">
                    <option v-for="tax in taxes" v-bind:key="tax.id" value="Taxes">
                      {{ tax }}
                    </option>
                  </select>
                </div>
              </form>
              <a class="center-align" href="/">Log another income +</a>
              <hr />
              <div>
                <p class="p text-gray-600 mb-3">Add your budgeted spendings:</p>
              </div>
              <form class="user" v-on:submit.prevent="financeCreate()">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-user"
                    id=""
                    placeholder="Name of Spending"
                    v-model="newFinance.name"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-user"
                    id=""
                    placeholder="Spending Category"
                    v-model="newFinance.category"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="number"
                    class="form-control form-control-user"
                    id=""
                    placeholder="Dollar Amount"
                    v-model="newFinance.amount"
                  />
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Frequency</label>
                  </div>
                  <select class="custom-select" v-model="newFinance.frequency" id="inputGroupSelect01">
                    <option v-for="frequency in frequencies" v-bind:key="frequency.id" value="frequency">
                      {{ frequency }}
                    </option>
                  </select>
                </div>
              </form>
              <a class="center-align" href="/">Log more spendings +</a>
              <hr />
              <!-- <a class="btn btn-primary btn-user btn-block" type="submit" value="Submit">Register Account</a> -->
              <input class="btn btn-primary btn-user btn-block" href="/" type="submit" value="Create Budget" />
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
