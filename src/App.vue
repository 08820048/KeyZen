<template>
  <DynamicGridBg />
  <div class="min-h-screen flex flex-col bg-darkBg text-darkText font-sans overflow-x-hidden">
    <BackgroundEffect />
    <Navbar />
    <main class="flex-1">
      <Hero />
      <Features />
    </main>
    <!-- <Footer /> removed for minimal design -->
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import Features from './components/Features.vue';
import BackgroundEffect from './components/BackgroundEffect.vue';
import DynamicGridBg from './components/DynamicGridBg.vue';
</script>

<style>
body {
  background: #0d1117 !important;
}
</style>
