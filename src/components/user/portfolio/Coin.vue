<template>
    <div class="coin-container">
        <div class="card ">
                <div class="card-body">
                    <h5 class="card-title">{{card.name}}</h5>
                    <img :src="card.logo" class="logo-sprite" :alt="card.name" height="60" width="60">
                    <p class="card-text">{{card.amount}} ({{card.symbol}})</p>
                    <!-- <p class="card-text">Price per unit(en btc) : {{card.buyPrice}}</p> -->
                    <hr>
                    <div class="info-comparison">
                        <div class="before">
                            <h5> Before </h5>
                            <p class="card-text"> X total en $</p>
                            <p class="card-text"> X total en btc</p>
                        </div>
                        <div class="after">
                            <h5> After </h5>
                            <p class="card-text"> X total en $</p>
                            <p class="card-text"> X total en btc</p>
                        </div>
                    </div>
                    
                    <a href="#" class="btn btn-info">View Details</a>
                </div>
            </div>
    </div>
</template>

<script>
export default {
    props : ["card"]
}
</script>

<style scoped>
.card{
    margin-right: 20px;
    margin-bottom: 20px;
}

.info-comparison{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}
</style>


