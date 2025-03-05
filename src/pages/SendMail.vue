<!-- src/views/SendMail.vue -->
<template>
    <div class="flex flex-row">
      <div class="flex flex-1 flex_col items-center justify-center">
        <form @submit.prevent="onSubmit" class="flex flex-col gap-3">
          <div class="flex items-center justify-center">
            <h2 class="font-bold text-lg">Invitez vos clients</h2>
          </div>
  
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" v-model="form.email" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Email">
          </div>
  
          <button type="submit" class="w-full bg-black hover:bg-black text-white font-semibold py-2 px-4 rounded-md">
            Envoyer l'invitation     
          </button>
        </form>
      </div>
  
      <div style="width: 45%; position: relative;">
        <img class="h-screen object-cover" src="/images/A Photographer Is Taking Beautiful Photos Of Black Girls Getting Their Hair Done.jpeg" alt="" style="width: 100%;">
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useToast } from 'vue-toastification';
  import axios from 'axios';
  const token = localStorage.getItem("token");
const config = {
    headers: {
        "Authorization": "Bearer " + token
    }
};
  const toast = useToast();
  const form = ref({ email: '' });
  
  const onSubmit = async () => {
    try {
      await axios.post('https://hair-api-main-production.up.railway.app/api/sendInvitation', { email: form.value.email }, config);
      toast.success('Invitation envoyée avec succès');
      form.value.email = '';  
      route.push('/dashboard')
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de l\'invitation');
    }
  };
  </script>
  
  <style scoped>
  /* Vos styles ici */
  </style>
  