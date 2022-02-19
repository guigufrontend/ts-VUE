
import { Vue, Component } from "vue-property-decorator";
@Component
export default class Login extends Vue {
  account = "";
  login(): void {
    localStorage.setItem("token", "1");
    if (this.$route.query?.redirect) {
      this.$router.push({ path: this.$route.query?.redirect as string });
    }
  }
  logout(): void {
    localStorage.setItem("token", "");
  }
  render(){
      return <div class="home">
      <img alt="Vue logo" src="../assets/logo.png" />
      tsx
      <button onClick={this.login} >login</button>
      <button onClick={this.logout}>logout</button>
    </div>
  }
}
