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
          <div class="input-username" :class="{invalid : $v.username.$error}">
            <input
              type="text"
              @input="$v.username.$touch()"
              v-model="username"
              id="exampleInputEmail1"
              :class="{invalidHighlight: invalidUser}"
              class="form-control"
              placeholder="Username"
            >
          </div>
          <div class="input-password" :class="{invalid : $v.password.$error}">
            <input
              type="password"
              @input="$v.password.$touch()"
              v-model="password"
              id="exampleInputPassword"
              :class="{invalidHighlight: invalidUser}"
              class="form-control"
              placeholder="Password"
            >
          </div>
          <button @click.prevent="login" class="btn btn-lg btn-primary btn-block btn-signin">Log in</button>
        </form>
        <span @click="signup" class="dontHaveAccount">Don't have an account?</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  validations: {
    username: {
      required
    },
    password: {
      required
    }
  },
  computed: {
    ...mapGetters(["invalidUser"])
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
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  border-radius: 50%;
  margin-bottom: 40px;
}

.input-password {
  margin-top: 10px;
}

.input-username.invalid,
.input-password.invalid {
  color: #f57f6c;
  border: 1px solid #f79483;
  box-shadow: inset 0 1px 1px rgba(218, 30, 30, 0.87), 0 0 8px #f57f6c;
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

/* .form-signin .form-control:focus {
  border-color: rgb(104, 145, 162);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgb(104, 145, 162);
} */

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
  margin-top: 5px;
}

.dontHaveAccount:hover,
.dontHaveAccount:active,
.dontHaveAccount:focus {
  color: rgb(0, 0, 0);
  text-decoration: underline;
}
</style>
