<template>
  <div>
    <div class="analytics" v-if="main_data && popular_products">
      <div class="analytics-today">
        <div
          class="analytics-today__item"
          style="font-size: 17px; font-weight: 500"
        >
          <div>Cегодня,</div>
          {{ new Date().toLocaleDateString() }}
        </div>
        <div class="analytics-today__item">
          <div class="analytics-today__item-title">{{ main_data.revenue }}</div>
          <span>выручка</span>
        </div>
        <div class="analytics-today__item">
          <div class="analytics-today__item-title">
            {{ main_data.checks }}
          </div>
          <span>кол. чеков</span>
        </div>
        <div class="analytics-today__item">
          <div class="analytics-today__item-title">
            {{ main_data.visitors }}
          </div>
          <span>кол. посетителей</span>
        </div>
        <div class="analytics-today__item">
          <div class="analytics-today__item-title">
            {{ main_data.average_check }}
          </div>
          <span>средний чек</span>
        </div>
      </div>

      <div class="analytics-chart">
        <div class="analytics-chart__header">
          <p>Выручка за -</p>

          <!-- :locale-data="{ firstDay: 1, format: 'dd-mm-yyyy' }" -->
          <date-range-picker
            ref="picker"
            :locale-data="{
              format: 'mm-dd-yyyy',
              separator: ' - ',
              weekLabel: 'Камбулат',
              customRangeLabel: 'Custom Range',
              daysOfWeek: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
              monthNames: [
                'Январь',
                'Февраль',
                'Март',
                'Апрель',
                'Май',
                'Июнь',
                'Июль',
                'Август',
                'Сентябрь',
                'Октябрь',
                'Ноябрь',
                'Декабрь',
              ],
            }"
            :ranges="ranges"
            v-model="dateRange"
            :opens="'center'"
            :autoApply="true"
            :singleDatePicker="'range'"
            :appendToBody="true"
            :lang="'zh'"
            class="analytics-chart__wrapper"
          >
            <template v-slot:input="picker" style="min-width: 350px">
              {{ picker.startDate | date }} - {{ picker.endDate | date }}
            </template>
          </date-range-picker>
        </div>
        <vueApexCharts
          ref="chart_stat"
          :width="chartWidth"
          :height="chartHeight"
          :options="chartOptions"
          :series="series"
        ></vueApexCharts>
        <div v-if="chartData" class="analytics-range__item-wrapper">
          <div
            @click="
              chartValue = item.id;
              changeChart(item.id);
            "
            v-for="item in chartData.value"
            :class="[
              'analytics-range__item',
              item.id === chartId ? 'analytics-range__item--active' : null,
            ]"
          >
            <div class="analytics-range__item-title">
              {{ item.value }}
            </div>
            <span>{{ item.label }}</span>
          </div>
        </div>
      </div>
      <div class="analytics-info__wrapper">
        <div class="analytics-info__title-wrapper">
          <div
            :class="[
              'analytics-info__title',
              isPopularProducts ? 'analytics-info__title--active' : null,
            ]"
            @click="
              isPopularProducts = !isPopularProducts;
              isChecks = false;
              currentPage = 1;
            "
          >
            Популярные товары
          </div>
          <div
            :class="[
              'analytics-info__title',
              isChecks ? 'analytics-info__title--active' : null,
            ]"
            @click="
              isChecks = !isChecks;
              isPopularProducts = false;
              currentPage = 1;
            "
          >
            Таблица чеков
          </div>
        </div>
        <div class="analytics-info" v-if="isPopularProducts">
          <table class="analytics-info__table">
            <thead align="left">
              <tr>
                <th>Наименование</th>
                <th>Количество</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(product, index) in paginated_data(popular_products)"
                :key="index"
              >
                <td>{{ product.name }}</td>
                <td>{{ product.count }}</td>
              </tr>
            </tbody>
          </table>
          <pagination
            :totalPages="pageSizePopular"
            :currentPage="currentPage"
            @pagechanged="onPageChange"
          />
        </div>
        <div class="analytics-info" v-if="isChecks">
          <table class="analytics-info__table">
            <thead align="left">
              <tr>
                <th>Дата</th>
                <th>Сотрудник</th>
                <th>Стол</th>
                <th>Бонус</th>
                <th>Сумма</th>
                <th>Корзина</th>
                <th>Печать</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(check, index) in paginated_data(checks)" :key="index">
                <td>{{ check.date }}</td>
                <td>{{ check.employee }}</td>
                <td>{{ check.table }}</td>
                <td>{{ check.bonus }}</td>
                <td style="width: 0; text-align: center">{{ check.total }}</td>
                <td style="width: 0; text-align: center">
                  <button
                    class="analytics-info__table-btn"
                    @click="openCheckBusketModal(check.busket)"
                  >
                    <i class="bx bx-cart"></i>
                  </button>
                </td>
                <td style="width: 0; text-align: center">
                  <button @click="print()" class="analytics-info__table-btn">
                    <i class="bx bx-printer"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <pagination
            :totalPages="pageSizeChecks"
            :currentPage="currentPage"
            @pagechanged="onPageChange"
          />
          <Modal
            title="Просмотр продуктов чека"
            v-if="checkBusketModal"
            @close="
              checkBusketModal = false;
              checkBusket = null;
            "
          >
            <div class="analytics-info">
              <table class="analytics-info__table">
                <thead align="left">
                  <tr>
                    <th>Наименование</th>
                    <th>Цена</th>
                    <th>Количество</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(product, index) in checkBusket" :key="index">
                    <td>{{ product.name }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.count }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Modal>
        </div>
      </div>
    </div>
    <Footer> </Footer>
  </div>
</template>

<script>
import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
export default {
  middleware: ["auth"],
  components: {
    vueApexCharts: () => import("vue-apexcharts"),
    DateRangePicker,
  },
  filters: {
    date(val) {
      return new Intl.DateTimeFormat("ru-RU").format(val);
    },
  },
  data() {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const days6 = new Date();
    days6.setDate(today.getDate() - 6);
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 6);
    return {
      ranges: {
        "Сегодня ": [today, today],
        "Вчера ": [yesterday, yesterday],
        Неделя: [days6, today],
        "Этот месяц": [
          new Date(today.getFullYear(), today.getMonth(), 1),
          today,
        ],
        "Прошлый месяц": [
          new Date(today.getFullYear(), today.getMonth() - 1, 1),
          new Date(today.getFullYear(), today.getMonth(), 0),
        ],
      },
      dateRange: { startDate, endDate },

      main_data: null,

      chartWidth: "100%",
      chartHeight: "400px",
      series: [
        {
          name: "series1",
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          type: "area",
          zoom: {
            enabled: false,
            autoScaleYaxis: true,
          },
          toolbar: {
            show: false,
          },
          foreColor: "#A3A3A3",
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ["#5fbd00"],
          },
          background: {
            enabled: true,
            foreColor: "#fff",
            padding: 4,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: "#fff",
          },
        },
        stroke: {
          width: 2,
          colors: ["#5fbd00"],
          curve: "smooth",
        },
        grid: {
          yaxis: {
            lines: {
              show: true,
              offsetX: 0,
              offsetY: 0,
            },
          },
          xaxis: {
            lines: {
              show: true,
              offsetX: 0,
              offsetY: 0,
            },
          },
        },
        xaxis: {
          categories: [],
        },
        tooltip: {
          enabled: false,
          enabledOnSeries: undefined,
        },
        fill: {
          type: "gradient",
          colors: ["#bcd6a3", "#bcd6a3"],
        },
        markers: {
          size: 5,
          colors: ["#5fbd00"],
        },
      },

      chartData: null,
      chartId: 0, // Выручка,

      popular_products: [],
      pageSizePopular: null,
      isPopularProducts: false,

      checks: [],
      currentChecks: 1,
      isChecks: false,
      checkBusketModal: false,
      checkBusket: null,
      pageSizeChecks: null,

      currentPage: 1,
    };
  },
  computed: {
    indexStart() {
      return (this.currentPage - 1) * 10;
    },
    indexEnd() {
      return this.indexStart + 10;
    },
    paginated_data() {
      const vm = this;
      return function (value) {
        return value.slice(vm.indexStart, vm.indexEnd);
      };
    },
  },
  watch: {
    dateRange(val) {
      var options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        timezone: "UTC",
      };
      this.getChart(
        val.startDate.toLocaleString("ru", options),
        val.endDate.toLocaleString("ru", options)
      );
    },
  },
  fetchOnSever: false,
  fetch() {
    this.getPoularItemsData();
    this.getChecksData();
    this.getChart();
  },

  methods: {
    changeChart(id) {
      this.chartId = id;
      Object.entries(this.chartData.charts).forEach(([key, value]) => {
        if (value.id === id) {
          console.log(value, id);
          this.series[0].data = value.data;
          this.series[0].name = "";
          this.chartOptions.xaxis.categories = value.categories;
          if (screen.width < 600) {
            this.chartWidth = "1400px";
          }
          this.$refs.chart_stat.refresh();
        }
      });
    },
    getChart(start = "", end = "") {
      this.$axios
        .$get(`chart?startDate=${start}&endDate=${end}`)
        .then((res) => {
          this.series[0].data = res.charts.revenue.data;
          this.series[0].name = "";
          this.chartOptions.xaxis.categories = res.charts.revenue.categories;
          if (screen.width < 600) {
            this.chartWidth = "1400px";
          }
          this.chartData = res;
          this.$refs.chart_stat.refresh();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPoularItemsData() {
      this.$axios
        .$get("statistics_today")
        .then((res) => {
          this.main_data = res;
          for (const [key, value] of Object.entries(res.popular_products)) {
            this.popular_products.push({
              name: key,
              count: value,
            });
          }
          this.popular_products.push(...this.popular_products);
          this.pageSizePopular = Math.round(this.popular_products.length / 10);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getChecksData() {
      this.$axios
        .$get("order")
        .then((res) => {
          this.checks = res;
          this.pageSizeChecks = Math.round(this.checks.length / 10);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onPageChange(page) {
      this.currentPage = page;
    },
    openCheckBusketModal(busket) {
      this.checkBusketModal = true;
      this.checkBusket = busket;
    },
    print() {
      window.print();
    },
  },
};
</script>

<style lang="scss">
.analytics {
  position: relative;
  overflow: auto;
  white-space: nowrap;
  padding: 20px;
  padding-bottom: 150px;
  &-today {
    overflow: auto;
    white-space: nowrap;
    background: #fff;
    box-shadow: 0 0 50px #e6e6e6;
    border-radius: 10px;
    width: fit-content;
    @include less-than(tablet) {
      width: 100%;
    }
  }

  &-today__item {
    display: inline-block;
    padding: 14px;
    margin-right: 40px;
    span {
      color: rgb(116, 116, 116);
      font-size: 14px;
    }
  }
  &-today__item-title {
    font-size: 18px;
    font-weight: 500;
  }

  &-info {
    border-radius: 10px;
    width: 100%;
    overflow: auto;
    white-space: nowrap;
  }
  &-info__wrapper {
    margin-top: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 50px #e6e6e6;
    overflow: auto;
    white-space: nowrap;
    padding: 10px;
  }

  &-info__title-wrapper {
    display: flex;
  }
  &-info__title {
    font-size: 16px;
    font-weight: 500;
    background: rgb(241, 241, 241);
    cursor: pointer;
    padding: 18px;
    border-radius: 14px;
    margin-bottom: 10px;
    margin-right: 14px;
    transition: all ease 0.3s;
    @include less-than(tablet) {
      font-size: 13px;
      padding: 14px;
    }
  }
  &-info__title--active {
    background: #5fbd00;
    color: #fff;
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
  &-info__table-btn {
    padding: 10px 20px;
    border-radius: 10px;
    background: rgb(241, 241, 241);
    cursor: pointer;
    transition: all ease 0.3s;
    &:hover {
      color: #fff;
      background: #77a648;
    }
  }
  &-chart {
    margin-top: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 50px #e6e6e6;
    overflow: auto;
    white-space: nowrap;
  }

  &-chart__header {
    display: flex;
    align-items: center;

    p {
      margin: 14px;
      margin-right: 0px;
      font-size: 17px;
      font-weight: 500;
    }
  }
  &-chart__wrapper {
    .form-control {
      border: none;
      border-bottom: 1px solid #ccc;
      padding-bottom: 2px;
      border-radius: 4px;
    }
  }

  &-range__item-wrapper {
    padding-left: 10px;
    padding-bottom: 10px;
  }
  &-range__item {
    display: inline-block;
    padding: 14px;
    margin-right: 14px;
    background: rgb(241, 241, 241);
    border-radius: 14px;
    width: 200px;
    transition: ease all 0.2s;
    cursor: pointer;
    span {
      color: rgb(116, 116, 116);
      font-size: 14px;
    }
  }
  &-range__item--active {
    background: #5fbd00;
    color: #fff;
    span {
      color: #fff;
    }
  }
  &-range__item-title {
    font-size: 18px;
    font-weight: 500;
  }
}

.daterangepicker {
  min-width: auto !important;
  .calendars {
    @include less-than(tablet) {
      display: block !important;
    }
  }
}

// .collapsible {
//   background: rgb(241, 241, 241);
//   // color: #444;
//   cursor: pointer;
//   padding: 18px;
//   width: 100%;
//   border: none;
//   text-align: left;
//   outline: none;
//   font-size: 15px;
// }
</style>
