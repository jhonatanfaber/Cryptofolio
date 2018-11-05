<template>
    <div class="coin-container">
        <div class="card ">
                <div class="card-body">
                    <h5 class="card-title">{{coin.name}}</h5>
                    <h4> LOGO </h4>
                    <p class="card-text">CAntidad : X</p>
                    <p class="card-text">Precio por unidad(en btc) : X</p>
                    <a href="#" class="btn btn-primary">Ver Detalles</a>
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


