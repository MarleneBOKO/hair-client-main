<template>
    <div class="flex flex-row">
      <div class="flex flex-1 flex_col items-center justify-center">
        <form @submit.prevent="onSubmit" class="flex flex-col gap-3">
          <div class="flex items-center justify-center">
            <h2 class="font-bold text-lg">Modifier les informations de la coiffure</h2>
          </div>
          <div class="grid grid-cols-2 gap-20 p-8">
            
  
            <div>
              <div class="mb-4">
                <label for="price" class="block text-gray-700 font-bold mb-2">Prix :</label>
                <input type="number" v-model="form.price" id="price" name="price" required class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
              </div>
  
              <div class="mb-4">
                <label for="nb_employe" class="block text-gray-700 font-bold mb-2">Nombre d'employés :</label>
                <input type="number" v-model="form.nb_employe" id="nb_employe" name="nb_employe" required class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
              </div>
            </div>
          </div>
  
          <button type="submit" class="w-full bg-black hover:bg-black text-white font-semibold py-2 px-4 rounded-md">
            Mettre à jour
          </button>
          
          <div v-if="message" class="message">{{ message }}</div>
        </form>
      </div>
    </div>
  </template>
<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { getCoiffureInfo, UpdateCoiffure } from '../services/auth';
import { useRouter, useRoute } from 'vue-router';

const toast = useToast();
const router = useRouter();
const route = useRoute();
const id_coiffure = ref(route.params.id_coiffure);

const form = ref({
    
    price: null,
    nb_employe: null
});

const fetchCoiffureData = async () => {
  try {
    const response = await getCoiffureInfo(id_coiffure.value);
    const data = response.data.data;
    console.log('Coiffure Data:', data); // Debugging: affiche les données de la coiffure dans la console
    Object.assign(form.value, {
      name: data.name,
      description: data.description,
      image: data.image,
      image1: data.image1,
      image2: data.image2,
      price: data.price,
      nb_employe: data.nb_employe
    });
  } catch (error) {
    toast.error("Erreur lors de la récupération des informations de la coiffure", { timeout: 5000 });
    console.error(error);
  }
};

onMounted(() => {
  fetchCoiffureData();
});

const onSubmit = async () => {
  try {
    const formData = {
      price: form.value.price,
      nb_employe: form.value.nb_employe
    };

    await UpdateCoiffure(id_coiffure.value, form.value);
    toast.success("Coiffure mise à jour avec succès", { timeout: 5000 });
    router.push('/hairstyles')
  } catch (error) {
    toast.error(`Erreur lors de la mise à jour de la coiffure: ${error.response.data.message}`, { timeout: 5000 });
    console.error(error);
  }
};
</script>
  