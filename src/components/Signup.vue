<template>
  <div class="signup-container">
    <div class="container">
      <h2>Create new Account</h2>
      <hr>
      <div class="row">
        <div class="col-md-9 personal-info">
          <form class="form-horizontal" role="form">
            <div class="form-group">
              <label class="col-lg-3 control-label">Name:</label>
              <div class="col-md-8">
                <input
                  type="text"
                  v-model="name"
                  @input="$v.name.$touch()"
                  id="exampleInputName"
                  class="form-control"
                  placeholder="Name"
                  :class="{invalidName : $v.name.$error}"
                >
              </div>
              <div class="error" v-if="$v.name.$error">Field is required</div>
            </div>
            <div class="form-group">
              <label class="col-md-3 control-label">Username:</label>
              <div class="col-md-8">
                <input
                  type="text"
                  v-model="username"
                  @input="$v.username.$touch()"
                  id="exampleInputUsername"
                  class="form-control"
                  placeholder="Username"
                  :class="{invalidUsername : $v.username.$error, 'signup-error': (signup_status == 'error')}"
                >
              </div>
              <div class="error" v-if="$v.username.$error">Field is required</div>
            </div>
            <div class="form-group">
              <label class="col-md-3 control-label">Email:</label>
              <div class="col-md-8">
                <input
                  type="text"
                  v-model="email"
                  @input="$v.email.$touch()"
                  id="exampleInputEmail"
                  class="form-control"
                  placeholder="Email"
                  :class="{invalidEmail : $v.email.$error, 'signup-error': (signup_status == 'error')}"
                >
              </div>
              <div
                class="error"
                v-if="$v.email.$error"
              >Field is required and must be a valid email address</div>
            </div>
            <div class="form-group">
              <label class="col-md-3 control-label">Password:</label>
              <div class="col-md-8">
                <input
                  type="password"
                  v-model="password"
                  @input="$v.password.$touch()"
                  id="exampleInputPassword"
                  class="form-control"
                  placeholder="Password"
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
                  id="exampleInputRepeatedPassword"
                  class="form-control"
                  placeholder="Repeat password"
                  :class="{invalidRepeatedPassword : $v.repeatedPassword.$error}"
                >
              </div>
              <div
                class="error"
                v-if="$v.repeatedPassword.$error"
              >Field is required and must be identical</div>
              <div
                class="already-exists"
                v-if="signup_status == 'error'"
              >Username or email already exist</div>
            </div>
            <div class="form-group buttons">
              <div class="col-md-8">
                <button
                  @click.prevent="signup"
                  :disabled="!$v.name.required || !$v.password.required || !$v.username.required ||  !$v.repeatedPassword.sameAsPassword || $v.email.$invalid"
                  class="btn btn-lg btn-dark btn-signin col-sm-4"
                >Sign up</button>
              </div>
            </div>
          </form>
        </div>
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
  margin-top: 50px;
}

@media only screen and (min-width: 320px) and (max-width: 480px) {
  .container {
    margin-top: 20px;
  }

  h2{
    font-size: 1.15rem;
  }

  hr{
    display: none;
  }
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
  margin-left: 20px;
  display: flex;
}

.already-exists {
  color: #f57f6c;
  font-size: 0.75rem;
  line-height: 2;
  margin-left: 20px;
  display: flex;
  justify-content: center;
}

button:disabled {
  cursor: not-allowed;
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
