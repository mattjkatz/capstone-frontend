<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Welcome to Matt's Budgeting App!",
      budgets: [],
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
        console.log(this.budgets);
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
    <h3>{{ budget.name }}</h3>
  </div>
</template>

<style></style>
