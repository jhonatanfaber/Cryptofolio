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
      <template class="alert-message">
        <template v-if="showErrorMessage">
          <span class="alert-error">
            <i class="fas fa-times-circle"></i>
            Password could not be reset
          </span>
        </template>
        <template v-if="showSuccessMessage">
          <span class="alert-success">
            <i class="fas fa-check-circle"></i>
            Reset password successfuly
          </span>
        </template>
      </template>
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
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      password: "",
      repeatedPassword: "",
      urlToken: this.$route.query.token,
      urlID: this.$route.query.id,
      showErrorMessage: false,
      showSuccessMessage: false
    };
  },
  methods: {
    async resetPassword() {
      let user = {
        id: this.$route.query.id,
        password: this.password,
        token: this.$route.query.token
      };
      await this.$store.dispatch("resetPassword", user);
      this.showAlert();
    },
    showAlert() {
      if (this.resetpassword_status == "success") {
        this.showSuccessMessage = true;
      }

      if (this.resetpassword_status == "error") {
        this.showErrorMessage = true;
      }

      setInterval(() => {
        this.showErrorMessage = false;
        this.showSuccessMessage = false;
      }, 3000);
    }
  },
  computed: {
    ...mapGetters(["resetpassword_status"])
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

.alert-success,
.alert-error {
  margin-top: 5px;
}

.alert-success {
  color: green;
  background-color: rgb(255, 255, 255);
}

.alert-error {
  color: red;
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
