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

export function useMovieSearch() {
  const results = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const totalPages = ref(1);
  const currentPage = ref(1);
  const currentQuery = ref("");

  const searchMovies = async (query, page = 1) => {
    loading.value = true;
    error.value = null;

    if (query !== currentQuery.value) {
      currentPage.value = 1;
      currentQuery.value = query;
    } else {
      currentPage.value = page;
    }

    try {
      const res = await tmdb.get("/search/movie", {
        params: {
          query: currentQuery.value,
          page: currentPage.value,
        },
      });

      results.value = res.data.results;
      totalPages.value = res.data.total_pages;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
      searchMovies(currentQuery.value, page);
    }
  }

  return {
    results,
    loading,
    error,
    currentPage,
    totalPages,
    searchMovies,
    goToPage,
  };
}
