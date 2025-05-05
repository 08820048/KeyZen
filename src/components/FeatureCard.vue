<template>
  <div class="bg-darkCard rounded-2xl p-8 flex flex-col items-center text-center shadow-lg hover:scale-105 hover:shadow-primary/40 transition-transform duration-300 animate-fade-in">
    <div class="mb-5 text-4xl text-primary">
      <span :class="icon"></span>
    </div>
    <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
    <p class="text-gray-400 text-base">{{ desc }}</p>
  </div>
</template>

<script setup>
defineProps({
  icon: String,
  title: String,
  desc: String
});
</script>

<style scoped>
/* 保证动画和卡片风格统一 */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: none; }
}
.animate-fade-in {
  animation: fade-in 0.8s cubic-bezier(0.4,0,0.2,1) both;
}
</style>
