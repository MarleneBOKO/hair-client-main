<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Modal_coif from './Modal_coif_salon.vue';
import Header from './Header.vue';

const route = useRoute();
const salon_id = ref(route.params.id_salon);
const salon = ref(null);
const isshow = ref(false);
const selectedImagePath = ref('');
const selectedThumbnails = ref([]);
const selectedHairstyle = ref({});
const showAllImages = ref(false);

const hairstyles = computed(() => salon.value?.hairstyles || []);

const fetchSalonDetails = async () => {
  try {
    const response = await axios.get(`https://hair-api-main-production.up.railway.app/api/getSalonshairstyle/${salon_id.value}`);
    salon.value = response.data;
    console.log(salon.value);
  } catch (error) {
    console.error("Erreur lors de la récupération des détails du salon :", error);
  }
};

onMounted(() => {
  fetchSalonDetails();
});

function openModalWithImage(imagePath, thumbnails, hairstyle) {
  selectedImagePath.value = imagePath;
  selectedThumbnails.value = thumbnails;
  selectedHairstyle.value = hairstyle;
  isshow.value = true;
  console.log("X", selectedHairstyle);

}
function getSalonInitials(name) {
  return name ? name.slice(0, 2).toUpperCase() : '';
}

function showMoreImages() {
  showAllImages.value = true;
}


</script>





<template>
  <div class="flex flex-col space-y-9">
    <Header class="w-full p-5" />
    <div style="padding-top: 62px;"></div>
    <div class="flex flex-col">
      <div class="relative">
        <div class="relative flex flex-row p-6 rounded-md">
          <img src="../../public/images/salon_page/Peluquería.jpeg" alt="" class="w-screen h-[398px] object-cover">
          <div class="absolute z-10 mt-8 ml-8">
            <h1 class="font-bold text-[90px] text-white">{{ salon?.name }}</h1>
            <p class="font-bold text-[25px] text-white mt-2">{{ salon?.description }}</p>
          </div>
        </div>
        <div class="absolute -bottom-10 left-10 flex justify-center items-center w-[150px] h-[150px] bg-[#FCF2F2] rounded-full z-10">
          <div class="text-4xl italic">{{ getSalonInitials(salon?.name) }}</div>
        </div>
      </div>
      <div class="absolute left-0 w-full space-y-6 bottom-28">
        <div class="flex flex-col bg-[#EFE6D8] m-6 p-4">
          <div class="flex ml-40 space-x-2 font-medium">
            <a href="#" class="px-2 py-1">A propos</a>
            <a href="#" class="px-2 py-1">Services</a>
            <a href="#" class="px-2 py-1">Contact</a>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col" style="margin-top: 20em;">
      <div class="bg-[#EFE6D8] flex flex-col p-5">
        <div class="flex flex-row space-x-3 h-[397px]">
          <div class="-translate-y-40">
            <img src="../../public/images/salon_page/Best Christmas Hairstyles for Little Girls in Nigeria 2023 - Kaybee Fashion Styles 2.png" alt="" class=""> 
          </div>
          <div class="flex items-center justify-center"> 
            <div class="ml-24 -translate-y-20">
              <img src="../../public/images/salon_page/Epsilon - Spaceworks 1.png" alt=""> 
            </div>
            <div>
              <div class="flex flex-col space-y-3 ml-36">
                <img src="../../public/images/salon_page/Aesthetic neutral spa shampoo bowl 1.png" alt="" class="-translate-y-52">
                <img src="../../public/images/salon_page/Ensaio corporativo cabeleireira 1.png" alt="" class="-translate-y-52">
              </div>
            </div>
          </div>
        </div>

        <div class="grid items-center justify-between grid-cols-4 gap-4 space-y-6">
          <div v-for="(hairstyle, index) in hairstyles" :key="index" class="relative flex flex-row rounded-md">
            <img
              :src="`https://hair-api-main-production.up.railway.app/storage/${hairstyle.image}`"
              class="object-cover w-[350px] h-[320px] rounded-3xl"
              @click="openModalWithImage(hairstyle.image, [hairstyle.image1, hairstyle.image2], hairstyle)"
            >
            <div class="flex bg-[#EFE6D8] rounded-b-3xl absolute w-[350px] h-[65px] p-2 items-center opacity-40" style="bottom: 0;">
              <span class="font-bold text-[15px] text-black text-center">{{ hairstyle.name }}</span>
            </div>
          </div>
        </div>

        <Modal_coif
          ref="modal"
          :show="isshow"
          :imagePath="selectedImagePath"
          :hairstyle="selectedHairstyle"
          :id_salon="salon?.id_salon"
          @close="isshow = false"
        />

      </div>
    </div>
  </div>

  <footer>
    <div class="bg-[#FCF2F2] flex flex-col p-4 space-y-4">
      <div class="flex space-x-2">
        <a href="#">Blog</a>
        <a href="#">A propos</a>
        <a href="#">Condition d'utilisation</a>
        <a href="#">Contact</a>
      </div>
      <div class="flex flex-row space-x-4">
        <img src="../../public/images/logo_footer.png" alt="" class="h-20 w-25">
        <p>© 2024 HairHub Tous les droits réservés</p>     
      </div>
    </div>
  </footer>
</template>


<style scoped>
/* Ajoutez ici les styles personnalisés si nécessaire */
</style>
