<template>
  <div class="auth">
    <div class="auth-pin">
      <div
        v-for="item in 6"
        :key="item"
        class="auth-pin__block"
        :style="{ background: pincode.length >= item ? '#77a648' : null }"
      ></div>
    </div>
    <div class="auth-wrapper">
      <div
        class="auth-btn"
        v-for="number in btnList"
        :key="number.value"
        v-html="number.label"
        @click="clickPin(number.value)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "empty",
  data() {
    return {
      pincode: [],
      btnList: [
        {
          value: 1,
          label: "1",
        },
        {
          value: 2,
          label: "2",
        },
        {
          value: 3,
          label: "3",
        },
        {
          value: 4,
          label: "4",
        },
        {
          value: 5,
          label: "5",
        },
        {
          value: 6,
          label: "6",
        },
        {
          value: 7,
          label: "7",
        },
        {
          value: 8,
          label: "8",
        },
        {
          value: 9,
          label: "9",
        },
        {
          value: 10,
          label: "<i class='bx bx-trash'></i>",
        },
        {
          value: 0,
          label: "0",
        },
        {
          value: 11,
          label: "<i class='bx bx-arrow-back'></i>",
        },
      ],
    };
  },
  fetchOnServer: false,
  async fetch() {},
  methods: {
    clickPin(val) {
      if (this.pincode.length > 0) {
        if (val === 11) {
          this.pincode.pop();
        } else if (val === 10) {
          this.pincode = [];
        } else {
          if (this.pincode.length === 6) {
            console.log("kek");
          } else {
            val === 11 || val === 10 ? null : this.pincode.push(val);
          }
        }
      } else {
        val === 11 || val === 10 ? null : this.pincode.push(val);
      }
    },
  },
};
</script>

<style lang="scss">
.auth {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: #fafafa;
  position: fixed;
  top: 0;
  left: 0;

  &-wrapper {
    width: 100%;
    min-width: 200px;
    max-width: 400px;
    border-radius: 15px;
    transition: all 0.25s ease;
    padding: 26px 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    column-gap: 20px;
    row-gap: 20px;
    overflow: auto;
    padding: 20px;
    @include less-than(tablet) {
      max-width: 350px;
    }
  }
  &-btn {
    padding: 36%;
    background: #fff;
    box-shadow: 0px 2px 32px rgba(0, 0, 0, 0.05);
    border-radius: 100%;
    text-align: center;
    cursor: pointer;
    transition: all ease 0.3s;
    font-size: 20px;
    font-weight: 500;

    &:active {
      transform: scale(0.9);
      background: rgb(227, 227, 227);
    }
  }
  &-pin {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  &-pin__block {
    margin: 0 10px;
    padding: 10px;
    box-shadow: 0px 0px 7px #ccc;
    border-radius: 100%;
  }
}
</style>
