<template>
     <div class="leading-normal tracking-normal" id="main-body">
      <div class="flex flex-wrap">
        <Sidebar />
        <div class="w-full bg-gray-100 pl-0 lg:pl-64 min-h-screen" :class="{ overlay: sideBarOpen }" id="main-content">
          <Navbar />
          <main>
            <div>
                <router-view></router-view>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
</template>

<script setup>
 import { computed } from 'vue';
  import { useStore } from 'vuex';
  import Sidebar from './Sidebar.vue';
  import Navbar from './Navbar.vue';
  import Footer from './Footer.vue';
  
  const store = useStore();
  const sideBarOpen = computed(() => store.state.sideBarOpen);
</script>

<style lang="scss" scoped>

</style>