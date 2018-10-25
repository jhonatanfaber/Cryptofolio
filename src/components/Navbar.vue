<template>
    <div class="container-navBar">
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <div class="left-navbar">
                        <router-link to="/" tag="li" class="nav-item" exact><a class="navbar-brand"> Stock Trader </a></router-link>
                    </div>
                    <div class="right-navbar"> 
                        <router-link v-if="!user.token" to="/login" tag="li" class="nav-item" exact><a class="nav-link"> <i class="fas fa-sign-in-alt"></i> Log in </a></router-link>
                        <li v-if="isAdmin" class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Settings
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <router-link to="/users" tag="li"  exact><a class="dropdown-item"> Manage users </a></router-link>
                                <router-link to="" tag="li"  exact><a class="dropdown-item"> Profile </a></router-link>
                            </div>
                        </li>
                        <router-link v-if="user.token && !isAdmin" to="/portfolio" class="nav-item" tag="li" exact><a class="nav-link"> Portfolio </a></router-link>
                        <router-link v-if="user.token && !isAdmin" to="/market" class="nav-item" tag="li" exact><a class="nav-link"> Market </a></router-link>
                        <li v-if="user.token" class="nav-item">
                            <a class="nav-link"><i class="fas fa-user"></i> {{user.username}}</a>
                        </li>
                        <li v-if="user.token" class="nav-item">
                            <a @click="logout" class="nav-link logout"><i class="fas fa-sign-out-alt"></i> Log out </a>
                        </li>
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
    ...mapGetters([ "user", "isAdmin"])
  },
  methods: {
    ...mapActions(["logout"]),
  }
};
</script>


<style scoped>
.nav-link{
    font-size: 16px;
}

.navbar-brand{
    font-size: 22px;
}

.navbar{
padding: 0;
}

.navbar-nav {
  background-color: rgba(230, 230, 233, 0.829);
  width: 100%;
  margin-top: 30px;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-radius: 5px;
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
}

.nav-item{
    margin-right: 15px;
}

.fa-sign-out-alt,
.logout{
    cursor: pointer;
}

</style>

