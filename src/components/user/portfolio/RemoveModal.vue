<template>
    <div class="confirmation-modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="modal-title">Are you sure you want to delete the card?</h5>
                      <div class="modal-buttons">
                        <button @click="removeCardFromPortfolio" type="button" class="btn btn-danger" >Delete</button>
                        <button @click="closeModal" type="button" class="btn btn-dark">No</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
    
</template>


<script>
export default {
  props:["card"],
  methods: {
    closeModal() {
      this.$emit("close");
    },
    removeCardFromPortfolio(){
      this.$store.dispatch("removeCardFromPortfolio", this.card)
      this.closeModal()
    }
  }
};
</script>

<style scoped>
.card {
  border: 0;
  padding: 20px;
}

.modal-buttons{
  margin-top: 40px;
}

.btn-danger{
  margin-right: 30px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 35%;
  margin: 0px auto;
  padding: 7¡50px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

@media (max-width: 400px) {
  .modal-container {
    width: 90%;
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

