<template>
  <div>
    <img
      src="https://assets.nflxext.com/ffe/siteui/vlv3/202ac35e-1fca-44f0-98d9-ea7e8211a07c/web/NL-en-20250512-TRIFECTA-perspective_54c0321f-5111-4876-a41e-afeed05841fb_large.jpg"
      alt=""
      class="w-full h-screen"
    />
    <div
      dir="ltr"
      id="img1"
      class="absolute left-0 top-0 flex flex-col items-start z-1 w-full h-screen"
    ></div>
  </div>
  <div
    class="fixed inset-0 z-10 min-h-screen flex items-center justify-center text-white px-4"
  >
    <div class="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
      <h2 class="text-3xl font-bold mb-6 text-center">Sign In</h2>

      <form @submit.prevent="signIN" class="flex flex-col space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email Address"
          class="px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Login
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-400">
        Don't have an account?
        <a href="/signup" class="text-blue-400 hover:underline">Sign Up</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import getUsers from "../composables/localstorage.js";
import { ref } from "vue";
import { useRouter } from "vue-router";
let email = ref("");
let password = ref("");
const index = ref();
const router = useRouter();
const { users, getUser, addUser } = getUsers();
getUser();
const signIN = () => {
  const user = users.value.find(
    (user) => user.email === email.value && user.password === password.value
  );
  if (user) {
    index.value = users.value.indexOf(user);
    users.value[index.value].login = true;
    localStorage.setItem("users", JSON.stringify(users.value));
    email.value = "";
    password.value = "";
    router.push("/");
  } else {
    alert("username or password is not correct");
    email.value = "";
    password.value = "";
  }
};
</script>