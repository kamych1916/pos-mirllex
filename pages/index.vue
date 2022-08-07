<template>
  <div class="wrapper order">
    <div class="order-container">
      <div class="order-menu">
        <div class="order-menu__form">
          <input
            @input="searchEvent()"
            type="text"
            placeholder="поиск товара"
            v-model="search"
            style="margin-right: 20px"
          />
          <select v-model="table">
            <option disabled value="">Выбор стола</option>
            <option
              v-for="item in tables"
              :key="item.lavel"
              :value="item.value"
            >
              {{ item.label }}
            </option>
          </select>
        </div>
        <div class="order-menu__categories">
          <div
            v-for="item in store"
            :key="item._id"
            :class="[
              'order-menu__category',
              item._id === category_id ? 'order-menu__category--active' : null,
            ]"
            @click="
              category_id = item._id;
              products = item.products;
              search = null;
            "
          >
            {{ item.name }}
          </div>
        </div>
        <div class="order-menu__products">
          <div
            v-for="product in products"
            :key="product.id"
            @click="addToBuscket(product)"
            class="order-menu__product"
          >
            <div>
              {{ product.name }}
            </div>
            <div style="display: flex; justify-content: space-between">
              <span>
                <p v-if="product.is_quantity">кол.: {{ product.quantity }}</p>
              </span>
              <span>{{ product.price }} р.</span>
            </div>
          </div>
        </div>
      </div>
      <div class="order-buscket">
        <div class="order-buscket__bag">
          <div
            v-for="item in buscket"
            :key="item.id"
            class="order-buscket__article"
          >
            <div
              style="
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
              "
            >
              <span>{{ item.price }} р.</span>
              <i @click="productDelete(item.id)" class="bx bx-trash"></i>
            </div>
            <span>{{ item.name }}</span>
            <div class="order-buscket__article-count">
              <i @click="productCountMinus(item)" class="bx bx-minus"></i>
              <span>{{ item.count }}</span>
              <i @click="productCountPlus(item)" class="bx bx-plus"></i>
            </div>
          </div>
        </div>
        <div class="order-buscket__checkout">
          <select v-model="employee">
            <option disabled value="">Сотрудник</option>
            <option
              v-for="item in employees"
              :key="item.lavel"
              :value="item.value"
            >
              {{ item.label }}
            </option>
          </select>
          <select @change="eventBonus()" v-model="bonus">
            <option disabled value="">Бонусы</option>
            <option
              v-for="item in bonuses"
              :key="item.lavel"
              :value="item.value"
            >
              {{ item.label }}
            </option>
          </select>

          <p>Итого: {{ total_bonus }} р.</p>
          <button @click="sendBuscket()">ОФОРМИТЬ</button>
        </div>
      </div>
    </div>
    <Footer style="margin-top: auto">Kamol</Footer>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      category_id: null,

      categories: [],
      products: [],
      products_store: [],

      search: null,

      tables: [],
      table: "",
      employees: [],
      employee: "",
      bonuses: [],
      bonus: "",

      total_sum: 0,
      total_bonus: 0,

      buscket: [],

      store: [],
    };
  },
  fetchOnSever: false,
  fetch() {
    this.getData();
  },

  methods: {
    getData() {
      this.$axios
        .$get("store")
        .then((res) => {
          res.store.forEach((category) => {
            category.products.forEach((product) => {
              this.products_store.push({
                category_id: category._id,
                ...product,
              });
            });
          });
          this.store = res.store;
          this.tables = res.inputs.tables;
          this.employees = res.inputs.employees;
          this.bonuses = res.inputs.bonuses;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchEvent() {
      this.category_id = null;
      if (this.search.length > 0) {
        this.products = this.products_store.filter((product) => {
          return product.name.toLowerCase().includes(this.search.toLowerCase());
        });
        if (this.products.length > 0) {
          this.category_id = this.products[0].category_id;
        }
      } else {
        this.products = [];
      }
    },
    addToBuscket(product) {
      if (this.buscket.length > 0) {
        let isProductFind = false;
        this.buscket.forEach((item) => {
          if (product.id === item.id) {
            isProductFind = true;
            if (item.is_quantity) {
              if (item.quantity !== item.count) {
                item.count += 1;
                this.total_sum += item.price;
                this.eventBonus();
              }
            } else {
              item.count += 1;
              this.total_sum += item.price;
              this.eventBonus();
            }
          }
        });
        if (!isProductFind) {
          this.buscket.push({ count: 1, ...product });
          this.total_sum += product.price;
          this.eventBonus();
        }
      } else {
        this.buscket.push({ count: 1, ...product });
        this.total_sum = product.price;
        this.total_bonus = this.total_sum;
        this.eventBonus();
      }
    },
    productCountMinus(item) {
      if (item.count === 1) {
        this.buscket = this.buscket.filter((product) => {
          return product.id === item.id ? false : true;
        });
      } else {
        this.buscket.forEach((product) => {
          if (product.id === item.id) product.count -= 1;
        });
      }
      this.total_sum -= item.price;
      this.eventBonus();
    },
    productCountPlus(item) {
      this.buscket.forEach((product) => {
        if (product.id === item.id) {
          if (item.is_quantity) {
            if (item.quantity !== product.count) {
              this.total_sum += item.price;
              product.count += 1;
            }
          } else {
            this.total_sum += item.price;
            product.count += 1;
          }
        }
      });
      this.eventBonus();
    },
    productDelete(id) {
      this.buscket = this.buscket.filter((product) => {
        if (product.id === id) {
          this.total_sum -= product.price * product.count;
          return false;
        } else {
          return true;
        }
      });
      this.eventBonus();
    },
    eventBonus() {
      let isBonusFind = false;
      this.bonuses.forEach((item) => {
        if (this.bonus === item.value) {
          isBonusFind = true;
          if (item.type === "number") {
            this.total_bonus = this.total_sum - item.data;
          } else {
            this.total_bonus = this.total_sum * ((100 - item.data) / 100);
          }
        }
        if (!isBonusFind) {
          this.total_bonus = this.total_sum;
        }
      });
    },
    sendBuscket() {
      if (this.buscket.length > 0) {
        this.$axios
          .$post("order", {
            busket: this.buscket,
            table: this.table,
            bonus: this.bonus,
            employee: this.employee,
            total: this.total_bonus,
          })
          .then((res) => {
            this.buscket = [];
            this.table = "";
            this.bonus = "";
            this.employee = "";
            this.total_bonus = 0;
            this.total_sum = 0;
            this.getData();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("Корзина пуста");
      }
    },
  },
};
</script>

<style lang="scss">
.order {
  &-container {
    display: flex;
    height: 90%;
  }
  &-menu {
    flex: 4;
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
    input,
    select {
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
    transition: all ease 0.2s;
    &:active {
      transform: scale(0.9);
    }
  }
  &-menu__category--active {
    background: #77a648;
    color: #fff;
  }
  &-menu__products {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
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
    flex-direction: column;
    justify-content: space-between;
    // align-items: center;
    // text-align: center;
    padding: 14px;
    height: 100%;
    min-height: 140px;
    background: #e6e6e6;
    max-height: 100px;
    border-radius: 10px;
    transition: transform ease 0.2s;
    &:active {
      transform: scale(0.9);
    }
  }

  &-buscket {
    flex: 1;
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
      transition: transform ease 0.2s;
      &:active {
        transform: scale(0.7);
      }
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
    select {
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
