import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { useUserStore } from "./user-store";

export const useLinkStore = defineStore("url", () => {
  const userStore = useUserStore();
  const createLink = async (longLink) => {
    try {
      const res = await api({
        method: "POST",
        url: "/links",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
        data: {
          longLink,
        },
      });
      console.log(res.data);
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  return { createLink };
});
