<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { storeEvaluation } from '../services/salon';
import { useRoute } from 'vue-router';

const toast = useToast();
const route = useRoute();

const id_service_history = ref(route.query.id_service_history);
const user_id = ref(route.query.user_id);



const form = ref({
  comment: '',
  note: '',
  id_service_history: id_service_history.value,
  user_id:user_id.value
});


console.log(id_service_history.value);

const onSubmit = () => {
  storeEvaluation(form.value.note, form.value.comment, form.value.id_service_history,form.value.user_id)
    .then(response => {
      toast.success("Évaluation envoyée avec succès", { timeout: 5000 });
    })
    .catch(error => {
      console.log(error);
      toast.error(`Erreur lors de l'envoi de l'évaluation: ${error.response.data.message}`, { timeout: 5000 });
    });
};
</script>



<template>
  <div class="min-w-screen min-h-screen flex items-center justify-center px-5 py-5 text-black">
    <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
      <h2 class="text-2xl font-semibold mb-6">Évaluation</h2>
      <form @submit.prevent="onSubmit">
        <div class="mb-4">
          <label for="comment" class="block text-sm font-medium text-gray-700">Commentaire</label>
          <textarea v-model="form.comment" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Commentaire"></textarea>
        </div>
        <div class="mb-4">
          <label for="note" class="block text-sm font-medium text-gray-700">Note</label>
          <input type="number" v-model="form.note" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Note">
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
