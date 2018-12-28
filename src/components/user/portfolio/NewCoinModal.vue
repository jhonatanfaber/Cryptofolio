<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="header">
            <h3>Add new coin to portfolio</h3>
            <i class="fas fa-times fa-2x" @click="closeModal"></i>
          </div>
          <div class="body">
            <div class="form-group">
              <select
                v-model="card.coinID"
                class="form-control col-sm-8"
                @input="$v.card.coinID.$touch()"
                :class="{invalidCoinID : $v.card.coinID.$error}"
              >
                <option>Choose One:</option>
                <option
                  v-for="crypto in sortedCryptoData"
                  :key="crypto.id"
                  :value="crypto.id"
                >{{crypto.slug}}</option>
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
                  <input
                    type="number"
                    v-model="card.amount"
                    @input="$v.card.amount.$touch()"
                    class="form-control col-sm-7"
                    id="inlineFormInputGroup"
                    placeholder="Amount"
                    :class="{invalidAmount : $v.card.amount.$error}"
                  >
                </div>
              </div>
              <div class="col-auto">
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <i class="far fa-money-bill-alt"></i>
                    </div>
                  </div>
                  <input
                    type="text"
                    v-model="card.usdBuyPrice"
                    @input="$v.card.usdBuyPrice.$touch()"
                    class="form-control col-sm-7"
                    id="inlineFormInputGroup"
                    placeholder="Buy price ($)"
                    :class="{invalidUsdBuyPrice : $v.card.usdBuyPrice.$error}"
                  >
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
                <input
                  type="date"
                  v-model="card.boughtDate"
                  @input="$v.card.boughtDate.$touch()"
                  class="form-control col-sm-6"
                  id="inlineFormInputGroup"
                  :class="{invalidBoughtDate : $v.card.boughtDate.$error}"
                >
              </div>
            </div>
          </div>
          <div
            class="error"
            v-if="$v.card.usdBuyPrice.$error || $v.card.amount.$error || $v.card.coinID.$error"
          >All fields are required</div>
          <div class="footer">
            <button
              class="btn btn-dark"
              @click="addToPortfolio"
              :disabled="!$v.card.usdBuyPrice.required || !$v.card.amount.required || !$v.card.coinID.required || !$v.card.boughtDate.required"
            >Add to porfolio</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  props: ["showStarterMessage"],
  data() {
    return {
      card: {
        coinID: null,
        amount: null,
        usdBuyPrice: null,
        boughtDate: null,
        name: null,
        logo: null,
        symbol: null,
        cardID: null
      }
    };
  },
  validations: {
    card: {
      amount: {
        required
      },
      usdBuyPrice: {
        required
      },
      coinID: {
        required
      },
      boughtDate : {
        required
      }
    }
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
    ...mapActions([
      "updateTotalInvestementPrice",
      "updateProfit",
      "setCurrentCardID",
      "saveCardInDB",
      "addCardToPortfolio"
    ]),
    closeModal() {
      this.$emit("close");
    },
    addToPortfolio() {
      let coin = this.cryptoData.find(coin => {
        return coin.id == this.card.coinID;
      });
      this.card.name = coin.name;
      this.card.logo = coin.logo;
      this.card.symbol = coin.symbol;
      this.card.cardID = this.card.symbol + Date.now();
      this.addCardToPortfolio(this.card);

      this.updateTotalInvestementPrice(
        this.card.amount * this.card.usdBuyPrice
      );

      this.setCurrentCardID({
        cardID: this.card.cardID,
        coinID: this.card.coinID
      });
      this.saveCardInDB({
        cardID: this.card.cardID,
        coinID: this.card.coinID,
        amount: this.card.amount,
        usdBuyPrice: this.card.usdBuyPrice,
        boughtDate: this.card.boughtDate,
        logo: this.card.logo,
        name: this.card.name,
        symbol: this.card.symbol
      });
      this.closeModal();
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

.form-control:hover {
  border-color: #aaa9a9;
}

.form-control:focus {
  border-color: #525151;
  box-shadow: inset 0px 0px 1px rgba(126, 124, 124, 0.87), 0 0 8px #7c7b7b;
}

input:hover,
input:active,
input:focus {
  outline: none;
  box-shadow: none;
  border-color: #cccccc;
}

.invalidUsdBuyPrice:focus,
.invalidAmount:focus,
.invalidBoughtDate:focus,
.invalidCoinID:focus,
.invalidUsdBuyPrice,
.invalidAmount, 
.invalidBoughtDate,
.invalidCoinID {
  border: 1px solid #f79483;
  box-shadow: inset 0px 0px 0px rgba(218, 30, 30, 0.87), 0 0 8px #f57f6c;
}

.error {
  color: #f57f6c;
  font-size: 1rem;
  line-height: 2;
  margin-left: 10px;
  display: flex;
}

button:disabled {
  cursor: not-allowed;
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
