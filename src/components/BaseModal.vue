<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <img :src="imageSrc?.urls?.raw" alt="Clicked image" />
      <div class="image-details">
        <p>{{ imageSrc?.user?.name }}</p>
        <p>{{ imageSrc?.user?.location }}</p>
      </div>
    </div>
    <div @click="closeModal" class="close-button">
      <svg
        fill="#d1d1d1"
        height="20px"
        width="20px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 492 492"
        xml:space="preserve"
      >
        <g>
          <g>
            <path
              d="M300.188,246L484.14,62.04c5.06-5.064,7.852-11.82,7.86-19.024c0-7.208-2.792-13.972-7.86-19.028L468.02,7.872
			c-5.068-5.076-11.824-7.856-19.036-7.856c-7.2,0-13.956,2.78-19.024,7.856L246.008,191.82L62.048,7.872
			c-5.06-5.076-11.82-7.856-19.028-7.856c-7.2,0-13.96,2.78-19.02,7.856L7.872,23.988c-10.496,10.496-10.496,27.568,0,38.052
			L191.828,246L7.872,429.952c-5.064,5.072-7.852,11.828-7.852,19.032c0,7.204,2.788,13.96,7.852,19.028l16.124,16.116
			c5.06,5.072,11.824,7.856,19.02,7.856c7.208,0,13.968-2.784,19.028-7.856l183.96-183.952l183.952,183.952
			c5.068,5.072,11.824,7.856,19.024,7.856h0.008c7.204,0,13.96-2.784,19.028-7.856l16.12-16.116
			c5.06-5.064,7.852-11.824,7.852-19.028c0-7.204-2.792-13.96-7.852-19.028L300.188,246z"
            />
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    imageSrc: {
      type: Array,
      required: true,
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const closeModal = () => {
      emit("close");
    };

    return { closeModal };
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

  .modal-content {
    position: relative;
    padding: 20px;
    border-radius: 12px;
    max-width: 80%;
    max-height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .image-details {
      background: white;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
      padding: 45px 25px;
      align-items: flex-start;
      width: 100%;
      p {
        margin-bottom: 10px;
        &:first-child {
          color: $text-color-1;
          font-size: 20px;
          font-weight: 500;
        }
        &:last-child {
          color: $text-color-2;
          font-size: 16px;
        }
      }
    }

    img {
      max-width: 100%;
      max-height: 80vh;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    }
  }

  .close-button {
    position: absolute;
    top: 20px;
    right: 30px;
    padding: 2px;
    cursor: pointer;
  }
}
</style>
