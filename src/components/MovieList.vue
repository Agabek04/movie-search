<template>
  <div class="flex flex-col justify-center items-center">
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ml-10">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>

<script setup>
import MovieCard from "./MovieCard.vue";

defineProps(["movies"]);
</script>
 