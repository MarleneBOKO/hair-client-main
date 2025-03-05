<script setup>
import axios from 'axios';
import { ref, onMounted, watch, defineEmits } from 'vue';
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';
import { create_type_coif_salon } from '../services/salon';

const token = localStorage.getItem("token");

const emits = defineEmits(['nextStep']);

const config = {
  headers: {
    "Authorization": "Bearer " + token
  }
};

const toast = useToast();
const router = useRouter();

const form = ref({
  duration: '',
  price: '',
  tout_fourni_price: ''
});

const images = ref([]);
const showFormFields = ref(null);
const selectedImage = ref(null);
const validatedImages = ref(new Set());
const selectedCategory = ref("homme"); // Catégorie sélectionnée par défaut

// Fonction pour passer à l'étape suivante
const nextStep = () => {
    emits('nextStep'); // Émettre l'événement pour passer à la page suivante
};

const selectImage = (imageIndex) => {
  if (!validatedImages.value.has(imageIndex)) {
    showFormFields.value = imageIndex;
    selectedImage.value = images.value[imageIndex];
  }
};

const validateForm = () => {
  const { duration, price, tout_fourni_price } = form.value;
  const { name, description, category, image, id_coiffure } = selectedImage.value;
  if (name && description && duration && category && price && tout_fourni_price && image && id_coiffure) {
    create_type_coif_salon(name, description, duration, category, Number(price), Number(tout_fourni_price), image, id_coiffure)
      .then((response) => {
        toast.success("Vous avez bien créé votre type de coiffure", {
          timeout: 5000
        });
        validatedImages.value.add(showFormFields.value);
        showFormFields.value = null;
        resetForm();
        return response;
      })
      .catch((error) => {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
        return error;
      });
  } else {
    toast.error("Veuillez remplir tous les champs", {
      timeout: 5000,
    });
  }
};

const resetForm = () => {
  form.value.duration = '';
  form.value.price = '';
  form.value.tout_fourni_price = ''
};

const loadImages = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/coiffure?category=${selectedCategory.value}`, config);
    images.value = response.data.data.map(item => ({
      image: `http://127.0.0.1:8000/storage/${item.image}`,
      alt: item.name,
      name: item.name,
      description: item.description,
      category: item.category,
      id_coiffure: item.id_coiffure
    }));
  } catch (error) {
    console.error('Erreur lors du chargement des images:', error);
  }
};

onMounted(() => {
  loadImages();
});

// Watcher pour déclencher le chargement des images lorsque selectedCategory change
watch(selectedCategory, () => {
  loadImages();
});
</script>

<template>
  <div class="flex flex-1 flex_col overflow-hidden">
    <div class=" mt-10 p-3">
      <h3 class="text-lg font-semibold">Informations générales</h3>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">Catégories</label>
        <div class="flex items-center">
          <!-- Utilisation de v-model pour lier la sélection de la catégorie à selectedCategory -->
          <input type="radio" id="homme" name="category" value="homme" class="mr-2" v-model="selectedCategory">
          <label for="homme" class="mr-4">Homme</label>
          <input type="radio" id="femme" name="category" value="femme" class="mr-2" v-model="selectedCategory">
          <label for="femme">Femme</label>
          <input type="radio" id="enfant" name="category" value="enfant" class="mr-2" v-model="selectedCategory">
          <label for="enfant">Enfant</label>
        </div>
      </div>

      <!-- Conteneur pour afficher les images -->
      <div class="image-container overflow-y-scroll">
        <div class="grid grid-cols-5 gap-8 mt-8 overflow-y-hidden">
          <!-- Utilisation de v-for pour afficher les images -->
          <div v-for="(image, index) in images" :key="index" class="flex flex-col items-center" @click="selectImage(index)">
            <img :src="image.image" :alt="image.alt" class="w-32 h-32 object-cover rounded-lg mb-2 cursor-pointer" :class="{'opacity-50': validatedImages.has(index)}">
            <span class="text-sm">{{ image.name }}</span>
            <span>{{ image.category }}</span>
            <!-- Champs de formulaire pour chaque image -->
            <div v-if="showFormFields === index" class="mt-4 gap-4 flex flex-col">
              <input type="number" v-model="form.price" placeholder="Prix" class="p-2 border border-gray-300 rounded-md" step="any">
              <button type="button" @click.prevent="validateForm" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Ajouter</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Bouton Suivant -->
      <div class="flex justify-end mt-8">
        <button type="submit" class="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Suivant
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  @click="nextStep" stroke="currentColor" class="h-4 w-4 ml-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.opacity-50 {
  opacity: 0.5;
}

/* Ajouté pour désactiver le défilement de la page */
/* html, body {
  overflow: hidden;
} */

/* Ajouté pour permettre le défilement de la section des images */
.image-container {
  height: 68vh; /* Vous pouvez ajuster la hauteur selon vos besoins */
  overflow-y: auto;
}
</style>
