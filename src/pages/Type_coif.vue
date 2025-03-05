<script setup>
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';
import { create_type_coif_salon } from '../services/salon';

const token = localStorage.getItem("token");

const config = {
  headers: {
    "Authorization": "Bearer " + token
  }
};

const toast = useToast();
const router = useRouter();

const form = ref({
  nb_employe: '',
  price: '',
});

const selectedCategory = ref("homme"); // Catégorie sélectionnée par défaut

// États des images par catégorie
const imagesByCategory = ref({
  homme: [],
  femme: [],
  enfant: []
});

const validatedImagesByCategory = ref({
  homme: new Set(),
  femme: new Set(),
  enfant: new Set()
});

const showFormFields = ref({
  homme: null,
  femme: null,
  enfant: null
});

const selectedImage = ref(null);

// Fonction pour charger les images selon la catégorie
const loadImages = async () => {
  try {
    const response = await axios.get(`https://hair-api-main-production.up.railway.app/api/coiffure?category=${selectedCategory.value}`, config);
    imagesByCategory.value[selectedCategory.value] = response.data.data.map(item => ({
      image: `https://hair-api-main-production.up.railway.app/storage/${item.image}`,
      alt: item.name,
      name: item.name,
      description: item.description,
      category: item.category,
      coiffure_id: item.id_coiffure
    }));
  } catch (error) {
    console.error('Erreur lors du chargement des images:', error);
  }
};

// Fonction pour sélectionner une image
const selectImage = (imageIndex) => {
  if (!validatedImagesByCategory.value[selectedCategory.value].has(imageIndex)) {
    showFormFields.value[selectedCategory.value] = imageIndex;
    selectedImage.value = imagesByCategory.value[selectedCategory.value][imageIndex];
  }
};

// Fonction pour valider le formulaire et ajouter la coiffure
const validateForm = () => {
  const { nb_employe, price } = form.value;
  const { name, description, category, image, coiffure_id } = selectedImage.value;

  if (name && description && nb_employe && category && price && image && coiffure_id) {
    create_type_coif_salon(name, description, nb_employe, category, Number(price), image, coiffure_id)
      .then((response) => {
        toast.success("Vous avez bien ajouté cette coiffure", { timeout: 5000 });
        validatedImagesByCategory.value[selectedCategory.value].add(showFormFields.value[selectedCategory.value]);
        showFormFields.value[selectedCategory.value] = null;
        resetForm();
        return response;
      })
      .catch((error) => {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
        return error;
      });
  } else {
    toast.error("Veuillez remplir tous les champs", { timeout: 5000 });
  }
};


// Fonction pour réinitialiser le formulaire
const resetForm = () => {
  form.value.nb_employe = '';
  form.value.price = '';
};

// Charger les images lorsque le composant est monté
onMounted(() => {
  loadImages();
});

// Watcher pour déclencher le chargement des images lorsque la catégorie change
watch(selectedCategory, () => {
  loadImages();
});
</script>

<template>
  <div class="flex flex-row gap-20 bg-gray-200">
    <div style="width: 45%; position: relative;">
      <img class="object-cover h-screen" src="/images/salon/Mur vert de gris salon de coiffure.jpeg" alt="" style="width: 100%;">
      <div class="absolute top-0 left-0 right-0 mt-12 text-center">
        <h1 class="text-xl">Créer votre salon</h1>
        <h6>Une nouvelle aventure commence pour vous</h6>
      </div>
    </div>
    <div class="flex flex-1 overflow-hidden flex_col">
      <div class="p-3 mt-10">
        <h3 class="text-lg font-semibold">Informations générales</h3>
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-700">Catégories</label>
          <div class="flex items-center">
            <input type="radio" id="homme" name="category" value="homme" class="mr-2" v-model="selectedCategory">
            <label for="homme" class="mr-4">Homme</label>
            <input type="radio" id="femme" name="category" value="femme" class="mr-2" v-model="selectedCategory">
            <label for="femme">Femme</label>
            <input type="radio" id="enfant" name="category" value="enfant" class="mr-2" v-model="selectedCategory">
            <label for="enfant">Enfant</label>
          </div>
        </div>

        <div class="overflow-y-scroll image-container">
          <div class="grid grid-cols-5 gap-8 mt-8 overflow-y-hidden">
            <div v-for="(image, index) in imagesByCategory[selectedCategory]" :key="index" class="flex flex-col items-center" @click="selectImage(index)">
              <img :src="image.image" :alt="image.alt" class="object-cover w-32 h-32 mb-2 rounded-lg cursor-pointer" :class="{'opacity-50': validatedImagesByCategory[selectedCategory].has(index)}">
              <span class="text-sm">{{ image.name }}</span>
              <span>{{ image.category }}</span>
              <div v-if="showFormFields[selectedCategory] === index" class="flex flex-col gap-4 mt-4">
                <input type="number" v-model="form.nb_employe" name="nb_employe" placeholder="Nombre d'employé" class="p-2 border border-gray-300 rounded-md">
                <input type="number" v-model="form.price" placeholder="Prix" class="p-2 border border-gray-300 rounded-md" step="any">
                <input type="hidden" :value="image.id_coiffure" class="p-2 border border-gray-300 rounded-md">
                <button type="button" @click.prevent="validateForm" class="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Ajouter</button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end mt-8">
          <router-link to="/emp_salon" class="flex items-center px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            Suivant
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 ml-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3"></path>
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>




<style>
.opacity-50 {
  opacity: 0.5;
}
.image-container {
  height: 68vh;
  overflow-y: auto;
}
</style>





