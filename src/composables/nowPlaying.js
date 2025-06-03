import { ref } from "vue";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;
const tmdb = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export function useMovieList() {
  const result = ref([]);
  const load = ref(false);
  const erro = ref(null);
  const totalPage = ref(1);
  const currentPages = ref(1);
  const currentQuery = ref("");

  const fetchMovies = async (listType, page = 1) => {
    load.value = true;
    erro.value = null;

    if (listType !== currentQuery.value) {
      currentPages.value = 1;
      currentQuery.value = listType;
    } else {
      currentPages.value = page;
    }

    try {
      const res = await tmdb.get(`/movie/${currentQuery.value}`, {
        params: {
          page: currentPages.value,
          language: "en-US",
        },
      });

      result.value = res.data.results;
      totalPage.value = res.data.total_pages;
    } catch (err) {
      erro.value = err;
      result.value = [];
    } finally {
      load.value = false;
    }
  };

  function goToPages(page) {
    if (page >= 1 && page <= totalPage.value) {
      fetchMovies(currentQuery.value, page);
    }
  }

  return {
    result,
    load,
    erro,
    currentPages,
    totalPage,
    fetchMovies,
    goToPages,
  };
}
