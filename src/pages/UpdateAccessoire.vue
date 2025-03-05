<template>
    <div class="flex flex-row">
      <div class="flex items-center justify-center flex-1 flex_col">
        <form @submit.prevent="onSubmit" class="flex flex-col gap-3">
          <div class="flex items-center justify-center">
            <h2 class="text-lg font-bold">Modifier les informations de l'accessoire</h2>
          </div>
          <div class="grid grid-cols-2 gap-20 p-8">
            <div>
              <div class="mb-4">
                <label for="name" class="block mb-2 font-bold text-gray-700">Nom :</label>
                <input type="text" v-model="form.name" id="name" name="name" required class="w-[500px] p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
              </div>
  
              <div class="mb-4">
                <label for="price" class="block mb-2 font-bold text-gray-700">Prix :</label>
                <input type="number" v-model="form.price" id="price" name="price" required class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
              </div>
  
              <div class="mb-4">
                <label for="description" class="block mb-2 font-bold text-gray-700">Description :</label>
                <input type="text" id="description" v-model="form.description" name="description" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
              </div>
            </div>
  
           
          </div>
          <div class="p-8">
          <button type="submit" class="w-[500px] bg-black hover:bg-black text-white  font-semibold p-2 rounded-md">
            Mettre à jour
          </button>
        </div>
          <div v-if="message" class="message">{{ message }}</div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useToast } from 'vue-toastification';
  import { getAccessoireInfo, UpdateAccessoire } from '../services/auth';
  import { useRouter, useRoute } from 'vue-router';
  
  const toast = useToast();
  const router = useRouter();
  const route = useRoute();
  const id_accessory = ref(route.params.id_accessory);
  
  const form = ref({
      name: '',
      price: '',
      description: '',
     
  });
  
  const fetchAccessoryData = async () => {
    try {
      const response = await getAccessoireInfo(id_accessory.value);
      const data = response.data.data;
      console.log('Accessory Data:', data);
      Object.assign(form.value, data);
      form.value.image = ''; // Clear image field to avoid displaying old image path
    } catch (error) {
      toast.error("Erreur lors de la récupération des informations de l'accessoire", { timeout: 5000 });
      console.error(error);
    }
  };
  
  onMounted(() => {
    fetchAccessoryData();
  });
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
  };
  
  const onSubmit = async () => {
    try {
      const formData = new FormData();
      for (const key in form.value) {
        formData.append(key, form.value[key]);
      }
  
      await UpdateAccessoire(id_accessory.value, form.value); 
      toast.success("Accessoire mis à jour avec succès", { timeout: 5000 });
      router.push('/accessoires')
    } catch (error) {
      toast.error(`Erreur lors de la mise à jour de l'accessoire: ${error.response.data.message}`, { timeout: 5000 });
      console.error(error);
    }
  };
  </script>
  
  <style scoped>
  .message {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
  }
  </style>
  