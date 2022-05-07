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
        console.log(response.data);
        this.finances = response.data;
        this.trackingFinances = this.finances.filter((finance) => finance.tracking === true);
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
  <div class="home">
    <h1>{{ message }}</h1>
  </div>
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
