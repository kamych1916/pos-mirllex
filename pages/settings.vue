<template>
  <div class="wrapper">
    <div class="settings" v-if="isLoadData">
      <settings-tables :data="tables"></settings-tables>
      <settings-employees :data="employees"></settings-employees>
      <settings-bonuses :data="bonuses"></settings-bonuses>
    </div>
    <Footer style="margin-top: auto"></Footer>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      bonuses: [],
      employees: [],
      tables: [],
      isLoadData: false,
    };
  },
  fetchOnSever: false,
  fetch() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .$get("settings")
        .then((res) => {
          this.bonuses = res.bonuses;
          this.employees = res.employees;
          this.tables = res.tables;
          this.isLoadData = true;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
.settings {
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  margin-top: 20px;
  height: 100%;
  padding-bottom: 20px;
  margin-bottom: 20px;

  &-container {
    width: 360px;
    min-height: 100%;
    max-height: 100%;
    display: inline-block;
    overflow: auto;
    white-space: nowrap;
    padding: 0 10px;

    @include less-than(tablet) {
      margin-right: 0px;
      width: 100%;
    }
  }
  &-container__title {
    width: 100%;
    border-radius: 12px;
    background: #e6e6e6;
    padding: 14px;
    text-align: center;
    position: sticky;
  }
  &-container__wrapper {
    margin-top: 16px;
    width: 100%;
    padding: 16px;
    background: #e6e6e6;
    border-radius: 12px;
  }
  &-container__add {
    background: #f2f2f2;
    border-radius: 12px;
    text-align: center;
    padding: 15px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-container__item {
    background: #f2f2f2;
    border-radius: 12px;
    text-align: center;
    padding: 25px 10px;
    margin-top: 20px;
  }

  &-modal {
    span {
      font-size: 14px;
      opacity: 0.5;
    }
  }
}
</style>
