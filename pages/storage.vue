<template>
  <div class="wrapper storage">
    <div class="storage-container">
      <div class="storage-menu">
        <div class="storage-menu__form">
          <input type="text" placeholder="поиск товара" />
        </div>
        <div class="storage-menu__categories">
          <div
            @click="modal_add_category = true"
            class="storage-menu__category"
          >
            <i class="bx bx-plus"></i>
          </div>
          <div
            v-for="category in categories"
            :key="category._id"
            class="storage-menu__category"
            @click="getProducts(category._id)"
          >
            <div
              style="
                display: flex;
                justify-content: space-between;
                padding-bottom: 10px;
              "
            >
              <i class="bx bx-trash"></i>
              <i
                @click.self="modal_change_category = true"
                class="bx bx-cog"
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
          <div @click="modal_add_products = true" class="storage-menu__product">
            <i class="bx bx-plus"></i>
          </div>
          <div
            v-for="product in products"
            :key="product._id"
            class="storage-menu__product"
          >
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
    >
      <form @submit.prevent="createCategory()">
        <input
          v-model="form_category.name"
          type="text"
          placeholder="Название категории"
          required
        />
        <button type="submit" style="width: 100%">Создать</button>
      </form>
    </Modal>
    <Modal
      title="Создание продутка"
      v-if="modal_add_products"
      @close="modal_add_products = false"
    >
      <form @submit.prevent="createProduct()">
        <input
          v-model="form_product.name"
          type="text"
          placeholder="Название продукта"
          required
        />
        <input
          v-model="form_product.price"
          type="number"
          placeholder="Стоимость продукта"
          required
        />
        <input
          v-model="form_product.quantity"
          type="number"
          placeholder="Количетсво продукта"
          required
        />
        <button type="submit" style="width: 100%">Создать</button>
      </form>
    </Modal>

    <Modal
      title="Редактирование категории"
      v-if="modal_change_category"
      @close="modal_change_category = false"
    >
      <form @submit.prevent="createCategory()">
        <input
          v-model="form_category.name"
          type="text"
          placeholder="Название категории"
          required
        />
        <button type="submit" style="width: 100%">Создать</button>
      </form>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category_id: null,

      categories: [],
      products: [],

      form_category: {
        name: null,
      },
      form_product: {
        name: null,
        price: null,
        quantity: null,
      },

      modal_add_category: false,
      modal_add_products: false,
      modal_change_category: false,
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
          this.products = res;
          this.category_id = id;
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
          this.categories.unshift(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createProduct() {
      this.$axios
        .$post(`${this.category_id}/products`, this.form_product)
        .then((res) => {
          this.modal_add_products = false;
          this.products.unshift(res);
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
    padding: 10px 25px 20px;
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
