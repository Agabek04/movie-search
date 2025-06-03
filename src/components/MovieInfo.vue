<template>
  <div class="absolute left-0 top-0 z-10 w-full">

    <div v-if="loading" class="text-center mt-10 z-30 text-white">
     <div>
        <div class="text-center my-4 text-xl">⏳ Loading...</div>
     </div>
   </div>
   <div v-if="movie && !loading" class="bg-gray-800 relative">
     <div>
       <img
         :src="getBackDropUrl(movie.backdrop_path, movie.poster_path)"
         class="h-screen"
       />
       <div
         dir="ltr"
         id="img1"
         class="absolute left-0 top-0 z-1 w-full h-screen"
       ></div>
     </div>
     <div class="absolute left-0 top-0 z-10">
       <div class="flex flex-row space-x-4 p-16">
         <div>
           <img
             :src="getPosterUrl(movie.poster_path)"
             alt=""
             class="h-[450px] w-[300px] rounded-lg"
           />
           <div class="flex justify-between items-center mt-4">
             <button
               class="flex text-white hover:cursor-pointer text-2xl space-x-2"
               @click="openTrailer"
             >
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 fill="none"
                 viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor"
                 class="size-9"
               >
                 <path
                   stroke-linecap="round"
                   stroke-linejoin="round"
                   d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                 />
                 <path
                   stroke-linecap="round"
                   stroke-linejoin="round"
                   d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                 />
               </svg>
               <p>Trailer</p>
             </button>
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
         <div class="text-white w-[1200px] font-semibold text-xl">
           <p class="text-4xl font-bold">
             {{ movie.title }} ({{ movie.release_date.slice(0, 4) }})
           </p>
           <p>
             Release Date:
             <span class="text-base">{{ movie.release_date }}</span>
           </p>
           <p>
             Runtime: <span class="text-base">{{ runtime(movie.runtime) }}</span>
           </p>
           <div>
             <h3 class="text-lg font-semibold text-white mb-2 mt-2">Genres:</h3>
             <ul class="flex flex-wrap gap-2">
               <li
                 v-for="genre in movie.genres"
                 :key="genre.id"
                 class="bg-gray-600 text-white text-sm px-3 py-1 rounded-full"
               >
                 {{ genre.name }}
               </li>
             </ul>
           </div>
           <p class="text-gray-400 mt-2">{{ movie.tagline }}</p>
           <p class="mt-2">Overview</p>
           <p class="text-base font-normal">{{ movie.overview }}</p>
           <div class="w-[1100px] mt-2">
             <p>Actors</p>
             <Actors :movieId="movie.id" />
           </div>
         </div>
       </div>
       <div v-if="isOpen" class="fixed left-0 top-0 z-20 w-full h-screen">
         <button
           @click="isOpen = !isOpen"
           class="relative w-full h-screen bg-black opacity-60 hover:cursor-pointer"
         ></button>
         <div class="absolute left-80 top-20 w-[800px] h-[500px]">
           <div class="relative mt-6 mx-auto w-full max-w-7xl">
             <iframe
               class="w-[900px] h-[520px] rounded"
               :src="`https://www.youtube.com/embed/${videoKey}`"
               frameborder="0"
               allow="autoplay; encrypted-media"
               allowfullscreen
             ></iframe>
           </div>
         </div>
       </div>
     </div>
   </div>
  </div>
 
</template>
<script setup>
import Actors from "./Actors.vue";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper/modules";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { useFavourite } from "../composables/favorite.js";
const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

const router = useRouter();
const route = useRoute();
const { isFavourite, toggleFavourite } = useFavourite(router);

import "swiper/css/autoplay";
import "swiper/css";
import "swiper/css/navigation";
const movieId = route.params.id;
const movie = ref(null);
const videoKey = ref(null);
const isOpen = ref(false);
const added = computed(() => isFavourite(movie.value));
const loading=ref(false)
onMounted(async () => {
  loading.value=true
  const res = await fetch(`${API_URL}/movie/${movieId}?api_key=${API_KEY}`);
  movie.value = await res.json();

  try {
    const response = await fetch(
      `${API_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
    );
    const data = await response.json();

    const trailer = data.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    if (trailer) {
      videoKey.value = trailer.key;
    }
  } catch (error) {
    console.error("Video olishda xatolik:", error);
  }finally{
    loading.value=false
  }
});

const getPosterUrl = (path1) => {
  return path1
    ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${path1}`
    : "https://via.placeholder.com/200x300?text=No+Image";
};

const getBackDropUrl = (path1, path2) => {
  return (
    path1,
    path2
      ? `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${path1}`
      : `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${path2}`
  );
};
const getProfileUrl = (path) => {
  return path
    ? `https://image.tmdb.org/t/p/w185${path}`
    : "https://via.placeholder.com/150?text=No+Image";
};
const runtime = (time) => {
  return parseInt(time / 60) + "h " + (time % 60) + "m";
};

const openTrailer = () => {
  if (videoKey) {
    isOpen.value = !isOpen.value;
  }
};
</script>


