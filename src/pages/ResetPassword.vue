<script setup>
import { ref } from 'vue';
import { useToast } from "vue-toastification";
import { resetPassword } from '../services/auth';
import { useRoute, useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();
const route = useRoute();

const form = ref({
  email: route.query.email || '',
  token: route.query.token || '',
  password: '',
  password_confirmation: ''
});

const errors = ref({
  email: '',
  token: '',
  password: '',
  password_confirmation: ''
});

const onSubmit = () => {
  const { email, token, password, password_confirmation } = form.value;
  resetPassword(email, token, password, password_confirmation)
    .then(response => {
      toast.success("Votre mot de passe a été réinitialisé avec succès.", { timeout: 5000 });
      router.push('/login');
    })
    .catch(error => {
      console.log(error);
      toast.error(`Erreur lors de la réinitialisation du mot de passe: ${error.response.data.message}`, { timeout: 5000 });
      errors.value = error.response.data.errors;
    });
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen px-5 py-5 text-black min-w-screen">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 class="mb-6 text-2xl font-semibold">Réinitialisation du mot de passe</h2>
      <form @submit.prevent="onSubmit">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">E-mail</label>
          <input type="email" v-model="form.email" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="E-mail">
          <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email[0] }}</p>
        </div>
        <div class="mb-4">
          <label for="token" class="block text-sm font-medium text-gray-700">Token</label>
          <input type="text" v-model="form.token" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Token">
          <p v-if="errors.token" class="mt-1 text-sm text-red-500">{{ errors.token[0] }}</p>
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
          <input type="password" v-model="form.password" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Nouveau mot de passe">
          <p v-if="errors.password" class="mt-1 text-sm text-red-500">{{ errors.password[0] }}</p>
        </div>
        <div class="mb-4">
          <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirmez le mot de passe</label>
          <input type="password" v-model="form.password_confirmation" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Confirmez le mot de passe">
          <p v-if="errors.password_confirmation" class="mt-1 text-sm text-red-500">{{ errors.password_confirmation[0] }}</p>
        </div>
        <button type="submit" class="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
          Réinitialiser le mot de passe
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Ajoutez ici les styles personnalisés si nécessaire */
</style>
