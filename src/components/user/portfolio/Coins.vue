<template>
    <div class="coins-container">
            <Coin 
                v-for="coin in portfolio" :key="coin.id"
                :card=coin
            />
    </div>
    
</template>

<script>
import Coin from "./Coin.vue"
import {mapGetters} from "vuex"

export default {
    computed : {
        ...mapGetters(["portfolio"])
    },
    components : {
        Coin
    }
}
</script>



<style scoped>
.coins-container {
  width: 80%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

</style>

