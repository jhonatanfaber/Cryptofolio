<template>
  <div class="settings-container">
    <h1>Connect your exchange</h1>
    <div class="alert-wrapper">
      <div
        v-show="showInfoAlert"
        class="alert alert-success"
      >New data have been added to your portfolio, check it out!</div>
    </div>
    <div class="form-wrapper">
      <div class="group-selector">
        <label for="exchangeSelector">Select your favourite</label>
        <select class="form-control" id="exchangeSelector" v-model="exchange.ex_name">
          <option>Bittrex</option>
          <option>Binance</option>
        </select>
      </div>
      <form>
        <div class="form-group">
          <input
            type="text"
            v-model="exchange.apikey"
            class="form-control"
            placeholder="Enter API Key"
          >
        </div>
        <div class="form-group">
          <input
            type="text"
            v-model="exchange.secret"
            class="form-control"
            placeholder="Enter secret"
          >
        </div>
        <button type="button" @click="saveExchangeKey" class="btn btn-dark">Save</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      showInfoAlert: false,
      exchange: {
        ex_name: "",
        apikey: "",
        secret: ""
      }
    };
  },
  methods: {
    ...mapActions(["saveExchangeInfo"]),
    saveExchangeKey() {
      this.saveExchangeInfo(this.exchange);
      this.setInfoAlert();
    },
    setInfoAlert() {
      this.showInfoAlert = true;
      setTimeout(() => {
        this.showInfoAlert = false;
      }, 3500);
    }
  }
};
</script>

<style scoped>
.settings-container {
  margin-top: 10%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
}

.form-wrapper {
  width: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: auto;
}

.group-selector {
  width: 40%;
  margin-bottom: 30px;
}

form {
  width: 40%;
}

@media (max-width: 1350px) {
  .settings-container {
    margin-top: 30%;
  }

  .group-selector {
    width: 100%;
  }

  form {
    width: 100%;
  }

  h1 {
    font-size: 2.1rem;
  }
}

.btn-dark {
  background-color: #131212;
  width: 100%;
}

.btn-dark:hover {
  background-color: #272727;
}

.alert-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.alert {
  width: 50%;
}

h1 {
  margin-bottom: 50px;
}

hr {
  width: 55%;
}
</style>


