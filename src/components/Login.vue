<template>
  <div class="login-container">
    <template>
      <!-- <img src="https://source.unsplash.com/6dW3xyQvcYE"> -->
    </template>

    <div class="container">
      <div class="login-container">
        <img id="profile-img" class="profile-img-card" src="https://i.imgur.com/6b6psnA.png">
        <form class="form-signin">
          <div class="input-username">
            <input
              type="text"
              v-model="username"
              id="exampleInputEmail1"
              class="form-control form-group col-sm-3"
              placeholder="Username"
              :class="{'auth-error': (auth_status == 'error')}"
            >
          </div>
          <div class="input-password">
            <input
              type="password"
              v-model="password"
              id="exampleInputPassword"
              class="form-control form-group col-sm-3"
              placeholder="Password"
              :class="{'auth-error': (auth_status == 'error')}"
            >
          </div>
          <div class="error" v-if="auth_status == 'error'">Invalid credentials</div>
          <button @click.prevent="login" class="btn btn-lg btn-primary btn-signin col-sm-3">Log in</button>
        </form>
        <div class="footer-form">
          <span @click="signup" class="dontHaveAccount">Don't have an account?</span>
          <span @click="forgotPassword" class="forgotPassword">Forgot Password?</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters(["auth_status"])
  },
  methods: {
    login() {
      const user = {
        username: this.username,
        password: this.password
      };
      this.$store.dispatch("login", user);
    },
    signup() {
      this.$router.push("/signup");
    },
    forgotPassword() {
      this.$router.push("/forgot_password");
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

@media (max-width: 1350px) {
  .container {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

/* Smartphones */
@media only screen and (min-width: 320px) and (max-width: 480px) {
  .container {
    top: 55%;
  }
}

.input-username,
.input-password {
  display: flex;
  justify-content: center;
}

.footer-form {
  display: flex;
  flex-direction: column;
}

.btn {
  font-weight: 700;
  height: 36px;
  user-select: none;
  cursor: default;
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  border-radius: 50%;
  margin-bottom: 40px;
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

input:hover,
input:active,
input:focus {
  outline: none;
  box-shadow: none;
  border-color: #cccccc;
}

.auth-error,
.auth-error:focus {
  border: 1px solid #f79483;
  box-shadow: inset 0px 0px 0px rgba(218, 30, 30, 0.87), 0 0 8px #f57f6c;
}

.error {
  color: #f57f6c;
  font-size: 0.75rem;
  line-height: 2;
  display: flex;
  justify-content: center;
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

.dontHaveAccount {
  color: #343a40;
  cursor: pointer;
  margin-top: 10px;
}

.dontHaveAccount:hover,
.dontHaveAccount:active,
.dontHaveAccount:focus,
.forgotPassword:hover,
.forgotPassword:active,
.forgotPassword:focus {
  color: rgb(0, 0, 0);
  text-decoration: underline;
}

.forgotPassword {
  color: #343a40;
  cursor: pointer;
  margin-top: 5px;
}
</style>
