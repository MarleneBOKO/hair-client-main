<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const token = localStorage.getItem("token");
const config = {
    headers: {
        "Authorization": "Bearer " + token
    }
};
const hairstyles = ref([]);
const toast = useToast();

onMounted(async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/getAllcoiffures', config);
    const data = await response.json();
    hairstyles.value = data.data;
    console.log(hairstyles.value);
  } catch (error) {
    console.error('Error fetching hairstyles:', error);
  }
});
const confirmDelete = (id) => {
  console.log(id);
  if (window.confirm("Êtes-vous sûr de vouloir supprimer cette coiffure ?")) {
    onDelete(id);
  }
};

const onDelete = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/coiffures/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });
    if (!response.ok) {
      throw new Error('La suppression de la coiffure a échoué');
    }
    toast.success("Coiffure retirée avec succès", { timeout: 5000 });
    hairstyles.value = hairstyles.value.filter(hairstyle => hairstyle.id_coiffure !== id);
  } catch (error) {
    console.error('Error deleting hairstyle:', error);
    toast.error(`Erreur lors de la suppression de la coiffure: ${error.message}`, { timeout: 5000 });
  }
};
</script>


<template>
  <div class="flex flex-col">
    <div class="p-6 mb-20 bg-gray-100">
      <div class="flex justify-between">
        <nav class="mb-6 text-sm font-semibold" aria-label="Breadcrumb">
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center text-[#667D45]">
              <a href="#" class="text-gray-700">Home</a>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li class="flex items-center">
              <a href="#" class="text-gray-600">Dashboard</a>
            </li>
          </ol>
        </nav>
        <div class="items-center justify-between mb-6 lg:flex">
          <router-link to="" class="bg-[#EFE6D8] hover:bg-[#e0dbd2] focus:outline-none rounded-lg px-6 py-2 text-white font-semibold shadow">Ajouter une coiffure</router-link>
        </div>
      </div>  
      <div class="flex flex-col gap-4 p-6">
        <div class="grid grid-cols-3 gap-8 mt-8">
          <div v-for="hairstyle in hairstyles" :key="hairstyle.id" class="p-4 bg-white rounded-lg shadow-md">
            <img :src="`http://127.0.0.1:8000/storage/${hairstyle.image}`" :alt="hairstyle.name" class="object-cover mb-4 rounded-lg h-60 w-96">
            <div class="flex flex-row gap-3">
              <img :src="`http://127.0.0.1:8000/storage/${hairstyle.image1}`" :alt="hairstyle.name" class="object-cover mb-4 rounded-lg h-12 w-12">
              <img :src="`http://127.0.0.1:8000/storage/${hairstyle.image2}`" :alt="hairstyle.name" class="object-cover mb-4 rounded-lg h-12 w-12">

            </div>
            <div class="flex flex-col items-center">
              <span class="text-lg font-semibold">{{ hairstyle.name }}</span>
                 
              <div class="flex justify-between w-full mt-4">
              

                <button type="button" @click="confirmDelete(hairstyle.id_coiffure)" class="px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600">Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
</div>
</div>
</template>
  

 

<style lang="scss" scoped>

</style>