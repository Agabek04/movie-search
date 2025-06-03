<template>
  <div class="relative py-6">
    <Swiper
      :modules="[Navigation, Autoplay]"
      :slides-per-view="5"
      :space-between="5"
      :autoplay="{ delay: 1500 }"
      :breakpoints="{
        320: { slidesPerView: 4 },
        640: { slidesPerView: 6 },
        1024: { slidesPerView: 10 },
      }"
      :navigation="{
        nextEl: '.next-btn',
        prevEl: '.prev-btn',
      }"
      :loop="true"
      class="mySwiper"
    >
      <SwiperSlide v-for="person in cast" :key="person.id" class="text-center">
        <img
          :src="getProfileUrl(person.profile_path)"
          alt=""
          class="w-24 h-24 mx-auto rounded-full object-cover border border-gray-600"
        />
        <p class="text-sm text-white mt-2 font-medium truncate">
          {{ person.name }}
        </p>
        <p class="text-xs text-gray-400 italic truncate">
          {{ person.character }}
        </p>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css/autoplay";
import "swiper/css";
import "swiper/css/navigation";
const API_TOKEN = import.meta.env.VITE_API_TOKEN;
const API_URL = import.meta.env.VITE_API_URL;

const props = defineProps({
  movieId: Number,
});

const cast = ref([]);

const getProfileUrl = (path) => {
  return path
    ? `https://image.tmdb.org/t/p/w185${path}`
    : "https://via.placeholder.com/150x225?text=No+Image";
};

const fetchCast = async () => {
  try {
    const res = await axios.get(`${API_URL}/movie/${props.movieId}/credits`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    cast.value = res.data.cast;
  } catch (err) {
    console.error("Cast yuklanmadi:", err);
  }
};

onMounted(fetchCast);
</script>


