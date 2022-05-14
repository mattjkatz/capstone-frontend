<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Welcome to Matt's Budgeting App!",
      userBudget: {},
      whatIfBudgets: [],
      newBudget: {},
      userFinances: {},
      finances: [],
      userPurchases: [],
      trackingFinances: [],
      newPurchase: {},
      purchases: [],
      recentPurchases: [],
      errors: [],
      incomes: [],
      incomeSum: 0,
      spendings: [],
      spendingSum: 0,
      savings: [],
      savingSum: 0,
      frequencies: ["One Time", "Monthly", "Annualy"],
    };
  },
  created: function () {
    this.budgetIndex();
  },
  methods: {
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
        /* Finance Stuff */
        this.userFinances = this.userBudget.finances;
        this.trackingFinances = this.userFinances.filter((finance) => finance.tracking === true);
        this.userFinances.forEach((finance) => {
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
        });
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
        console.log(this.userPurchases);
        this.userPurchases.forEach((purchase) => {
          if (purchase.category === "Miscellaneous") {
            this.spendingSum += purchase.price;
          }
        });
        for (let i = 1; i < 4; i++) {
          this.recentPurchases.push(this.userPurchases[this.userPurchases.length - i]);
        }
        this.savingSum = this.incomeSum - this.spendingSum;
      });
    },
    budgetCreate() {
      axios
        .post("/budgets", this.newBudget)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(this.errors);
        });
    },
    purchaseCreate() {
      axios
        .post(
          "/purchases",
          this.newPurchase,
          (this.newPurchase.finance_id = this.userFinances.find((finance) => finance.category === "dining out").id)
        )
        .then((response) => {
          console.log(response.data);
          this.$router.go();
          var points = localStorage.getItem("points");
          var data = parseInt(points) + 10;
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
    <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
  </div>

  <!-- Content Row -->
  <div class="row center-row">
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
      New Purchase
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
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
                  <select class="custom-select" v-model="newPurchase.category" id="inputGroupSelect01">
                    <option selected>Miscellaneous</option>
                    <option v-for="finance in trackingFinances" v-bind:key="finance.id" v-bind:value="finance.category">
                      {{ finance.category }}
                    </option>
                  </select>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Frequency</label>
                  </div>
                  <select class="custom-select" v-model="newPurchase.frequency" id="inputGroupSelect01">
                    <option v-for="frequency in frequencies" v-bind:key="frequency.id" value="frequency">
                      {{ frequency }}
                    </option>
                  </select>
                </div>
                <div v-for="error in errors" v-bind:key="error">
                  <p id="error">{{ error }}</p>
                </div>
                <div class="modal-footer">
                  <input class="btn btn-primary" type="submit" value="Create Purchase" />
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
  <div class="row">
    <!-- Monthly Income -->
    <div class="col-xl-3 col-md-6 mb-4">
      <div class="card border-left-success shadow h-100 py-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Income</div>
              <div class="h5 mb-0 font-weight-bold text-gray-800">${{ Math.round((incomeSum / 12) * 100) / 100 }}</div>
            </div>
            <div class="col-auto">
              <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Monthly Spending -->
    <div class="col-xl-3 col-md-6 mb-4">
      <div class="card border-left-warning shadow h-100 py-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Spending</div>
              <div class="h5 mb-0 font-weight-bold text-gray-800">
                ${{ Math.round((spendingSum / 12) * 100) / 100 }}
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
    <div class="col-xl-3 col-md-6 mb-4">
      <div class="card border-left-primary shadow h-100 py-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Savings</div>
              <div class="h5 mb-0 font-weight-bold text-gray-800">${{ Math.round((savingSum / 12) * 100) / 100 }}</div>
            </div>
            <div class="col-auto">
              <i class="fas fa-wallet fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Content Row -->

  <div class="row">
    <!-- Area Chart -->
    <div class="col-xl-9 col-lg-7">
      <div class="card shadow mb-4">
        <!-- Card Header - Dropdown -->
        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">Recent Purchases</h6>
          <div class="dropdown no-arrow">
            <a
              class="dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
              <div class="dropdown-header">Dropdown Header:</div>
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </div>
        </div>
        <!-- Card Body -->
        <div class="card-body">
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
            <a class="center-align" href="/">See all purchases >></a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- My Lame Ol Code -->
  <div>
    <h2>Create A Budget</h2>
    <form v-on:submit.prevent="budgetCreate()">
      <p>
        Budget Name:
        <input type="text" v-model="newBudget.name" />
      </p>
      <p>
        Budget User ID:
        <input type="number" v-model="newBudget.user_id" />
      </p>
      <input type="submit" value="Create Budget" />
      <div v-for="error in errors" v-bind:key="error">
        <p id="error">{{ error }}</p>
      </div>
    </form>
  </div>
  <div>
    <h2>Budgets</h2>
    <div v-for="budget in budgets" v-bind:key="budget.id">
      <h4>{{ budget.name }}</h4>
      <div v-for="finance in budget.finances" v-bind:key="finance.id">
        <p>{{ finance.name }} | {{ finance.amount }} | {{ finance.category }} | {{ finance.frequency }}</p>
      </div>
    </div>
  </div>

  <div>
    <h2>Purchases</h2>
    <div v-for="purchase in userPurchases" v-bind:key="purchase.id">
      <p>{{ purchase.name }} | {{ purchase.price }} | {{ purchase.friendly_created_at }}</p>
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
