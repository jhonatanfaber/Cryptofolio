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
              <div class="col-lg-8">
                <input v-model="name" class="form-control" type="text" value>
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-3 control-label">Password:</label>
              <div class="col-md-8">
                <input v-model="password" class="form-control" type="password">
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-3 control-label">Confirm password:</label>
              <div class="col-md-8">
                <input class="form-control" type="password">
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-3 control-label"></label>
              <div class="col-md-8">
                <input type="button" @click="editUser" class="btn btn-dark" value="Save Changes">
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
import { mapActions } from "vuex";

export default {
  data() {
    return {
      name: "",
      password: "",
      showSavedAlert: false
    };
  },
  methods: {
    editUser() {
      let user = {
        id: this.$store.getters.user.id,
        name: this.name,
        password: this.password
      };
      //TODO: show alert after upload
      this.$store.dispatch("editUser", user);
      this.showAlert();
    },
    showAlert() {
      this.showSavedAlert = true;
      this.name = ""
      this.password = ""
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
</style>
