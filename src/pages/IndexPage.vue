<template>
  <q-page padding>
    <q-btn @click="userStore.accessa">Ingresar</q-btn>
    <q-btn @click="userStore.createLink">Crear link</q-btn>
    <q-btn @click="userStore.logout">Cerrar sesión</q-btn>
    {{ userStore.expiresIn }}
    {{ userStore.token }}
  </q-page>
</template>

<script setup>
import { api } from "src/boot/axios";
import { useUserStore } from "../stores/user-store";

const userStore = useUserStore();

//userStore.refreshToken();

const createLink = async () => {
  try {
    const res = await api({
      method: "POST",
      url: "/links",
      headers: {
        Authorization: "Bearer " + token.value,
      },
      data: {
        longLink: "https://programmerclick.com/article/28371161293/",
      },
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
</script>
