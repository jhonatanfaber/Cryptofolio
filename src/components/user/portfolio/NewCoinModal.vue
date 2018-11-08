<template>
    <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="header">
             <h3> Add new coin to portfolio </h3>
            <i class="fas fa-times fa-2x" @click="closeModal"></i>
          </div>

          <div class="body">
            <div class="form-group"  >
                <select v-model="card.id" class="form-control col-sm-8">
                    <option >Choose One:</option>
                    <option  v-for="crypto in sortedCryptoData" :key="crypto.id" :value="crypto.id">
                      {{crypto.slug}}
                    </option>
                </select>
            </div>
            <div class="amountWrapper">
              <div class="col-auto">
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <i class="fas fa-align-justify"></i>
                    </div>
                  </div>
                  <input type="number" v-model="card.amount"  class="form-control col-sm-7" id="inlineFormInputGroup" placeholder="Amount">
                </div>
              </div>
              <div class="col-auto">
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <i class="far fa-money-bill-alt"></i>
                    </div>
                  </div>
                  <input type="text" v-model="card.usdBuyPrice" class="form-control col-sm-7" id="inlineFormInputGroup" placeholder="Buy price ($)">
                </div>
              </div>
            </div>
            <div class="col-auto">
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <i class="fas fa-calendar-alt"></i> Bought on
                    </div>
                  </div>
                  <input type="date" v-model="card.boughtDate" class="form-control col-sm-6" id="inlineFormInputGroup">
                </div>
              </div>
             
          </div>
          
          <div class="footer">
              <label class="btn btn-dark" @click="addToPortfolio"> Add to porfolio </label>
          </div>
        </div>
      </div>
    </div>
  </transition>
    
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      card : {
        id : null,
        amount: null,
        usdBuyPrice : null,
        boughtDate : null,
        usdBuyPrice : null,
        name : null,
        logo : null,
        symbol : null

      }
    };
  },
  computed: {
    ...mapGetters(["cryptoData", "portfolio"]),
    sortedCryptoData() {
      function compare(a, b) {
        if (a.slug.toLowerCase() < b.slug.toLowerCase()) return -1;
        if (a.slug.toLowerCase() > b.slug.toLowerCase()) return 1;
        return 0;
      }
      const clonedArray = this.cryptoData.slice(0);
      return clonedArray.sort(compare);
    }
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    addToPortfolio(){
      let coin = this.cryptoData.find(coin => {
        return coin.id == this.card.id
      })
      this.card.name = coin.name;
      this.card.logo = coin.logo;
      this.card.symbol = coin.symbol;
      this.portfolio.push(this.card)
      this.getCurrentCoinPrice(this.card.symbol)
      this.closeModal()      
    },
    getCurrentCoinPrice(coinSymbol){
      this.$store.dispatch("getCurrentCoinPrice", coinSymbol)
    }
  }
};
</script>
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 55%;
  margin: 0px auto;
  padding: 50px;
  padding-left: 5%;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.header h3 {
  margin-bottom: 7%;
  color: #070707;
  font-weight: bold;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.fa-times {
  cursor: pointer;
}

.body {
  margin: 20px 0;
}

.footer {
  margin-bottom: 10%;
  display: flex;
  justify-content: flex-start;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 30px;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.amountWrapper {
  display: flex;
  margin-bottom: 30px;
}

.col-auto {
  padding: 0;
}

.fa-calendar-alt {
  margin-right: 10px;
}

.btn-dark {
  margin-top: 30px;
}
</style>
