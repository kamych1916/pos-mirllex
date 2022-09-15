<template>
  <div class="print" v-if="store">
    <div class="print-header">
      <img
        src="https://parzibyte.github.io/print-receipt-thermal-printer/logo.png"
      />
      <h1>BUNDES</h1>
    </div>

    <table>
      <thead align="left">
        <tr>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="width: 20%">Официант</td>
          <td>{{ store.employee }}</td>
        </tr>
        <tr>
          <td style="width: 20%">Дата</td>
          <td>{{ store.employee }}</td>
        </tr>
        <tr>
          <td style="width: 20%">Стол</td>
          <td>{{ store.table }}</td>
        </tr>
        <tr>
          <td style="width: 20%">Кол-во гостей</td>
          <td>{{ store.client_quantity }}</td>
        </tr>
      </tbody>
    </table>

    <div class="print-dashed"></div>

    <table>
      <thead align="left">
        <tr>
          <th>Наименование</th>
          <th>Кол-во</th>
          <th>Цена</th>
          <th>Итого</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in store.busket">
          <td style="width: 40%">{{ item.name }}</td>
          <td style="width: 20%">{{ item.count }}</td>
          <td style="width: 20%">{{ item.price }}</td>
          <td style="width: 20%">{{ item.total }}</td>
        </tr>
      </tbody>
    </table>

    <div class="print-dashed"></div>

    <div class="print-total">
      <div class="print-total__left">Итого</div>
      <div class="print-total__dotted"></div>
      <div class="print-total__right">{{ store.total }}</div>
    </div>
    <div class="print-total">
      <div class="print-total__left">Обслуживание</div>
      <div class="print-total__dotted"></div>
      <div class="print-total__right">200</div>
    </div>
    <div class="print-total">
      <div class="print-total__left">К оплате</div>
      <div class="print-total__dotted"></div>
      <div class="print-total__right">100</div>
    </div>
    <!-- <button @click="print()">print</button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      store: null,
    };
  },
  fetchOnServer: false,
  fetch() {
    this.store = this.$store.state.busketData.busket;
    if (!this.store) {
      this.$router.push("/");
    } else {
      this.store.busket.forEach((product) => {
        product.total = parseInt(product.price) * parseInt(product.count);
      });
    }
  },
  mounted() {
    let vm = this;
    setTimeout(function () {
      window.print();
      setTimeout(function () {
        vm.$router.push("/");
        window.close();
      }, 100);
    }, 100);
  },
};
</script>

<style lang="scss">
.print {
  width: 100%;
  &-header {
    display: flex;
    justify-content: center;
    flex-direction: column;
    img {
      width: 3cm;
      height: 3cm;
      margin: 0 auto;
    }
    h1 {
      text-align: center;
      font-size: 0.3cm;
      margin-top: 0.2cm;
    }
  }
  table {
    width: 100%;
    margin-top: 0.3cm;
    td,
    th {
      font-size: 0.3cm;
      padding: 0.15cm 0;
      color: #000;
      font-weight: 400;
    }
  }
  &-dashed {
    width: 100%;
    border-bottom: 1px dashed #000;
    margin: 0.3cm 0;
  }
  &-total {
    display: flex;
    flex: 1;
    font-size: 0.3cm;
    * {
      margin-top: 0.2cm;
    }
    // line-height: 2em;
    // &::after {
    //   content: "";
    //   margin: 0px 4px;
    // background: radial-gradient(
    //   circle at 50% 50%,
    //   rgb(0, 0, 0) 12%,
    //   transparent 100%
    // );
    // background-image: linear-gradient(
    //   to right,
    //   #000 10%,
    //   rgba(255, 255, 255, 0) 0%
    // );
    // background-position: 0 14px;
    // background-size: 10px 1px;
    // background-repeat: repeat-x;
    // background-size: 0.1cm 0.1cm;
    // background-position: 0 0.4cm;
    // background-repeat: repeat-x;

    // flex-grow: 1;
    // order: 2;
    //   flex: 1;
    // }
  }
  &-total__dotted {
    flex: 1;
    border-bottom: 1px dotted #000;
    margin: 0 15px;
    // order: 1;
  }
  &-total__left {
    flex: 0 0 auto;
    // order: 1;
  }
  &-total__right {
    flex: 0 0 auto;
    // order: 3;
  }
}

@media print {
  @page :footer {
    color: #fff;
  }
  @page :header {
    color: #fff;
  }
  @page {
    margin: 0mm;
  }
  body {
    margin: 0.5cm;
  }
}
</style>
