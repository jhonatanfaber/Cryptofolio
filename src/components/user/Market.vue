<template >
  <div class="market-container">
    <p v-if="loading" id="loadingMessage">Loading...</p>

    <template v-if="!loading">
      <!-- <h2 id="title">Top 100 Cryptocurrencies by Market Capitalization</h2> -->
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th id="nameAlign" class="table-padding head" scope="col">Name</th>
            <th class="table-padding head" scope="col">Price ($)</th>
            <th class="table-padding head" scope="col">Change (24h)</th>
          </tr>
        </thead>
        <tbody v-for="(crypto,index) in data" :key="crypto.id">
          <tr>
            <th scope="row">{{ index +1 }}</th>
            <td class="table-padding logo-wrapper">
              <div class="logo-direction">
                <img
                  :src="crypto.logo"
                  class="logo-sprite"
                  :alt="crypto.slug"
                  height="16"
                  width="16"
                >
              </div>
              {{ crypto.name }}
            </td>
            <td class="table-padding">{{ crypto.usdCurrentPrice.toLocaleString() }}</td>
            <td
              class="table-padding"
              :style="[crypto.change24h >= 0 ? {color : 'green'} : {color : 'red'}]"
            >{{ crypto.change24h.toFixed(2) }}%</td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      loading: false
    };
  },
  async created() {
    this.loading = true;
    await this.$store.dispatch("getCryptoData");
    this.loading = false;
    this.data = this.$store.getters.cryptoData;
  }
};
</script>

<style scoped>
#loadingMessage {
  margin-top: 70px;
}

h2#title {
  padding-top: 50px;
}

#nameAlign {
  text-align: left;
}

.market-container {
  display: flex;
  justify-content: center;
  flex-flow: wrap;
}

.table {
  margin-top: 5%;
  width: 90%;
}

.table th {
  border-top: 1px solid #dee2e6;
  vertical-align: 0;
}

.table td {
  border-top: 0;
}

.table-padding {
  line-height: 3;
}

.logo-wrapper {
  display: flex;
  flex-direction: row;
}

.logo-direction {
  margin-right: 5px;
}
</style>

