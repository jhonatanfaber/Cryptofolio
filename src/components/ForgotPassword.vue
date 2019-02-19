<template>
  <div class="forgot-password-container">
    <h2>Forgot Password</h2>
    <form class="form-horizontal" role="form">
      <div class="form-group">
        <input
          type="text"
          v-model="email"
          class="form-control col-md-2"
          placeholder="Enter your email address..."
        >
        <template class="alert-message">
          <template v-if="showErrorMessage">
            <span class="alert-error">
              <i class="fas fa-times-circle"></i>
              Invalid email address
            </span>
          </template>
          <template v-if="showSuccessMessage">
            <span class="alert-success">
              <i class="fas fa-check-circle"></i>
              Email sent successfuly
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
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      email: "",
      showErrorMessage: false,
      showSuccessMessage: false
    };
  },
  methods: {
    async resetPassword() {
      await this.$store.dispatch("forgotPassword", this.email);
      this.showAlert();
    },
    showAlert() {
      if (this.forgotpassword_status == "success") {
        this.showSuccessMessage = true;
      }

      if (this.forgotpassword_status == "error") {
        this.showErrorMessage = true;
      }

      setInterval(() => {
        this.showErrorMessage = false;
        this.showSuccessMessage = false;
      }, 3000);
    }
  },
  computed: {
    ...mapGetters(["forgotpassword_status"])
  }
};
</script>


<style scoped>
.alert-message {
  display: flex;
  justify-content: flex-end;
  margin: 0;
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

  .forgot-password-container {
    margin-top: 40%;
  }
}

@media (min-width: 481px) and (max-width: 1150px) {
  .forgot-password-container {
    margin-top: 20%;
  }
}

@media (min-width: 1151px) {
  .forgot-password-container {
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
