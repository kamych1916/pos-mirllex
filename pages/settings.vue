<template>
  <div class="wrapper">
    <div class="settings">
      <div class="settings-tables settings-container">
        <div class="settings-container__title">Столы</div>
        <div class="settings-container__wrapper">
          <div class="settings-container__add">Добавить</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
          <div class="settings-container__item">1</div>
        </div>
      </div>
      <div class="settings-employees settings-container">
        <div class="settings-container__title">Сотрудники</div>
        <div class="settings-container__wrapper">
          <div class="settings-container__add">Добавить</div>
          <div class="settings-container__item">2</div>
        </div>
      </div>
      <div class="settings-bonus settings-container">
        <div class="settings-container__title">Бонусы</div>
        <div class="settings-container__wrapper">
          <div class="settings-container__add">Добавить</div>
          <div class="settings-container__item">3</div>
        </div>
      </div>
    </div>
    <Footer style="margin-top: auto"></Footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.settings {
  overflow: auto;
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
    margin-right: 10px;
    overflow: auto;
    white-space: nowrap;

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
    padding: 10px;
  }
  &-container__item {
    background: #f2f2f2;
    border-radius: 12px;
    text-align: center;
    padding: 10px;
    margin-top: 20px;
  }
}
</style>
