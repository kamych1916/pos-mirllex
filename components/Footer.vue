<template>
  <div class="footer">
    <NuxtLink
      to="/busket"
      class="footer-item"
      exact-active-class="footer-item--active"
    >
      <span>
        <i class="bx bx-store"></i>
      </span>
    </NuxtLink>
    <NuxtLink
      to="/storage"
      class="footer-item"
      exact-active-class="footer-item--active"
    >
      <span>
        <i class="bx bx-download"></i>
      </span>
    </NuxtLink>
    <NuxtLink
      to="/analytics"
      class="footer-item"
      exact-active-class="footer-item--active"
    >
      <span>
        <i class="bx bx-line-chart"></i>
      </span>
    </NuxtLink>
    <NuxtLink
      to="/calendar"
      class="footer-item"
      exact-active-class="footer-item--active"
    >
      <span>
        <i class="bx bx-calendar"></i>
      </span>
    </NuxtLink>
    <NuxtLink
      to="/settings"
      class="footer-item"
      exact-active-class="footer-item--active"
    >
      <span>
        <i class="bx bx-cog"></i>
      </span>
    </NuxtLink>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.footer {
  display: flex;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  border-radius: 12px;
  margin: 20px;
  @include less-than(tablet) {
    border-radius: 0px;
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.5);
    margin: 0px;
  }

  &-item {
    width: 55px;
    height: 55px;
    border-radius: 10px;
    margin-right: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    @include less-than(tablet) {
      flex: 1;
    }
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      // background: #f2f2f2;
      border-radius: 6px;
    }
  }
  &-item--active {
    span {
      background: #5fbd00;
      color: #fff;
    }
  }
}
</style>
