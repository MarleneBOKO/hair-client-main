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
  <div class="flex items-center justify-center min-h-screen px-5 py-5 text-black min-w-screen">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 class="mb-6 text-2xl font-semibold">Évaluation</h2>
      <form @submit.prevent="onSubmit">
        <div class="mb-4">
          <label for="comment" class="block text-sm font-medium text-gray-700">Commentaire</label>
          <textarea v-model="form.comment" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Commentaire"></textarea>
        </div>
        <div class="mb-4">
          <label for="note" class="block text-sm font-medium text-gray-700">Note</label>
          <input type="number" v-model="form.note" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Note">
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
