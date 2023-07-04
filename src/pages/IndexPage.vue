<template>
  <q-page padding>
    <q-btn
      @click="
        useLink.createLink(
          'https://www.neoguias.com/como-conectarse-a-mysql-usando-node-js/'
        )
      "
      >Crear link</q-btn
    >
    <pre>
      {{ useLink.links }}
    </pre>
  </q-page>
</template>

<script setup>
import { useLinkStore } from "../stores/link-store";
const useLink = useLinkStore();
</script>
