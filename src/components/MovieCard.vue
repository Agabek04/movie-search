<template>

  <div
    class="bg-gray-800 rounded-2xl shadow-lg overflow-hidden relative w-[300px] h-[400px] text-white"
  >
    <button
      class="absolute left-0 top-0 w-full h-full hover:cursor-pointer"
      @click="goToMovieInfo(movie)"
    ></button>
    <img
      :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
      alt="Poster"
      class="w-full h-[280px] object-cover"
    />
    <div class="p-4 flex justify-between">
      <div class="">
        <h2 class="text-lg font-semibold mb-1">{{ movie.title }}</h2>
        <p
          v-if="movie.release_date"
          class="text-sm text-gray-400 mb-2 font-bold"
        >
          {{ movie.release_date.slice(0, 4) }}
        </p>
      </div>
      <div class="flex flex-col items-center space-y-6">
        <div
          class="relative w-10 h-10 rounded-full flex items-center justify-center"
          :style="{
            background: `conic-gradient(#22c55e ${
              Math.floor(movie.vote_average * 10) * 3.6
            }deg, #e5e7eb 0deg)`,
          }"
        >
          <div
            class="absolute w-8 h-8 bg-white rounded-full flex items-center justify-center"
          >
            <span class="text-xs font-bold text-black">{{
              Math.floor(movie.vote_average * 10) / 10
            }}</span>
          </div>
        </div>
        <button
          class="text-white hover:text-red-500 rounded-full border w-8 h-8 flex items-center justify-center z-10"
          :class="{ 'bg-red-500': added }"
          @click="toggleFavourite(movie)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useFavourite } from '../composables/favorite.js'

const props = defineProps({ movie: Object })

const router = useRouter()
const { isFavourite,toggleFavourite } = useFavourite(router)

const added = computed(() => isFavourite(props.movie))
const goToMovieInfo = (m) => {
  router.push({
    name: "MovieInfo",
    params: { id: m.id },
  });
};
</script>