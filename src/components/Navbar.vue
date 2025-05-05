<template>
  <nav class="flex items-center justify-between py-5 px-6 md:px-12 bg-transparent">
    <div class="text-2xl font-bold tracking-tight text-white select-none">KeyZen</div>
    <ul class="flex items-center space-x-6 text-base font-medium">
      <li><a href="#demo" class="hover:text-primary transition-colors duration-200">功能演示</a></li>
      <li><a href="#docs" class="hover:text-primary transition-colors duration-200">开发文档</a></li>
      <li><a href="#login" class="hover:text-primary transition-colors duration-200">登录</a></li>
    </ul>
  </nav>
</template>

<script setup>
// 无逻辑，纯展示
</script>

<style scoped>
nav {
  /* 适配深色背景的透明导航 */
  backdrop-filter: blur(8px);
  background: rgba(24,26,32,0.85);
}
</style>
