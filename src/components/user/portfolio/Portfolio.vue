<template>
    <div class="portfolio-container">
        <div class="information">
            <div class="information-investment">
                <h4> Total investment </h4>
                <p id="information-quantity"> 345,56 </p>
            </div>
            <div class="information-profit">
                <h4> Profit </h4>
                <p id="information-quantity"> 3453,56 </p>
            </div>
        </div>
        <div class="add-button"> 
           <button @click="showNewCoinModal = true"  type="button" class="btn btn-dark btn-circle btn-xl">
              +
            </button>
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

export default {
  data() {
    return {
      showNewCoinModal: false
    };
  },
  created() {
   this.$store.dispatch("getCryptoData");
  },
  components: {
    Coins,
    NewCoinModal
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
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 20px;
  margin-top: 40px;
}

.information-investment {
  border: 1px solid rgb(98, 67, 67);
  padding: 20px 90px;
}

.information-profit {
  border: 1px solid rgb(98, 67, 67);
  padding: 20px 90px;
}

#information-quantity {
  font-size: 50px;
  margin-top: 30px;
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
  margin-bottom: 31px;
  margin-top: 10px;
}
</style>

