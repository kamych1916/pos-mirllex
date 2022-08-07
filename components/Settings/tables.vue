<template>
  <div class="settings-container">
    <div class="settings-container__title">Столы</div>
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
        v-for="table in tables_data"
        :key="table.value"
        @click="
          modal_change = true;
          table_form.label = table.label;
          table_form.value = table.value;
        "
        class="settings-container__item"
      >
        {{ table.label }}
      </div>
    </div>
    <Modal
      title="Создавть стол"
      v-if="modal_create"
      @close="modal_create = false"
      class="settings-modal"
    >
      <form @submit.prevent="createTable()">
        <span>Название</span>
        <div>
          <input v-model="table_form.label" type="text" required />
        </div>
        <button type="submit" style="width: 100%">создать</button>
      </form>
    </Modal>

    <Modal
      title="Редактирование стола"
      v-if="modal_change"
      @close="modal_change = false"
      class="settings-modal"
    >
      <form @submit.prevent="changeTable()">
        <span>Название</span>
        <div>
          <input v-model="table_form.label" type="text" required />
        </div>
        <div style="display: flex; justify-content: space-between; gap: 20px">
          <button @click="deleteTable()" type="button" style="width: 100%">
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
      tables_data: [],

      modal_change: false,
      modal_create: false,

      table_form: {
        label: null,
        value: null,
      },
    };
  },
  fetchOnServer: false,
  fetch() {
    this.tables_data = this.data;
  },
  methods: {
    createTable() {
      this.$axios
        .$post("table", {
          label: this.table_form.label,
        })
        .then((res) => {
          this.modal_create = false;
          this.tables_data.push(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeTable() {
      this.$axios
        .$patch("table", this.table_form)
        .then((res) => {
          let objIndex = this.tables_data.findIndex(
            (obj) => obj.value == this.table_form.value
          );
          let tabelLabel = this.table_form.label;
          let tabelValue = this.table_form.value;
          this.tables_data[objIndex].label = tabelLabel;
          this.tables_data[objIndex].value = tabelValue;

          this.modal_change = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteTable() {
      this.$axios
        .$post("delete_table", {
          value: this.table_form.value,
        })
        .then((res) => {
          let objIndex = this.tables_data.findIndex(
            (obj) => obj.value == this.table_form.value
          );
          this.tables_data.splice(objIndex, 1);

          this.modal_change = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
