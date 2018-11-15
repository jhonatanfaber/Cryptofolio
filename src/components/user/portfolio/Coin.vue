<template>
    <div class="coin-container">
        <div class="card-wrapper ">
                <div class="card-body" :style="[profitable ? { backgroundColor: profitBackgroundColor, border: profitBorder, } : { backgroundColor: lossesBackgroundColor, border: lossesBorder, }]">
                    
                    <p id="bought-day"> 
                        {{card.boughtDate}}
                        <i @click="removeCard" class="fas fa-times"></i>
                    </p>


                    <h5 class="card-title">{{card.name}}</h5>
                    <img :src="card.logo" class="logo-sprite" :alt="card.name" height="60" width="60">
                    <p class="card-text amount">{{card.amount}} ({{card.symbol}})</p>
                    <label class="btn  btn-sm" :class="[{ 'btn-success': profitable == true}, {'btn-danger' : profitable == false}]">
                        {{ tradePercentage }}% 
                    </label>


                    <hr>
                    <div class="info-comparison">
                        <div class="before">
                            <h6> Before </h6>
                            <div class="values">
                                <p class="card-text"> 
                                    {{symbolToShow}}{{ (card.usdBuyPrice *  card.amount).toLocaleString(undefined, {
                                                                                                              minimumFractionDigits: 2,
                                                                                                              maximumFractionDigits: 6}) }}
                                </p>
                                <p class="card-text"> 
                                    {{symbolToShow}}{{ (card.usdBuyPrice*1).toLocaleString(undefined, {
                                                                                              minimumFractionDigits: 2,
                                                                                              maximumFractionDigits: 6}) }}
                                </p>
                            </div>
                        </div>
                        <div class="after">
                            <h6> After </h6>
                            <div class="values">
                                <p class="card-text"> 
                                    {{symbolToShow}}{{ (getCryptoDataById(card.id).usdCurrentPrice *  card.amount).toLocaleString(undefined, {
                                                                                                                                minimumFractionDigits: 2,
                                                                                                                                maximumFractionDigits: 5}) }}
                                </p>
                                <p class="card-text"> 
                                    {{symbolToShow}}{{ (getCryptoDataById(card.id).usdCurrentPrice).toLocaleString(undefined, {
                                                                                                              minimumFractionDigits: 2,
                                                                                                              maximumFractionDigits: 5}) }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- <a href="#" class="btn btn-dark">View Details</a> -->
                    <RemoveConfirmationModal 
                      v-if="confirmatiomModalIsOpen"
                      @close="confirmatiomModalIsOpen = false"
                      :card=card
                    />
                </div>
            </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import RemoveConfirmationModal from "./RemoveConfirmationModal.vue"

export default {
  props: ["card"],
  data() {
    return {
      symbolToShow: "$",
      profitable: false,
      profitBorder: "1px solid green",
      profitBackgroundColor: "#b6efb673",
      lossesBorder: "1px solid #d04d4d",
      lossesBackgroundColor: "#da7c7c3d",
      confirmatiomModalIsOpen : false
    };
  },
  computed: {
    ...mapGetters(["getCryptoDataById"]),
    tradePercentage() {
      let currentPrice = this.getCryptoDataById(this.card.id).usdCurrentPrice;
      let buyPrice = this.card.usdBuyPrice;
      let profitsOrLossesPercentage =
        ((currentPrice - buyPrice) * 100) / buyPrice;
      if (profitsOrLossesPercentage >= 0) {
        this.profitable = true;
      } else {
        this.profitable = false;
      }
      return profitsOrLossesPercentage.toFixed(2);
    }
  },
  methods : {
    removeCard(){
      this.confirmatiomModalIsOpen = true
    }
  },
  components : {
    RemoveConfirmationModal
  }
};
</script>

<style scoped>
.btn-sm {
  border-radius: 50%;
}
.card-wrapper {
  margin-right: 20px;
  margin-bottom: 20px;
}

.card-body{
  border-radius: 20px;
  box-shadow: inset 0px 0px 20px 2px #888888;
}

.card-text.amount{
  margin-top: 8px;
}

.info-comparison {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

#bought-day {
  font-size: 9px;
  display: flex;
  justify-content: space-between;
  margin: 5px;
}

.values {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.fa-times{
  cursor: pointer;
}

hr{
  margin-top: 0;
}
</style>


