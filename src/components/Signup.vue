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
            id="exampleInputName"
            class="form-control"
            placeholder="Name"
            required
            autofocus
          >
          <input
            type="text"
            v-model="username"
            id="exampleInputUsername"
            class="form-control"
            placeholder="Username"
            required
            autofocus
          >
          <input
            type="password"
            v-model="password"
            id="exampleInputPassword"
            class="form-control"
            placeholder="Password"
            required
          >
          <input
            type="password"
            v-model="repeatPassword"
            id="exampleInputRepeatedPassword"
            class="form-control"
            placeholder="Repeat password"
            required
          >
          <button
            @click.prevent="signup"
            class="btn btn-lg btn-primary btn-block btn-signin"
          >Sign up</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      name: "",
      username: "",
      password: "",
      repeatPassword: ""
    };
  },
  methods: {
    signup() {
      const user = {
        name: this.name,
        username: this.username,
        password: this.password
      };
      this.$store.dispatch("createUser", user);
      this.$router.push({ path: "/login" })
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
.form-signin #exampleInputRepeatedPassword,
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
  margin-bottom: 10px;
}

.form-signin .form-control:focus {
  border-color: rgb(104, 145, 162);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgb(104, 145, 162);
}

.btn.btn-signin {
  background-color: #343a40;
  font-weight: 700;
  font-size: 14px;
  height: 36px;
  border-radius: 4px;
  border: none;
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
</style>
