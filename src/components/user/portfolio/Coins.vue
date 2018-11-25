<template>
    <div class="coins-container">
            <Coin 
                v-for="card in portfolio" :key="card.coinID"
                :card=card
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

