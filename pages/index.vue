<template>
  <div class="wrapper order">
    <div class="order-container">
      <div class="order-menu">
        <div class="order-menu__form">
          <div class="order-menu__form-search">
            <img src="/icons/search.svg" />
            <input
              @input="searchEvent()"
              type="text"
              placeholder="Поиск товара"
              v-model="search"
            />
          </div>
          <div class="order-menu__form-datetime">
            <input
              id="datetime"
              autofocus
              type="datetime-local"
              v-model="datetime"
            />
            <button>
              <img src="/icons/calendar.svg" />
              <p style="padding-top: 2px">
                {{
                  datetime ? datetime.replace("T", ", ") : "Выбор даты заказа"
                }}
              </p>
            </button>
          </div>
          <select v-model="table" class="order-menu__form-table">
            <option disabled value="">Выбор стола</option>
            <option
              v-for="item in tables"
              :key="item.lavel"
              :value="item.value"
            >
              {{ item.label }}
            </option>
          </select>
          <button
            type="button"
            @click="modal_desc = true"
            style="margin-right: 20px"
          >
            Комментарий к заказу
          </button>
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
            @click="addToBusket(product)"
            class="order-menu__product"
          >
            <div style="height: 84px; overflow: hidden">
              {{ product.name }}
            </div>
            <div style="display: flex; justify-content: space-between">
              <span>
                <p class="order-menu__product-count" v-if="product.is_quantity">
                  {{ product.quantity }}
                </p>
              </span>
              <span> {{ product.price }} р. </span>
            </div>
          </div>
        </div>
      </div>
      <div class="order-busket" id="print">
        <div class="order-busket__bag">
          <div
            v-for="item in busket"
            :key="item.id"
            class="order-busket__article"
          >
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <span style="width: 85%">{{ item.name }}</span>
              <i @click="productDelete(item.id)" class="bx bx-trash"></i>
            </div>
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 40px;
              "
            >
              <div class="order-busket__article-count">
                <i @click="productCountMinus(item)" class="bx bx-minus"></i>
                <span>{{ item.count }}</span>
                <i @click="productCountPlus(item)" class="bx bx-plus"></i>
              </div>
              <span> {{ item.price }} р. </span>
            </div>
          </div>
          <div class="order-busket__bag-backdrop"></div>
        </div>
        <div class="order-busket__checkout">
          <select v-model="client_quantity">
            <option disabled value="">Количество гостей</option>
            <option v-for="item in 10" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
          <!-- <div class="order-busket__checkout-count-wrapper">
            <p>Количество гостей</p>
            <div class="order-busket__checkout-count">
              <i @click="client_quantity -= 1" class="bx bx-minus"></i>
              <span>{{ client_quantity }}</span>
              <i @click="client_quantity += 1" class="bx bx-plus"></i>
            </div>
          </div> -->
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
              :key="item.label"
              :value="item.value"
            >
              {{ item.label }}
            </option>
            <option value="null">Нет бонусов</option>
          </select>
          <select v-model="type_payment">
            <option disabled value="">Тип оплаты</option>
            <option
              v-for="item in type_payment_list"
              :key="item.lavel"
              :value="item.value"
            >
              {{ item.label }}
            </option>
          </select>

          <div style="display: flex; justify-content: space-between">
            <button
              type="button"
              class="order-busket__checkout-btn"
              style="width: 100%; margin-right: 30px"
              @click="sendbusket()"
            >
              <p>оформить</p>
              <!-- <i class="bx bx-check"></i> -->
              <div style="font-family: `Nunito-Bold`">{{ total_bonus }} р.</div>
            </button>
            <button
              style="background: #fff; color: #5fbd00"
              type="button"
              :class="[
                'order-busket__checkout-btn',
                isReceipt ? 'order-busket__checkout-btn--active' : null,
              ]"
              @click="isReceipt = !isReceipt"
            >
              <i class="bx bx-printer"></i>
            </button>
          </div>
        </div>
      </div>
      <Modal title="Комментарий" v-if="modal_desc" @close="modal_desc = false">
        <textarea
          type="textarea"
          rows="4"
          cols="50"
          v-model="description"
        ></textarea>
        <button
          type="button"
          @click="modal_desc = false"
          style="width: 100%; background-color: #5fbd00; color: #fff"
        >
          <p>готово</p>
        </button>
      </Modal>
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
      datetime: null,
      table: "",
      description: "",
      modal_desc: false,
      employees: [],
      employee: "",
      bonuses: [],
      bonus: "",
      client_quantity: "",
      type_payment: "",
      type_payment_list: [
        {
          value: 2,
          label: "Списание",
        },
        {
          value: 1,
          label: "Наличка",
        },
        {
          value: 0,
          label: "Безнал",
        },
      ],

      total_sum: 0,
      total_bonus: 0,

      busket: [],

      store: [],

      orderId: null,
      isReceipt: false,
    };
  },
  fetchOnSever: false,
  fetch() {
    this.getData();
  },

  computed: {
    storeData() {
      Object.assign({}, this.$store.state.busketData.busket);
      return JSON.parse(JSON.stringify(this.$store.state.busketData.busket));
    },
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
          if (this.storeData) {
            this.busket = this.storeData.busket;
            this.table = this.storeData.table.value
              ? this.storeData.table.value
              : "";
            this.employee = this.storeData.employee.value
              ? this.storeData.employee.value
              : "";
            this.bonus = this.storeData.bonus.value
              ? this.storeData.bonus.value
              : "";
            this.type_payment = this.storeData.type_payment
              ? this.storeData.type_payment
              : "";
            this.client_quantity = this.storeData.client_quantity;
            this.datetime = this.storeData.datetime.value;
            this.description = this.storeData.description;
            this.total_bonus = this.storeData.total;
            this.total_sum = this.storeData.subtotal;
            this.orderId = this.storeData.id;
          }
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
    addToBusket(product) {
      if (this.busket.length > 0) {
        let isProductFind = false;
        this.busket.forEach((item) => {
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
          this.busket.push({ count: 1, ...product });
          this.total_sum += product.price;
          this.eventBonus();
        }
      } else {
        this.busket.push({ count: 1, ...product });
        this.total_sum = product.price;
        this.total_bonus = this.total_sum;
        this.eventBonus();
      }
    },
    productCountMinus(item) {
      if (item.count === 1) {
        this.busket = this.busket.filter((product) => {
          return product.id === item.id ? false : true;
        });
      } else {
        this.busket.forEach((product) => {
          if (product.id === item.id) product.count -= 1;
        });
      }
      this.total_sum -= item.price;
      this.eventBonus();
    },
    productCountPlus(item) {
      this.busket.forEach((product) => {
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
      this.busket = this.busket.filter((product) => {
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
    sendbusket() {
      if (this.busket.length > 0) {
        let busketData = {
          busket: this.busket,
          datetime: this.datetime,
          table: this.table,
          bonus: this.bonus,
          employee: this.employee,
          total: this.total_bonus,
          client_quantity: this.client_quantity ? this.client_quantity : 1,
          type_payment: this.type_payment,
          description: this.description,
          id: this.orderId,
        };
        this.$axios
          .$post("order", busketData)
          .then((res) => {
            this.busket = [];
            this.table = "";
            this.bonus = "";
            this.employee = "";
            this.total_bonus = 0;
            this.total_sum = 0;
            this.type_payment = "";
            this.client_quantity = "";
            this.description = "";
            this.datetime = null;
            this.getData();
            if (this.isReceipt) {
              this.$store.commit("busketData/changeBusketData", res);
              this.$router.push("/print");
            }
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
    height: 100%;
    @include less-than(tablet) {
      height: calc(100% - 55px);
      // padding-bottom: calc(135px + env(safe-area-inset-bottom));
      overflow: auto;
      white-space: nowrap;
    }
  }
  &-menu {
    padding: 20px;
    flex: 4;
    width: 100%;
    // margin-right: 20px;
    // min-height: 100%;
    height: 100%;
    max-height: 100%;
    display: flex;
    flex-flow: nowrap column;
    align-items: stretch;
    position: relative;
    // @include less-than(laptop_l) {
    //   flex: 3;
    // }
    @include less-than(laptop) {
      flex: 2;
      width: 72%;
    }
    @include less-than(tablet) {
      flex: 5;
      min-width: 100%;
    }
  }
  &-menu__form {
    white-space: nowrap;
    display: flex;
    overflow: auto;
    overflow-y: hidden;
    padding-bottom: 10px;
    input,
    select,
    button {
      color: #000;
      cursor: pointer;
      text-align: left;
      background: #fff;
      padding: 14px;
      border-radius: 10px;
      @include less-than(tablet) {
        // width: 50%;
        // min-width: 100%;
      }
    }
  }
  &-menu__form-datetime {
    position: relative;
    margin-right: 20px;
    transition: all ease 0.3s;
    &:active {
      transform: scale(0.9);
    }
    button {
      width: 202px;
      height: 100%;
      display: flex;
      align-items: center;
      img {
        transform: scale(0.9);
        padding-right: 8px;
      }
    }
    input {
      position: absolute;
      opacity: 0;
      width: 100%;
      height: 100%;
      border: 0;
      overflow: hidden;
      cursor: pointer;
    }
    input::-webkit-calendar-picker-indicator {
      position: absolute;
      top: -150%;
      left: -150%;
      width: 300%;
      height: 300%;
      cursor: pointer;
    }
  }
  &-menu__form-search {
    position: relative;
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 10px;
    margin-right: 20px;
    input {
      margin-left: 26px;
    }
    img {
      transform: scale(0.8);
      padding: 0 14px;
      position: absolute;
      left: 0;
    }
  }
  &-menu__form-table {
    margin-right: 20px;
  }
  &-menu__categories {
    display: flex;
    overflow: auto;
    white-space: nowrap;
    margin-top: 10px;
  }
  &-menu__category {
    display: inline-block;
    // background: #fff;
    color: #49bf00;
    background: #e0f5ca;
    margin-right: 20px;
    margin-bottom: 10px;
    padding: 30px 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    transition: all ease 0.2s;
    cursor: pointer;
    &:active {
      transform: scale(0.9);
    }
    // @include less-than(tablet) {
    //   &:active {
    //     transform: scale(0.8);
    //   }
    // }
  }
  &-menu__category--active {
    // background: #77a648;
    background: #5fbd00;
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
    // margin-top: auto;
    padding-top: 10px;
    padding-right: 20px;
    @include less-than(tablet) {
      padding-right: 0px;
      display: flex;
      flex-direction: column;
    }
  }
  &-menu__product {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 14px;
    height: 100%;
    min-height: 140px;
    background: #fff;
    border-top: 2px solid #5fbd00;
    border-radius: 12px;
    max-height: 100px;
    border-radius: 10px;
    white-space: normal;
    transition: transform ease 0.4s;
    cursor: pointer;
    text-overflow: ellipsis;
    &:active {
      transform: scale(0.9);
    }
    @include less-than(tablet) {
      flex: 1;
      &:active {
        transform: scale(0.8);
      }
    }
  }

  &-menu__product-count {
    width: 32px;
    height: 32px;
    // background: #f9e9c9;
    background: rgba(95, 189, 0, 0.15);
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    // color: #ee9d00;
    color: #5fbd00;
  }

  &-busket {
    flex: 1;
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &-busket__bag {
    width: 100%;
    // height: 65%;
    border-radius: 10px;
    padding: 10px;
    padding-bottom: 0;
    overflow: scroll;
    position: relative;
    display: block;
    box-sizing: border-box;

    @include less-than(tablet) {
      width: 280px;
      // height: 70%;
    }
  }
  &-busket__bag-backdrop {
    margin: 0;
    padding: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: sticky;
    width: 100%;
    height: 65px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      #ffffff 100%
    );
  }
  &-busket__article {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 20px;
    background: #fff;
    border-top: 2px solid #5fbd00;
    border-radius: 12px;
    box-shadow: 0px 0px 40px rgba(4, 114, 8, 0.08);
    white-space: normal;
  }
  &-busket__article-count {
    display: flex;
    justify-content: space-between;
    i {
      display: flex;
      align-items: center;
      padding: 8px 10px;
      background: #5fbd00;
      color: #fff;
      transition: transform ease 0.2s;
      cursor: pointer;
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
      width: 55px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;
      text-align: center;
    }
  }

  &-busket__checkout {
    // background: #e6e6e6;
    border-radius: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    select,
    input {
      // background: #f2f2f2;
      cursor: pointer;
      border-bottom: 1px solid #f5f5f5;
      padding: 8px 0;
      border-radius: 10px;
      width: 100%;
      margin-bottom: 10px;
      background: #fff;
      color: #000;
      @include less-than(tablet) {
        margin-bottom: 10px;
      }
    }
  }
  &-busket__checkout-count-wrapper {
    margin-bottom: 10px;

    p {
      margin-bottom: 5px;
      text-align: center;
      font-size: 14px;
      color: rgb(110, 110, 110);
    }
  }

  &-busket__checkout-count {
    display: flex;
    justify-content: space-between;
    i {
      display: flex;
      align-items: center;
      padding: 8px 20px;
      background: #f2f2f2;
      transition: transform ease 0.2s;
      cursor: pointer;

      &:active {
        transform: scale(0.7);
      }
      &:nth-child(1) {
        border-top-left-radius: 7px;
        border-bottom-left-radius: 7px;
      }
      &:nth-last-child(1) {
        border-top-right-radius: 7px;
        border-bottom-right-radius: 7px;
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

  &-busket__checkout-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 4px 12px;
    border-radius: 10px;
    margin-top: 10px;
    cursor: pointer;
    background: #5fbd00;
    border: 2px solid #5fbd00;
    color: #fff;
  }
  &-busket__checkout-btn--active {
    background: #5fbd00 !important;
    color: #fff !important;
  }
}
</style>
