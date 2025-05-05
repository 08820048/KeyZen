<template>
  <section class="flex flex-col items-center justify-center text-center py-20 md:py-32 select-none">
    <h1 class="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight animate-fade-in">
      从键盘节奏中识别你是谁
    </h1>
    <p class="text-lg md:text-2xl text-gray-300 mb-10 animate-fade-in delay-100">
      KeyZen 利用每个人独特的打字行为，提供无感、隐私、安全的身份验证方式。
    </p>
    <div class="flex flex-col md:flex-row gap-4 justify-center">
      <a href="#demo" class="px-8 py-3 rounded-lg bg-primary text-white font-semibold shadow-lg hover:bg-white hover:text-primary transition-colors duration-200 animate-fade-in delay-200">立即体验</a>
      <a href="#docs" class="px-8 py-3 rounded-lg bg-darkCard text-white font-semibold border border-gray-700 hover:bg-primary hover:text-white transition-colors duration-200 animate-fade-in delay-300">查看文档</a>
    </div>
  </section>
</template>

<script setup>
// 无逻辑，纯展示
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: none; }
}
.animate-fade-in {
  animation: fade-in 0.8s cubic-bezier(0.4,0,0.2,1) both;
}
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
</style>
