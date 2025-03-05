<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const router = useRouter();

const route = useRoute();
const salon = ref({});

const token = localStorage.getItem("token");
const config = {
  headers: {
    "Authorization": `Bearer ${token}`
  }
};

const salon_id = route.params.id;
console.log("ID du salon:", salon_id);

const getSalonDetails = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/getsalondata/${salon_id}`, config);
    salon.value = response.data.data;
    console.log("Détails du salon:", salon.value);
  } catch (error) {
    console.error("Erreur lors de la récupération des détails du salon :", error);
  }
};
const activateSalon = async () => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/api/ActiveSalon/${salon_id}`, {}, config);
    console.log(response.data.message);
    router.push('/dashboardad');
  } catch (error) {
    console.error("Erreur lors de l'activation du salon :", error);
  }
};

onMounted(() => {
  getSalonDetails();
});
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <div class="mb-6 text-center">
      <h2 class="mb-2 text-2xl font-semibold">Numéro IFU</h2>
      <p class="text-lg text-gray-700">{{ salon.ifu || 'Non disponible' }}</p>
    </div>
    <div class="mb-6 text-center">
      <h2 class="mb-2 text-2xl font-semibold">Photos Soumises</h2>
     
      <div v-if="salon.photo1 || salon.photo2" class="flex justify-center gap-4">
        <div class="flex flex-col gap-3 justify-between">
          <img v-if="salon.photo1" :src="`http://127.0.0.1:8000/storage/${salon.photo1}`" alt="Photo 1" class="object-cover w-64 h-64 rounded-lg shadow-lg">
          <span>Photo 1</span>
          </div>
          <div class="flex flex-col gap-3 justify-between">
            <img v-if="salon.photo2" :src="`http://127.0.0.1:8000/storage/${salon.photo2}`" alt="Photo 2" class="object-cover w-64 h-64 rounded-lg shadow-lg">
            <span>Photo 2</span>
          </div>
      </div>
      <p v-else class="text-gray-500">Aucune photo soumise.</p>
    </div>
    <button @click="activateSalon" class="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">Activer</button>
  </div>
</template>

<style scoped>
body {
  background-color: #f9f9f9;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.p-6 {
  max-width: 800px;
  margin: auto;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.text-center {
  text-align: center;
}

.text-blue-600 {
  color: #3b82f6;
}

.text-gray-700 {
  color: #4b5563;
}

.text-gray-500 {
  color: #6b7280;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.object-cover {
  object-fit: cover;
}

.gap-4 {
  gap: 1rem;
}
</style>
