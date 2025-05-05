<template>
  <canvas ref="canvas" class="bg-animated"></canvas>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
const canvas = ref(null);
let ctx, animationId;

function resize() {
  if (!canvas.value) return;
  canvas.value.width = window.innerWidth * window.devicePixelRatio;
  canvas.value.height = window.innerHeight * window.devicePixelRatio;
}

function drawGradient() {
  if (!canvas.value) return;
  ctx = canvas.value.getContext('2d');
  const w = canvas.value.width;
  const h = canvas.value.height;
  ctx.clearRect(0, 0, w, h);
  // 斜切渐变
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#23262F');
  grad.addColorStop(0.4, '#5F7FFF88');
  grad.addColorStop(0.7, '#A970FF66');
  grad.addColorStop(1, '#181A20');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  // 动态光斑
  const t = Date.now() * 0.0003;
  for (let i = 0; i < 3; i++) {
    const x = w * (0.3 + 0.4 * Math.sin(t + i));
    const y = h * (0.2 + 0.5 * Math.cos(t + i * 1.7));
    const r = 120 * window.devicePixelRatio + 80 * Math.sin(t * 1.7 + i);
    const glow = ctx.createRadialGradient(x, y, 0, x, y, r);
    glow.addColorStop(0, i % 2 === 0 ? '#5F7FFF44' : '#A970FF44');
    glow.addColorStop(1, 'transparent');
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = glow; ctx.fill();
  }
}

function animate() {
  drawGradient();
  animationId = requestAnimationFrame(animate);
}

onMounted(() => {
  resize();
  animate();
  window.addEventListener('resize', resize);
});
onBeforeUnmount(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('resize', resize);
});
</script>

<style scoped>
.bg-animated {
  position: fixed;
  inset: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  opacity: 0.95;
  transition: opacity 0.5s;
}
</style>
