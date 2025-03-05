<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { getSalonId, updateSalon } from '../services/auth';
import { useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();

const form = ref({
  salon_name: '',
  email: '',
  phone_number: '',
  address: '',
  website: '',
  opening_hours: '',
  creation_date: '',
  last_update_date: '',
  image: '',
  longitude: '',
  latitude: '',
  description: '',
  percent: '',
  percent_cancel: '',  // nullable mais mis par défaut comme requis
    heure_debut: '',
    heure_fin: ''
});

const fetchSalonData = async () => {
  try {
    const response = await getSalonId();
    const data = response.data.data;
    console.log('Salon Data:', data); // Debugging: affiche les données du salon dans la console
    Object.assign(form.value, data);
    form.value.image = ''; // Clear image field to avoid displaying old image path
  } catch (error) {
    toast.error("Erreur lors de la récupération des informations du salon", { timeout: 5000 });
    console.error(error);
  }
};

onMounted(() => {
  fetchSalonData();
});

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  form.value.image = file;
};

const onSubmit = async () => {
  try {
    const formData = new FormData();
    for (const key in form.value) {
      formData.append(key, form.value[key]);
    }

    await updateSalon(form.value.id_salon, form.value); // Utilisez l'ID du salon dans le formulaire pour la mise à jour
    toast.success("Salon mis à jour avec succès", { timeout: 5000 });
    router.push('/dashboard'); // Redirigez vers la page de détails du client après la mise à jour
  } catch (error) {
    toast.error(`Erreur lors de la mise à jour du salon: ${error.response.data.message}`, { timeout: 5000 });
    console.error(error);
  }
};
</script>

<template>
  <div class="flex flex-row">
    <div class="flex items-center justify-center flex-1 flex_col">
      <form @submit.prevent="onSubmit" class="flex flex-col gap-3">
        <div class="flex items-center justify-center">
          <h2 class="text-lg font-bold">Modifier les informations du salon</h2>
        </div>
        <div class="mb-4">
          <label for="salon_name" class="block text-sm font-medium text-gray-700">Nom du salon</label>
          <input type="text" v-model="form.salon_name" class="mt-1 block w-[400px] p-2 border border-gray-300 rounded-md" placeholder="Nom du salon">
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
          <label for="website" class="block text-sm font-medium text-gray-700">Site web</label>
          <input type="text" v-model="form.website" class="block w-full p-2 mt-1 border border-gray-300 rounded-md" placeholder="Site web">
        </div>
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea v-model="form.description" class="block w-full p-2 mt-1 border border-gray-300 rounded-md" placeholder="Description"></textarea>
        </div>
        <div class="mb-4">
          <label for="opening_hours" class="block text-sm font-medium text-gray-700">Heures d'ouverture</label>
          <textarea v-model="form.opening_hours" class="block w-full p-2 mt-1 border border-gray-300 rounded-md" placeholder="Heures d'ouverture"></textarea>
        </div>
        <div class="mb-4">
          <label for="creation_date" class="block text-sm font-medium text-gray-700">Date de création</label>
          <input type="date" v-model="form.creation_date" class="block w-full p-2 mt-1 border border-gray-300 rounded-md">
        </div>
        <div class="mb-4">
          <label for="last_update_date" class="block text-sm font-medium text-gray-700">Dernière date de modification</label>
          <input type="date" v-model="form.last_update_date" class="block w-full p-2 mt-1 border border-gray-300 rounded-md">
        </div>
        <div class="mb-4">
          <label for="longitude" class="block text-sm font-medium text-gray-700">Longitude</label>
          <input type="text" v-model="form.longitude" class="block w-full p-2 mt-1 border border-gray-300 rounded-md" placeholder="Longitude">
        </div>
        <div class="mb-4">
          <label for="latitude" class="block text-sm font-medium text-gray-700">Latitude</label>
          <input type="text" v-model="form.latitude" class="block w-full p-2 mt-1 border border-gray-300 rounded-md" placeholder="Latitude">
        </div>
        <div class="mb-4">
          <label for="image" class="block text-sm font-medium text-gray-700">Image</label>
          <input type="file" id="image" name="image" @change="handleFileUpload" class="block w-full p-2 mt-1 border border-gray-300 rounded-md">
        </div>
        <div class="mb-4">
          <label for="percent" class="block text-sm font-medium text-gray-700">Pourcentage</label>
          <input type="number" v-model="form.percent" class="block w-full p-2 mt-1 border border-gray-300 rounded-md" placeholder="percent">
        </div>
       
        <div class="mb-4">
          <label for="percent_cancel" class="block text-sm font-medium text-gray-700">Pourcentage d'annulation</label>
          <input type="number" v-model="form.percent_cancel" class="block w-full p-2 mt-1 border border-gray-300 rounded-md" placeholder="percent_cancel">
        </div> 
        <div class="mb-4">
          <label for="heure_debut" class="block text-sm font-medium text-gray-700">Heure d'ouverture</label>
          <input type="time" v-model="form.heure_debut" class="block w-full p-2 mt-1 border border-gray-300 rounded-md" placeholder="heure_debut">
        </div>
        <div class="mb-4">
          <label for="heure_fin" class="block text-sm font-medium text-gray-700">Heure de fermeture</label>
          <input type="time" v-model="form.heure_fin" class="block w-full p-2 mt-1 border border-gray-300 rounded-md" placeholder="heure_fin">
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
