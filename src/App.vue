<template>
  <div class="app">
    <form class="input-wrapper" @submit.prevent="searchForImageHandler">
      <div class="input">
        <img src="./assets/searchIcon.svg" alt="search" />

        <input placeholder="Search for photo" />
      </div>
    </form>

    <div class="unsplash-gallery">
      <div class="image-grid">
        <div
          v-for="image in images"
          @click="openModal(image)"
          :key="image.id"
          class="image-item"
        >
          <img
            :src="image?.urls?.regular"
            :alt="image?.alt_description"
            style="width: 100%; height: auto"
          />
          <div class="image-overlay">
            <p>{{ image?.user?.name }}</p>
            <p>{{ image?.user?.location }}</p>
          </div>
        </div>
      </div>
    </div>
    <BaseModal
      v-if="isModalOpen"
      :imageSrc="selectedImage"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Api from "./utils/Api";
import BaseModal from "./components/BaseModal.vue";

const images = ref([]);
const selectedImage = ref(null);
const isModalOpen = ref(false);

const fetchImages = async () => {
  try {
    const { data } = await Api.getUnsplashImages({
      query: "african smile",
      images_no: 8,
    });
    images.value = data.results;
    console.log(data.results);
  } catch (error) {
    this.$toast.error("Failed to fetch images:", error);
  }
};

const openModal = (image) => {
  selectedImage.value = image;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedImage.value = null;
};

onMounted(() => {
  fetchImages();
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
@import "./styles/main.scss";
@import "./styles/variables.scss";

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 65px;
  background: linear-gradient(
    to bottom,
    $header-color 280px,
    $body-background-color 280px
  );
  min-height: 100vh;

  .input-wrapper {
    width: 1450px;
    padding: 0px 126px;
    margin-top: 96px;

    @media only screen and (max-width: 920px) {
      width: 100%;
      padding: 0px 26px;
    }
  }

  .unsplash-gallery {
    margin-bottom: 50px;
    .image-grid {
      columns: 3;
      column-gap: 32px;

      @media only screen and (max-width: 920px) {
        columns: 1;
        column-gap: 32px;
      }

      .image-item {
        width: 303px;
        margin-bottom: 20px;
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
          &:hover {
            transform: scale(1.12);
          }
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 98.9%;
          border-radius: 12px;
          background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.85));
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          color: white;
          padding: 15px 20px;
        }
        .image-overlay p {
          font-size: 20px;
          margin-bottom: 10px;
        }
        .image-overlay p:last-child {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
