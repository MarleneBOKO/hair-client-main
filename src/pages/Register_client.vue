<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { register_client } from '../services/auth';
import { useRoute } from 'vue-router';

const toast = useToast();
const route = useRoute();

const domain = ref(route.params.subdomain);

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  domain: domain.value  
});

const onSubmit = () => {
  register_client(
    form.value.name,
    form.value.email,
    form.value.password,
    form.value.password_confirmation,
    form.value.domain
  )
    .then(response => {
      toast.success("Inscription réussie", { timeout: 5000 });
    })
    .catch(error => {
      console.log(error);
      toast.error(`Erreur lors de l'inscription: ${error.response.data.message}`, { timeout: 5000 });
    });
};
</script>

<template>
  <div class="min-w-screen min-h-screen flex items-center justify-center px-5 py-5 text-black">
    <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
      <h2 class="text-2xl font-semibold mb-6">Inscription</h2>
      <form @submit.prevent="onSubmit">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Nom</label>
          <input type="text" v-model="form.name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Nom">
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" v-model="form.email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Email">
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input type="password" v-model="form.password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Mot de passe">
        </div>
        <div class="mb-4">
          <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
          <input type="password" v-model="form.password_confirmation" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Confirmer le mot de passe">
        </div>
        <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md">
          Inscrire
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Ajoutez ici les styles personnalisés si nécessaire */
</style>
