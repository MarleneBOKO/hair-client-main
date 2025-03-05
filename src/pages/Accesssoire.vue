<script setup>
import axios from 'axios';
import { ref, onMounted, watch, defineEmits } from 'vue';
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';
import { accessoire } from '../services/salon';


const toast = useToast();
const emits = defineEmits(['nextStep']);


const form = ref({
    name: '',
    description: '',
    price: '',
});

const errors = ref({
    name: '',
    description: '',
    price: '',

    
});
const nextStep = () => {
    emits('nextStep'); 
};

const validateForm = () => {
  console.log(form.value)

    const { name, description, price } = form.value;
    if (name && description && price ) {
        return true;
    } else {
        toast.error("Veuillez remplir tous les champs", {
            timeout: 5000,
        });
        return false;
    }
};

const saveAccessory = async () => {
    if (validateForm()) {
        const {  name, description, price } = form.value;
        try {
            const response = await accessoire( name, description, price);
            console.log(response)
            toast.success("Vous aviez créeé votre acce", {
                timeout: 5000,
            });
            return response;
        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
            errors.value = error.response.data.errors;
            return error;
        }
    }
};

const saveAndRedirect = async () => {
    const response = await saveAccessory();
    if (response) {
      router.push('/carteifu')
    }
       
};

const saveAndNew = async () => {
    const response = await saveAccessory();
    if (response) {
        form.value = {
            name: '',
    description: '',
    price: '',
        };
    }
};
</script>

<template>
    <div class="flex flex-row gap-20 bg-gray-200 ">
    <div style="width: 45%; position: relative;">
      <img class="object-cover h-screen" src="../../public/images/salon/Mur vert de gris salon de coiffure.jpeg" alt="" style="width: 100%;">
      <div class="absolute top-0 left-0 right-0 mt-12 text-center">
        <h1 class="text-xl ">Créer votre salon </h1>
        <h6>Une nouvelle aventure commence pour vous</h6>
      </div>
    </div>
  <div class="flex flex-col flex-1">
    <img src="../../public/images/Acc/Frame 2.png" alt="" class="object-cover w-[1000px] h-40 mr-4">
    <form @submit.prevent="saveAccessory" class="p-3 overflow-hidden ">

    <div class="flex flex-col p-8">
      <div>
        <div class="mb-4">
          <label for="name" class="block mb-2 font-bold text-gray-700">Nom :</label>
          <input type="text" id="name" v-model="form.name" required class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
        </div>
        <div class="mb-4">
          <label for="description" class="block mb-2 font-bold text-gray-700">Description :</label>
          <input type="text" id="description" v-model="form.description" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
        </div>
        <div class="mb-4">
          <label for="price" class="block mb-2 font-bold text-gray-700">Prix :</label>
          <input type="number" id="price" v-model="form.price" required class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
        </div>
      </div>
    </div>
    <div class="flex justify-end mr-4 space-x-4">
      <button type="button" @click="saveAndRedirect" class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
        Enregistrer
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline-block w-5 h-5 ml-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </button>
      <button type="button" @click="saveAndNew" class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
        Enregistrer & Nouveau
      </button>
    </div>
</form>

  </div>
</div>

</template>

<style lang="scss" scoped>
/* Ajoutez ici vos styles personnalisés */
</style>
