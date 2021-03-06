import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DashboardView from "../views/DashboardView.vue";
import BudgetCreateView from "../views/BudgetCreateView.vue";
import FinanceCreateView from "../views/FinanceCreateView.vue";
import PurchasesView from "../views/PurchasesView.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import LogoutView from "../views/LogoutView.vue";

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
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
    path: "/purchases",
    name: "purchases",
    component: PurchasesView,
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
  // {
  //   path: "/graphtest",
  //   name: "graphtest",
  //   component: GraphTestView,
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
