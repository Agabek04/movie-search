<template>
  <div class="absolute left-0 top-0 z-10 w-full text-white">
    <Navba />

    <div class="flex flex-col justify-center items-center pb-8">
      <p class="text-2xl mb-4">My Favourite Movies</p>
      <div
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ml-10"
      >
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>
    </div>
  </div>
</template>
<script setup>
import Navba from "./Navbar.vue";
import { ref } from "vue";
import MovieCard from "./MovieCard.vue";
defineProps(["movies"]);
const users = ref([]);
const movies = ref([]);
const stored = JSON.parse(localStorage.getItem("users"));
if (stored) {
  users.value = stored;
  const user = users.value.find((user) => user.login === true);
  movies.value = user.favourites;
}
</script>