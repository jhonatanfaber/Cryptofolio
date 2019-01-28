<template>
  <div class="login-container">
    <template>
      <img src="https://source.unsplash.com/6dW3xyQvcYE">
    </template>

    <div class="container">
      <div class="card card-container">
        <p class="profile-name-card">Create an Account</p>
        <form class="form-signin">
          <input
            type="text"
            v-model="name"
            @input="$v.name.$touch()"
            id="exampleInputName"
            class="form-control"
            placeholder="Name"
            :class="{invalidName : $v.name.$error}"
          >
          <div class="error" v-if="$v.name.$error">Field is required</div>
          <input
            type="text"
            v-model="username"
            @input="$v.username.$touch()"
            id="exampleInputUsername"
            class="form-control"
            placeholder="Username"
            :class="{invalidUsername : $v.username.$error, 'signup-error': (signup_status == 'error')}"
          >
          <div class="error" v-if="$v.username.$error">Field is required</div>
          <input
            type="text"
            v-model="email"
            @input="$v.email.$touch()"
            id="exampleInputEmail"
            class="form-control"
            placeholder="Email"
            :class="{invalidEmail : $v.email.$error, 'signup-error': (signup_status == 'error')}"
          >
          <div
            class="error"
            v-if="$v.email.$error"
          >Field is required and must be a valid email address</div>
          <input
            type="password"
            v-model="password"
            @input="$v.password.$touch()"
            id="exampleInputPassword"
            class="form-control"
            placeholder="Password"
            :class="{invalidPassword : $v.password.$error}"
          >
          <div class="error" v-if="$v.password.$error">Field is required</div>
          <input
            type="password"
            v-model="repeatedPassword"
            @input="$v.repeatedPassword.$touch()"
            id="exampleInputRepeatedPassword"
            class="form-control"
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
          <button
            @click.prevent="signup"
            :disabled="!$v.name.required || !$v.password.required || !$v.username.required ||  !$v.repeatedPassword.sameAsPassword || $v.email.$invalid"
            class="btn btn-lg btn-primary btn-block btn-signin"
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
img {
  width: 100%;
  height: 700px;
  background-size: cover;
  background-position: center top;
  opacity: 0.8;
}

.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.form-control.invalidHighlight {
  border: 1px solid rgb(226, 152, 152);
}

*/ body,
html {
  height: 100%;
  background-repeat: no-repeat;
  background-image: linear-gradient(rgb(104, 145, 162), rgb(12, 97, 33));
}

.card-container.card {
  width: 50%;
  padding: 5%;
}

.btn {
  font-weight: 700;
  height: 36px;
  user-select: none;
  cursor: default;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  border-radius: 2px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  border-radius: 50%;
}

.profile-name-card {
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
}

.form-signin #exampleInputName,
.form-signin #exampleInputUsername,
.form-signin #exampleInputEmail,
.form-signin #exampleInputRepeatedPassword,
.form-signin #exampleInputPassword {
  direction: ltr;
  height: 44px;
  font-size: 16px;
  margin-bottom: 0;
  margin-top: 15px;
}

.form-signin input[type="email"],
.form-signin input[type="password"],
.form-signin input[type="text"],
.form-signin button {
  width: 100%;
  display: block;
  margin-bottom: 10px;
}

.btn.btn-signin {
  background-color: #343a40;
  font-weight: 700;
  font-size: 14px;
  height: 36px;
  border-radius: 4px;
  border: none;
  margin-top: 20px;
}

.btn.btn-signin:hover,
.btn.btn-signin:active,
.btn.btn-signin:focus {
  background-color: rgb(0, 0, 0);
}

.forgot-password {
  color: #343a40;
}

.forgot-password:hover,
.forgot-password:active,
.forgot-password:focus {
  color: rgb(0, 0, 0);
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
</style>
