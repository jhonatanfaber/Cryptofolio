<template>
  <div class="container-navBar">
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <div class="left-navbar">
            <router-link to="/" tag="li" class="nav-item" exact>
              <a class="brand">
                <i class="fab fa-audible"></i>
                Cryptofolio
              </a>
            </router-link>
          </div>
          <div class="right-navbar">
            <router-link v-if="user.token && isAdmin" to="/test" class="nav-item" tag="li" exact>
              <a class="nav-link-disabled"></a>
            </router-link>
              <router-link v-if="user.token && isAdmin" to="/users" tag="li" class="nav-item" exact>
              <a class="nav-link">
                Manage users
              </a>
            </router-link>
            <router-link v-if="user.token && !isAdmin" to="/" class="nav-item" tag="li" exact>
              <a class="nav-link-disabled"></a>
            </router-link>
            <router-link
              v-if="user.token && !isAdmin"
              to="/portfolio"
              class="nav-item"
              tag="li"
              exact
            >
              <a class="nav-link">Portfolio</a>
            </router-link>
            <router-link v-if="user.token && !isAdmin" to="/market" class="nav-item" tag="li" exact>
              <a class="nav-link">Market</a>
            </router-link>
            <li v-if="user.token" class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fas fa-user"></i>
                {{user.username}}
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link to="/profile" tag="li" exact>
                  <a class="dropdown-item">
                    <i class="fas fa-cog"></i> Edit Profile
                  </a>
                </router-link>
                  <a @click="logout" class="dropdown-item logout">
                    <i class="fas fa-sign-out-alt"></i> Log out
                  </a>
              </div>
            </li>
            <router-link v-if="!user.token" to="/login" tag="li" class="nav-item" exact>
              <a class="nav-link">
                <i class="fas fa-sign-in-alt"></i> Log in
              </a>
            </router-link>
          </div>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["user", "isAdmin"])
  },
  methods: {
    ...mapActions(["logout"])
  }
};
</script>


<style scoped>
.navbar-light .navbar-nav .nav-link,
.brand {
  color: white;
}

.nav-link {
  font-size: 16px;
}

.navbar-light .navbar-nav .nav-link:hover {
  color: rgb(197, 178, 72);
}

.brand {
  font-size: 22px;
  text-decoration: none;
  font-weight: bold;
}

.brand:hover {
  color: rgb(197, 178, 72);
}

.navbar {
  padding: 0;
  margin-bottom: 75px;
}

.navbar-nav {
  background-color: rgba(0, 0, 0, 1);
  width: 100%;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  position: fixed;
  top: 0;
  z-index: 99;
}

.left-navbar {
  grid-column: 1;
  display: flex;
  align-items: center;
}

.right-navbar {
  grid-column: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 15px;
}

.nav-item {
  margin-right: 15px;
}

.fa-sign-out-alt,
.logout {
  cursor: pointer;
}
</style>

