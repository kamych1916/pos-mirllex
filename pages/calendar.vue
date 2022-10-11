<template>
  <div class="wrapper">
    <div class="calendar" v-if="isLoadData">
      <div
        class="calendar-container"
        v-for="item in calendar"
        :key="item.id"
        v-if="item.data.length > 0"
      >
        <div class="calendar-container__title">
          {{ item.day }} {{ item.month }} ({{ item.weekname }})
        </div>
        <div class="calendar-container__wrapper">
          <div
            class="calendar-container__item"
            v-for="data in item.data"
            :key="data.id"
            @click="
              modal = true;
              modalInfo = data;
            "
          >
            <div>
              Сумма: <b> {{ data.total }} </b>
            </div>
            <br />
            <div>
              Время: <b> {{ data.datetime.time }}</b>
            </div>
            <br />
            <div>
              Номер заказа: <b> {{ data.id }} </b>
            </div>
          </div>
        </div>
      </div>
      <Modal :title="modalInfo.id" v-if="modal" @close="modal = false">
        <button
          type="button"
          @click="sendBuscket(modalInfo.id)"
          style="margin-bottom: 20px"
        >
          отменить
        </button>

        <br />
        <div v-if="modalInfo.table">Стол: {{ modalInfo.table.label }}</div>
        <br v-if="modalInfo.bonus" />
        <div v-if="modalInfo.bonus">Бонус: {{ modalInfo.bonus.label }}</div>
        <br v-if="modalInfo.employee" />
        <div v-if="modalInfo.employee">
          Сотрудник: {{ modalInfo.employee.label }}
        </div>
        <br v-if="modalInfo.description" />
        <div v-if="modalInfo.description">
          Комментарий: {{ modalInfo.description }}
        </div>
        <br />

        <div class="calendar-info">
          <table class="calendar-info__table">
            <thead align="left">
              <tr>
                <th>Наименование</th>
                <th>Цена</th>
                <th>Количество</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in modalInfo.busket" :key="index">
                <td>{{ product.name }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.quantity }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button
          type="button"
          class="calendar-modal__btn"
          style="width: 100%; background-color: #77a648; color: #fff"
          @click="sendBuscket(modalInfo.id, 1, modalInfo)"
        >
          <p>Перейти</p>
        </button>
      </Modal>
    </div>
    <Footer style="margin-top: auto"></Footer>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      isLoadData: false,
      calendar: [],
      modal: false,
      modalInfo: null,
    };
  },
  fetchOnSever: false,
  fetch() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .$get("preorder")
        .then((res) => {
          console.log(res);
          this.isLoadData = true;
          this.getCalendar(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCalendar(res) {
      var targetDate = new Date();
      const monthNames = [
        "янв",
        "фев",
        "мар",
        "Апр",
        "май",
        "июн",
        "июл",
        "авг",
        "сен",
        "окт",
        "ноя",
        "дек",
      ];
      const weekNames = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
      let dayNumber;
      for (let day = 0; day < 21; day++) {
        dayNumber = (targetDate.getDay() + day) % 7;
        dayNumber === 0 ? (dayNumber = 7) : null;
        this.calendar.push({
          data: [],
          day: targetDate.getDate() + day,
          weekname: weekNames[dayNumber - 1],
          month: monthNames[targetDate.getMonth()],
          id: `id-${day}`,
        });
      }
      this.calendar.forEach((el, id) => {
        for (let order of res) {
          if (order.datetime.date === el.day) {
            this.calendar[id].data.push(order);
          }
        }
      });
      console.log(this.calendar);
    },
    sendBuscket(id, state = -1, data = null) {
      if (state === 1) {
        if (data) {
          this.$store.commit("busketData/changeBusketData", data);
          this.$router.push("/");
        }
      } else {
        this.$axios
          .$post("preorder", {
            id: id,
            state: state,
          })
          .then((res) => {
            this.modal = false;
            this.calendar = [];
            this.getData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style lang="scss">
.calendar {
  overflow-x: auto;
  overflow-y: hidden;
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
    overflow: auto;
    white-space: nowrap;
    padding: 0 10px;

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
  &-container__item {
    cursor: pointer;
    background: #f2f2f2;
    border-radius: 12px;
    padding: 25px 10px;
    margin-top: 16px;
    &:nth-child(1) {
      margin-top: 0px;
    }
  }
  &-modal {
    span {
      font-size: 14px;
      opacity: 0.5;
    }
  }

  &-info {
    border-radius: 10px;
    width: 100%;
    overflow: auto;
    white-space: nowrap;
    padding-bottom: 10px;
  }
  &-info__table {
    width: 100%;

    tr {
      // background: #fff;
    }
    td,
    th {
      padding: 15px;
      box-shadow: 0 0 1px #ccc;
    }
  }
}
</style>
