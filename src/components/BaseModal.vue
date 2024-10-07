<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div
      class="modal-overlay__content"
      :class="{
        'modal-overlay__content--animate-fade-in': isModalOpen && !isFadingOut,
        'modal-overlay__content--animate-fade-out': isFadingOut,
      }"
    >
      <img :src="imageSrc?.urls?.regular" alt="Clicked image" />
      <div class="modal-overlay__content--image-details">
        <p>{{ imageSrc?.user?.name }}</p>
        <p>{{ imageSrc?.user?.location }}</p>
      </div>
    </div>
    <div @click="closeModal" class="modal-overlay__close-button">
      <img src="../assets/close-icon.svg" alt="close" />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    imageSrc: {
      type: Array,
      required: true,
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const isModalOpen = ref(true);
    const isFadingOut = ref(false);

    const closeModal = () => {
      isFadingOut.value = true;
      setTimeout(() => {
        emit("close");
        isModalOpen.value = false;
      }, 500);
    };

    return { closeModal, isModalOpen, isFadingOut };
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  &__content {
    position: relative;
    padding: 20px;
    border-radius: 12px;
    max-width: 70%;
    max-height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media only screen and (max-width: 920px) {
      max-width: 95%;
      max-height: 95%;
    }

    &--image-details {
      background: white;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
      padding: 45px 25px;
      align-items: flex-start;
      width: 100%;

      @media only screen and (max-width: 920px) {
        padding: 25px 10px;
      }
      p {
        margin-bottom: 10px;
        &:first-child {
          color: $text-color-1;
          font-size: 20px;
          font-weight: 500;

          @media only screen and (max-width: 920px) {
            font-size: 18px;
          }
        }
        &:last-child {
          color: $text-color-2;
          font-size: 16px;

          @media only screen and (max-width: 920px) {
            font-size: 14px;
          }
        }
      }
    }

    img {
      max-width: 100%;
      max-height: 70vh;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    }
  }

  &__content--animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }

  &__content--animate-fade-out {
    animation: fadeOut 0.5s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(20px);
    }
  }

  &__close-button {
    position: absolute;
    top: 20px;
    right: 30px;
    padding: 2px;
    cursor: pointer;
  }
}
</style>
