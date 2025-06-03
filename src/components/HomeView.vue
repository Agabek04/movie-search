<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <div class="absolute left-0 top-0 z-10 w-full">
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
          <span class="px-4 py-2 mx-1"
            >{{ currentPage }} / {{ totalPages }}</span
          >
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
        <div class="mt-4">
          <a href="/upcoming" class="text-2xl ml-10 mb-4">Upcoming</a>
          <div
            class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ml-10 p-5"
          >
            <MovieCard
              v-for="movie in moviesUpcoming.slice(0, 4)"
              :key="movie.id"
              :movie="movie"
            />
          </div>
        </div>
        <div class="mt-4">
          <a href="/popular" class="text-2xl ml-10 mb-4">Popular</a>
          <div
            class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ml-10 p-5"
          >
            <MovieCard
              v-for="movie in moviesPopular.slice(0, 4)"
              :key="movie.id"
              :movie="movie"
            />
          </div>
        </div>
        <div class="mt-4">
          <a class="text-2xl ml-10 mb-10" href="/nowplaying">Top Rated</a>
          <div
            class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ml-10 p-5 mt-5"
          >
            <MovieCard
              v-for="movie in moviesTop.slice(0, 4)"
              :key="movie.id"
              :movie="movie"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Navba from "./Navbar.vue";
import SearchBar from "./SearchBar.vue";
import MovieList from "./MovieList.vue";
import NowPlaying from "./NowPlaying.vue";
import { useMovieSearch } from "../composables/useMovieSearch.js";
import MovieCard from "./MovieCard.vue";
import { useMovieList } from "../composables/nowPlaying.js";
const moviesPopular = ref([]);
const moviesTop = ref([]);
const moviesUpcoming = ref([]);
const { result, fetchMovies } = useMovieList();
onMounted(async () => {
  await fetchMovies("upcoming");
  moviesUpcoming.value = result.value;
  await fetchMovies("popular");
  moviesPopular.value = result.value;
  await fetchMovies("top_rated");
  moviesTop.value = result.value;
});
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
</script>
<style >
#img1 {
  background-image: linear-gradient(
    360deg,
    rgba(0, 0, 0, 0.85) 8%,
    rgba(0, 0, 0, 0.8465) 15.67%,
    rgba(0, 0, 0, 0.8361) 23.33%,
    rgba(0, 0, 0, 0.8187) 31%,
    rgba(0, 0, 0, 0.7944) 38.67%,
    rgba(0, 0, 0, 0.7632) 46.33%,
    rgba(0, 0, 0, 0.725) 54%,
    rgba(0, 0, 0, 0.6868) 61.67%,
    rgba(0, 0, 0, 0.6556) 69.33%,
    rgba(0, 0, 0, 0.6312) 77%,
    rgba(0, 0, 0, 0.6139) 84.67%,
    rgba(0, 0, 0, 0.6035) 92.33%,
    rgba(0, 0, 0, 0.6) 100%
  );
}
div {
  direction: ltr;
}
[dir="ltr" i] {
  unicode-bidi: isolate;
}

img {
  object-fit: cover;
  object-position: center;
}

#movie {
  background: linear-gradient(149deg, #192247 0%, #210e17 96.86%);
}
.loader {
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  border-radius: 50%;
  background: linear-gradient(
        0deg,
        rgb(0 0 0/50%) 30%,
        #0000 0 70%,
        rgb(0 0 0/100%) 0
      )
      50%/8% 100%,
    linear-gradient(90deg, rgb(0 0 0/25%) 30%, #0000 0 70%, rgb(0 0 0/75%) 0)
      50%/100% 8%;
  background-repeat: no-repeat;
  animation: l23 1s infinite steps(12);
}
.loader::before,
.loader::after {
  content: "";
  grid-area: 1/1;
  border-radius: 50%;
  background: inherit;
  opacity: 0.915;
  transform: rotate(30deg);
}
.loader::after {
  opacity: 0.83;
  transform: rotate(60deg);
}
@keyframes l23 {
  100% {
    transform: rotate(1turn);
  }
}
</style>