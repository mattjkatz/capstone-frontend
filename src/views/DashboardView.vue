<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Welcome to Matt's Budgeting App!",
      budgets: [],
      newBudget: {},
      finances: [],
      trackingFinances: [],
      newPurchase: {},
      purchases: [],
      errors: [],
      incomes: [],
      incomeSum: 0,
      spendings: [],
      spendingSum: 0,
      savings: [],
      savingSum: 0,
    };
  },
  created: function () {
    this.budgetIndex();
    this.purchaseIndex();
    this.financeIndex();
  },
  methods: {
    budgetIndex() {
      axios.get("/budgets").then((response) => {
        console.log(response.data);
        this.budgets = response.data;
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
    purchaseIndex() {
      axios.get("/purchases").then((response) => {
        console.log(response.data);
        this.purchases = response.data;
      });
    },
    purchaseCreate() {
      axios
        .post("/purchases", this.newPurchase, (this.newPurchase.finance_id = 1))
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(this.errors);
        });
    },
    financeIndex() {
      axios.get("/finances").then((response) => {
        this.finances = response.data;
        this.trackingFinances = this.finances.filter((finance) => finance.tracking === true);
        this.finances.forEach((finance) => {
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
        this.savingSum = this.incomeSum - this.spendingSum;
        // this.savings.forEach((saving) => {
        //   this.savingSum += parseInt(saving.amount);
        // });
        console.log(this.spendingSum);
        console.log(this.savingSum);
        // function separator(num) {
        //   var str = num.toString().split(".");
        //   str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        //   return str.join(".");
        // }
        // console.log(separator(this.incomeSum));
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
  <div class="row">
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
                <p>
                  Finance ID:
                  <input type="number" v-model="newPurchase.finance_id" />
                </p>
                <p>
                  Name:
                  <input type="text" v-model="newPurchase.name" />
                </p>
                <p>
                  Price:
                  <input type="number" v-model="newPurchase.price" />
                </p>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Categories</label>
                  </div>
                  <select class="custom-select" v-model="newPurchase.category" id="inputGroupSelect01">
                    <option v-for="finance in trackingFinances" v-bind:key="finance.id" value="finance.category">
                      {{ finance.category }}
                    </option>
                    <option>Miscellaneous</option>
                  </select>
                </div>
                <p>
                  Frequency:
                  <input type="text" v-model="newPurchase.frequency" />
                </p>
                <input type="submit" value="Create Purchase" />
                <div v-for="error in errors" v-bind:key="error">
                  <p id="error">{{ error }}</p>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
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

  <!-- New Content Row -->

  <div class="row"></div>

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
    <h2>Create A Purchase</h2>
    <form v-on:submit.prevent="purchaseCreate()">
      <p>
        Finance ID:
        <input type="number" v-model="newPurchase.finance_id" />
      </p>
      <p>
        Name:
        <input type="text" v-model="newPurchase.name" />
      </p>
      <p>
        Price:
        <input type="number" v-model="newPurchase.price" />
      </p>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01">Categories</label>
        </div>
        <select class="custom-select" v-model="newPurchase.category" id="inputGroupSelect01">
          <option v-for="finance in trackingFinances" v-bind:key="finance.id" value="finance.category">
            {{ finance.category }}
          </option>
        </select>
      </div>
      <p>
        Frequency:
        <input type="text" v-model="newPurchase.frequency" />
      </p>
      <input type="submit" value="Create Purchase" />
      <div v-for="error in errors" v-bind:key="error">
        <p id="error">{{ error }}</p>
      </div>
    </form>
  </div>
  <div>
    <h2>Purchases</h2>
    <div v-for="purchase in purchases" v-bind:key="purchase.id">
      <p>{{ purchase.name }} | {{ purchase.price }}</p>
    </div>
  </div>
</template>

<style></style>
