<template>
  <div class="profit-container">
    <div class="information-investment">
      <h4>Invested</h4>
      <p class="information-quantity">
        {{ currencySymbol }}{{ totalInvestmentToShow.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4 }) }}
      </p>
    </div>

    <div class="information-investment">
      <h4>Profit</h4>
      <p
        class="information-quantity"
        :style="[profitsToShow >= 0 ? {color : 'green'} : {color : '#ef143e'}]"
      >
        {{ currencySymbol }}{{ profitsToShow.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4 }) }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      currencySymbol: "$"
    };
  },
  computed: {
    ...mapGetters([
      "profit",
      "totalInvestment",
      "portfolio",
      "getCryptoDataById"
    ]),
    profitsToShow() {
      let profit = 0;
      this.portfolio.forEach(element => {
        let currentCoinPrice = this.getCryptoDataById(element.coinID)
          .usdCurrentPrice;
        profit +=
          currentCoinPrice * element.amount -
          element.usdBuyPrice * element.amount;
      });
      this.updateProfit(profit);
      return profit;
    },
    totalInvestmentToShow() {
      let investment = 0;
      this.portfolio.forEach(element => {
        investment += element.usdBuyPrice * element.amount;
      });
      this.updateTotalInvestementPrice(investment);
      return investment;
    }
  },
  methods: {
    ...mapActions(["updateProfit", "updateTotalInvestementPrice"])
  }
};
</script>

<style scoped>

.profit-container {
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

@media (max-width: 600px) {
  .profit-container {
    width: 80%;
    display: flex;
    flex-direction: column;
  }
}

/* .information-investment {
  padding: 20px 90px; */
  /* width: 30%;
} */

.information-quantity {
  font-size: 25px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
</style>


