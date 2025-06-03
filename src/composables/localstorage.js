import { ref } from "vue";

let savedUsers = ref([]);

const stored = localStorage.getItem("users");
if (stored) {
  savedUsers.value = JSON.parse(stored);
}

const getUsers = () => {
  let users = ref([]);

  const getUser = () => {
    users.value = savedUsers.value;
  };

  const addUser = (name, email, password) => {
    let user = {
      id: savedUsers.value.length + 1,
      name: name,
      email: email,
      password: password,
      login: false,
      favourites: [],
    };
    savedUsers.value.push(user);
    localStorage.setItem("users", JSON.stringify(savedUsers.value));
  };

  return {
    users,
    getUser,
    addUser,
  };
};

export default getUsers;
