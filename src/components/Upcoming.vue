<script setup>
import { onMounted, ref } from "vue";
import MovieCard from "./MovieCard.vue";
import Navba from "./Navbar.vue";
import SearchBar from "./SearchBar.vue";
import MovieList from "./MovieList.vue";
import { useMovieList } from "../composables/nowPlaying.js";
import { useMovieSearch } from "../composables/useMovieSearch.js";

const {
  results,
  loading,
  error,
  currentPage,
  totalPages,
  searchMovies,
  goToPage,
} = useMovieSearch();

const isSearch = ref(false);
function handleSearch(query) {
  if (query.trim()) {
    searchMovies(query);
  }
}
function handleIsSearch(val) {
  isSearch.value = val;
}
const { result, currentPages, totalPage, load, fetchMovies, goToPages } =
  useMovieList();
onMounted(async () => {
  fetchMovies("upcoming");
});
</script>

<template>
  <div class="absolute left-0 top-0 z-10 w-full text-white">
    <Navba />
    <SearchBar @search="handleSearch" @isSearch="handleIsSearch" />

    <div v-if="isSearch">
      <div v-if="loading" class="text-center my-4 text-xl">⏳ Loading...</div>

      <div v-if="error" class="text-center text-red-400 my-4">
        ❌ {{ error.message || "Something went wrong" }}
      </div>

      <MovieList v-if="!loading && results.length" :movies="results" />

      <div
        v-if="!loading && results.length === 0 && isSearch"
        class="text-center text-xl mt-4"
      >
        🔍 Movies not found.
      </div>
      <div class="flex justify-center mt-6 pb-4" v-if="totalPages > 1">
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-4 py-2 mx-1 bg-gray-700 rounded"
        >
          ⬅️ Prev
        </button>
        <span class="px-4 py-2 mx-1">{{ currentPage }} / {{ totalPages }}</span>
        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 mx-1 bg-gray-700 rounded"
        >
          Next ➡️
        </button>
      </div>
    </div>
    <div v-else class="flex flex-col justify-center items-center">
      <p class="text-2xl font-bold ml-10 mb-5">Upcoming Movies</p>
      <div v-if="load" class="text-center my-4 text-xl">⏳ Loading...</div>
      <div
        v-if="!load && result.length"
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ml-10"
      >
        <MovieCard v-for="movie in result" :key="movie.id" :movie="movie" />
      </div>
      <div class="flex justify-center mt-6 pb-4" v-if="totalPage > 1">
        <button
          @click="goToPages(currentPages - 1)"
          :disabled="currentPages === 1"
          class="px-4 py-2 mx-1 bg-gray-700 rounded"
        >
          ⬅️ Prev
        </button>
        <span class="px-4 py-2 mx-1">{{ currentPages }} / {{ totalPage }}</span>
        <button
          @click="goToPages(currentPages + 1)"
          :disabled="currentPages === totalPage"
          class="px-4 py-2 mx-1 bg-gray-700 rounded"
        >
          Next ➡️
        </button>
      </div>
    </div>
  </div>
</template>
