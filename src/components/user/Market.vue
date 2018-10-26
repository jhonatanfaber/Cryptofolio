<template >
    <div class="market-container">
        <table class="table table-hover">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th class="table-padding" scope="col"> Name</th>
                <th class="table-padding" scope="col">Price</th>
                <th class="table-padding" scope="col">Change (24h)</th>
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
                    <td class="table-padding"> {{ crypto.price.toLocaleString() }} </td>
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
    this.$store.dispatch("getCryptoData");
    console.log("finished created");
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
[v-cloak] > * {
  display: none;
}
[v-cloak]::before {
  content: "loading...";
}
.market-container {
  display: flex;
  justify-content: center;
}

.table {
  margin-top: 5%;
  width: auto;
}

.table-padding {
  padding-right: 200px;
}

.logo-wrapper {
  display: flex;
  flex-direction: row;
}

.logo-direction {
  margin-right: 5px;
}
</style>

