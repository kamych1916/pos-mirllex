<template>
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
            chartValue = item.label;
            changeChart(item.label);
          "
          v-for="item in chartData.value"
          :class="[
            'analytics-range__item',
            item.label === chartValue ? 'analytics-range__item--active' : null,
          ]"
        >
          <div class="analytics-range__item-title">
            {{ item.value }}
          </div>
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
    <div class="analytics-popular__title">Популярные товары</div>
    <div class="analytics-popular">
      <table class="analytics-popular__table">
        <thead align="left">
          <tr>
            <th>Наименование</th>
            <th>Количество</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in popular_products">
            <td>{{ product.name }}</td>
            <td>{{ product.count }}</td>
          </tr>
        </tbody>
      </table>
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
      popular_products: [],

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
            colors: ["#77a648"],
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
          colors: ["#77A648"],
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
          colors: ["#77A648"],
        },
      },

      chartData: null,
      chartValue: "Выручка",
    };
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
    this.getMainData();
    this.getChart();
  },

  methods: {
    changeChart(label) {
      this.chartValue = label;
      console.log(label);
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
          console.log(res);

          this.$refs.chart_stat.refresh();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMainData() {
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
        })
        .catch((err) => {
          console.log(err);
        });
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

  &-popular {
    border-radius: 10px;
    width: 100%;
    overflow: auto;
    white-space: nowrap;
  }
  &-popular__title {
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
  }
  &-popular__table {
    width: 100%;
    margin-top: 20px;

    tr {
      background: #fff;
    }
    td,
    th {
      padding: 15px;
    }
  }
  .footer {
    background: #e6e6e6;
    width: 100%;
    z-index: 2;
    position: fixed;
    justify-content: center;
    bottom: 0;
    left: 0;
    padding-bottom: calc(constant(safe-area-inset-bottom));
    padding-bottom: calc(env(safe-area-inset-bottom));
    &-item {
      margin: 0 14px;
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
    background: #77a648;
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
</style>
