<script setup>
import { ref } from 'vue';
import { useToast } from "vue-toastification";
import { forgotPassword } from '../services/auth';
import { useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();

const form = ref({
  email: ''
});

const errors = ref({
  email: ''
});

const onSubmit = () => {
  const { email } = form.value;
  forgotPassword(email)
    .then(response => {
      toast.success("Un lien de réinitialisation a été envoyé à votre adresse e-mail.", { timeout: 5000 });
      router.push('/reset-password');
    })
    .catch(error => {
      console.log(error);
      toast.error(`Erreur lors de l'envoi du lien de réinitialisation: ${error.response.data.message}`, { timeout: 5000 });
      errors.value = error.response.data.errors;
    });
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen px-5 py-5 text-black min-w-screen">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 class="mb-6 text-2xl font-semibold">Mot de passe oublié</h2>
      <form @submit.prevent="onSubmit">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">E-mail</label>
          <input type="email" v-model="form.email" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="E-mail">
          <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email[0] }}</p>
        </div>
        <button type="submit" class="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
          Envoyer
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Ajoutez ici les styles personnalisés si nécessaire */
</style>
