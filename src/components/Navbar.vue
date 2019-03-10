<template>
  <!-- :style="{padding: padding + 'px'}" -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="/">
      <i class="fab fa-audible"></i>
      Cryptofolio
    </a>
    
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <router-link v-if="user.token && isAdmin" to="/test" class="nav-item" tag="li" exact>
          <a class="nav-link-disabled"></a>
        </router-link>
        <router-link v-if="user.token && isAdmin" to="/users" tag="li" class="nav-item" exact>
          <a class="nav-link">Manage users</a>
        </router-link>
        <router-link v-if="user.token && !isAdmin" to="/" class="nav-item" tag="li" exact>
          <a class="nav-link-disabled"></a>
        </router-link>
        <router-link v-if="user.token && !isAdmin" to="/portfolio" class="nav-item" tag="li" exact>
          <a class="nav-link">Portfolio</a>
        </router-link>
        <router-link v-if="user.token && !isAdmin" to="/market" class="nav-item" tag="li" exact>
          <a class="nav-link">Market</a>
        </router-link>
        <li v-if="user.token" class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-user"></i>
            {{user.username}}
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <router-link v-if="!isAdmin" to="/profile" tag="li" exact>
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
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      // padding: 25
    };
  },
  computed: {
    ...mapGetters(["user", "isAdmin"])
  },
  methods: {
    ...mapActions(["logout"])
    // handleScroll() {
    //   if(window.scrollY >= 160){
    //     this.padding = 15;
    //   }else{
    //     this.padding = 25;
    //   }
    //   console.log(window.scrollY);
    // }
  }
  // created() {
  //   window.addEventListener("scroll", this.handleScroll);
  // },
  // destroyed() {
  //   window.removeEventListener("scroll", this.handleScroll);
  // }
};
</script>


<style scoped>
.bg-dark {
  background-color: rgba(0, 0, 0, 1) !important;
  padding: 21px;
}

@media (max-width: 991px) {
  .bg-dark {
    padding: 8px;
  }
}

@media (min-width: 992px) {
  .navbar-expand-lg .navbar-collapse {
    display: flex;
    justify-content: flex-end;
    margin-right: 20px;
  }
}

.navbar {
  position: fixed;
  width: 100%;
  z-index: 1;
}

.navbar-dark .navbar-nav .nav-link,
.brand {
  color: white;
  margin-left: 25px;
}

.navbar-dark .navbar-nav .nav-link:hover {
  color: rgb(197, 178, 72);
}

.nav-link {
  font-size: 16px;
}

.navbar-brand {
  font-size: 22px;
  text-decoration: none;
  font-weight: bold;
}

.navbar-brand:hover {
  color: rgb(197, 178, 72);
}

.fa-sign-out-alt,
.logout {
  cursor: pointer;
}
</style>

