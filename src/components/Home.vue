<template>
    <div class="home-container">
      <div v-if="!isAdmin && !isEmpty" class="home-container-wrapper">
        <div  class="home-container__information">
            <h2> User Panel</h2>
            <p> Trade or view your portfolio </p>
        </div>
      </div>
      <div v-if="isAdmin && !isEmpty" class="home-container-wrapper">
        <div class="home-container__information">
            <h2> Admin Panel</h2>
            <p> You may manage users configuration </p>
        </div>
      </div>
      <div v-if="isEmpty" class="home-container-wrapper">
        <div class="home-container__information">
            <h1> Manage and track your cryptocurrency portfolio </h1>
        </div>
            <p> IMAGEN </p>
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


