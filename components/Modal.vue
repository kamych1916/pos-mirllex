<template>
  <div class="modal">
    <form class="modal-wrapper">
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        "
      >
        <div style="text-transform: capitalize; font-size: 18px">
          {{ title }}
        </div>
        <div class="modal-close" @click="$emit('close')">
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 256 256"
            id="Flat"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M202.82861,197.17188a3.99991,3.99991,0,1,1-5.65722,5.65624L128,133.65723,58.82861,202.82812a3.99991,3.99991,0,0,1-5.65722-5.65624L122.343,128,53.17139,58.82812a3.99991,3.99991,0,0,1,5.65722-5.65624L128,122.34277l69.17139-69.17089a3.99991,3.99991,0,0,1,5.65722,5.65624L133.657,128Z"
            />
          </svg>
        </div>
      </div>

      <slot />
    </form>
  </div>
</template>

<script>
import bodyScroll from "@/plugins/BodyScroll.js";
export default {
  props: {
    modal: {
      type: Boolean,
      default: false,
    },
    title: {
      default: "",
      type: String,
    },
  },
  created() {
    bodyScroll.disable();
  },

  destroyed() {
    bodyScroll.enable();
  },
};
</script>

<style lang="scss">
.modal {
  background: rgba(37, 37, 37, 0.7);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 80px;
  padding-bottom: 80px;
  transition: all ease 0.6s;
}
.modal-wrapper {
  background: #fff;
  position: relative;
  min-width: 350px;
  border-radius: 16px;
  -webkit-transition: all 0.25s ease;
  transition: all 0.25s ease;
  -webkit-box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.5);
  box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.5);
  max-width: 550px;
  max-height: 600px;
  margin: auto;
  padding: 20px;
  transition: all ease 0.6s;
  overflow-y: auto;
  overflow-x: hidden;

  @include less-than(tablet) {
    max-width: 350px;
    max-height: 500px;
  }

  input,
  select,
  textarea {
    display: block;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    margin: 10px 0;
    border-radius: 12px;
    appearance: none;
  }
  button {
    padding: 10px 20px;
    border-radius: 12px;
    cursor: pointer;
    margin-top: 10px;
  }
}

.modal-close {
  border-radius: 12px;
  // padding: 6px 20px;
  // background: #0c872e;
  font-size: 20px;
  color: #000;
  width: fit-content;
  text-align: end;
  cursor: pointer;
}
</style>
