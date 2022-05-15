import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import BudgetCreateView from "../views/BudgetCreateView.vue";
import FinanceCreateView from "../views/FinanceCreateView.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import LogoutView from "../views/LogoutView.vue";
import axios from "axios";

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: DashboardView,
  },
  {
    path: "/budget-create",
    name: "budget-create",
    component: BudgetCreateView,
  },
  {
    path: "/finance-create",
    name: "finance-create",
    component: FinanceCreateView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/logout",
    name: "logout",
    component: LogoutView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
