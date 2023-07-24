<script setup>
import { useLinkStore } from "../stores/link-store";
import AddLink from "src/components/AddLink.vue";
import LinkCard from "src/components/LinkCard.vue";
const useLink = useLinkStore();
</script>

<template>
  <q-page padding>
    <AddLink class="q-mb-xl"></AddLink>
    <!-- <pre>
      {{ useLink.links }}
    </pre> -->
    <template v-for="link in useLink.links" :key="link._id">
      <LinkCard :link="link"></LinkCard>
    </template>
  </q-page>
</template>
