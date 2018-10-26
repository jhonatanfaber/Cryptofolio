<template>
    <div class="home-container">
      <div v-if="!isAdmin" class="home-container-wrapper">
        <div  class="home-container__information">
            <h2> User Panel</h2>
            <p> Trade or view your portfolio </p>
        </div>
      </div>
      <div v-else class="home-container-wrapper">
        <div class="home-container__information">
            <h2> Admin Panel</h2>
            <p> You may manage users configuration </p>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["user", "isAdmin"])
  },
  // created() {
  //   this.$store.dispatch("getCryptoData");
  // },
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
.router-link-active {
  background-color: yellow;
}
</style>


