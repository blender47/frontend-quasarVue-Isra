<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user-store";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const formAdd = ref(null);
const $q = useQuasar();
const handleSubmit = async () => {
  try {
    console.log("pasaromn las validaciones");
    await userStore.accessa(email.value, password.value);
    router.push("/");
    email.value = "";
    password.value = "";
    formAdd.value.resetValidation();
  } catch (error) {
    console.log(error);
    alertDialogBackend(error.error);
  }
};

const alertDialogBackend = (message = "Error en el servidor") => {
  $q.dialog({
    title: "Alert",
    message,
  });
};
</script>

<template>
  <q-page class="row justify-center">
    <div class="col-12 col-sm-6 col-md-5">
      <h3>Login</h3>
      <q-form @submit.prevent="handleSubmit" ref="formAdd">
        <q-input
          v-model="email"
          label="Ingrese Email"
          :rules="[
            (val) =>
              (val && /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val)) ||
              'Formato email incorrecto',
          ]"
          lazy-rules
        ></q-input>
        <q-input
          v-model="password"
          label="Ingrese Password"
          type="password"
          :rules="[
            (val) =>
              (val && val.length > 5) ||
              'Contraseña debe ser mayor a 5 caracters',
          ]"
          lazy-rules
        ></q-input>
        <q-btn label="Login" type="submit"></q-btn>
      </q-form>
    </div>
  </q-page>
</template>
