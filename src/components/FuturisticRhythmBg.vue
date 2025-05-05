<template>
  <div class="futuristic-bg" ref="bgRef">
    <canvas ref="canvasRef" class="absolute inset-0 w-full h-full" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
const bgRef = ref(null);
const canvasRef = ref(null);

const BG_COLOR = '#0d1117';
const PARTICLE_COLOR = '#fef3c7';
const PARTICLE_COUNT = 64;
const PARTICLE_SIZE = [1.1, 2.3];
const PARTICLE_OPACITY = [0.17, 0.33];
const WAVE_COLOR = '#fef3c7';
const WAVE_POINTS = 64;
const WAVE_RADIUS = 104;
const WAVE_WIDTH = 2.6;
const WAVE_GLOW = 0.16;

let particles = [];
let wavePhase = 0;
let animationId;
let width = 0, height = 0, dpr = 1;

function createParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    let angle = Math.random() * Math.PI * 2;
    let rad = 0.33 + Math.random() * 0.67;
    particles.push({
      base: {
        x: Math.cos(angle) * rad,
        y: Math.sin(angle) * rad,
      },
      x: 0, y: 0,
      size: PARTICLE_SIZE[0] + Math.random() * (PARTICLE_SIZE[1] - PARTICLE_SIZE[0]),
      opacity: PARTICLE_OPACITY[0] + Math.random() * (PARTICLE_OPACITY[1] - PARTICLE_OPACITY[0]),
      phase: Math.random() * Math.PI * 2,
      speed: 0.2 + Math.random() * 0.25
    });
  }
}

function resize() {
  const canvas = canvasRef.value;
  dpr = window.devicePixelRatio || 1;
  width = bgRef.value.offsetWidth;
  height = bgRef.value.offsetHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
}

function draw() {
  const ctx = canvasRef.value.getContext('2d');
  ctx.clearRect(0, 0, width * dpr, height * dpr);
  ctx.save();
  ctx.globalAlpha = 1;
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, width * dpr, height * dpr);
  ctx.restore();

  // 粒子
  for (const p of particles) {
    let px = width / 2 + p.x * width * 0.37;
    let py = height / 2 + p.y * height * 0.23;
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.shadowColor = PARTICLE_COLOR;
    ctx.shadowBlur = p.size * dpr * 5;
    ctx.beginPath();
    ctx.arc(px * dpr, py * dpr, p.size * dpr, 0, 2 * Math.PI);
    ctx.fillStyle = PARTICLE_COLOR;
    ctx.filter = 'blur(0.6px)';
    ctx.fill();
    ctx.restore();
  }

  // 波形轨迹
  ctx.save();
  ctx.translate(width / 2 * dpr, height / 2 * dpr);
  ctx.beginPath();
  for (let i = 0; i <= WAVE_POINTS; i++) {
    let theta = (i / WAVE_POINTS) * Math.PI * 2;
    // 节奏波形：sin 叠加多频，模拟打字节奏变化
    let base = WAVE_RADIUS;
    let rhythm = Math.sin(theta * 3 + wavePhase) * 13 + Math.cos(theta * 7 - wavePhase * 0.7) * 7;
    let r = base + rhythm * (0.7 + Math.sin(wavePhase + theta) * 0.15);
    let x = Math.cos(theta) * r * dpr;
    let y = Math.sin(theta) * r * dpr;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.shadowColor = WAVE_COLOR;
  ctx.shadowBlur = WAVE_WIDTH * dpr * 6 * WAVE_GLOW;
  ctx.globalAlpha = 0.92;
  ctx.strokeStyle = WAVE_COLOR;
  ctx.lineWidth = WAVE_WIDTH * dpr;
  ctx.filter = 'blur(0.5px)';
  ctx.stroke();
  ctx.restore();
}

function animate(t) {
  // 粒子缓慢浮动
  for (const p of particles) {
    let t1 = t * 0.00011 * p.speed + p.phase;
    p.x = p.base.x + Math.sin(t1) * 0.06;
    p.y = p.base.y + Math.cos(t1 * 0.9) * 0.08;
    p.opacity += (PARTICLE_OPACITY[0] + Math.sin(t1 + p.phase) * 0.13 - p.opacity) * 0.07;
  }
  // 波形节奏推进
  wavePhase += 0.022 + Math.sin(t * 0.00018) * 0.003;
  draw();
  animationId = requestAnimationFrame(animate);
}

onMounted(() => {
  createParticles();
  resize();
  window.addEventListener('resize', resize);
  animationId = requestAnimationFrame(animate);
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', resize);
  cancelAnimationFrame(animationId);
});
</script>

<style scoped>
.futuristic-bg {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  background: #0d1117;
  overflow: hidden;
}
canvas {
  display: block;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}
</style>
