<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Welcome to Matt's Budgeting App!",
      budgets: [],
      finances: [],
    };
  },
  created: function () {
    this.budgetIndex();
  },
  methods: {
    budgetIndex() {
      axios.get("/budgets").then((response) => {
        console.log(response.data);
        this.budgets = response.data;
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
  </div>
  <div v-for="budget in budgets" v-bind:key="budget.id">
    <h2>{{ budget.name }}</h2>
    <div v-for="finance in budget.finances" v-bind:key="finance.id">
      <h4>{{ finance.name }}</h4>
      <p>{{ finance.amount }} | {{ finance.category }} | {{ finance.frequency }}</p>
    </div>
  </div>
</template>

<style></style>
