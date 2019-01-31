<template>
  <div class="home-container">
    <template v-if="!isAdmin && isEmpty">
      <img src="https://source.unsplash.com/6dW3xyQvcYE/1300x1000" class="responsive">
      <div class="hero-text">
        <h1>Start Now!</h1>
        <h2>Manage and track your cryptocurrency portfolio</h2>
        <span @click="redirectsToSignupPage" class="btn btn-dark btn-lg signup">SIGN UP</span>
      </div>
    </template>
    <div class="content-wrapper">
      <div v-if="!isAdmin && !isEmpty" class="home-container-wrapper">
        <div class="home-container__information">
          <h2>User Panel</h2>
          <p>Trade or view your portfolio</p>
        </div>
      </div>
      <div v-if="isAdmin && !isEmpty" class="home-container-wrapper">
        <div class="home-container__information">
          <h2>Admin Panel</h2>
          <p>You may manage users configuration</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  computed: {
    ...mapGetters(["isAdmin", "user"]),
    isEmpty() {
      if (_.isEmpty(this.user)) {
        return true;
      }
      return false;
    }
  },
  methods: {
    redirectsToSignupPage() {
      this.$router.push("/signup");
    }
  }
};
</script>




<style scoped>
img {
  width: 100%;
  height: auto;
  opacity: 0.6;
}

.content-wrapper {
  display: flex;
  justify-content: center;
}

.hero-text {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgb(0, 0, 0);
}

h1 {
  font-size: 50px;
  font-weight: 600;
}

h2 {
  font-size: 30px;
  font-weight: 500;
}

@media only screen and (min-width: 320px) and (max-width: 480px) {
  .hero-text {
    text-align: center;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgb(0, 0, 0);
  }

  h1 {
    font-size: 30px;
    font-weight: 600;
  }

  h2 {
    font-size: 18px;
    font-weight: 500;
  }
}

.home-container-wrapper {
  border: 1px solid rgb(170, 166, 166);
  margin-top: 30px;
  width: 85%;
  border-radius: 10px;
}

.home-container__information {
  margin: 30px;
}

.btn-dark {
  padding: 10px;
  font-weight: 700;
  margin-top: 20px;
  background-color: #131212;
}

.btn-dark:hover {
  background-color: #272727;
}
</style>


