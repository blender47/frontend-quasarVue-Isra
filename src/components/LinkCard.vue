<script setup>
import { useLinkStore } from "../stores/link-store";
import { useQuasar } from "quasar";
import { useNotify } from "../composables/notifyHook";

const $q = useQuasar();
const useLink = useLinkStore();
const { errorNotify, successNotify } = useNotify();
defineProps({
  link: Object,
});

const deleteLink = async (_id) => {
  $q.dialog({
    title: "Confirma por favor",
    message: "¿Deseas eliminar este elemento?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    // console.log('>>>> OK')
    try {
      await useLink.removeLink(_id);
      //console.log("removido");
      successNotify("Se eliminó el link !!");
    } catch (error) {
      if (error.errors) {
        return error.errors.forEach((item) => {
          errorNotify(item.msg);
        });
      }
      errorNotify(error);
    }
  });
};

const updateLink = async (link) => {
  $q.dialog({
    title: "Actualizar LINK",
    message: "Actualiza aqui tu Link",
    prompt: {
      model: link.longLink,
      type: "text", // optional
    },
    cancel: true,
    persistent: true,
  }).onOk(async (data) => {
    try {
      const newLink = { ...link, longLink: data };
      await useLink.modifiedLink(newLink);
      successNotify("Se actualizó el link !!");
    } catch (error) {
      if (error.errors) {
        return error.errors.forEach((item) => {
          errorNotify(item.msg);
        });
      }
      errorNotify(error);
    }
  });
};

const copyLink = async (nanoLink) => {
  try {
    const path = `${process.env.FRONT_URI}/${nanoLink}`;
    await navigator.clipboard.writeText(path);
    successNotify("Se copió en nanoLink");
  } catch (error) {
    console.log(error);
    errorNotify(error);
  }
};
</script>

<template>
  <q-card class="my-card q-mb-sm">
    <q-card-section>
      <div class="text-overline">{{ link.nanoLink }}</div>
      <div class="text-h5 q-mt-sm q-mb-xs">{{ link.longLink }}</div>
    </q-card-section>
    <q-separator />

    <q-card-actions>
      <q-btn
        flat
        round
        icon="mdi-trash-can-outline"
        color="red"
        @click="deleteLink(link._id)"
      />
      <q-btn flat round icon="mdi-pencil-outline" @click="updateLink(link)" />
      <q-btn flat color="primary" @click="copyLink(link.nanoLink)">
        COPY
      </q-btn>
    </q-card-actions>
  </q-card>
</template>
