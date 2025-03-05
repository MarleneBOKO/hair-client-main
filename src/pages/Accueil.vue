<script setup>
import { ref, onMounted, computed } from 'vue';
import Header from '../pages/Header.vue';
import Footer from '../pages/Footer.vue';
import Modal_coif_acc from './Modal_coif_acc.vue';
import Modal_acc from './Modal_acc.vue';
import axios from "axios";

const token = localStorage.getItem("token");
const config = {
    headers: {
        "Authorization": "Bearer " + token
    }
};

const images = [
  "../../public/images/home1/1.png",
  "../../public/images/home1/2.png",
  "../../public/images/home1/3.png",
  "../../public/images/home1/4.png",
  "../../public/images/home1/5.png",
  "../../public/images/home1/6.jpeg",
  "../../public/images/home1/7.png",
  "../../public/images/home1/8.png",
  "../../public/images/home1/9.png",
  "../../public/images/home1/10.png",
  "../../public/images/home1/11.jpeg",
  "../../public/images/home1/12.png",
  "../../public/images/home1/13.png",
  "../../public/images/home1/14.jpeg",
  "../../public/images/home1/15.png",
  "../../public/images/home1/16.png",
  "../../public/images/home1/17.png",
  "../../public/images/home1/15.png",
  "../../public/images/home1/15.png",
  "../../public/images/home1/15.png",
  "../../public/images/home1/15.png",
  "../../public/images/home1/15.png",
  "../../public/images/home1/15.png",

];


const randomImage = ref('');
onMounted(() => {
  randomImage.value = images[Math.floor(Math.random() * images.length)];
});

const selectedImagePath = ref('');
const selectedImage = ref('');

const desiredImagesRow1 = ref([]);
const desiredImagesRow2 = ref([]);
const isshow = ref(false);
const showAllImages = ref(false);
const salonId = localStorage.getItem('salonId'); 

const filters = ref({
    category: [],
    priceRange: []
});
const selectedHairstyleDetails = ref(null);
const fetchedHairstyles = ref([]);
const fetchedSalons = ref([]);

const desiredImagesComputedRow1 = computed(() => desiredImagesRow1.value.slice(0, 5));
const desiredImagesComputedRow2 = computed(() => desiredImagesRow2.value.slice(0, 5));

const openModalWithImage = (item) => {
  selectedImagePath.value = item.src; 
  selectedHairstyleDetails.value = item; 
  isshow.value = true; 
  console.log(selectedHairstyleDetails.value, selectedImagePath.value);
};

const fetchImages = async () => {
  try {
  const response = await axios.get(`https://hair-api-main-production.up.railway.app/api/getImagesBySalon/${salonId}`, config);
      let allImages = [];
    const seenImages = new Set();
    for (const type in response.data.data) {
      response.data.data[type].forEach(item => {
        if (!seenImages.has(item.image)) {
          seenImages.add(item.image);
          allImages.push({
            src: `https://hair-api-main-production.up.railway.app/storage/${item.image}`,
            alt: item.name,
            text: item.name,
            id_hairstyle_type: item.id_hairstyle_type,
            id_salon: item.id_salon,
            image1: item.image1,
            image2: item.image2,
            price: item.price,
            percent: item.percent
          });
        }
      });
    }
    const halfIndex = Math.ceil(allImages.length / 2);
    desiredImagesRow1.value = allImages.slice(0, halfIndex);
    desiredImagesRow2.value = allImages.slice(halfIndex);

  } catch (error) {
    console.error("Failed to fetch images", error);
  }
};

const isModalOpen = ref(false);
const selectedHairstyle = ref({});

function openModal(hairstyle) {
  selectedImage.value = `https://hair-api-main-production.up.railway.app/storage/${hairstyle.image}`;
  selectedHairstyle.value = {
    ...hairstyle,
    id_salon: hairstyle.id_salon
  };
  isModalOpen.value = true;
}

const fetchHairstyles = async () => {
  try {
    const salonId = localStorage.getItem('salonId'); 
    const response = await axios.get(`https://hair-api-main-production.up.railway.app/api/getAllHairstyles/${salonId}`, config);    
    console.log((response.data.data)); 
    fetchedHairstyles.value = Array.isArray(response.data.data) ? response.data.data : [];
  } catch (error) {
    console.error("Erreur lors de la récupération des coiffures :", error);
  }
};

const filteredSalons = computed(() => {
  if (!Array.isArray(fetchedHairstyles.value)) return [];
  return fetchedHairstyles.value.map(salon => {
    return {
      salon_name: salon.salon_name,
      hairstyles: salon.hairstyles ? salon.hairstyles.filter(hairstyle => {
        const categoryMatch = filters.value.category.length ? filters.value.category.includes(hairstyle.category) : true;
        const priceMatch = filters.value.priceRange.length ? filters.value.priceRange.some(range => {
          switch (range) {
            case '<=3000':
              return hairstyle.price <= 3000;
            case '3001-5000':
              return hairstyle.price >= 3001 && hairstyle.price <= 5000;
            case '>=5000':
              return hairstyle.price >= 5000;
            default:
              return true;
          }
        }) : true;
        return categoryMatch && priceMatch;
      }) : []
    };
  });
});

onMounted(() => {
  fetchImages();
  fetchHairstyles();
});
</script>






<template>
    <div class="flex flex-col space-y-9">
        <Header class="w-full p-5"/>
        <div style="padding-top: 62px;"></div>
        <div class="p-5">
            <div class="bg-[#EFE6D8] w-full h-[350px] flex flex-row">
                <div class="flex flex-col p-10">
                    <div class="flex flex-col">
                        <h1 class="text-3xl font-bold md:text-4xl">Découvrez et réservez la coiffure <br>qui vous correspond</h1>
                    </div>
                    <div class="relative mt-4 mr-6">
                        <div class="relative flex">
                            <input type="text" name="query" placeholder="Salon, service pour homme et femme" class="bg-white px-8 py-1 rounded-3xl w-[500px] h-11 dark:placeholder:text-[#D9D9D9]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="absolute w-4 h-4 text-black transform -translate-y-1/2 left-2 top-1/2">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-5.2-5.2"></path>
                                <circle cx="10" cy="10" r="8"></circle>
                            </svg>
                        </div>
                    </div>
                    
                </div>
                <div class="flex-1 ml-32">
                    <img :src="randomImage" alt="" class="w-[506px] h-[350px] object-cover cursor-pointer">
                </div>
            </div>

            <div class="flex flex-col justify-center space-y-12 bg-white">
                <p class="flex justify-center items-center font-medium text-[24px] mt-6">Que désirez-vous?</p>
                <div class="flex flex-col items-end justify-between gap-9">
                  <div class="flex flex-col space-y-12">
                      <!-- Première rangée d'images -->
                      <div class="flex flex-row space-x-6">
                          <div v-for="(item, index) in desiredImagesComputedRow1" :key="index" class="space-x-3 w-[278px] h-48">
                              <div class="flex flex-col rounded-md shadow-md">
                                  <div class="flex flex-row rounded-md">
                                      <img :src="item.src" :alt="item.alt" class="w-80 h-[188px] rounded-md object-cover cursor-pointer" @click="openModalWithImage(item)">
                                  </div>
                                  <div class="flex justify-center">
                                      <span class="font-medium text-[20px]">{{ item.text }}</span>
                                  </div>
                              </div>
                          </div>
                      </div>
  <Modal_coif_acc :show="isshow" :imagePath="selectedImagePath" :hairstyleDetails="selectedHairstyleDetails" @close="isshow = false" />
                      <!-- Deuxième rangée d'images -->
                      <div class="flex flex-row space-x-6">
                          <div v-for="(item, index) in desiredImagesComputedRow2" :key="index" class="space-x-3 w-[278px] h-48">
                              <div class="flex flex-col rounded-md shadow-md">
                                  <div class="flex flex-row rounded-md">
                                      <img :src="item.src" :alt="item.alt" class="w-80 h-[188px] rounded-md object-cover cursor-pointer" @click="openModalWithImage(item)">
                                  </div>
                                  <div class="flex justify-center">
                                      <span class="font-medium text-[20px]">{{ item.text }}</span>
                                  </div>
                              </div>
                          </div>
                      </div>
  <Modal_coif_acc :show="isshow" :imagePath="selectedImagePath" :hairstyleDetails="selectedHairstyleDetails" @close="isshow = false" />                  </div>
                  <div class="flex items-center justify-center">
                    <router-link :to="{ name: 'Salon', params: { id_salon: salonId } }" class="font-bold text-[FCF2F2]">Voir plus
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="items-center justify-center inline-block w-4 h-4 ml-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                    </router-link>
                  </div>
                </div>
            </div>
            
            <div class="relative flex flex-col mt-12 space-y-12">
    <p class="flex justify-center items-center font-medium text-[24px]">Affiner vos recherches</p>
    <div class="flex flex-row">
        <div class="flex flex-col space-y-12 bg-[#FCF2F2] rounded-s-[35px] justify-between p-4 h-[450px] w-[230px] absolute font-semibold text-lg">
            <div class="flex flex-col space-y-4">
                <div class="flex flex-row gap-5 space-x-2">
                    <label class="">
                        <input type="checkbox" value="enfant" v-model="filters.category">
                        <span>Enfants</span>
                    </label>
                </div>
                <div class="flex flex-row space-x-2">
                    <label>
                        <input type="checkbox" value="Femme" v-model="filters.category">
                        <span>Dames</span>
                    </label>
                </div>
                <div class="flex flex-row space-x-2">
                    <label>
                        <input type="checkbox" value="Homme" v-model="filters.category">
                        <span>Hommes</span>
                    </label>
                </div>
            </div>
            <div class="flex flex-col space-y-4">
                <div class="flex flex-row space-x-2">
                    <label>
                        <input type="checkbox" value="<=3000" v-model="filters.priceRange">
                        <span>> 3000</span>
                    </label>
                </div>
                <div class="flex flex-row space-x-2">
                    <label>
                        <input type="checkbox" value="3001-5000" v-model="filters.priceRange">
                        <span>Entre 3000 et 5000</span>
                    </label>
                </div>
                <div class="flex flex-row space-x-2">
                    <label>
                        <input type="checkbox" value=">=5000" v-model="filters.priceRange">
                        <span>>= 5000</span>
                    </label>
                </div>
            </div>
        </div>
        <div class="flex flex-col space-y-7 bg-white overflow-y-scroll w-[1290px] shadow-xl mr-6 rounded-s-[35px] p-5 pr-5 h-[450px]" style="transform: translate(190px);">
            <div v-for="(salon, index) in filteredSalons" :key="index" class="flex flex-col space-y-6">
                <div class="grid grid-cols-4 gap-4">
                    <div v-for="(hairstyle, index) in salon.hairstyles" :key="index" class="flex flex-col">
                        <div class="rounded-md shadow-md">
                            <img :src="`https://hair-api-main-production.up.railway.app/storage/${hairstyle.image}`" :alt="hairstyle.name" class="w-full h-[188px] rounded-md object-cover cursor-pointer" @click="openModal(hairstyle)">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal_acc :show="isModalOpen" 
        :imagePath1="selectedImage" 
        :selectedHairstyle="selectedHairstyle"
        :idSalon="selectedHairstyle.id_salon"
         @close="isModalOpen = false" />   
         </div>
</div>


            <div class="flex flex-col mt-12">
                <div class="flex flex-row justify-between item-center">
                    <div v-for="(salon, index) in fetchedSalons" :key="index" class="relative mt-8">
                        <div class="w-[160px] h-[160px] bg-[#667D45] absolute" style="top: -15px; right: -15px;"></div>
                        <div class="flex flex-col rounded-md shadow-md">
                            <div class="z-10 flex flex-row rounded-md">
                                <img src="../../public/images/télécharger (17) 1.png" alt="" class="shadow-xl">
                            </div>
                            <div class="flex flex-col p-4 space-y-6">
                                <h1 class="font-medium text-[36px]">
                                    <router-link :to="{ name: 'Salon', params: { id_salon: salon.id_salon }}">{{ salon.salon_name }}</router-link>
                                </h1>
                                <div class="flex flex-row justify-between">
                                    <div class="ml-6">
                                        <span class="text-[20px] font-light">{{ salon.address }}</span>
                                    </div>
                                    <div class="flex flex-row m-6 space-x-3">
                                        <img src="../../public/images/Heart (1) 2.svg" alt="">
                                        <img src="../../public/images/Heart 6.svg" alt="">
                                        <img src="../../public/images/Heart 6.svg" alt="">
                                    </div>
                                </div>
                                <div class="flex space-x-2">
                                    <p class="text-[20px] font-light">Recommandés:</p><span class="font-bold text-[20px]">5</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

<style lang="scss" scoped>

</style>