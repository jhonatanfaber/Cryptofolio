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
              <label
                for="inputUsername"
                :class="{labelInput : $v.username.$error, 'signup-error-label': (signup_status == 'error')}"
              >Username</label>
              <input
                type="text"
                v-model="username"
                @input="$v.username.$touch()"
                class="form-control col-sm-6"
                id="inputUsername"
                placeholder="Enter username *"
                :class="{invalidUsername : $v.username.$error, 'signup-error': (signup_status == 'error')}"
              >
              <div class="error" v-if="$v.username.$error">Field is required</div>
            </div>
            <div class="form-group">
              <label
                for="exampleInputEmail"
                :class="{labelInput : $v.email.$error, 'signup-error-label': (signup_status == 'error')}"
              >Email</label>
              <input
                type="text"
                v-model="email"
                @input="$v.email.$touch()"
                id="exampleInputEmail"
                class="form-control col-sm-6"
                placeholder="Email *"
                :class="{invalidEmail : $v.email.$error , 'signup-error': (signup_status == 'error')}"
              >
              <div
                class="error"
                v-if="$v.email.$error"
              >Field is required and must be a valid email address</div>
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
              <label
                for="inputPassword"
                :class="{labelInput : $v.repeatedPassword.$error }"
              >Repeat Password</label>
              <input
                type="password"
                v-model="repeatedPassword"
                @input="$v.repeatedPassword.$touch()"
                id="exampleInputRepeatedPassword"
                class="form-control col-sm-6"
                placeholder="enter password *"
                :class="{invalidRepeatedPassword : $v.repeatedPassword.$error}"
              >
              <div
                class="error"
                v-if="$v.repeatedPassword.$error"
              >Field is required and must be identical</div>
            </div>

            <div class="form-group">
              <label>Admin</label>
              <input type="checkbox" v-model="isAdmin">
            </div>
          </div>
          <div
            class="already-exists"
            v-if="signup_status == 'error'"
          >Username or email already exist</div>

          <div class="footer">
            <button
              class="btn btn-dark"
              :disabled="!$v.name.required || !$v.username.required || !$v.password.required || !$v.repeatedPassword.sameAsPassword || $v.email.$invalid"
              @click.prevent="createNewUser"
            >Create</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { required, sameAs, email } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      name: "",
      username: "",
      email: "",
      password: "",
      repeatedPassword: "",
      isAdmin: false
    };
  },
  computed: {
    ...mapGetters(["signup_status"])
  },
  validations: {
    name: {
      required
    },
    username: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      required
    },
    repeatedPassword: {
      required,
      sameAsPassword: sameAs("password")
    }
  },
  methods: {
    async createNewUser() {
      const newUser = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
        admin: this.isAdmin
      };
      await this.$store.dispatch("createUser", newUser);
      if (this.signup_status == "success") {
        this.closeModel();
      }
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

.error {
  color: #f57f6c;
  font-size: 0.75rem;
  line-height: 2;
  margin-left: 10px;
}

.already-exists {
  color: #f57f6c;
  font-size: 1rem;
  display: flex;
  margin-bottom: 5px;
}

.labelInput,
.signup-error-label {
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

.signup-error,
.signup-error:focus .invalidName:focus,
.invalidPassword:focus,
.invalidRepeatedPassword:focus,
.invalidUsername:focus,
.invalidEmail:focus,
.invalidName,
.invalidPassword,
.invalidRepeatedPassword,
.invalidEmail,
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

.btn-dark {
  background-color: #131212;
}

.btn-dark:hover {
  background-color: #272727;
}
</style>
