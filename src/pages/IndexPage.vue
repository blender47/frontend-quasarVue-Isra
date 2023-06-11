<template>
  <q-page padding>
    <q-btn @click="accessa">Ingresar</q-btn>
    <q-btn @click="createLink">crear link</q-btn>
    {{ expiresIn }}
    {{ token }}
  </q-page>
</template>

<script setup>
import { api } from "src/boot/axios";
import { ref } from "vue";

const token = ref("");
const expiresIn = ref("");

const accessa = async () => {
  try {
    const res = await api.post("/auth/login", {
      email: "abc@abc.com",
      password: "123123",
    });
    console.log(res.data);
    token.value = res.data.token;
    expiresIn.value = res.data.expiresIn;
    setTime();
  } catch (error) {
    console.log(error);
  }
};

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
    setTime();
  } catch (error) {
    console.log(error);
  }
};
refreshToken();
</script>
