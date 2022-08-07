<template>
  <div class="wrapper storage">
    <div class="storage-container">
      <div class="storage-menu">
        <div class="storage-menu__form">
          <input type="text" placeholder="поиск товара" />
        </div>
        <div class="storage-menu__categories">
          <div
            @click="
              modal_add_category = true;
              form_category.name = null;
              form_category.id = null;
            "
            class="storage-menu__category"
          >
            <i class="bx bx-plus"></i>
          </div>
          <div
            v-for="category in categories"
            :key="category._id"
            :class="[
              'storage-menu__category',
              category._id === category_id
                ? 'storage-menu__category--active'
                : null,
            ]"
            @click="getProducts(category._id)"
          >
            <div class="storage-menu__category-wrapper">
              <i
                @click.stop="
                  modal_change_category = true;
                  form_category.name = category.name;
                  form_category.id = category._id;
                "
                class="bx bx-cog storage-menu__category-icon"
              ></i>
            </div>
            <div>
              {{ category.name }}
            </div>
          </div>
          <!-- <div class="storage-menu__category storage-menu__category--active">
            пиццы
          </div> -->
        </div>
        <div v-if="category_id" class="storage-menu__products">
          <div
            @click="
              modal_add_product = true;
              form_product.name = null;
              form_product.price = null;
              form_product.quantity = null;
              form_product.is_quantity = false;
              form_product.id = null;
            "
            class="storage-menu__product"
          >
            <i class="bx bx-plus"></i>
          </div>
          <div
            v-for="product in products"
            :key="product.id"
            class="storage-menu__product"
            @click="
              modal_change_product = true;
              form_product.name = product.name;
              form_product.price = product.price;
              form_product.quantity = product.quantity;
              form_product.is_quantity = product.is_quantity;
              form_product.id = product.id;
            "
          >
            <div class="storage-menu__product-wrapper">
              <i class="bx bx-cog storage-menu__product-icon"></i>
            </div>
            {{ product.name }}
          </div>
        </div>
      </div>
    </div>
    <Footer style="margin-top: auto">Kamol</Footer>
    <Modal
      title="Создание категории"
      v-if="modal_add_category"
      @close="modal_add_category = false"
      class="storage-modal"
    >
      <form @submit.prevent="createCategory()">
        <span> Название </span>
        <input v-model="form_category.name" type="text" required />
        <button type="submit" style="width: 100%">Создать</button>
      </form>
    </Modal>
    <Modal
      title="Создание продутка"
      v-if="modal_add_product"
      @close="modal_add_product = false"
      class="storage-modal"
    >
      <form @submit.prevent="createProduct()">
        <span> Название </span>
        <input v-model="form_product.name" type="text" required />
        <span> Цена </span>
        <input v-model="form_product.price" type="number" required />
        <span>Товар с количеством ?</span>
        <div class="storage-modal__product-quantity">
          <span
            @click="form_product.is_quantity = true"
            :class="[
              form_product.is_quantity
                ? 'storage-modal__product-quantity--active'
                : null,
            ]"
            >Да</span
          >
          <span
            @click="form_product.is_quantity = false"
            :class="[
              !form_product.is_quantity
                ? 'storage-modal__product-quantity--active'
                : null,
            ]"
            >Нет</span
          >
        </div>
        <div v-if="form_product.is_quantity">
          <span> Количество </span>
          <input v-model="form_product.quantity" type="number" required />
        </div>
        <button type="submit" style="width: 100%">Создать</button>
      </form>
    </Modal>

    <Modal
      title="Редактирование категории"
      v-if="modal_change_category"
      @close="modal_change_category = false"
      class="storage-modal"
    >
      <form @submit.prevent="changeCategory()">
        <span> Название </span>
        <input v-model="form_category.name" type="text" required />
        <div style="display: flex; justify-content: space-between; gap: 20px">
          <button @click="deleteCategory()" type="button" style="width: 100%">
            Удалить
          </button>
          <button
            type="submit"
            style="width: 100%; background-color: rgb(177 224 172)"
          >
            Изменить
          </button>
        </div>
      </form>
    </Modal>

    <Modal
      title="Редактирование продукта"
      v-if="modal_change_product"
      @close="modal_change_product = false"
      class="storage-modal"
    >
      <form @submit.prevent="changeProduct()">
        <span> Название </span>
        <input v-model="form_product.name" type="text" required />
        <span> Цена </span>
        <input v-model="form_product.price" type="text" required />
        <span>Товар с количеством ?</span>
        <div class="storage-modal__product-quantity">
          <span
            @click="form_product.is_quantity = true"
            :class="[
              form_product.is_quantity
                ? 'storage-modal__product-quantity--active'
                : null,
            ]"
            >Да</span
          >
          <span
            @click="form_product.is_quantity = false"
            :class="[
              !form_product.is_quantity
                ? 'storage-modal__product-quantity--active'
                : null,
            ]"
            >Нет</span
          >
        </div>
        <div v-if="form_product.is_quantity">
          <span> Количество </span>
          <input v-model="form_product.quantity" type="text" required />
        </div>
        <div style="display: flex; justify-content: space-between; gap: 20px">
          <button @click="deleteProduct()" type="button" style="width: 100%">
            Удалить
          </button>
          <button
            type="submit"
            style="width: 100%; background-color: rgb(177 224 172)"
          >
            Изменить
          </button>
        </div>
      </form>
    </Modal>
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

      form_category: {
        name: null,
        id: null,
      },
      form_product: {
        name: null,
        price: null,
        quantity: null,
        is_quantity: false,
        id: null,
      },

      modal_add_category: false,
      modal_add_product: false,
      modal_change_category: false,
      modal_change_product: false,
    };
  },
  fetchOnSever: false,
  fetch() {
    this.getCategories();
    if (this.category_id) {
      this.getProducts();
    }
  },
  methods: {
    getCategories() {
      this.$axios
        .$get("categories")
        .then((res) => {
          this.categories = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getProducts(id) {
      this.$axios
        .$get(`${id}/products`)
        .then((res) => {
          this.category_id = id;
          this.products = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    createCategory() {
      this.$axios
        .$post("categories", this.form_category)
        .then((res) => {
          this.modal_add_category = false;
          this.categories.push(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createProduct() {
      this.$axios
        .$post(`${this.category_id}/products`, this.form_product)
        .then((res) => {
          this.modal_add_product = false;
          this.products.push(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    changeCategory() {
      this.$axios
        .$patch("categories", this.form_category)
        .then((res) => {
          let objIndex = this.categories.findIndex(
            (obj) => obj._id == this.form_category.id
          );
          let categoryName = this.form_category.name;
          this.categories[objIndex].name = categoryName;
          this.modal_change_category = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeProduct() {
      this.$axios
        .$patch(`${this.category_id}/products`, this.form_product)
        .then((res) => {
          let objIndex = this.products.findIndex(
            (obj) => obj.id == this.form_product.id
          );
          let productName = this.form_product.name;
          let productPrice = this.form_product.price;
          let productQuantity = this.form_product.quantity;
          let productIsQuantity = this.form_product.is_quantity;

          this.products[objIndex].name = productName;
          this.products[objIndex].price = productPrice;
          this.products[objIndex].quantity = productQuantity;
          this.products[objIndex].is_quantity = productIsQuantity;

          this.modal_change_product = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteCategory() {
      this.$axios
        .$post("delete_categories", { id: this.form_category.id })
        .then((res) => {
          let objIndex = this.categories.findIndex(
            (obj) => obj._id == this.form_category.id
          );
          this.categories.splice(objIndex, 1);

          this.modal_change_category = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteProduct() {
      this.$axios
        .$post(`${this.category_id}/delete_products`, {
          id: this.form_product.id,
        })
        .then((res) => {
          let objIndex = this.products.findIndex(
            (obj) => obj._id == this.form_product.id
          );
          this.products.splice(objIndex, 1);

          this.modal_change_product = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
.storage {
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
    padding: 20px 25px 20px;
    border-radius: 10px;
    position: relative;
    transition: all ease 0.2s;
    &:active {
      transform: scale(0.9);
    }
  }
  &-menu__category--active {
    background: #77a648;
    color: #fff;
    i {
      color: #000;
    }
  }
  &-menu__category-wrapper {
    padding-bottom: 10px;
  }
  &-menu__category-icon {
    position: absolute;
    z-index: 2;
    right: 0;
    top: 0;
    padding: 5px 10px;
    background: rgb(223, 223, 223);
    border-radius: 10px;
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
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 40px 0;
    background: #e6e6e6;
    max-height: 100px;
    border-radius: 10px;
    position: relative;
    transition: transform ease 0.2s;
    &:active {
      transform: scale(0.9);
    }
  }
  &-menu__product-icon {
    position: absolute;
    z-index: 2;
    right: 0;
    top: 0;
    padding: 5px 10px;
    background: rgb(223, 223, 223);
    border-radius: 10px;
  }
  &-modal {
    span {
      font-size: 14px;
      opacity: 0.5;
    }
  }
  &-modal__product-quantity {
    display: flex;
    margin-top: 10px;
    margin-bottom: 30px;
    span {
      width: 50px;
      padding: 10px 5px;
      background: #ccc;
      text-align: center;
      transition: transform ease 0.6s;
      &:active {
        transform: scale(0.7);
      }
    }
  }
  &-modal__product-quantity--active {
    color: #fff;
    background: #77a648 !important;
  }
}
</style>
