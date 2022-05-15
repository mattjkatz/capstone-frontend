<script>
import axios from "axios";

export default {
  data: function () {
    return {
      budgets: [],
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
        console.log(this.userBudget, "User Budget");
        /* Finance Stuff */
        this.userFinances = this.userBudget.finances;
        console.log(this.userFinances, "All User Finances");
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
        console.log(this.savings, "Savings");
        console.log(this.spendings, "Spendings");
        console.log(this.incomes, "Incomes");
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
        // console.log(this.incomeSum);
        // console.log(this.spendingSum);
        // console.log(this.savingSum);
        console.log(this.spendings.find((spending) => spending.name === "Album Cover Art").id, "SHOW MEEE");
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
          var data = parseInt(points) + 10;
          localStorage.setItem("points", data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(this.errors);
        });
    },
    // financeCreate() {
    //   axios
    //     .post("/finances", this.newFinance)
    //     .then((response) => {
    //       console.log(response.data);
    //     })
    //     .catch((error) => {
    //       this.errors = error.response.data.errors;
    //       console.log(this.errors);
    //     });
    // },
  },
};
</script>

<template>
  <!-- Content Row -->

  <div class="row">
    <!-- Area Chart -->
    <div class="col-xl-9 col-lg-7">
      <div class="card shadow mb-4">
        <!-- Card Header - Dropdown -->
        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">All Purchases</h6>
          <div class="dropdown no-arrow">
            <form method="get" action="/">
              <button type="submit" class="btn btn-primary" href="/">Dashboard</button>
            </form>
          </div>
        </div>
        <!-- Card Body -->
        <div v-if="recentPurchases.length > 0" class="card-body">
          <ul v-for="purchase in userPurchases" v-bind:key="purchase.id" class="list-group list-group-flush">
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
            <a href="/">Back to Dashboard >></a>
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
