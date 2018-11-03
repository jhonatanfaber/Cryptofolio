<template>
    <div class="coins-container">
            <Coin 
                v-for="coin in coins" :key="coin.id"
                :coin=coin
            />
    </div>
    
</template>

<script>
import Coin from "./Coin.vue"

export default {
    data(){
        return {
            coins : [
                {
                    id : 1,
                    logo : "logo",
                    name : "name",
                    symbol : "symbol csafdvxn sdfbsdnmadvdsbdvc csbhfd ",
                    slug : "slug",
                    actualPrice : "actualPrice",
                    quantity : "quantity",
                    boughtPrice : "boughtPrice",
                    btcQuantity : "btcquantity"
                },
                 {
                    id : 2,
                    logo : "logo",
                    name : "name",
                    symbol : "symbol csafdvxn sdfbsdnmadvdsbdvc csbhfd ",
                    slug : "slug",
                    actualPrice : "actualPrice",
                    quantity : "quantity",
                    boughtPrice : "boughtPrice",
                    btcQuantity : "btcquantity"

                }
            ]
        }
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

