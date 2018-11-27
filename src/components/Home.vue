<template>
  <div class="home-container">
    <div v-if="!isAdmin && !isEmpty" class="home-container-wrapper">
      <div class="home-container__information">
        <h2>User Panel</h2>
        <p>Trade or view your portfolio</p>
      </div>
    </div>
    <div v-if="isAdmin && !isEmpty" class="home-container-wrapper">
      <div class="home-container__information">
        <h2>Admin Panel</h2>
        <p>You may manage users configuration</p>
      </div>
    </div>
    <div v-if="isEmpty" class="backgroundimage">
      <img
        src="https://source.unsplash.com/LARx6rKOq8U/3100x1600"
        class="backim"
        height="500"
        width="100%"
      >
      <div class="hero-text">
        <!-- <h1 style="font-size:50px">Some text</h1> -->
        <h2 style="font-size:30px">Manage and track your cryptocurrency portfolio</h2>
        <span class="btn btn-light">Sing up now</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import lodash from "lodash"

export default {
  computed: {
    ...mapGetters(["isAdmin","user"]),
    isEmpty(){
      if(_.isEmpty(this.user)){
        return true
      }
      return false
    }
  }
};
</script>

<style scoped>
.hero-text {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgb(0, 0, 0);
}

.backim{
  max-width: 100%;
  height: auto;
  opacity: 0.7;
}

.home-container {
  display: flex;
  justify-content: center;
}

.home-container-wrapper {
  border: 1px solid rgb(170, 166, 166);
  margin-top: 30px;
  width: 85%;
  border-radius: 10px;
}

.home-container__information {
  margin: 30px;
}
</style>


