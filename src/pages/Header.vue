<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { logout } from '../services/auth';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const router = useRouter();

const route = useRoute();

const userName = ref('');
const shouldApplyShadow = ref(true);
const showMenu = ref(false);

onMounted(async () => {
 try {
    const response = await axios.get('https://hair-api-main-production.up.railway.app/api/user', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });
    userName.value = response.data.name;
 } catch (error) {
    console.error("Failed to fetch user data", error);
 }
});

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', handleClickOutside);
});

const handleScroll = () => {
  shouldApplyShadow.value = window.scrollY > 0;
};

const handleClickOutside = (event) => {
  if (showMenu.value) {
    const menu = document.querySelector('.dropdown-menu');
    if (!menu.contains(event.target)) {
      showMenu.value = false;
    }
  }
};

const logoutUser = async () => {
    try {
        await logout();
        localStorage.removeItem("token");
        localStorage.removeItem("userType"); 
        router.push('/login') 
   } catch (error) {
        console.error("Failed to logout", error);
    }
};

</script>

<template>
  <div :class="{'shadow-md': shouldApplyShadow}" class="fixed top-0 z-20 flex items-center justify-between transition-all duration-100 bg-white">
     <div class="w-10 h-15">
         <img src="/images/menu (1) 1.png" alt="">
     </div>
     <div class="flex items-center justify-center">
         <img src="/images/Ruth(1).png" alt="" class="object-cover w-44 h-28">
     </div>
     <div class="space-x-2 text-[15px] font-medium">
       <div v-if="userName" class="relative flex space-x-1">
         <span class="font-medium">{{ userName }}</span>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 cursor-pointer" @click.stop="showMenu = !showMenu">
             <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
         </svg>
 
         <!-- Menu déroulant -->
         <div v-if="showMenu" class="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 dropdown-menu">
             <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                 <router-link to="/dashboarclient" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Profil</router-link>
                 <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" @click.prevent="logoutUser">Déconnexion</a>
             </div>
         </div>
       </div>
 
       <div v-else class="space-x-2">
         <router-link to="/login" class="cursor-pointer">Login</router-link>
         <router-link to="/register" class="cursor-pointer">Register</router-link>
       </div>
     </div>
   </div>
 </template>
 
