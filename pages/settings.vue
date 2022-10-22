<template>
  <div class="wrapper">
    <div class="add">
      <div class="add-container">
        <nuxt-link to="/add">
          <div class="add-container__title">Добавить элементы системы</div>
        </nuxt-link>

        <div @click="logOut()" class="add-container__title">
          Выйти из аккаунта
        </div>
      </div>
    </div>
    <Footer style="margin-top: auto"></Footer>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  methods: {
    async logOut() {
      await this.$auth.logout();
    },
  },
};
</script>

<style lang="scss">
.add {
  padding: 20px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &-container {
    width: 360px;

    min-height: 100%;
    max-height: 100%;
    padding-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @include less-than(tablet) {
      margin-right: 0px;
      width: 100%;
    }
    a {
      display: block;
      margin-bottom: 20px;
      width: 100%;
    }
  }
  &-container__title {
    cursor: pointer;
    width: 100%;
    border-radius: 12px;
    background: #5fbd00;
    color: #fff;
    padding: 14px;
    text-align: center;
    position: sticky;
  }
}
</style>
