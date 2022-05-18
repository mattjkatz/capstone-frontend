<script>
import axios from "axios";
import Chart from "chart.js/auto";
// import PlanetChart from "../components/PlanetChart.vue";

export default {
  name: "UserData",
  data: function () {
    return {
      firstName: localStorage.getItem("firstName"),
      budgets: [],
      userBudget: {},
      whatIfBudgets: [],
      newBudget: {},
      userFinances: {},
      finances: [],
      financeView: 1,
      newFinance: {},
      userPurchases: [],
      trackingFinances: [],
      newPurchase: {},
      purchases: [],
      recentPurchases: [],
      errors: [],
      incomes: [],
      incomeSum: 0,
      spendings: [],
      spendingNames: [],
      spendingAmounts: [],
      spendingSum: 0,
      savings: [],
      savingSum: 0,
    };
  },
  mounted() {
    // window.addEventListener("load", () => {
    //   this.chartDisplay();
    // });
  },
  watch: {
    $route: function () {
      this.firstName = localStorage.firstName;
    },
  },
  created: function () {
    this.budgetIndex();
  },
  methods: {
    chartDisplay() {
      console.log(this.spendings, "chart spendings");
      new Chart(document.getElementById("doughnutChart"), {
        type: "doughnut",
        data: {
          labels: this.spendingNames,
          datasets: [
            {
              label: "My First Dataset",
              data: this.spendingAmounts,
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
                "rgb(157, 235, 134)",
                "rgb(181, 118, 245)",
                "rgb(90, 237, 227)",
                "rgb(250, 141, 40)",
              ],
              hoverOffset: 4,
            },
          ],
        },
      });
    },
    selectWeekly() {
      this.financeView = 1;
    },
    selectMonthly() {
      this.financeView = 2;
    },
    selectAnnually() {
      this.financeView = 3;
    },
    onChange(event) {
      console.log(event.target.value);
    },
    budgetIndex() {
      axios.get("/budgets").then((response) => {
        /* Budget Stuff */
        this.budgets = response.data;
        response.data.forEach((budget) => {
          if (budget.real === true) {
            this.userBudget = budget;
          } else {
            this.whatIfBudgets.push(budget);
          }
        });
        console.log(this.userBudget, "User Budget");
        /* Finance Stuff */
        this.userFinances = this.userBudget.finances;
        console.log(this.userFinances, "All User Finances");
        this.userFinances.forEach((finance) => {
          if (finance.frequency === "Annually") {
            finance.amount = finance.amount / 12;
          }
          if (finance.transaction_type === "income") {
            this.incomes.push(finance);
          } else if (finance.transaction_type === "spending") {
            this.spendings.push(finance);
          } else if (finance.transaction_type === "savings") {
            this.savings.push(finance);
          }
        });
        this.incomes.forEach((income) => {
          if (income.taxes === "income") {
            this.incomeSum += parseInt(income.amount) * 0.78;
          } else {
            this.incomeSum += parseInt(income.amount);
          }
        });
        this.spendings.forEach((spending) => {
          this.spendingSum += parseInt(spending.amount);
          this.spendingNames.push(spending.name);
          this.spendingAmounts.push(spending.amount);
        });
        /* Chart function is called */
        this.chartDisplay();
        /* Purchase Stuff */
        this.userFinances.forEach((finance) => {
          finance.purchases.forEach((purchase) => {
            var date = new Date(purchase.created_at);
            purchase.created_at = date.toLocaleDateString("en-us", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            this.userPurchases.push(purchase);
          });
        });
        this.userPurchases.sort((a, b) => {
          if (a.id > b.id) {
            return 1;
          } else {
            return -1;
          }
        });
        this.userPurchases.forEach((purchase) => {
          if (purchase.category === "Miscellaneous") {
            this.spendingSum += purchase.price;
          }
        });
        console.log(this.userPurchases, "User Purchases");
        if (this.userPurchases.length < 3) {
          this.recentPurchases = this.userPurchases;
        } else {
          for (let i = 1; i < 4; i++) {
            this.recentPurchases.push(this.userPurchases[this.userPurchases.length - i]);
          }
        }
        console.log(this.recentPurchases, "Recent Purchases");
        this.savingSum = this.incomeSum - this.spendingSum;
      });
    },
    purchaseCreate() {
      axios
        .post(
          "/purchases",
          this.newPurchase,
          (this.newPurchase.finance_id = this.spendings.find(
            (spending) => spending.name === this.newPurchase.category
          ).id)
        )
        .then((response) => {
          console.log(response.data);
          this.$router.go();
          var points = localStorage.getItem("points");
          var data = parseInt(points) + 50;
          localStorage.setItem("points", data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(this.errors);
        });
    },
    financeCreate() {
      axios
        .post("/finances", this.newFinance)
        .then((response) => {
          console.log(response.data);
          this.$router.go();
          var points = localStorage.getItem("points");
          var data = parseInt(points) + 50;
          localStorage.setItem("points", data);
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
  <!-- Page Heading -->
  <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h1 mb-0 text-gray-900">{{ userBudget.name }} - Dashboard</h1>
  </div>
  <!-- Chart -->
  <div class="row">
    <div class="col-xl-9 col-lg-7" style="flex: 0 0 90%; max-width: 90%">
      <div class="card shadow mb-2">
        <div class="card-body">
          <div class="column" style="width: auto">
            <canvas class="chart-size" id="doughnutChart" style="height: 150px"></canvas>
          </div>
          <div class="column pl-5 mt-5">
            <h1 class="h3 mb-4 text-gray-800">Monthly Finances:</h1>
            <div class="row card-center">
              <!-- Monthly Income -->
              <div class="columns">
                <div class="card border-left-success shadow h-100 py-2">
                  <div class="card-body" style="width: 12rem">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Income</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">
                          ${{ Math.round(incomeSum * 100) / 100 }}
                        </div>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Monthly Spending -->
              <div class="columns">
                <div class="card border-left-warning shadow h-100 py-2">
                  <div class="card-body" style="width: 12rem">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Spending</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">
                          ${{ Math.round(spendingSum * 100) / 100 }}
                        </div>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-money-bill-1-wave fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Monthly Savings -->
              <div class="columns">
                <div class="card border-left-primary shadow h-100 py-2">
                  <div class="card-body" style="width: 12rem">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Savings</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">
                          ${{ Math.round(savingSum * 100) / 100 }}
                        </div>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-wallet fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Content Row -->
  <div class="row center-row">
    <!-- Button trigger modal -->

    <!-- Purchase Modal -->
    <div
      class="modal fade"
      id="purchaseCreateModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="purchaseCreateModalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Log a Purchase!</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div>
              <form v-on:submit.prevent="purchaseCreate()">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Name</span>
                  </div>
                  <input
                    type="text"
                    v-model="newPurchase.name"
                    class="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Price</span>
                  </div>
                  <input
                    type="text"
                    v-model="newPurchase.price"
                    class="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Categories</label>
                  </div>
                  <select
                    v-if="spendings"
                    class="custom-select"
                    v-model="newPurchase.category"
                    id="inputGroupSelect01"
                    @change="onChange($event)"
                  >
                    <!-- <option selected>Miscellaneous</option> -->
                    <option v-for="spending in spendings" v-bind:key="spending.id" v-bind:value="spending.name">
                      {{ spending.name }}
                    </option>
                  </select>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Frequency</label>
                  </div>
                  <select class="custom-select" v-model="newPurchase.frequency" id="inputGroupSelect01">
                    <option value="One Time">One Time</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
                <div v-for="error in errors" v-bind:key="error">
                  <p id="error">{{ error }}</p>
                </div>
                <div class="modal-footer">
                  <input class="btn btn-primary" type="submit" value="Create Purchase" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Finance Modal -->
    <div
      class="modal fade"
      id="financeCreateModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="financeCreateModalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Log a spending or income:</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div>
              <form v-on:submit.prevent="financeCreate()">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Name</span>
                  </div>
                  <input
                    type="text"
                    v-model="newFinance.name"
                    class="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Amount</span>
                  </div>
                  <input
                    type="text"
                    v-model="newFinance.amount"
                    class="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Type</label>
                  </div>
                  <select class="custom-select" v-model="newFinance.transaction_type" id="inputGroupSelect01">
                    <option value="spending">Spending</option>
                    <option value="income">Income</option>
                  </select>
                  <!-- <select class="custom-select" v-model="newFinance.transaction_type" id="inputGroupSelect01"></select> -->
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Frequency</label>
                  </div>
                  <select class="custom-select" v-model="newFinance.frequency" id="inputGroupSelect01">
                    <option value="Monthly">Monthly</option>
                    <option value="Annually">Annually</option>
                    <option value="Weekly">Weekly</option>
                  </select>
                </div>
                <div v-for="error in errors" v-bind:key="error">
                  <p id="error">{{ error }}</p>
                </div>
                <div class="modal-footer">
                  <input class="btn btn-primary" type="submit" value="Create Budget Item" />
                  <!-- <button class="btn btn-primary" type="submit" value="Create Purchase">Create data-dismiss="modal"</button> -->
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Content Row -->

  <!-- Content Row -->

  <div class="d-sm-flex align-items-center justify-content-between mb-2">
    <h1 class="h2 mb-0 text-gray-700">{{ firstName }}'s Purchases</h1>
  </div>
  <div class="row">
    <!-- Area Chart -->
    <div class="col-xl-9 col-lg-7" style="flex: 0 0 90%; max-width: 90%">
      <div class="card shadow mb-4">
        <!-- Card Header - Dropdown -->
        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">Recent Purchases</h6>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#purchaseCreateModal">
            New Purchase
          </button>
        </div>
        <!-- Card Body -->
        <div v-if="recentPurchases.length > 0" class="card-body">
          <ul v-for="purchase in recentPurchases" v-bind:key="purchase.id" class="list-group list-group-flush">
            <li class="list-group-item">
              <div class="column">
                <div class="row">
                  {{ purchase.created_at }}
                </div>
                <div class="row">
                  <h5>{{ purchase.name }}</h5>
                </div>
              </div>
              <div class="column right-column">
                <h4>${{ purchase.price }}</h4>
              </div>
            </li>
            <hr />
          </ul>
          <div class="center-align">
            <a href="/purchases">See all purchases >></a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Budgeting -->
  <div class="d-sm-flex align-items-center justify-content-between mb-2">
    <h1 class="h2 mb-0 text-gray-700">Budgeted Finances</h1>
  </div>
  <div class="row">
    <!-- Area Chart -->
    <div class="col-xl-9 col-lg-7" style="flex: 0 0 90%; max-width: 90%">
      <div class="card shadow mb-4">
        <!-- Card Header - Dropdown -->
        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-secondary active">
              <input type="radio" name="options" id="option1" autocomplete="off" v-on:click="selectWeekly()" checked />
              Weekly
            </label>
            <label class="btn btn-secondary">
              <input type="radio" name="options" id="option2" autocomplete="off" v-on:click="selectMonthly()" />
              Monthly
            </label>
            <label class="btn btn-secondary">
              <input type="radio" name="options" id="option3" autocomplete="off" v-on:click="selectAnnually()" />
              Annually
            </label>
          </div>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#financeCreateModal">
            New Budget Item
          </button>
        </div>
        <!-- Card Body -->
        <div class="card-body">
          <ul v-for="income in incomes" v-bind:key="income.id" class="list-group list-group-flush">
            <li class="list-group-item">
              <div v-if="financeView == 1">
                <div class="column">
                  <div class="column">
                    <h4>{{ income.name }}</h4>
                  </div>
                  <div class="column">weekly</div>
                </div>
                <div class="column right-column">
                  <h4 class="addition">+ ${{ income.amount / 4 }}</h4>
                </div>
              </div>
              <div v-else-if="financeView == 2">
                <div class="column">
                  <div class="column">
                    <h4>{{ income.name }}</h4>
                  </div>
                  <div class="column">monthly</div>
                </div>
                <div class="column right-column">
                  <h4 class="addition">+ ${{ income.amount }}</h4>
                </div>
              </div>
              <div v-else-if="financeView == 3">
                <div class="column">
                  <div class="column">
                    <h4>{{ income.name }}</h4>
                  </div>
                  <div class="column">annually</div>
                </div>
                <div class="column right-column">
                  <h4 class="addition">+ ${{ income.amount * 12 }}</h4>
                </div>
              </div>
            </li>
            <hr class="" />
          </ul>
          <ul v-for="spending in spendings" v-bind:key="spending.id" class="list-group list-group-flush">
            <li class="list-group-item">
              <div v-if="financeView == 1">
                <div class="column">
                  <div class="column">
                    <h4>{{ spending.name }}</h4>
                  </div>
                  <div class="column">weekly</div>
                </div>
                <div class="column right-column">
                  <h4 class="subtraction">+ ${{ spending.amount / 4 }}</h4>
                </div>
              </div>
              <div v-else-if="financeView == 2">
                <div class="column">
                  <div class="column">
                    <h4>{{ spending.name }}</h4>
                  </div>
                  <div class="column">monthly</div>
                </div>
                <div class="column right-column">
                  <h4 class="subtraction">+ ${{ spending.amount }}</h4>
                </div>
              </div>
              <div v-else-if="financeView == 3">
                <div class="column">
                  <div class="column">
                    <h4>{{ spending.name }}</h4>
                  </div>
                  <div class="column">annually</div>
                </div>
                <div class="column right-column">
                  <h4 class="subtraction">+ ${{ spending.amount * 12 }}</h4>
                </div>
              </div>
            </li>
            <hr />
          </ul>
          <div v-if="financeView == 1">
            <div v-if="incomeSum - spendingSum >= 0" class="column right-column">
              <h4 class="addition">+ ${{ (incomeSum - spendingSum) / 4 }}</h4>
            </div>
            <div v-if="incomeSum - spendingSum < 0" class="column right-column">
              <h4 class="subtraction">${{ (incomeSum - spendingSum) / 4 }}</h4>
            </div>
          </div>
          <div v-if="financeView == 2">
            <div v-if="incomeSum - spendingSum >= 0" class="column right-column">
              <h4 class="addition">+ ${{ incomeSum - spendingSum }}</h4>
            </div>
            <div v-if="incomeSum - spendingSum < 0" class="column right-column">
              <h4 class="subtraction">${{ incomeSum - spendingSum }}</h4>
            </div>
          </div>
          <div v-if="financeView == 3">
            <div v-if="incomeSum - spendingSum >= 0" class="column right-column">
              <h4 class="addition">+ ${{ (incomeSum - spendingSum) * 12 }}</h4>
            </div>
            <div v-if="incomeSum - spendingSum < 0" class="column right-column">
              <h4 class="subtraction">${{ (incomeSum - spendingSum) * 12 }}</h4>
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
  align-items: right;
  align-content: right;
}
.center-align {
  text-align: center;
  align-items: center;
  align-content: center;
  align-self: center;
  justify-content: center;
  justify-items: center;
  justify-self: center;
  /* vertical-align: middle;
  position: absolute;
  margin: auto; */
}
.card-center {
  /* text-align: center;
  align-items: center;
  align-content: center;
  align-self: center;
  justify-content: center; */
  /* justify-items: center;
  justify-self: center; */
  /* vertical-align: middle; */
  position: absolute;
  margin: auto;
}
#small-chart {
  max-width: 20%;
}
.addition {
  color: green;
}
.subtraction {
  color: red;
}
.line-margin {
  margin: 0;
}
.vertical-center {
  vertical-align: middle;
}
.chart-size {
  max-width: 20rem;
  max-height: 20rem;
}
</style>
