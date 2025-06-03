import { ref, watch } from "vue";

const users = ref(JSON.parse(localStorage.getItem("users")) || []);
const user = ref(null);

watch(
  users,
  (newUsers) => {
    localStorage.setItem("users", JSON.stringify(newUsers));
  },
  { deep: true }
);


export function useFavourite(router) {
  const isFavourite = (mov) => {

    const loggedUser = users.value.find((u) => u.login === true);
    if (!loggedUser) return false;
    return loggedUser.favourites.some((m) => m.id === mov.id);
  };

  const toggleFavourite = (mov) => {
    user.value = users.value.find((u) => u.login === true);
    if (!user.value) {
      router.push("/signin");
      return;
    }

    const index = users.value.findIndex((u) => u.login === true);
    const existingIndex = user.value.favourites.findIndex(
      (m) => m.id === mov.id
    );

    if (existingIndex === -1) {
      user.value.favourites.push(mov);
    } else {
      user.value.favourites.splice(existingIndex, 1);
    }

    users.value.splice(index, 1, { ...user.value });
  };

  return {
    isFavourite,
    toggleFavourite,
  };
}
