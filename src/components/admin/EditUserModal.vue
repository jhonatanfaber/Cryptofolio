<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="header">
            <h3>Edit User</h3>
            <i class="fas fa-times fa-2x" @click="closeModel"></i>
          </div>

          <div class="body">
            <div class="form-group">
              <label for="inputName" :class="{labelInput : $v.editedUser.name.$error}">Name</label>
              <input
                type="text"
                v-model="editedUser.name"
                @input="$v.editedUser.name.$touch()"
                class="form-control col-sm-6"
                id="inputName"
                placeholder="Enter name *"
                :class="{invalidName : $v.editedUser.name.$error}"
              >
              <div class="error" v-if="$v.editedUser.name.$error">Field is required</div>
            </div>
            <div class="form-group">
              <label
                for="inputPassword"
                :class="{labelInput : $v.editedUser.password.$error}"
              >Password</label>
              <input
                type="password"
                v-model="editedUser.password"
                @input="$v.editedUser.password.$touch()"
                class="form-control col-sm-6"
                id="inputPassword"
                placeholder="Enter password *"
                :class="{invalidPassword : $v.editedUser.password.$error}"
              >
              <div class="error" v-if="$v.editedUser.password.$error">Field is required</div>
            </div>
            <div class="form-group">
              <label
                for="inputPassword"
                :class="{labelInput : $v.editedUser.repeatedPassword.$error }"
              >Repeat Password</label>
              <input
                type="password"
                v-model="editedUser.repeatedPassword"
                @input="$v.editedUser.repeatedPassword.$touch()"
                id="exampleInputRepeatedPassword"
                class="form-control col-sm-6"
                placeholder="Enter password *"
                :class="{invalidRepeatedPassword : $v.editedUser.repeatedPassword.$error}"
              >
              <div
                class="error"
                v-if="$v.editedUser.repeatedPassword.$error"
              >Field is required and must be identical</div>
            </div>
            <div class="form-group">
              <label>Admin</label>
              <input type="checkbox" v-model="editedUser.admin">
            </div>
          </div>
          <div class="footer">
            <button
              class="btn btn-dark"
              :disabled="!$v.editedUser.name.required || !$v.editedUser.password.required || !$v.editedUser.repeatedPassword.sameAsPassword"
              @click="editUser"
            >Edit</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { required, sameAs } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      editedUser: {
        id: this.user.id,
        name: this.user.name,
        password: "",
        repeatedPassword: "",
        admin: this.user.admin
      }
    };
  },
  validations: {
    editedUser: {
      name: {
        required
      },
      password: {
        required
      },
      repeatedPassword: {
        required,
        sameAsPassword: sameAs("password")
      }
    }
  },
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    closeModel() {
      this.$emit("close");
    },
    editUser() {
      this.$store.dispatch("editUser", this.editedUser);
      this.closeModel();
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

@media (max-width: 400px) {
  .modal-container {
    width: 85%;
  }
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
.invalidRepeatedPassword:focus,
.invalidName,
.invalidPassword,
.invalidRepeatedPassword {
  border: 1px solid #f79483;
  box-shadow: inset 0px 0px 0px rgba(218, 30, 30, 0.87), 0 0 8px #f57f6c;
}

.error {
  color: #f57f6c;
  font-size: 0.75rem;
  line-height: 2;
  margin-left: 10px;
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

.btn-dark {
  background-color: #131212;
}

.btn-dark:hover {
  background-color: #272727;
}
</style>
