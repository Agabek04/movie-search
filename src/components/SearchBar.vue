<template>
  <div class="flex justify-center mb-8">
    <input
      v-model="searchQuery"
      @keyup.enter="emitSearch"
      type="text"
      placeholder="Search for a movie..."
      class="w-full max-w-sm px-4 py-2 rounded-l-lg bg-gray-800 text-white focus:outline-none"
    />
    <button
      @click="emitSearch"
      class="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-r-lg"
    >
      🔎
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
const searchQuery = ref("");
const isSearch = ref(false);
const emit = defineEmits(["search", "isSearch"]);

function emitSearch() {
  emit("search", searchQuery.value);
  isSearch.value = !isSearch.value;
  emit("isSearch", isSearch.value);
}
</script>
