<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newIncome1: {},
      newIncome2: {},
      incomeNumber: 0,
      spendingNumber: 0,
      newSpending1: {},
      newSpending2: {},
      newSpending3: {},
      newSpending4: {},
      newSpending5: {},
      frequencies: ["One Time", "Monthly", "Annualy"],
      taxes: ["Income", "Captial Gains", "N/A"],
    };
  },
  methods: {
    newSpending() {
      this.spendingNumber += 1;
    },
    newIncome() {
      this.incomeNumber += 1;
    },
    incomeCreate() {
      axios
        .post("/finances", this.newIncome1, (this.newIncome1.transaction_type = "income"))
        .then((response) => {
          console.log(response.data);
          this.$router.push("/");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(this.errors);
        });
      if (this.newIncome2.name.split("").length > 0) {
        axios.post("/finances", this.newIncome2, (this.newIncome2.transaction_type = "income")).then((response) => {
          console.log(response.data);
          this.$router.push("/");
        });
      }
    },
    spendingCreate() {
      axios
        .post("/finances", this.newSpending1, (this.newSpending1.transaction_type = "spending"))
        .then((response) => {
          console.log(response.data);
          this.$router.push("/");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(this.errors);
        });
      if (this.newSpending2.name.split("").length > 0) {
        axios
          .post("/finances", this.newSpending2, (this.newSpending2.transaction_type = "spending"))
          .then((response) => {
            console.log(response.data);
            this.$router.push("/");
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
            console.log(this.errors);
          });
        if (this.newSpending3.name.split("").length > 0) {
          axios
            .post("/finances", this.newSpending3, (this.newSpending3.transaction_type = "spending"))
            .then((response) => {
              console.log(response.data);
              this.$router.push("/");
            })
            .catch((error) => {
              this.errors = error.response.data.errors;
              console.log(this.errors);
            });
        }
      }
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
                <h1 class="h2 text-gray-900 mb-5 text-center">Now Let's Plan Some Finances!</h1>
                <hr />
                <h1 class="h4 text-gray-800 mb-4 text-center">Let's start tracking your income</h1>
                <p class="p text-gray-600 mb-3">Add your income:</p>
              </div>
              <!-- Start of Form -->
              <form class="user" v-on:submit.prevent="incomeCreate(), spendingCreate()">
                <!-- Start of Income 1 -->
                <div class="form-group row">
                  <div class="col-sm-6 mb-3 mb-sm-0">
                    <input
                      type="text"
                      class="form-control form-control-user"
                      id=""
                      placeholder="Name of Income"
                      v-model="newIncome1.name"
                    />
                  </div>
                  <div class="col-sm-6">
                    <input
                      type="number"
                      class="form-control form-control-user"
                      id=""
                      placeholder="Dollar Amount"
                      v-model="newIncome1.amount"
                    />
                  </div>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Frequency</label>
                  </div>
                  <select class="custom-select" v-model="newIncome1.frequency" id="inputGroupSelect01">
                    <option v-for="frequency in frequencies" v-bind:key="frequency.id" value="frequency">
                      {{ frequency }}
                    </option>
                  </select>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Taxes</label>
                  </div>
                  <select class="custom-select" v-model="newIncome1.tax" id="inputGroupSelect01">
                    <option v-for="tax in taxes" v-bind:key="tax.id" value="Taxes">
                      {{ tax }}
                    </option>
                  </select>
                </div>
                <!-- <a class="btn btn-primary btn-user btn-block" type="submit" value="Submit">Register Account</a> -->

                <div v-if="incomeNumber == 0">
                  <button type="button" class="btn btn-primary" v-on:click="newIncome()">Add Another Income</button>
                  <hr />
                </div>
                <!-- Start of Income 2 -->
                <div v-if="incomeNumber >= 1">
                  <div class="">
                    <p class="p text-gray-600 mb-3">Add another source of income:</p>
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-6 mb-3 mb-sm-0">
                      <input
                        type="text"
                        class="form-control form-control-user"
                        id=""
                        placeholder="Name of Income"
                        v-model="newIncome2.name"
                      />
                    </div>
                    <div class="col-sm-6">
                      <input
                        type="number"
                        class="form-control form-control-user"
                        id=""
                        placeholder="Dollar Amount"
                        v-model="newIncome2.amount"
                      />
                    </div>
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <label class="input-group-text" for="inputGroupSelect01">Frequency</label>
                    </div>
                    <select class="custom-select" v-model="newIncome2.frequency" id="inputGroupSelect01">
                      <option v-for="frequency in frequencies" v-bind:key="frequency.id" value="frequency">
                        {{ frequency }}
                      </option>
                    </select>
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <label class="input-group-text" for="inputGroupSelect01">Taxes</label>
                    </div>
                    <select class="custom-select" v-model="newIncome2.tax" id="inputGroupSelect01">
                      <option v-for="tax in taxes" v-bind:key="tax.id" value="Taxes">
                        {{ tax }}
                      </option>
                    </select>
                  </div>
                </div>
                <div v-if="incomeNumber == 1">
                  <div>
                    <p class="p text-gray-600 mb-3">*We can add more income later!</p>
                  </div>
                  <hr />
                </div>
                <!-- Start of Spending 1 -->
                <div>
                  <h1 class="h4 text-gray-800 mb-4 text-center">Now let's log your planned spending</h1>
                  <p class="p text-gray-600 mb-3">Add your first budgeted spending:</p>
                </div>

                <div class="form-group row">
                  <div class="col-sm-6 mb-3 mb-sm-0">
                    <input
                      type="text"
                      class="form-control form-control-user"
                      id=""
                      placeholder="Name of Spending"
                      v-model="newSpending1.name"
                    />
                  </div>
                  <div class="col-sm-6">
                    <input
                      type="number"
                      class="form-control form-control-user"
                      id=""
                      placeholder="Dollar Amount"
                      v-model="newSpending1.amount"
                    />
                  </div>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Frequency</label>
                  </div>
                  <select class="custom-select" v-model="newSpending1.frequency" id="inputGroupSelect01">
                    <option v-for="frequency in frequencies" v-bind:key="frequency.id" value="frequency">
                      {{ frequency }}
                    </option>
                  </select>
                </div>
                <div v-if="spendingNumber == 0">
                  <button type="button" class="btn btn-primary" v-on:click="newSpending()">Log More Spending</button>
                  <hr />
                </div>
                <!-- Start of Spending 2 -->
                <div v-if="spendingNumber >= 1">
                  <hr />
                  <div>
                    <p class="p text-gray-600 mb-3">Budgeted spending - 2</p>
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-6 mb-3 mb-sm-0">
                      <input
                        type="text"
                        class="form-control form-control-user"
                        id=""
                        placeholder="Name of Spending"
                        v-model="newSpending2.name"
                      />
                    </div>
                    <div class="col-sm-6">
                      <input
                        type="number"
                        class="form-control form-control-user"
                        id=""
                        placeholder="Dollar Amount"
                        v-model="newSpending2.amount"
                      />
                    </div>
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <label class="input-group-text" for="inputGroupSelect01">Frequency</label>
                    </div>
                    <select class="custom-select" v-model="newSpending2.frequency" id="inputGroupSelect01">
                      <option v-for="frequency in frequencies" v-bind:key="frequency.id" value="frequency">
                        {{ frequency }}
                      </option>
                    </select>
                  </div>
                </div>
                <div v-if="spendingNumber == 1">
                  <button type="button" class="btn btn-primary" v-on:click="newSpending()">Log More Spending</button>
                  <hr />
                </div>
                <!-- Start of Spending 3 -->
                <div v-if="spendingNumber >= 2">
                  <hr />
                  <div>
                    <p class="p text-gray-600 mb-3">Budgeted spending - 3</p>
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-6 mb-3 mb-sm-0">
                      <input
                        type="text"
                        class="form-control form-control-user"
                        id=""
                        placeholder="Name of Spending"
                        v-model="newSpending3.name"
                      />
                    </div>
                    <div class="col-sm-6">
                      <input
                        type="number"
                        class="form-control form-control-user"
                        id=""
                        placeholder="Dollar Amount"
                        v-model="newSpending3.amount"
                      />
                    </div>
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <label class="input-group-text" for="inputGroupSelect01">Frequency</label>
                    </div>
                    <select class="custom-select" v-model="newSpending3.frequency" id="inputGroupSelect01">
                      <option v-for="frequency in frequencies" v-bind:key="frequency.id" value="frequency">
                        {{ frequency }}
                      </option>
                    </select>
                  </div>
                  <p class="p text-gray-600 mb-3">*We can add more spending later!</p>
                </div>
                <!-- Submit Button -->
                <input
                  class="btn btn-primary btn-user btn-block"
                  href="/"
                  type="submit"
                  value="Finish Creating Budget"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
