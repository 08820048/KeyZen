<template>
  <div class="dynamic-grid-bg"></div>
</template>

<script setup>
// 无需 JS，仅用 CSS 动画
</script>

<style scoped>
.dynamic-grid-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  width: 100vw;
  height: 100vh;
  background:
    repeating-linear-gradient(to right, rgba(255,255,255,0.04) 0 1px, transparent 1px 60px),
    repeating-linear-gradient(to bottom, rgba(255,255,255,0.04) 0 1px, transparent 1px 60px);
  animation: grid-move 18s linear infinite;
  background-color: #0d1117;
}
@keyframes grid-move {
  0% {
    background-position: 0 0, 0 0;
  }
  100% {
    background-position: 60px 60px, 60px 60px;
  }
}
</style>
