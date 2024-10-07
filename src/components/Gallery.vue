<template>
  <div class="gallery">
    <div class="gallery__image-grid">
      <div
        v-for="image in images"
        :key="image.id"
        class="gallery__image-grid--item"
        @click="openModal(image)"
      >
        <img
          :src="image?.urls?.regular"
          :alt="image?.alt_description"
          style="width: 100%; height: auto"
        />

        <div class="gallery__image-grid--item--overlay">
          <p>{{ image?.user?.name }}</p>
          <p>{{ image?.user?.location }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseGallery",
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  emits: ["open-modal"],
  setup(props, { emit }) {
    const openModal = (image) => {
      emit("open-modal", image);
    };

    return {
      openModal,
    };
  },
});
</script>

<style lang="scss" scoped>
.gallery {
  margin-bottom: 50px;
  &__image-grid {
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

    &--item {
      width: 283px;
      margin-bottom: 28px;
      position: relative;
      overflow: hidden;
      min-height: 300px;
      cursor: pointer;
      border-radius: 12px;
      transition: transform 0.5s ease;

      &:hover {
        transform: scale(0.95);
      }

      img {
        max-width: 100%;
        height: auto;
        min-height: 300px;
        border-radius: 12px;
        object-fit: cover;
        z-index: 10;
        transition: transform 0.5s ease;
      }

      &--overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 12px;
        background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.85));
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        color: white;
        padding: 15px 20px;
        transition: transform 0.5s ease;
      }
      &:hover img {
        transform: scale(1.12);
      }
      &--overlay p {
        font-size: 20px;
        margin-bottom: 10px;
      }
      &--overlay p:last-child {
        font-size: 16px;
      }
    }
  }
}
</style>
