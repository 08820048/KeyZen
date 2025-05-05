<template>
  <div class="min-h-screen flex flex-col bg-darkBg text-darkText">
    <Navbar />
    <main class="flex-1">
      <Hero />
      <Features />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import Features from './components/Features.vue';
import Footer from './components/Footer.vue';
</script>
