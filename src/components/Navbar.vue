<template>
  <div class="px-4 py-6">
    <header class="flex justify-between items-center mb-6 px-8">
      <a href="/" class="hover:cursor-pointer"
        ><h1 class="text-3xl font-bold">🎬 Movie Search</h1></a
      >
      <button
        v-if="!logined"
        class="px-4 py-2 bg-gray-500 hover:bg-gray-700 rounded-lg text-white font-semibold"
        @click="signIN"
      >
        Sign In
      </button>
      <div v-else class="relative inline-block">
        <button
          @click="togleMenu"
          class="hover:cursor-pointer hover:bg-gray-500 rounded-lg border border-transparent"
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
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>
        <div
          v-if="showMenu"
          class="absolute right-0 mt-2 w-25 bg-gray-700 border rounded-lg shadow-lg z-10"
        >
          <ul>
            <li
              
              class="px-4 py-2 hover:bg-gray-400 cursor-pointer rounded-lg"
            >
             <a href="/favourites">Favourites</a> 
            </li>
            <li
            
              class="px-4 py-2 hover:bg-gray-400 cursor-pointer rounded-lg"
            >
             <a href="/">Log Out</a> 
            </li>
          </ul>
        </div>
      </div>
    </header>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
const showMenu = ref(false);
const users = ref([]);
const stored = JSON.parse(localStorage.getItem("users"));
const logined = ref(false);
const index = ref();
if (stored) {
  users.value = stored;

  const user = users.value.find((user) => user.login === true);
  index.value = users.value.indexOf(user);
  if (user) {
    logined.value = true;
  }
}
const signIN = () => {
  router.push("/signin");
};

const togleMenu = () => {
  showMenu.value = !showMenu.value;
};
const goToFavourites = () => {
  router.push("/favourites");
};
const logout = () => {
  logined.value = false;
  users.value[index.value].login = logined.value;
  localStorage.setItem("users", JSON.stringify(users.value));
  router.push("/");
};
</script>