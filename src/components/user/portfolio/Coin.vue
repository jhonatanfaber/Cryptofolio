<template>
    <div class="coin-container">
        <div class="card ">
                <div class="card-body">
                    <p id="bought-day"> {{card.boughtDate}}</p>
                    <h5 class="card-title">{{card.name}}</h5>
                    <img :src="card.logo" class="logo-sprite" :alt="card.name" height="60" width="60">
                    <p class="card-text">{{card.amount}} ({{card.symbol}})</p>
                    <p class="card-text"> %</p>
                    <hr>
                    <div class="info-comparison">
                        <div class="before">
                            <h5> Before </h5>
                            <div class="values">
                                <p class="card-text"> 
                                    {{symbolToShow}}{{ ((card.usdBuyPrice *  card.amount).toFixed(6)).toLocaleString() }}
                                </p>
                                <p class="card-text"> 
                                    {{symbolToShow}}{{ ((card.usdBuyPrice*1).toFixed(6)).toLocaleString() }}
                                </p>
                            </div>
                        </div>
                        <div class="after">
                            <h5> After </h5>
                            <div class="values">
                                <p class="card-text"> 
                                    {{symbolToShow}}{{ ((getCryptoDataById(card.id).usdCurrentPrice *  card.amount).toFixed(6)).toLocaleString() }}
                                </p>
                                <p class="card-text"> 
                                    {{symbolToShow}}{{ ((getCryptoDataById(card.id).usdCurrentPrice).toFixed(6)).toLocaleString() }}
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
      symbolToShow: "$"
    //   profitsOrLosesPercentage:
    //     ((this.getCryptoDataById(this.card.id).usdCurrentPrice -
    //       this.card.usdBuyPrice) *
    //       100)/
    //     this.card.usdBuyPrice
    };
  },
  computed: {
    ...mapGetters(["getCryptoDataById"])
  }
};
</script>

<style scoped>
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


