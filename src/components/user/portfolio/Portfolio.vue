<template>
  <div class="portfolio-container">
    <template></template>

    <div class="add-button">
      <p v-if="loading">Loading...</p>
      <button
        @click="showNewCoinModal = true"
        type="button"
        class="btn btn-dark btn-circle btn-xl"
      >+</button>
    </div>

    <div class="beginnerMessage" v-show="portfolioIsEmpty && !loading">
      <h3>Click the add button and start creating your portfolio</h3>
    </div>

    <div v-if="!loading && !portfolioIsEmpty" class="information">
      <Statistics/>
    </div>

    <template v-if="!loading">
      <Coins/>
    </template>

    <NewCoinModal v-if="showNewCoinModal" @close="showNewCoinModal = false"/>
  </div>
</template>

<script>
import Coins from "./Coins.vue";
import NewCoinModal from "./NewCoinModal.vue";
import Statistics from "./Statistics.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      showNewCoinModal: false,
      currencySymbol: "$",
      loading: false
    };
  },
  async created() {
    this.loading = true;
    await this.$store.dispatch("getCryptoData");
    await this.$store.dispatch("getCardsFromDB");
    this.loading = false;
  },
  computed: {
    ...mapGetters(["portfolio"]),
    portfolioIsEmpty() {
      if (this.portfolio.length == 0) {
        return true;
      }
      return false;
    }
  },
  components: {
    Coins,
    NewCoinModal,
    Statistics,
  }
};
</script>

<style scoped>
.portfolio-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.information {
  width: 80%;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.btn-circle.btn-xl {
  width: 70px;
  height: 70px;
  padding: 10px 16px;
  font-size: 24px;
  line-height: 1.33;
  border-radius: 35px;
}

.add-button {
  display: flex;
  width: 95%;
  flex-direction: column-reverse;
  margin-top: 20px;
}

.btn-circle.btn-xl {
  width: 50px;
  height: 50px;
}

h5 {
  font-weight: 900;
}

.beginnerMessage {
  margin-top: 40px;
}

.btn-dark {
  background-color: #131212;
}

.btn-dark:hover {
  background-color: #272727;
}
</style>

