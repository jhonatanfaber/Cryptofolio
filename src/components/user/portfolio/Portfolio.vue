<template>
    <div class="portfolio-container">
        <div class="add-button"> 
           <button @click="showNewCoinModal = true"  type="button" class="btn btn-dark btn-circle btn-xl">
              +
            </button>
        </div>
        <div class="beginnerMessage" v-if="totalInvestment == 0.00" >
          <h3> Click the add button and start creating your portfolio</h3>
        </div>
        <div v-else class="information">
            <Statistics />
        </div>
        <Coins/>
        <NewCoinModal 
                v-if="showNewCoinModal"
                @close="showNewCoinModal = false"
        />
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
      currencySymbol: "$"
    };
  },
  created() {
    this.$store.dispatch("getCryptoData");
  },
  computed: {
    ...mapGetters(["totalInvestment", "profit"])
  },
  components: {
    Coins,
    NewCoinModal,
    Statistics
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
</style>

