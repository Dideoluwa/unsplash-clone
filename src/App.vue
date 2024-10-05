<template>
  <div class="app">
    <form class="form" @submit.prevent="searchImageHandler">
      <h2
        class="search-title"
        v-if="queryValue !== null && queryValue !== '' && !isLoading"
      >
        Search Result for <span>"{{ queryValue }}"</span>
      </h2>

      <h2 class="search-title" v-if="isLoading && queryValue !== null">
        Searching for <span>"{{ queryValue }}"</span>
      </h2>

      <div class="input" v-else>
        <img src="./assets/searchIcon.svg" alt="search" />

        <input v-model="query" placeholder="Search for photo" />
      </div>
    </form>

    <BaseLoader v-if="isLoading" />

    <Gallery v-else :images="images" @open-modal="openModal" />

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
import BaseLoader from "./components/BaseLoader.vue";
import Gallery from "./components/Gallery.vue";

const images = ref([]);
const selectedImage = ref(null);
const isModalOpen = ref(false);
const query = ref("");
const isLoading = ref(false);

const queryValue = ref(null);

const fetchImages = async (query) => {
  try {
    isLoading.value = true;
    const { data } = await Api.getUnsplashImages({
      query: query,
      images_no: 8,
    });
    images.value = data.results;
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;

    console.error("Failed to fetch images:", error);
  }
};

const searchImageHandler = () => {
  const queryParams = new URLSearchParams(window.location.search);
  if (query.value !== "") {
    queryParams.set("query", query.value);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${queryParams}`
    );
    const fetchedQuery = queryParams.get("query");
    queryValue.value = fetchedQuery;
    fetchImages(fetchedQuery);
  } else {
    queryValue.value = "";
    queryParams.delete("query");
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${queryParams}`
    );
    fetchImages("african smile");
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
  const queryParams = new URLSearchParams(window.location.search);

  const fetchedQuery = queryParams.get("query");

  queryValue.value = fetchedQuery;

  fetchImages(fetchedQuery || "african smile");
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
    $header-color 335px,
    $body-background-color 335px
  );
  min-height: 100vh;

  .search-title {
    width: 100%;
    color: #2e3851;
    font-size: 42px;
    font-weight: 500;

    span {
      color: #727b8d;
    }

    @media only screen and (max-width: 920px) {
      font-size: 24px;
      width: 100%;
    }
  }

  .form {
    width: 100%;
    padding: 0px 96px;
    margin-top: 96px;
    display: flex;
    flex-direction: column;
    gap: 24px;

    @media only screen and (max-width: 920px) {
      width: 100%;
      padding: 0px 26px;
    }
  }
}
</style>
