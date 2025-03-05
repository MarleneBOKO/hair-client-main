<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const token = localStorage.getItem("token");
const config = {
    headers: {
        "Authorization": "Bearer " + token
    }
};
const accessoires = ref([]);
const router = useRouter();
const toast = useToast();

onMounted(async () => {
    try {
        const response = await fetch('https://hair-api-main-production.up.railway.app/api/accessory', config);
        const data = await response.json();
        accessoires.value = data.accessoires;
    } catch (error) {
        console.error('Error fetching accessories:', error);
    }
});

const onDelete = async (id) => {
    if (confirm("Êtes-vous sûr de vouloir retirer cet accessoire ?")) {
        try {
            await fetch(`https://hair-api-main-production.up.railway.app/api/accessory/${id}`, {
                method: 'DELETE',
                headers: {
                    ...config.headers,
                    'Content-Type': 'application/json'
                },
            });
            accessoires.value = accessoires.value.filter(item => item.id_accessory !== id);
            toast.success("Accessoire retiré avec succès", { timeout: 5000 });
        } catch (error) {
            console.error('Error deleting accessory:', error);
            toast.error("Erreur lors de la suppression de l'accessoire", { timeout: 5000 });
        }
    }
};
</script>

<template>
  <div class="flex flex-col">
    <div class="p-6 bg-gray-100 mb-20">
      <div class="flex justify-between">
        <nav class="text-sm font-semibold mb-6" aria-label="Breadcrumb">
          <ol class="list-none p-0 inline-flex">
            <li class="flex items-center text-[#667D45]">
              <a href="#" class="text-gray-700">Home</a>
              <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
              </svg>
            </li>
            <li class="flex items-center">
              <a href="#" class="text-gray-600">Dashboard</a>
            </li>
          </ol>
        </nav>
        <div class="lg:flex justify-between items-center mb-6">
          <router-link to="" class="bg-[#EFE6D8] hover:bg-[#e0dbd2] focus:outline-none rounded-lg px-6 py-2 text-white font-semibold shadow">Ajouter un Accessoire</router-link> 
        </div>
      </div>
      <div class="flex flex-col p-6 gap-4">
        <div class="grid grid-cols-4 bg-gray-400 p-3 rounded-t-lg">
          <span class="ml-4">Nom</span>
          <span class="ml-4">Prix</span>
          <span class="ml-4">Description</span>
          <span class="ml-4">Action</span>
        </div>
        <div v-for="accessoire in accessoires" :key="accessoire.id_accessory" class="grid grid-cols-4 bg-gray-200 p-3 rounded-lg">
          <span class="ml-4">{{ accessoire.name }}</span>
          <span class="ml-4">{{ accessoire.price }} FCFA</span>
          <span class="ml-4">{{ accessoire.description }}</span>
          <div class="ml-4">
            <router-link :to="{ name: 'UpdateAccessoire', params: { id_accessory: accessoire.id_accessory } }">
              <button class="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Modifier</button>
            </router-link>
            <button @click="onDelete(accessoire.id_accessory)" class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md">
              Retirer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid-cols-4 {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.bg-gray-400 {
  background-color: #cbd5e0;
}

.bg-gray-200 {
  background-color: #edf2f7;
}

button {
  margin-right: 0.5rem;
}

.ml-4 {
  margin-left: 1rem;
}

span {
  word-wrap: break-word;
  white-space: normal;
}
</style>
