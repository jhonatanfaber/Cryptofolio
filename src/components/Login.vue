<template>
  <div class="login-container">
    <template>
      <img src="https://source.unsplash.com/6dW3xyQvcYE">
    </template>

    <div class="container">
      <div class="card card-container">
        <img
          id="profile-img"
          class="profile-img-card"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        >
        <form class="form-signin">
          <div class="input-username">
            <input
              type="text"
              v-model="username"
              id="exampleInputEmail1"
              class="form-control"
              placeholder="Username"
              :class="{'auth-error': (status == 'error')}"
            >
          </div>
          <div class="input-password">
            <input
              type="password"
              v-model="password"
              id="exampleInputPassword"
              class="form-control"
              placeholder="Password"
              :class="{'auth-error': (status == 'error')}"
            >
          </div>
          <div class="error" v-if="status == 'error'">Invalid credentials</div>
          <button @click.prevent="login" class="btn btn-lg btn-primary btn-block btn-signin">Log in</button>
        </form>
        <span @click="signup" class="dontHaveAccount">Don't have an account?</span>
        <span class="forgotPassword">Forgot Password?</span>
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
    ...mapGetters(["status"])
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

*/ body,
html {
  height: 100%;
  background-repeat: no-repeat;
  background-image: linear-gradient(rgb(104, 145, 162), rgb(12, 97, 33));
}

.card-container.card {
  max-width: 350px;
  height: 430px;
  padding: 40px 40px;
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

.input-password {
  margin-top: 10px;
}

input:hover,
input:active,
input:focus {
  outline: none;
  box-shadow: none;
  border-color: #cccccc;
}

.auth-error,
.auth-error:focus
{
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
  height: 44px;
  font-size: 16px;
}

.form-signin input[type="email"],
.form-signin input[type="password"],
.form-signin input[type="text"],
.form-signin button {
  width: 100%;
  display: block;
}

.btn.btn-signin {
  background-color: #343a40;
  font-weight: 700;
  font-size: 14px;
  height: 36px;
  border-radius: 4px;
  border: none;
  margin-top: 30px;
}

.btn.btn-signin:hover,
.btn.btn-signin:active,
.btn.btn-signin:focus {
  background-color: rgb(0, 0, 0);
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
