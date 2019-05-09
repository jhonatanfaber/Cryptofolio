<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="header">
            <h3>Edit Card Information</h3>
            <i class="fas fa-times fa-2x" @click="closeModal"></i>
          </div>
          <div class="body">
            <div class="form-group">
              <label class="col-md-3 control-label">UsdBuyPrice:</label>
              <div class="col-md-4">
                <input type="number" class="form-control">
              </div>
            </div>
          </div>
          <div class="footer">
            <button class="btn btn-dark">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$emit("close");
    }
  }
};
</script>


<style scoped>
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
  width: 50%;
  margin: 0px auto;
  padding: 50px;
  padding-left: 5%;
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

@media only screen and (min-width: 401px) and (max-width: 960px) {
  .modal-container {
    width: 70%;
  }
}

.header h3 {
  margin-bottom: 7%;
  color: #070707;
  font-weight: bold;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.fa-times {
  cursor: pointer;
}

.body {
  margin: 20px 0;
}

.footer {
  margin-bottom: 10%;
  display: flex;
  justify-content: flex-start;
}

.form-control:hover {
  border-color: #aaa9a9;
}

.form-control:focus {
  border-color: #525151;
  box-shadow: inset 0px 0px 1px rgba(126, 124, 124, 0.87), 0 0 8px #7c7b7b;
}

input:hover,
input:active,
input:focus {
  outline: none;
  box-shadow: none;
  border-color: #cccccc;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

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

