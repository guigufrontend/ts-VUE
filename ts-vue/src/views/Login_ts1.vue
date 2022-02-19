<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    ts1
    <button @click="login">login</button>
    <button @click="logout">logout</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class Login extends Vue {
  // 声明组件参数
  @Prop() private aProp: string | undefined;
  // 组件数据
  account = "1234";
  login(): void {
    localStorage.setItem("token", "1");
    if (this.$route.query?.redirect) {
      this.$router.push({ path: this.$route.query?.redirect as string });
    }
  }
  logout(): void {
    localStorage.setItem("token", "");
    this.account = "";
  }
  // watch
  @Watch("account")
  onAccount(val: string, oldValue: string):void {
    console.log("val", val, "oldValue", oldValue);
  }
  // 生命周期
  created():void {
    console.log("created");
  }
  mounted():void {
    this.account;
    console.log("mounted");
  }
}
</script>
