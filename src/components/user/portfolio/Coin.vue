<template>
    <div class="coin-container">
        <div class="card ">
                <div class="card-body">
                    <p id="bought-day"> {{card.boughtDate}}</p>
                    <h5 class="card-title">{{card.name}}</h5>
                    <img :src="card.logo" class="logo-sprite" :alt="card.name" height="60" width="60">
                    <p class="card-text">{{card.amount}} ({{card.symbol}})</p>
                    <label class="btn  btn-sm" :class="[{ 'btn-success': profitable == true }, {'btn-danger' : profitable ==false}]">
                        {{ tradePercentage }}%
                    </label>
                    <hr>
                    <div class="info-comparison">
                        <div class="before">
                            <h5> Before </h5>
                            <div class="values">
                                <p class="card-text"> 
                                    {{symbolToShow}}{{ ((card.usdBuyPrice *  card.amount).toFixed(4)).toLocaleString() }}
                                </p>
                                <p class="card-text"> 
                                    {{symbolToShow}}{{ ((card.usdBuyPrice*1).toFixed(4)).toLocaleString() }}
                                </p>
                            </div>
                        </div>
                        <div class="after">
                            <h5> After </h5>
                            <div class="values">
                                <p class="card-text"> 
                                    {{symbolToShow}}{{ ((getCryptoDataById(card.id).usdCurrentPrice *  card.amount).toFixed(4)).toLocaleString() }}
                                </p>
                                <p class="card-text"> 
                                    {{symbolToShow}}{{ ((getCryptoDataById(card.id).usdCurrentPrice).toFixed(4)).toLocaleString() }}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <a href="#" class="btn btn-dark">View Details</a>
                </div>
            </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["card"],
  data() {
    return {
      symbolToShow: "$",
      profitable: false
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
  }
};
</script>

<style scoped>
.btn-sm {
  border-radius: 50%;
}
.card {
  margin-right: 20px;
  margin-bottom: 20px;
}

.info-comparison {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

#bought-day {
  font-size: 9px;
  display: flex;
  margin: 5px;
}

.values {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>


