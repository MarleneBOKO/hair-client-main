<template>
    <div class="sticky top-0 z-40">
      <div class="flex items-center justify-between w-full h-20 px-6 bg-gray-100 border-b">
        
        <!-- left navbar -->
        <div class="flex">
          
          <!-- mobile hamburger -->
          <div class="items-center inline-block mr-4 lg:hidden">
            <button class="hover:text-blue-500 hover:border-white focus:outline-none navbar-burger" @click="toggleSidebar">
              <svg class="w-5 h-5" :style="{ fill: 'black' }" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
          </div>
          
          <!-- search bar -->
          <div class="relative text-gray-600">
            <input type="search" name="serch" placeholder="Search..." class="w-full h-10 px-5 text-sm bg-white border rounded-lg xl:w-64 focus:outline-none">
            <button type="submit" class="absolute top-0 right-0 mt-3 mr-4">
              <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve" width="512px" height="512px">
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- right navbar -->
        <div class="relative flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="mr-3 fill-current hover:text-blue-500"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/></svg>
          <img src="https://a7sas.net/wp-content/uploads/2019/07/4060.jpeg" class="w-12 h-12 rounded-full shadow-lg" @click="dropDownOpen = !dropDownOpen">
        </div>
        
      </div>
      
      <!-- dropdown menu -->
      <div class="absolute right-0 w-48 mr-6 text-gray-700 bg-gray-100 border border-t-0 rounded-b-lg shadow-xl" :class="{ hidden: !dropDownOpen }">
        <a href="#" class="block px-4 py-2 hover:bg-gray-200">Account</a>
        <a href="#" class="block px-4 py-2 hover:bg-gray-200">Settings</a>
        <a href="#" @click.prevent="logoutUser" class="block px-4 py-2 hover:bg-gray-200">Logout</a>
      </div>
      <!-- dropdown menu end -->
      
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { logout } from '../../services/auth';

const route = useRoute();

const router = useRouter();

const store = useStore();
const dropDownOpen = ref(false);

const toggleSidebar = () => {
  store.dispatch('toggleSidebar');
};

const toggleDropdown = () => {
  dropDownOpen.value = !dropDownOpen.value;
  store.dispatch('toggleDropdown');
};
const logoutUser = async () => {
  try {
    await logout();
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("salonId")
    router.push('/login') 
  } catch (error) {
    console.error("Failed to logout", error);
  }
};
</script>