<template>
  <div class="footer">
    <div class="footer-item">
      <span>
        <i class="bx bx-notepad"></i>
      </span>
    </div>
    <div class="footer-item footer-item--active">
      <span>
        <i class="bx bx-store"></i>
      </span>
    </div>
    <div class="footer-item">
      <span>
        <i class="bx bx-line-chart"></i>
      </span>
    </div>
    <div class="footer-item">
      <span>
        <i class="bx bxs-cog"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.footer {
  display: flex;
  &-item {
    width: 55px;
    height: 55px;
    background: #e6e6e6;
    border-radius: 10px;
    margin-right: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      background: #f2f2f2;
      border-radius: 20px;
    }
  }
  &-item--active {
    span {
      background: #77a648;
      color: #fff;
    }
  }
}
</style>
