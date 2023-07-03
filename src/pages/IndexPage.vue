<template>
  <q-page padding>
    <q-btn @click="useLink.createLink('https://www.google.com.mx/')"
      >Crear link</q-btn
    >
  </q-page>
</template>

<script setup>
import { useLinkStore } from "../stores/link-store";
const useLink = useLinkStore();
</script>
