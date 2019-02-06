<template>
  <div id="app">
    <div id="nav">
        <Navbar/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Home from "./components/Home.vue";
import Navbar from "./components/Navbar.vue";

export default {
  components: {
    Home,
    Navbar
  },
  created() {
    this.$store.dispatch("tryAutoLogin")
  }
};
</script>


<style>

*{
    box-sizing: border-box;
}

html{
    font-size: 13px;
}

body{
    margin: 0;
    padding: 0;
    font-family: Lato,sans-serif;
    font-size: 1rem;
    display: grid;
}


 #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>