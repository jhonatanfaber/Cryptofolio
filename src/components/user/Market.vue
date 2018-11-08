<template >
    <div class="market-container">
        <table class="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th id="nameAlign" class="table-padding head" scope="col"> Name</th>
                <th class="table-padding head" scope="col">Price</th>
                <th class="table-padding head" scope="col">Change (24h)</th>
            </tr>
            </thead>
            <tbody v-for="(crypto,index) in cryptoData" :key="crypto.id">
                <tr>
                    <th scope="row"> {{ index +1 }} </th>
                    <td class="table-padding logo-wrapper"> 
                        <div class="logo-direction">
                            <img :src="crypto.logo" class="logo-sprite" :alt="crypto.slug" height="16" width="16">
                        </div>
                        {{ crypto.name }} 
                        </td>
                    <td class="table-padding"> {{ crypto.usdCurrentPrice.toLocaleString() }} </td>
                    <td class="table-padding" 
                        :style="[crypto.change24h >= 0 ? {color : 'green'} : {color : 'red'}]"
                        > {{ crypto.change24h.toFixed(2) }}% </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["cryptoData"])
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
  //  this.$store.dispatch("getCryptoData");

  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  }
};
</script>


<style scoped>
#nameAlign {
  display: flex;
}

.market-container {
  display: flex;
  justify-content: center;
}

.table {
  margin-top: 5%;
  width: auto;
}

.table th {
  border-top: 1px solid #dee2e6;
}

.table td {
  border-top: 0;
}

.table-padding {
  padding-right: 200px;
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

