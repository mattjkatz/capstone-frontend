<script>
export default {
  data: function () {
    return {
      isLoggedIn: false,
      firstName: localStorage.getItem("firstName"),
      lastName: localStorage.getItem("lastName"),
      points: localStorage.getItem("points"),
      alertMessages: ["hello", "hi"],
    };
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt;
      this.firstName = localStorage.firstName;
      this.lastName = localStorage.lastName;
      this.points = localStorage.points;
      // this.alertMessages.push(localStorage.points);
    },
  },
  methods: {
    onChange(event) {
      console.log(event.target.value);
    },
  },
};
</script>

<template>
  <!-- Everything -->
  <div id="wrapper">
    <!-- Sidebar Menu -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      <!-- Menu Logo -->
      <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div class="sidebar-brand-icon">
          <img id="header-logo" src="../public/my-images/header-logo.png" />
        </div>
      </a>

      <!-- Divider -->
      <hr class="sidebar-divider my-0" />

      <!-- Menu Items -->
      <li class="nav-item active">
        <a class="nav-link" href="/home">
          <span>Home</span>
        </a>
        <a class="nav-link" href="/">
          <span>Dashboard</span>
        </a>
        <a v-if="isLoggedIn" class="nav-link" href="/">
          <span>Profile</span>
        </a>
        <a v-if="isLoggedIn" class="nav-link" href="/logout">
          <span>Logout</span>
        </a>
        <a v-if="!isLoggedIn" class="nav-link" href="/login">
          <span>Login</span>
        </a>
        <a v-if="!isLoggedIn" class="nav-link" href="/signup">
          <span>Sign Up</span>
        </a>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider" />
    </ul>

    <!-- End of Sidebar Menu -->
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <!-- Topbar -->
        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          <!-- Sidebar Toggle (Topbar) -->
          <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
            <i class="fa fa-bars"></i>
          </button>

          <!-- Topbar Search -->
          <form class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div class="input-group">
              <input
                type="text"
                class="form-control bg-light border-0 small"
                placeholder="Search for..."
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <div class="input-group-append">
                <button class="btn btn-primary" type="button">
                  <i class="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form>
          <!-- Topbar Navbar -->
          <ul class="navbar-nav ml-auto">
            <!-- Nav Item - Search Dropdown (Visible Only XS) -->
            <li class="nav-item dropdown no-arrow d-sm-none">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="searchDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fas fa-search fa-fw"></i>
              </a>
              <!-- Dropdown - Messages -->
              <div
                class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                aria-labelledby="searchDropdown"
              >
                <form class="form-inline mr-auto w-100 navbar-search">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control bg-light border-0 small"
                      placeholder="Search for..."
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                    />
                    <div class="input-group-append">
                      <button class="btn btn-primary" type="button">
                        <i class="fas fa-search fa-sm"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>

            <!-- Nav Item - Alerts -->
            <li class="nav-item dropdown no-arrow mx-1">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="alertsDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fas fa-bell fa-fw"></i>
                <!-- Counter - Alerts -->
                <span class="badge badge-danger badge-counter">3+</span>
              </a>
              <!-- Dropdown - Alerts -->
              <div
                class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="alertsDropdown"
              >
                <h6 class="dropdown-header">Friendly Gem Tracker</h6>

                <!-- <a
                  v-for="message in alertMessages"
                  v-bind:key="message.id"
                  class="dropdown-item d-flex align-items-center"
                  href="#"
                >
                  <div class="mr-3">
                    <div class="icon-circle bg-success">
                      <i class="fas fa-donate text-white"></i>
                    </div>
                  </div>
                  <div>
                    <div class="small text-gray-500">December 7, 2019</div>
                    You now have {{ message }} in your account!
                  </div>
                </a> -->

                <a class="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
              </div>
            </li>

            <div class="topbar-divider d-none d-sm-block"></div>

            <!-- Nav Item - User Information -->
            <li class="nav-item dropdown no-arrow">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <!-- Ruby Counter -->
                <div class="nav-link">
                  <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{ points }}</span>
                  <i class="fas fa-gem" id="ruby-icon"></i>
                </div>
                <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{ firstName }} {{ lastName }}</span>
                <img class="img-profile rounded-circle" src="img/undraw_profile.svg" />
              </a>
              <!-- Dropdown - User Information -->
              <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <a class="dropdown-item" href="#">
                  <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                  Profile
                </a>
                <a class="dropdown-item" href="#">
                  <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                  Settings
                </a>
                <a class="dropdown-item" href="#">
                  <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                  Activity Log
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="/logout">
                  <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </nav>
        <div class="pl-5">
          <router-view />
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="sticky-footer bg-white">
    <div class="container my-auto">
      <div class="copyright text-center my-auto">
        <span>Copyright &copy; Dollr 2022</span>
      </div>
    </div>
  </footer>
  <!-- End of Footer -->
</template>

<style>
#header-logo {
  max-width: 2.3em;
  max-height: 2.3em;
}
#ruby-icon {
  color: rgb(0, 213, 255);
  /* position: relative;
  top: calc(50% - 10px); */
}
#accordianSidebar {
  padding-right: 150px;
  background-color: red;
}
</style>
