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
      <vueApexCharts
        ref="chart_stat"
        :width="chartWidth"
        :height="chartHeight"
        :options="chartOptions"
        :series="series"
      ></vueApexCharts>
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
export default {
  middleware: ["auth"],
  components: {
    vueApexCharts: () => import("vue-apexcharts"),
  },
  data() {
    return {
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
    };
  },
  fetchOnSever: false,
  fetch() {
    this.getMainData();
    this.getChart();
  },
  methods: {
    getChart() {
      this.$axios
        .$get("chart")
        .then((res) => {
          console.log(res);
          this.series[0].data = res.revenue.data;
          this.series[0].name = "";
          this.chartOptions.xaxis.categories = res.revenue.categories;
          if (screen.width < 600) {
            this.chartWidth = "1400px";
          }
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
}
</style>
