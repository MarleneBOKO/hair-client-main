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
  <div class="min-w-screen min-h-screen flex items-center justify-center px-5 py-5 text-black">
    <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
      <h2 class="text-2xl font-semibold mb-6">Mot de passe oublié</h2>
      <form @submit.prevent="onSubmit">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">E-mail</label>
          <input type="email" v-model="form.email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="E-mail">
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email[0] }}</p>
        </div>
        <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md">
          Envoyer
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Ajoutez ici les styles personnalisés si nécessaire */
</style>
