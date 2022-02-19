<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <button @click="login">login</button>
    <button @click="logout">logout</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// import {} from "vue-property-decoration"
export default Vue.extend({
  name: "Login",
  data: () => {
    return {
      account: "",
    };
  },
  methods: {
    login() {
      localStorage.setItem("token", "1");
      if (this.$route.query?.redirect) {
        this.$router.push({ path: this.$route.query?.redirect as string });
      }
    },
    logout() {
      localStorage.setItem("token", "");
    },
  },
});
</script>
