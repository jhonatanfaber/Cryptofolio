<template>
  <div class="signup-container">
    <div class="container">
      <div class="login-container">
        <h4>Create New Account</h4>
        <form class="form-signin">
          <div class="input-form">
            <input
              type="text"
              v-model="name"
              @input="$v.name.$touch()"
              id="exampleInputName"
              class="form-control form-group col-sm-3"
              placeholder="Name"
              :class="{invalidName : $v.name.$error}"
            >
            <span class="error" v-if="$v.name.$error">Field is required</span>
          </div>
          <div class="input-form">
            <input
              type="text"
              v-model="username"
              @input="$v.username.$touch()"
              id="exampleInputUsername"
              class="form-control form-group col-sm-3"
              placeholder="Username"
              :class="{invalidUsername : $v.username.$error, 'signup-error': (signup_status == 'error')}"
            >
            <div class="error" v-if="$v.username.$error">Field is required</div>
          </div>
          <div class="input-form">
            <input
              type="text"
              v-model="email"
              @input="$v.email.$touch()"
              id="exampleInputEmail"
              class="form-control form-group col-sm-3"
              placeholder="Email"
              :class="{invalidEmail : $v.email.$error, 'signup-error': (signup_status == 'error')}"
            >
            <div
              class="error"
              v-if="$v.email.$error"
            >Field is required and must be a valid email address</div>
          </div>
          <div class="input-form">
            <input
              type="password"
              v-model="password"
              @input="$v.password.$touch()"
              id="exampleInputPassword"
              class="form-control form-group col-sm-3"
              placeholder="Password"
              :class="{invalidPassword : $v.password.$error}"
            >
            <div class="error" v-if="$v.password.$error">Field is required</div>
          </div>
          <div class="input-form">
            <input
              type="password"
              v-model="repeatedPassword"
              @input="$v.repeatedPassword.$touch()"
              id="exampleInputRepeatedPassword"
              class="form-control form-group col-sm-3"
              placeholder="Repeat password"
              :class="{invalidRepeatedPassword : $v.repeatedPassword.$error}"
            >
            <div
              class="error"
              v-if="$v.repeatedPassword.$error"
            >Field is required and must be identical</div>
            <div
              class="already-exists"
              v-if="signup_status == 'error'"
            >Username or email already exist</div>
          </div>
          <button
            @click.prevent="signup"
            :disabled="!$v.name.required || !$v.password.required || !$v.username.required ||  !$v.repeatedPassword.sameAsPassword || $v.email.$invalid"
            class="btn btn-lg btn-primary btn-signin col-sm-3"
          >Sign up</button>
        </form>
      </div>
    </div>
  </div>
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
      repeatedPassword: ""
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
      mail: email
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
    async signup() {
      const user = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password
      };
      await this.$store.dispatch("createUser", user);

      if (this.signup_status == "success") {
        this.$router.push({ path: "/login" });
      }
    }
  }
};
</script>

<style scoped>
.container {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* .signup-container {
  display: flex;
  flex-wrap: wrap;
} */

/* Mobile Styles */
@media (max-width: 400px) {
  .container {
    top: 55%;
  }
}

/* Tablet Styles */
@media only screen and (min-width: 401px) and (max-width: 960px) {
  .container {
    top: 45%;
  }
}

/* Desktop Styles */
@media only screen and (min-width: 961px) {
  .container {
    top: 40%;
  }

  /* .signup-container {
    width: 960px;
    margin: 0 auto;
  } */
}

.input-form {
  width: 100%;
  display: flex;
  justify-content: center;
}

.btn {
  font-weight: 700;
  height: 36px;
  user-select: none;
  cursor: default;
}

input:hover,
input:active,
input:focus {
  outline: none;
  box-shadow: none;
  border-color: #cccccc;
}

.form-control:hover {
  border-color: #aaa9a9;
}

.form-control:focus {
  border-color: #525151;
  box-shadow: inset 0px 0px 1px rgba(126, 124, 124, 0.87), 0 0 8px #7c7b7b;
}

form.form-signin {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input:hover,
input:active,
input:focus {
  outline: none;
  box-shadow: none;
  border-color: #cccccc;
}

.signup-error,
.signup-error:focus,
.invalidName:focus,
.invalidUsername:focus,
.invalidEmail:focus,
.invalidPassword:focus,
.invalidRepeatedPassword:focus,
.invalidName,
.invalidUsername,
.invalidEmail,
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
  display: flex;
}

.already-exists {
  color: #f57f6c;
  font-size: 0.75rem;
  line-height: 2;
  margin-left: 10px;
  display: flex;
  justify-content: center;
}

button:disabled {
  cursor: not-allowed;
}

.form-signin #exampleInputEmail1,
.form-signin #exampleInputPassword {
  direction: ltr;
  height: 38px;
  font-size: 13px;
}

.btn.btn-signin {
  background-color: #131212;
  font-weight: 700;
  font-size: 14px;
  border-radius: 4px;
  border: none;
}

.btn.btn-signin:hover,
.btn.btn-signin:active,
.btn.btn-signin:focus {
  background-color: #272727;
}
</style>
