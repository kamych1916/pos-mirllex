<template>
  <div class="wrapper order">
    <div class="order-container">
      <div class="order-menu">
        <div class="order-menu__form">
          <input
            type="text"
            placeholder="поиск товара"
            style="margin-right: 20px"
          />
          <input type="text" placeholder="выбор стола" />
        </div>
        <div class="order-menu__categories">
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
      <div class="order-buscket">
        <div class="order-buscket__bag">
          <div class="order-buscket__article">
            <div
              style="
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
              "
            >
              <span>159 р.</span>
              <i class="bx bx-trash"></i>
            </div>
            <span> Вегетарианский сэндвич </span>
            <div class="order-buscket__article-count">
              <i class="bx bx-plus"></i>
              <span>1</span>
              <i class="bx bx-minus"></i>
            </div>
          </div>
          <div class="order-buscket__article">
            <div
              style="
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
              "
            >
              <span>60 р.</span>
              <i class="bx bx-trash"></i>
            </div>
            <span> Самса </span>
            <div class="order-buscket__article-count">
              <i class="bx bx-plus"></i>
              <span>2</span>
              <i class="bx bx-minus"></i>
            </div>
          </div>
          <div class="order-buscket__article">
            <div
              style="
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
              "
            >
              <span>45 р.</span>
              <i class="bx bx-trash"></i>
            </div>
            <span> Кола 0.5</span>
            <div class="order-buscket__article-count">
              <i class="bx bx-plus"></i>
              <span>1</span>
              <i class="bx bx-minus"></i>
            </div>
          </div>
          <div class="order-buscket__article">
            <div
              style="
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
              "
            >
              <span>90 р.</span>
              <i class="bx bx-trash"></i>
            </div>
            <span> Ментос </span>
            <div class="order-buscket__article-count">
              <i class="bx bx-plus"></i>
              <span>1</span>
              <i class="bx bx-minus"></i>
            </div>
          </div>
        </div>
        <div class="order-buscket__checkout">
          <input type="text" placeholder="Сотрудник" />
          <input type="text" placeholder="Бонусы" />

          <p>Итого: 324 р.</p>
          <button type="button">ОФОРМИТЬ</button>
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
    width: 80%;
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
    height: 75%;
    max-height: 100%;
    margin-top: auto;
    padding-right: 10px;
  }
  &-menu__product {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 40px 35px;
    background: #e6e6e6;
    max-height: 100px;
    border-radius: 10px;
  }

  &-buscket {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  &-buscket__bag {
    width: 100%;
    height: 65%;
    margin-bottom: 20px;
    background: #e6e6e6;
    border-radius: 10px;
    padding: 10px;
    overflow: auto;
  }
  &-buscket__article {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    background: #f2f2f2;
  }
  &-buscket__article-count {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    i {
      display: flex;
      align-items: center;
      padding: 5px 10px;
      background: #e6e6e6;
      &:nth-child(1) {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }
      &:nth-last-child(1) {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }
    span {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #d7d7d7;
      text-align: center;
    }
  }

  &-buscket__checkout {
    height: 35%;
    background: #e6e6e6;
    border-radius: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    input {
      background: #f2f2f2;
      padding: 14px;
      border-radius: 10px;
      width: 100%;
    }
    p {
      margin-top: 20px;
      font-weight: 600;
    }
    button {
      background: #77a648;
      color: #fff;
      padding: 10px 0;
      border-radius: 10px;
    }
  }
}
</style>
