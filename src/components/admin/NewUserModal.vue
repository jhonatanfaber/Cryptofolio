<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="header">
            <h3>New User</h3>
            <i class="fas fa-times fa-2x" @click="closeModel"></i>
          </div>

          <div class="body">
            <div class="form-group">
              <label for="inputName" :class="{labelInput : $v.name.$error}">Name</label>
              <input
                type="text"
                v-model="name"
                @input="$v.name.$touch()"
                class="form-control col-sm-6"
                id="inputName"
                placeholder="Enter name *"
                :class="{invalidName : $v.name.$error}"
              >
              <div class="error" v-if="$v.name.$error">Field is required</div>
            </div>
            <div class="form-group">
              <label for="inputUsername" :class="{labelInput : $v.username.$error}">Username</label>
              <input
                type="text"
                v-model="username"
                @input="$v.username.$touch()"
                class="form-control col-sm-6"
                id="inputUsername"
                placeholder="Enter username *"
                :class="{invalidUsername : $v.username.$error}"
              >
              <div class="error" v-if="$v.username.$error">Field is required</div>
            </div>
            <div class="form-group">
              <label for="inputPassword" :class="{labelInput : $v.password.$error}">Password</label>
              <input
                type="password"
                v-model="password"
                @input="$v.password.$touch()"
                class="form-control col-sm-6"
                id="inputPassword"
                placeholder="Enter password *"
                :class="{invalidPassword : $v.password.$error}"
              >
              <div class="error" v-if="$v.password.$error">Field is required</div>
            </div>
            <div class="form-group">
              <label>Admin</label>
              <input type="checkbox" v-model="isAdmin">
            </div>
          </div>

          <div class="footer">
            <button
              class="btn btn-dark"
              :disabled="!$v.name.required || !$v.username.required || !$v.password.required"
              @click="createNewUser"
            >Create</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      name: "",
      username: "",
      password: "",
      isAdmin: false
    };
  },
  validations: {
    name: {
      required
    },
    username: {
      required
    },
    password: {
      required
    }
  },
  methods: {
    createNewUser() {
      const newUser = {
        name: this.name,
        username: this.username,
        password: this.password,
        admin: this.isAdmin
      };
      this.$store.dispatch("createUser", newUser);
      this.closeModel();
    },
    closeModel() {
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
  padding: 20px;
  padding-left: 5%;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.header h3 {
  margin-bottom: 7%;
  color: #070707;
  font-weight: bold;
}

h3 {
  margin-top: 15px;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.fa-times {
  padding-top: 15px;
  padding-right: 20px;
  cursor: pointer;
}

.body {
  margin: 20px 0;
}

.btn:hover {
  color: #fff;
}

.footer {
  margin-bottom: 10%;
  display: flex;
  justify-content: flex-start;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.error {
  color: #f57f6c;
  font-size: 0.75rem;
  line-height: 2;
  margin-left: 10px;
}

.labelInput {
  color: #f57f6c;
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

.invalidName:focus,
.invalidPassword:focus,
.invalidUsername:focus,
.invalidName,
.invalidPassword,
.invalidUsername {
  border: 1px solid #f79483;
  box-shadow: inset 0px 0px 0px rgba(218, 30, 30, 0.87), 0 0 8px #f57f6c;
}

button:disabled {
  cursor: not-allowed;
}

.modal-default-button {
  float: right;
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
