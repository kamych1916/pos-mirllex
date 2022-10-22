<template>
  <div class="main">
    <div class="main-container">
      <div class="main-welcome">
        <div class="main-welcome__info">
          <h1>Mirllex Pos</h1>
          <h2>Автоматизация вашего бизнеса</h2>
          <div style="display: flex">
            <div
              @click="checkAuth()"
              style="margin-right: 10px"
              class="main-welcome__info-link"
            >
              Войти
            </div>
            <div
              style="margin-left: 10px"
              class="main-welcome__info-link"
              @click="scrollToElement()"
            >
              Оставить заявку
            </div>
          </div>
          <!-- <button type="button">Подробнее</button> -->
        </div>
        <img src="/img/MirllexPosSphere.jpg" alt="" />
      </div>
    </div>
    <div class="main-container" ref="scrollToMe">
      <div class="main-about">
        <div class="main-about__wrapper">
          <div class="main-about__title">
            <div>
              Mirllex Pos это облачное решение <br />
              для быстрого старта небольших заведений 🚀 <br /><br />
            </div>
            <div>Одна POS-система решает все вопросы:</div>
            <ul>
              <li>онлайн-касса</li>
              <li>склад</li>
              <li>финансы</li>
              <li>аналитика и CRM.</li>
            </ul>
            <div>
              *Стоимость использования зависит <br />
              от вашего бизнеса.
              <br />
              <br />
              <br />

              Оставьте заявку на приобретение, <br />
              свяжемся с вами в кратчайшие сроки 😉
            </div>
            <div class="main-about__form">
              <input type="text" placeholder="Имя и Фамилия" />
              <input type="text" placeholder="Номер телефона" />
              <input type="text" placeholder="Электронная почта" />
              <input type="text" placeholder="Вид заведения" />
              <button type="button">Отправить</button>
            </div>
          </div>
          <div class="main-about__img">
            <img src="/img/pos-1.png" alt="" />
            <img src="/img/pos-2.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    if (process.client) {
      document.body.className = "main";
      document.getElementsByTagName("html")[0].className = "main";
    }
  },
  methods: {
    scrollToElement() {
      const el = this.$refs.scrollToMe;
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    checkAuth() {
      if (this.$auth.loggedIn) {
        this.$router.push("/busket");
      } else {
        this.$router.push("/login");
      }
    },
  },
  beforeDestroy() {
    if (process.client) {
      document.body.classList.remove("main");
      // document.getElementsByTagName("html")[0].remove("main");
    }
  },
};
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  width: 100%;

  &-container {
    height: 100%;
    padding: 12px;
    margin: 0 auto;
    @include less-than(laptop_l) {
      width: 100%;
    }
    @include more-than(laptop_l) {
      width: 1400px;
    }
  }

  &-welcome {
    background-color: #c2e1b9;
    position: relative;
    z-index: 1;
    border-radius: 12px;
    height: 100%;
    overflow: hidden;
    margin: 0 auto;
    color: #fff;
    flex-flow: column nowrap;
    align-items: stretch;
    display: flex;
    justify-content: center;
    @include less-than(laptop) {
      justify-content: flex-start;
    }

    img {
      z-index: -1;
      top: 0;
      left: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      max-height: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      background-color: #c2e1b9;
      border-radius: 12px;
      object-fit: cover;

      @include less-than(laptop_l) {
        object-position: 40%;
      }
      @include less-than(laptop_l) {
        object-position: 35%;
      }
      @include less-than(laptop) {
        object-position: 65% 300px;
      }
      @include less-than(tablet) {
        object-position: 56% 240px;
      }
      @include more-than(laptop_l) {
        width: 1400px;
      }
    }
  }
  &-welcome__info {
    margin-bottom: 10%;
    margin-left: 50px;
    width: fit-content;
    height: fit-content;
    text-align: center;
    @include less-than(laptop) {
      margin-left: 0px;
      margin-bottom: 0%;
      margin-top: 5%;
      width: 100%;
    }
    @include less-than(tablet) {
      margin-top: 20%;
    }
    h1 {
      font-size: 5vw;
      font-family: "Nunito-Bold";
      @include less-than(laptop) {
        font-size: 12vw;
      }
    }
    h2 {
      font-size: 1.5vw;
      font-family: "Nunito-Bold";
      @include less-than(laptop) {
        font-size: 2.5vw;
      }
      @include less-than(tablet) {
        font-size: 4.5vw;
      }
    }
    button {
      cursor: pointer;
      margin-top: 30px;
      text-shadow: 0px 1px 20px rgba(0, 0, 0, 0.2);
      color: #fff;
      padding: 20px 50px;
      border: 1px solid #fff;
      background: none;
      border-radius: 16px;
      transition: all ease 0.6s;
      letter-spacing: 2px;
      &:hover {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.3);
      }
      @include less-than(laptop) {
        margin-top: 30px;
      }
      @include less-than(tablet) {
        margin-top: 15px;
        padding: 10px 40px;
        font-size: 12px;
      }
    }
  }
  &-welcome__info-link {
    flex: 1;
    margin-bottom: 20px;
    margin-top: 30px;
    width: fit-content;
    text-shadow: 0px 1px 20px rgba(0, 0, 0, 0.2);
    color: #fff;
    padding: 10px 5px;
    border: 1px solid #fff;
    background: none;
    transition: all ease 0.6s;
    letter-spacing: 2px;
    cursor: pointer;
    font-family: "Nunito-Bold";

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
    @include less-than(laptop) {
      margin-top: 30px;
    }
    @include less-than(tablet) {
      font-size: 14px;
      width: 50%;
      flex: inherit;
      margin: 0 20px;
      margin-top: 15px;
      padding: 10px 0;
      letter-spacing: 0px;
      border-radius: 12px;
    }
  }

  &-about {
    margin-top: 50px;
    padding-bottom: 100px;
  }
  &-about__wrapper {
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    @include less-than(tablet) {
      flex-direction: column-reverse;
    }
    img {
      width: 100%;
      border-radius: 10px;
      margin-right: 20px;
      &:nth-last-child(1) {
        margin-right: 0px;
      }
    }
  }
  &-about__title {
    flex: 1;
    font-size: 25px;
    color: #fff;
    text-shadow: 0px 1px 20px rgba(0, 0, 0, 0.2);
    @include less-than(laptop_xl) {
      font-size: 1.2vw;
    }
    @include less-than(laptop_l) {
      font-size: 1.5vw;
    }
    @include less-than(laptop) {
      flex: 1;
      font-size: 1.8vw;
    }
    @include less-than(tablet) {
      padding: 0 10px;
      font-size: 4vw;
    }
    ul,
    li {
      padding-top: 5px;
      margin-left: 10.5px;
    }
    ul {
      margin-top: 10px;
      margin-bottom: 20px;
    }
  }
  &-about__form {
    gap: 10px;
    margin-top: 20px;
    width: 80%;
    @include less-than(tablet) {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;
    }
    input {
      width: 80%;
      background: none;
      color: #fff;
      padding: 10px 20px;
      margin-top: 10px;
      border-bottom: 1px solid #fff;
      &::placeholder {
        color: #fff;
      }
    }
    button {
      width: 80%;
      margin-top: 30px;
      display: block;
      font-size: 18px;
      padding: 10px 40px;
      color: #fff;
      background: none;
      border: 1px solid #fff;
      cursor: pointer;
      transition: all ease 0.6s;
      &:hover {
        background: rgba(255, 255, 255, 0.2);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.3);
      }
    }
  }
  &-about__img {
    flex: 1.8;
    overflow: auto;
    white-space: nowrap;
    border-radius: 10px;
    height: fit-content;
    padding-bottom: 16px;
    width: 50%;
    margin: 0 auto;
    @include less-than(laptop_l) {
      flex: 1.2;
    }
    @include less-than(tablet) {
      width: 100%;
      margin-bottom: 30px;
    }
  }
}

::-webkit-scrollbar {
  height: 8px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(45, 43, 43, 0.466);
  border-radius: 10px;
}
</style>
