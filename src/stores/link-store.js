import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { useUserStore } from "./user-store";
import { ref } from "vue";
import { useQuasar } from "quasar";

export const useLinkStore = defineStore("url", () => {
  const userStore = useUserStore();
  const $q = useQuasar();
  const links = ref([]);

  const createLink = async (longLink) => {
    try {
      $q.loading.show();
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
      //console.log(res.data);
      links.value.push(res.data.newLink);
    } catch (error) {
      //console.log(error.response?.data || error);
      throw error.response?.data || error;
    } finally {
      $q.loading.hide();
    }
  };

  const getLinks = async () => {
    try {
      $q.loading.show();
      console.log("llamando links");
      const res = await api({
        method: "GET",
        url: "/links",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      });
      console.log(res.data.links);

      // links.value = res.data.links.map((item) => {
      //   return {
      //     longLink: item.longLink,
      //   };
      // });
      links.value = [...res.data.links]; //otra opcion
    } catch (error) {
      console.log(error.response?.data || error);
    } finally {
      $q.loading.hide();
    }
  };
  //tiene mejor rendimiento
  getLinks();

  const removeLink = async (_id) => {
    try {
      $q.loading.show();
      await api({
        url: `/links/${_id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      });
      links.value = links.value.filter((item) => item._id !== _id);
    } catch (error) {
      console.log(error.response?.data || error);
    } finally {
      $q.loading.hide();
    }
  };

  const modifiedLink = async (newLink) => {
    try {
      $q.loading.show();
      await api({
        url: `links/${newLink._id}`,
        method: "PATCH",
        data: { longLink: newLink.longLink },
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      });
      links.value = links.value.map((item) =>
        item._id === newLink._id ? newLink : item
      );
    } catch (error) {
      console.log(error.response?.data || error);
      throw error.response?.data || error;
    } finally {
      $q.loading.hide();
    }
  };

  return { createLink, links, removeLink, modifiedLink };
});
