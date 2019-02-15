<template>
  <div class="reset-password-container">
    <h2>Reset Password</h2>
    <form class="form-horizontal" role="form">
      <div class="form-group">
        <input
          type="password"
          v-model="password"
          class="form-control col-md-2"
          placeholder="password"
        >
      </div>
      <div class="form-group">
        <input
          type="password"
          v-model="repeatedPassword"
          class="form-control col-md-2"
          placeholder="Repeat password"
        >
      </div>
      <div class="form-group">
        <button
          class="btn btn-lg btn-dark btn-signin col-md-2"
          @click.prevent="resetPassword"
        >Reset Password</button>
      </div>
      {{urlToken}}
      {{urlID}}
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      repeatedPassword: "",
      urlToken: this.$route.query.token,
      urlID: this.$route.query.id
    };
  },
  methods: {
    resetPassword() {
      let user = {
        id: this.$route.query.id,
        password : this.password,
        token : this.$route.query.token
      }
      this.$store.dispatch("resetPassword", user);
    }
  }
};
</script>


<style scoped>
hr {
  width: 85%;
}

.form-horizontal {
  margin-top: 50px;
}

/* Smartphones */
@media (max-width: 480px) {
  .form-horizontal {
    margin: 50px;
  }

  .reset-password-container {
    margin-top: 40%;
  }
}

@media (min-width: 481px) and (max-width: 1150px) {
  .reset-password-container {
    margin-top: 20%;
  }
}

@media (min-width: 1151px) {
  .reset-password-container {
    margin-top: 10%;
  }
}

.form-group {
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
