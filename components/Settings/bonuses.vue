<template>
  <div class="settings-container">
    <div class="settings-container__title">Бонусы</div>
    <div class="settings-container__wrapper">
      <div
        class="settings-container__add"
        @click="
          modal_create = true;
          tables_name = null;
        "
      >
        <i class="bx bx-plus-circle"></i> &nbsp; Добавить
      </div>
      <div
        v-for="bonus in bonuses_data"
        :key="bonus.value"
        @click="
          modal_change = true;
          bonuses_form.label = bonus.label;
          bonuses_form.type = bonus.type;
          bonuses_form.data = bonus.data;
          bonuses_form.value = bonus.value;
        "
        class="settings-container__item"
      >
        {{ bonus.label }}
      </div>
    </div>
    <Modal
      title="Создать бонус"
      v-if="modal_create"
      @close="modal_create = false"
    >
      <form @submit.prevent="createBonus()">
        <div>Название</div>
        <div>
          <input v-model="bonuses_form.label" type="text" required />
        </div>
        <div>Тип</div>
        <div>
          <select v-model="bonuses_form.type">
            <option value="percent">В процентах</option>
            <option value="number">В деньгах</option>
          </select>
        </div>
        <div>Значение</div>
        <div>
          <input v-model="bonuses_form.data" type="number" required />
        </div>
        <button type="submit" style="width: 100%">создать</button>
      </form>
    </Modal>

    <Modal
      title="Редактирование бонуса"
      v-if="modal_change"
      @close="modal_change = false"
      class="settings-modal"
    >
      <form @submit.prevent="changeBonus()">
        <span>Название</span>
        <div>
          <input v-model="bonuses_form.label" type="text" required />
        </div>
        <span>Тип</span>
        <div>
          <select v-model="bonuses_form.type">
            <option value="percent">В процентах</option>
            <option value="number">В деньгах</option>
          </select>
        </div>
        <span>Значение</span>
        <div>
          <input v-model="bonuses_form.data" type="number" required />
        </div>
        <div style="display: flex; justify-content: space-between; gap: 20px">
          <button @click="deleteBonus()" type="button" style="width: 100%">
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
  props: {
    data: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      bonuses_data: [],

      modal_create: false,
      modal_change: false,

      bonuses_form: {
        label: null,
        type: null,
        data: null,
        value: null,
      },
    };
  },
  fetchOnServer: false,
  fetch() {
    this.bonuses_data = this.data;
  },
  methods: {
    createBonus() {
      this.$axios
        .$post("bonus", this.bonuses_form)
        .then((res) => {
          console.log(res);
          this.modal_create = false;
          this.bonuses_data.push(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeBonus() {
      this.$axios
        .$patch("bonus", this.bonuses_form)
        .then((res) => {
          let objIndex = this.bonuses_data.findIndex(
            (obj) => obj.value == this.bonuses_form.value
          );

          let bonusLabel = this.bonuses_form.label;
          let bonusType = this.bonuses_form.type;
          let bonusData = this.bonuses_form.data;
          let bonusValue = this.bonuses_form.value;

          this.bonuses_data[objIndex].label = bonusLabel;
          this.bonuses_data[objIndex].type = bonusType;
          this.bonuses_data[objIndex].data = bonusData;
          this.bonuses_data[objIndex].value = bonusValue;

          this.modal_change = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteBonus() {
      this.$axios
        .$post("delete_bonus", {
          value: this.bonuses_form.value,
        })
        .then((res) => {
          let objIndex = this.bonuses_data.findIndex(
            (obj) => obj.value == this.bonuses_form.value
          );
          this.bonuses_data.splice(objIndex, 1);

          this.modal_change = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
