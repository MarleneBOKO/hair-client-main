<script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  import Modal_coif from './Modal_coif_salon.vue';
  import Footer from './Footer.vue';
  
  const route = useRoute();
  const salon_id = ref(route.params.id_salon);
  const salon = ref(null);
  const isshow = ref(false);
  const selectedImagePath = ref('');
  const selectedThumbnails = ref([]);
  const showAllImages = ref(false);
  
  const hairstyles = computed(() => {
    return salon.value?.hairstyles || [];
  });
  
  const limitedHairstyles = computed(() => {
    return hairstyles.value.slice(0, 8);
  });
  
  const remainingHairstyles = computed(() => {
    return hairstyles.value.slice(8);
  });
  
  const fetchSalonDetails = async () => {
    try {
      const response = await axios.get(`https://hair-api-main-production.up.railway.app/api/getSalonshairstyle/${salon_id.value}`);
      salon.value = response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des détails du salon :", error);
    }
  };
  
  onMounted(() => {
    fetchSalonDetails();
  });
  
  function openModalWithImage(imagePath, thumbnails) {
    selectedImagePath.value = imagePath;
    selectedThumbnails.value = thumbnails;
    isshow.value = true;
  }
  
  function getSalonInitials(name) {
    return name ? name.slice(0, 2).toUpperCase() : '';
  }
  
  function prevPage() {
    // Ajoutez ici la logique pour passer à la page précédente
  }
  
  function nextPage() {
    // Ajoutez ici la logique pour passer à la page suivante
  }
  </script>
  

<template>
    <div class="flex flex-col space-y-9">
      <div style="padding-top: 62px;"></div>
     
      <div class="flex flex-col translate-y-72">
        <div class="bg-[#EFE6D8] flex flex-col p-5">
          <div class="flex flex-col translate-y-16 space-y-5">
            <div class="flex flex-row justify-between items-center space-x-9" v-for="(hairstyle, index) in remainingHairstyles" :key="index">
              <div class="flex flex-row rounded-md relative" v-for="hairstyle in remainingHairstyles.slice(index * 4, index * 4 + 4)" :key="hairstyle.id">
                <img :src="`https://hair-api-main-production.up.railway.app/storage/${hairstyle.image}`" class="object-cover w-[350px] h-[320px] rounded-b-3xl" @click="openModalWithImage(hairstyle.image, hairstyle.thumbnails)">
                  <div style="bottom: 0;" class="flex bg-[#EFE6D8] rounded-b-3xl absolute w-[350px] h-[65px] p-2 items-center opacity-40">
                    <span class="font-bold text-[15px] text-black text-center">{{ hairstyle.name }}</span>
                  </div>
                </div>
              </div>
            <!-- Pagination controls -->
            <div class="flex justify-center space-x-4">
              <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">Précédent</button>
              <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">Suivant</button>
            </div>
          </div>
          <!-- Modal -->
          <Modal_coif ref="modal" :show="isshow" :imagePath="selectedImagePath" :thumbnails="selectedThumbnails" @close="isshow = false" />
        </div>
      </div>  
    </div>
  </template>
  
  
  <style lang="scss" scoped>
  /* Ajoutez ici vos styles personnalisés si nécessaire */
  </style>
  