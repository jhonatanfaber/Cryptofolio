<template>
  <div class="editprofile-container">
    <div class="container">
      <h1>Edit Profile</h1>
      <hr>
      <div v-if="showSavedAlert" class="alert alert-success alert-dismissable">
        <i class="fas fa-info-circle"></i>
        Changes saved successfully
      </div>
      <div class="row">
        <!-- left column -->
        <!-- <div class="col-md-3">
          <div class="text-center">
            <img src="//placehold.it/100" class="avatar img-circle" alt="avatar">
            <h6>Picture</h6>

            <input type="file" class="form-control">
          </div>
        </div>-->
        <!-- edit form column -->
        <div class="col-md-9 personal-info">
          <form class="form-horizontal" role="form">
            <div class="form-group">
              <label class="col-lg-3 control-label">Name:</label>
              <div class="col-md-8">
                <input
                  type="text"
                  v-model="name"
                  @input="$v.name.$touch()"
                  class="form-control"
                  :class="{invalidName : $v.name.$error}"
                >
              </div>
              <div class="error" v-if="$v.name.$error">Field is required</div>
            </div>
            <div class="form-group">
              <label class="col-md-3 control-label">Password:</label>
              <div class="col-md-8">
                <input
                  type="password"
                  v-model="password"
                  @input="$v.password.$touch()"
                  class="form-control"
                  :class="{invalidPassword : $v.password.$error}"
                >
              </div>
              <div class="error" v-if="$v.password.$error">Field is required</div>
            </div>
            <div class="form-group">
              <label class="col-md-3 control-label">Confirm password:</label>
              <div class="col-md-8">
                <input
                  type="password"
                  v-model="repeatedPassword"
                  @input="$v.repeatedPassword.$touch()"
                  class="form-control"
                  :class="{invalidRepeatedPassword : $v.repeatedPassword.$error || $v.repeatedPassword.$sameAsPassword}"
                >
              </div>
              <div
                class="error"
                v-if="$v.repeatedPassword.$error"
              >Field is required and must be identical</div>
            </div>
            <div class="form-group buttons">
              <div class="col-md-8">
                <button
                  type="button"
                  @click="editUser"
                  :disabled="!$v.name.required || !$v.password.required || !$v.repeatedPassword.required || !$v.repeatedPassword.sameAsPassword "
                  class="btn btn-dark"
                >Save Changes</button>
                <span></span>
                <input type="reset" class="btn btn-default" value="Cancel">
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, sameAs } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      name: "",
      password: "",
      repeatedPassword: "",
      showSavedAlert: false
    };
  },
  validations: {
    name: {
      required
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
    editUser() {
      let user = {
        id: this.$store.getters.user.id,
        name: this.name,
        password: this.password
      };
      this.$store.dispatch("editUser", user);
      this.showAlert();
    },
    showAlert() {
      this.showSavedAlert = true;
      this.name = "";
      this.password = "";
      this.repeatedPassword = "";
      this.$v.$reset();
      setInterval(() => {
        this.showSavedAlert = false;
      }, 2000);
    }
  }
};
</script>


<style scoped>
.container {
  margin-top: 120px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.form-group.buttons {
  margin-top: 20px;
}

.col-lg-3,
.col-md-3 {
  display: flex;
}

.row {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 20px;
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

.invalidName:focus,
.invalidPassword:focus,
.invalidRepeatedPassword:focus,
.invalidName,
.invalidPassword,
.invalidRepeatedPassword {
  border: 1px solid #f79483;
  box-shadow: inset 0px 0px 0px rgba(218, 30, 30, 0.87), 0 0 8px #f57f6c;
}

.error {
  color: #f57f6c;
  font-size: 0.75rem;
  line-height: 2;
  margin-left: 20px;
}

button:disabled {
  cursor: not-allowed;
}

.btn-dark {
  background-color: #131212;
}

.btn-dark:hover {
  background-color: #272727;
}
</style>
