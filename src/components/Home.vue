<template>
  <div class="home-container">
    <template v-if="!isAdmin && isEmpty">
      <!-- LfU6_b3Oj4E -->
      <!-- SxNGG1MJ_IQ -->
      <!-- qNEv1SVkOnk -->
      <img src="https://source.unsplash.com/qNEv1SVkOnk/" class="responsive">
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
    <div class="information" v-if="!isAdmin && isEmpty">
      <h2 id="images-title">Bitcoin &amp; Altcoin tracker.</h2>
      <div class="information-wrapper col-md-6" style="margin:auto;">
        <h4>Our goal is to make your cryptocurrencies tracking easier.</h4>
        <img class="pc-responsive" src="../assets/portfolio.png" alt>
      </div>
      <div class="information-wrapper col-md-6" style="margin:auto;">
        <img class="market-responsive" src="../assets/market.png" alt>
        <h4>Check the current prices of your coins. Mobile friendly design!</h4>
      </div>
    </div>
    <!-- <div class="steps" v-if="!isAdmin && isEmpty">
      <a href="https://gyazo.com/539fe7b79f14a4a46bf8747aecd24437">
        <video alt="Video from Gyazo" width="700" height="800" autoplay muted loop playsinline>
          <source src="https://i.gyazo.com/539fe7b79f14a4a46bf8747aecd24437.mp4" type="video/mp4">
        </video>
      </a>
    </div> -->
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
#images-title {
  margin-bottom: 70px;
}

.information-wrapper {
  display: flex;
  align-items: center;
}

.information {
  width: 100%;
  height: 500px;
  margin-top: 100px;
}

.home-container {
  height: 95vh;
  width: 100vw;
}

.steps {
  height: 600px;
}

img.responsive {
  width: 100%;
  height: 100%;
  opacity: 0.8;
  filter: grayscale(100%);
}

.pc-responsive {
  width: 52%;
  height: 64%;
  margin-left: 40px;
}

.market-responsive {
  width: 48%;
  height: 88%;
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

h4 {
  font-weight: 300;
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

  .information-wrapper {
    display: flex;
    flex-direction: column;
  }

  .pc-responsive {
    width: 70%;
    height: 50%;
    margin-left: 0;
    margin-bottom: 80px;
    margin-top: 30px;
  }

  .market-responsive {
    width: 60%;
    height: 84%;
    order: 2;
  }

  h1 {
    font-size: 30px;
    font-weight: 600;
  }

  h2 {
    font-size: 18px;
    font-weight: 500;
  }

  h4 {
    font-size: 16px;
  }
}

@media only screen and (min-width: 481px) and (max-width: 1030px) {
  .home-container {
    height: 100vh;
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


