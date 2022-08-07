<template>
  <div class="settings-container">
    <div class="settings-container__title">Сотрудники</div>
    <div class="settings-container__wrapper">
      <div
        class="settings-container__add"
        @click="
          modal_create = true;
          employees_form = {
            label: null,
            login: null,
            password: null,
            value: null,
          };
        "
      >
        <i class="bx bx-plus-circle"></i> &nbsp; Добавить
      </div>
      <div
        v-for="employee in employees_data"
        :key="employee.value"
        @click="
          modal_change = true;
          employees_form.label = employee.label;
          employees_form.login = employee.login;
          employees_form.password = employee.password;
          employees_form.value = employee.value;
        "
        class="settings-container__item"
      >
        {{ employee.label }}
      </div>
    </div>
    <Modal
      title="Создавть сотрудника"
      v-if="modal_create"
      @close="modal_create = false"
      class="settings-modal"
    >
      <form @submit.prevent="createEmployee()">
        <span>Имя и Фамилия</span>
        <div>
          <input v-model="employees_form.label" type="text" required />
        </div>
        <span>Логин</span>
        <div>
          <input v-model="employees_form.login" type="text" required />
        </div>
        <span>Пароль</span>
        <div>
          <input v-model="employees_form.password" type="text" required />
        </div>
        <button type="submit" style="width: 100%">создать</button>
      </form>
    </Modal>
    <Modal
      title="Редактирование сотрудника"
      v-if="modal_change"
      @close="modal_change = false"
      class="settings-modal"
    >
      <form @submit.prevent="changeEmployee()">
        <span>Имя и Фамилия</span>
        <div>
          <input v-model="employees_form.label" type="text" required />
        </div>
        <span>Логин</span>
        <div>
          <input v-model="employees_form.login" type="text" required />
        </div>
        <span>Пароль</span>
        <div>
          <input v-model="employees_form.password" type="text" required />
        </div>
        <div style="display: flex; justify-content: space-between; gap: 20px">
          <button @click="deleteEmployee()" type="button" style="width: 100%">
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
      employees_data: [],

      modal_create: false,
      modal_change: false,

      employees_form: {
        label: null,
        login: null,
        password: null,
        value: null,
      },
    };
  },
  fetchOnServer: false,
  fetch() {
    this.employees_data = this.data;
  },
  methods: {
    createEmployee() {
      this.$axios
        .$post("employee", this.employees_form)
        .then((res) => {
          this.modal_create = false;
          this.employees_data.push(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeEmployee() {
      this.$axios
        .$patch("employee", this.employees_form)
        .then((res) => {
          let objIndex = this.employees_data.findIndex(
            (obj) => obj.value == this.employees_form.value
          );

          let employeeLabel = this.employees_form.label;
          let employeeLogin = this.employees_form.login;
          let employeePassword = this.employees_form.password;
          let employeeValue = this.employees_form.value;

          this.employees_data[objIndex].label = employeeLabel;
          this.employees_data[objIndex].login = employeeLogin;
          this.employees_data[objIndex].password = employeePassword;
          this.employees_data[objIndex].value = employeeValue;

          this.modal_change = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteEmployee() {
      this.$axios
        .$post("delete_employee", {
          value: this.employees_form.value,
        })
        .then((res) => {
          let objIndex = this.employees_data.findIndex(
            (obj) => obj.value == this.employees_form.value
          );
          this.employees_data.splice(objIndex, 1);

          this.modal_change = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
