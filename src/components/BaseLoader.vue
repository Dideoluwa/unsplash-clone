<template>
  <div class="loader">
    <div class="loader__container" v-for="n in 6" :key="n">
      <div class="loader__placeholder">
        <div class="loader__placeholder-line"></div>
        <div
          class="loader__placeholder-line loader__placeholder-line--shorter"
        ></div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.loader {
  columns: 3;
  column-gap: 48px;

  @media only screen and (max-width: 920px) {
    columns: 2;
    column-gap: 24px;
  }

  @media only screen and (max-width: 540px) {
    columns: 1;
    column-gap: 12px;
  }
  &__container {
    background-color: #f5f5f5;
    border-radius: 12px;
    padding: 16px;
    min-height: 300px;

    width: 303px;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
    cursor: pointer;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    color: white;

    &:nth-child(1) {
      height: 350px;
    }

    &:nth-child(2) {
      height: 370px;
    }

    &:nth-child(3) {
      height: 300px;
    }

    &:nth-child(4) {
      height: 405px;
    }

    &:nth-child(5) {
      height: 455px;
    }

    &:nth-child(6) {
      height: 505px;
    }

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: -150px;
      height: 100%;
      width: 100%;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      animation: loading 1.5s infinite;
    }
  }

  &__placeholder {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;

    &-line {
      height: 20px;
      background-color: #e0e0e0;
      border-radius: 4px;
      width: 80%;

      &--shorter {
        width: 60%;
      }
    }
  }
}

@keyframes loading {
  0% {
    left: -150px;
  }
  50% {
    left: 100%;
  }
  100% {
    left: -150px;
  }
}
</style>
