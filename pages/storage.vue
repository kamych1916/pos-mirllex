<template>
  <div class="wrapper order">
    <div class="order-container">
      <div class="order-menu">
        <div class="order-menu__form">
          <input type="text" placeholder="поиск товара" />
        </div>
        <div class="order-menu__categories">
          <div class="order-menu__category">
            <i class="bx bx-plus"></i>
          </div>
          <div class="order-menu__category">супы</div>
          <div class="order-menu__category">фастфуды</div>
          <div class="order-menu__category order-menu__category--active">
            пиццы
          </div>
          <div class="order-menu__category">напитки</div>
          <div class="order-menu__category">основные блюда</div>
          <div class="order-menu__category">салаты</div>
          <div class="order-menu__category">десерты</div>
          <div class="order-menu__category">закуски</div>
          <div class="order-menu__category">к пиву</div>
          <div class="order-menu__category">супы</div>
          <div class="order-menu__category">фастфуды</div>
          <div class="order-menu__category">напитки</div>
          <div class="order-menu__category">основные блюда</div>
          <div class="order-menu__category">салаты</div>
          <div class="order-menu__category">десерты</div>
          <div class="order-menu__category">закуски</div>
          <div class="order-menu__category">к пиву</div>
        </div>
        <div class="order-menu__products">
          <div class="order-menu__product">
            <i class="bx bx-plus"></i>
          </div>
          <div class="order-menu__product">Пицца в сковороде</div>
          <div class="order-menu__product">Маргарита</div>
          <div class="order-menu__product">4 сезона</div>
          <div class="order-menu__product">Фермерская</div>
          <div class="order-menu__product">Римская пицца</div>
          <div class="order-menu__product">Папайя</div>
          <div class="order-menu__product">Вальтеллина</div>
          <div class="order-menu__product">Деревенская</div>
          <div class="order-menu__product">Немецкая</div>
          <div class="order-menu__product">Трехцветная</div>
          <div class="order-menu__product">Бисмарк</div>
          <div class="order-menu__product">Грибная</div>
          <div class="order-menu__product">Мимоза</div>
          <div class="order-menu__product">С пармезаном</div>
          <div class="order-menu__product">Крестьянская</div>
          <div class="order-menu__product">Средиземноморская</div>
          <div class="order-menu__product">Пицца в сковороде</div>
          <div class="order-menu__product">Маргарита</div>
          <div class="order-menu__product">4 сезона</div>
          <div class="order-menu__product">Фермерская</div>
          <div class="order-menu__product">Римская пицца</div>
          <div class="order-menu__product">Папайя</div>
          <div class="order-menu__product">Вальтеллина</div>
          <div class="order-menu__product">Деревенская</div>
          <div class="order-menu__product">Немецкая</div>
          <div class="order-menu__product">Трехцветная</div>
          <div class="order-menu__product">Бисмарк</div>
          <div class="order-menu__product">Грибная</div>
          <div class="order-menu__product">Мимоза</div>
          <div class="order-menu__product">С пармезаном</div>
          <div class="order-menu__product">Крестьянская</div>
          <div class="order-menu__product">Средиземноморская</div>
        </div>
      </div>
    </div>
    <Footer style="margin-top: auto">Kamol</Footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.order {
  &-container {
    display: flex;
    height: 90%;
  }
  &-menu {
    width: 100%;
    margin-right: 20px;
    min-height: 100%;
    height: 100%;
    max-height: 100%;
    display: flex;
    flex-flow: nowrap column;
    align-items: stretch;
    position: relative;
  }
  &-menu__form {
    display: flex;
    input {
      flex: 1;
      background: #e6e6e6;
      padding: 14px;
      border-radius: 10px;
    }
  }
  &-menu__categories {
    display: flex;
    overflow: auto;
    white-space: nowrap;
    margin-top: 20px;
  }
  &-menu__category {
    display: inline-block;
    background: #e6e6e6;
    margin-right: 20px;
    margin-bottom: 10px;
    padding: 30px 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
  }
  &-menu__category--active {
    background: #77a648;
    color: #fff;
  }
  &-menu__products {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: max-content;
    column-gap: 20px;
    row-gap: 20px;
    overflow: auto;
    // white-space: nowrap;
    height: 74%;
    max-height: 100%;
    margin-top: auto;
    padding-right: 10px;
  }
  &-menu__product {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 40px 0;
    background: #e6e6e6;
    max-height: 100px;
    border-radius: 10px;
  }
}
</style>
