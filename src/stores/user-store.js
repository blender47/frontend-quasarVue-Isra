import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import router from "src/router";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const token = ref(null);
  const expiresIn = ref(null);

  const accessa = async (email, password) => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });
      console.log(res.data);
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      sessionStorage.setItem("user", true);
      setTime();
    } catch (error) {
      if (error.response) {
        // La respuesta fue hecha y el servidor respondió con un código de estado
        // que esta fuera del rango de 2xx
        //console.log(error.response.data);
        throw error.response.data;
      } else if (error.request) {
        // La petición fue hecha pero no se recibió respuesta
        // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
        // http.ClientRequest en node.js
        console.log(error.request);
      } else {
        // Algo paso al preparar la petición que lanzo un Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  const register = async (email, password, repassword) => {
    try {
      const res = await api.post("/auth/register", {
        email,
        password,
        repassword,
      });
      console.log(res.data);
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      sessionStorage.setItem("user", true);
      setTime();
    } catch (error) {
      if (error.response) {
        // La respuesta fue hecha y el servidor respondió con un código de estado
        // que esta fuera del rango de 2xx
        //console.log(error.response.data);
        throw error.response.data;
      } else if (error.request) {
        // La petición fue hecha pero no se recibió respuesta
        // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
        // http.ClientRequest en node.js
        console.log(error.request);
      } else {
        // Algo paso al preparar la petición que lanzo un Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  const logout = async () => {
    try {
      await api.get("/auth/logout");
    } catch (error) {
      console.log(error);
    } finally {
      resetStore();
      sessionStorage.removeItem("user");
    }
  };

  const setTime = () => {
    setTimeout(() => {
      refreshToken();
    }, expiresIn.value * 1000 - 6000);
  };

  const refreshToken = async () => {
    try {
      const res = await api.get("/auth/refresh");
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      sessionStorage.setItem("user", true);
      setTime();
    } catch (error) {
      console.log(error);
      sessionStorage.removeItem("user");
    }
  };

  const resetStore = () => {
    token.value = null;
    expiresIn.value = null;
  };

  return {
    token,
    expiresIn,
    accessa,
    refreshToken,
    logout,
    register,
  };
});
