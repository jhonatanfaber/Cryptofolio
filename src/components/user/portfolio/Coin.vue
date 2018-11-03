<template>
    <div class="coin-container">
        <div class="card ">
                <div class="card-body">
                    <h5 class="card-title">{{coin.name}}</h5>
                    <p class="card-text">{{coin.symbol}}</p>
                    <a href="#" class="btn btn-primary">Button</a>
                </div>
            </div>
    </div>
</template>

<script>
export default {
    props : ["coin"]
}
</script>

<style scoped>
.card{
    margin-right: 20px;
    margin-bottom: 20px;
}
</style>


