<template>
    <div class="coins-container">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" class="btn btn-primary">Button</a>
                </div>
            </div>
            <div class="card ">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" class="btn btn-primary">Button</a>
                </div>
            </div>
    </div>
    
</template>


<style scoped>
.coins-container {
  width: 80%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.card{
    margin-right: 20px;
    margin-bottom: 20px;
}
</style>

