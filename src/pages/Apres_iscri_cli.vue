<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const token = localStorage.getItem("token");
const config = {
    headers: {
        "Authorization": "Bearer " + token
    }
};

const clientData = ref(null);

onMounted(() => {
    axios.get('https://hair-api-main-production.up.railway.app/api/client', config)
        .then(response => {
            clientData.value = response.data.data;
        })
        .catch(error => {
            console.error(error);
        });
});
</script>


<template>
    <div class="flex flex-row">
        <div class="bg-[#eee9e2] h-screen w-1/6  flex flex-col p-4">
            <nav class=" text-black ">
                <ul>
                    <li><router-link to="/histo_cli" class="active-route" :class="{ active: $route.name === 'histo_cli' }">Historique</router-link></li>
                    <li><router-link to="/rdv_cli" class="active-route">Vos reservation</router-link></li>
                    <li><router-link to="#" class="active-route">Reservation</router-link></li>
                </ul>
            </nav>
        </div>
        <div class=" flex flex-col gap-2 flex-1" v-if="clientData">
            <div class="flex flex-col gap-4 items-center justify-between bg-[#EFE6D8]" style="height: 40%;">
                <div class="flex flex-row gap-3 p-4">
                    <img src="../../public/images/pexels-husamettin-akgun-1162768-3779853.jpg" class="w-40 h-40 rounded-full"/>
                </div>
                <span class="flex justify-center items-center">Welcom {{ clientData.name }}</span>
            </div>
           <div class="flex flex-col items-center justify-center gap-3" >
                <div class="grid grid-cols-2 p-2 gap-3 items-center justify-center">
                    <div class="flex flex-col shadow-md rounded-md bg-white p-3 w-[500px]">
                        <span class="">Nom :</span>
                        <span>{{ clientData.name }}</span>
                    </div>
                    <div class="flex flex-col shadow-md rounded-md bg-white p-3">
                        <span class="">Email :</span>
                        <span>{{ clientData.email }}</span>
                    </div>
                </div>

                <div class="grid grid-cols-2 p-2 gap-3 items-center justify-center">
                    <div class="flex flex-col shadow-md rounded-md bg-white p-3 w-[500px]">
                        <span class="">Adresse :</span>
                        <span>{{ clientData.address }}</span>
                    </div>
                    <div class="flex flex-col shadow-md rounded-md bg-white p-3">
                        <span class="">Numéro de téléphone :</span>
                        <span>{{ clientData.phone_number }}</span>
                    </div>
                </div>

                <div class="grid grid-cols-2 p-2 gap-3 items-center justify-center">
                    <div class="flex flex-col shadow-md rounded-md bg-white p-3 w-[500px]">
                        <span class="">Date D'Anniversaire :</span>
                        <span>{{ clientData.birth_date }}</span>
                    </div>
                    <div class="flex flex-col shadow-md rounded-md bg-white p-3">
                        <span class="">Genre :</span>
                        <span>{{ clientData.gender }}</span>
                    </div>
                </div>
           </div>
           
        </div>

    </div>
</template>


<style lang="scss" scoped>

</style>