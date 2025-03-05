<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { getClientId, updateClient } from '../services/auth';
import { useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();

const clientId = ref(null);
const form = ref({
  name: '',
  email: '',
  phone_number: '',
  address: '',
  birth_date: '',
  gender: '',
  notes: ''
});

const fetchClientData = async () => {
  try {
    const response = await getClientId();
    const data = response.data.data;
    console.log('Client Data:', data); 
    Object.assign(form.value, data);
  } catch (error) {
    toast.error("Erreur lors de la récupération des informations du client", { timeout: 5000 });
    console.error(error);
  }
};

const fetchClientId = async () => {
  try {
    const response = await getClientId();
    clientId.value = response.data.data;
  } catch (error) {
    toast.error("Erreur lors de la récupération de l'ID du client", { timeout: 5000 });
    console.error(error);
  }
};

onMounted(() => {
  fetchClientData();
  fetchClientId();
});

const onSubmit = () => {
    updateClient(clientId.value.id_client, form.value)
    .then(response => {
      toast.success("Client mis à jour avec succès", { timeout: 5000 });
       router.push('/dashboarclient'); //Redirigez vers la page de détails du client après la mise à jour
    })
    .catch(error => {
      toast.error(`Erreur lors de la mise à jour du client: ${error.response.data.message}`, { timeout: 5000 });
      console.error(error);
    });
};
</script>

<template>
  <div class="flex flex-row">
    <div class="flex items-center justify-center flex-1 flex_col">
      <form @submit.prevent="onSubmit" class="flex flex-col gap-3">
        <div class="flex items-center justify-center">
          <h2 class="text-lg font-bold">Modifier les informations du client</h2>
        </div>
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Nom</label>
          <input type="text" v-model="form.name" class="mt-1 block w-[400px] p-2 border border-gray-300 rounded-md" placeholder="Nom">
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" v-model="form.email" class="block w-full p-2 mt-1 border border-gray-300 rounded-md" placeholder="Email">
        </div>
        <div class="mb-4">
          <label for="phone" class="block text-sm font-medium text-gray-700">Téléphone</label>
          <input type="text" v-model="form.phone_number" class="block w-full p-2 mt-1 border border-gray-300 rounded-md" placeholder="Téléphone">
        </div>
        <div class="mb-4">
          <label for="address" class="block text-sm font-medium text-gray-700">Adresse</label>
          <input type="text" v-model="form.address" class="block w-full p-2 mt-1 border border-gray-300 rounded-md" placeholder="Adresse">
        </div>
        <div class="mb-4">
          <label for="birth_date" class="block text-sm font-medium text-gray-700">Date de naissance</label>
          <input type="date" v-model="form.birth_date" class="block w-full p-2 mt-1 border border-gray-300 rounded-md">
        </div>
        <div class="mb-4">
          <label for="gender" class="block text-sm font-medium text-gray-700">Genre</label>
          <input type="text" v-model="form.gender" class="block w-full p-2 mt-1 border border-gray-300 rounded-md" placeholder="Genre">
        </div>
        <div class="mb-4">
          <label for="notes" class="block text-sm font-medium text-gray-700">Notes</label>
          <textarea v-model="form.notes" class="block w-full p-2 mt-1 border border-gray-300 rounded-md" placeholder="Notes"></textarea>
        </div>
        <button type="submit" class="w-full px-4 py-2 font-semibold text-white bg-black rounded-md hover:bg-black">
          Mettre à jour
        </button>
        <div v-if="message" class="message">{{ message }}</div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.message {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}
</style>
