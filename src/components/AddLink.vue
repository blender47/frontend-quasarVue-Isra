<script setup>
import { ref } from "vue";
import { useLinkStore } from "src/stores/link-store";
import { useNotify } from "../composables/notifyHook";

const useLink = useLinkStore();
const { showNotify } = useNotify();
const loading = ref();
const formAdd = ref(null);
const link = ref();
const addLink = async () => {
  try {
    loading.value = true;
    await useLink.createLink(link.value);
    showNotify("Link agregado exitosamente", "green");
    link.value = "";
    formAdd.value.resetValidation();
  } catch (error) {
    if (error.errors) {
      return error.errors.forEach((item) => {
        showNotify(item.msg);
      });
    }
    showNotify(error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <q-form @submit.prevent="addLink" ref="formAdd">
    <q-input
      v-model="link"
      label="Ingrese su link aqui"
      :rules="[
        (val) =>
          (val && val.trim() !== '') || 'Tienes que escribir algo a huevo',
      ]"
      lazy-rules
    >
    </q-input>
    <q-btn
      label="Agregar"
      class="q-mt-sm full-width"
      color="primary"
      type="submit"
      :loading="loading"
    >
    </q-btn>
  </q-form>
</template>
