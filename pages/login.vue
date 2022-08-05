<template>
  <div class="auth">
    <div class="auth-wrapper">
      <div class="auth-header">Авторизация</div>
      <p class="auth-error" v-if="error">Incorrect login or password</p>
      <form @submit.prevent="auth()">
        <input v-model="user.login" required type="text" placeholder="Логин" />

        <div class="auth-password">
          <input
            v-model="user.password"
            required
            :type="showPassword ? 'password' : 'text'"
            placeholder="Пароль"
          />
          <i
            @click="showPassword = !showPassword"
            :class="showPassword ? 'bx-show' : 'bx-low-vision'"
            class="bx auth-password__icon"
          >
          </i>
        </div>

        <button type="submit">Войти</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  layout: "empty",
  data() {
    return {
      error: false,
      showPassword: false,
      user: {
        email: "",
        password: "",
      },
    };
  },
  fetchOnServer: false,
  async fetch() {},
  methods: {
    async auth() {
      try {
        let { data } = await this.$auth.loginWith("local", {
          data: this.user,
        });
        this.$auth.setUserToken(data.access_token, true);
        this.$router.push("/");
      } catch (err) {
        if (err.response) if (err.response.status === 409) this.erorr = true;
      }
    },
  },
};
</script>

<style lang="scss">
.auth {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: #fafafa;
  position: fixed;
  top: 0;
  left: 0;

  &-wrapper {
    width: 100%;
    min-width: 300px;
    max-width: 500px;
    border-radius: 15px;
    transition: all 0.25s ease;
    background: #fff;
    padding: 26px 0;
    box-shadow: 0px 2px 32px rgba(0, 0, 0, 0.05);
    @include less-than(tablet) {
      max-width: 350px;
    }
  }

  &-header {
    padding: 5px 26px;
    font-size: 26px;
    font-weight: 600;
    text-align: center;
  }

  &-error {
    padding: 5px 26px;
    font-size: 16px;
    color: #e64646;
  }

  &-password {
    display: flex;
    align-items: center;
    position: relative;
  }

  &-password__icon {
    position: absolute;
    right: 0;
    padding: 14px 16px 14px 12px;
    cursor: pointer;
    color: #a8a8a8;
  }

  input {
    margin: 10px 0;
    width: 100%;
    border: 2px solid transparent;
    background: #f9f9f9;
    color: rgb(44, 62, 80);
    border-radius: 12px;
    -webkit-transition: all 0.25s ease;
    transition: all 0.25s ease;
    padding: 14px 40px 14px 12px;
    outline: none;
  }

  form {
    padding: 10px 26px;
  }

  button {
    margin-top: 10px;
    border-radius: 15px;
    width: 100%;
    padding: 16px;
    color: #fff;
    transition: all ease 0.3s;
    cursor: pointer;
    background: #cecece;
    &:hover {
      background: #77a648;
      -webkit-box-shadow: 0 10px 20px -10px rgb(189, 195, 197);
      box-shadow: 0 10px 20px -10px rgb(178, 181, 182);
      -webkit-transform: translateY(-3px);
      transform: translateY(-3px);
    }
  }
}
</style>
