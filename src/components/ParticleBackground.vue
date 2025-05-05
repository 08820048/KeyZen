<template>
  <div class="particle-bg" ref="bgRef">
    <canvas ref="canvasRef" class="absolute inset-0 w-full h-full" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
const bgRef = ref(null);
const canvasRef = ref(null);

const PARTICLE_COUNT = 84;
const COLOR = '#fef3c7'; // 淡金色
const BG_COLOR = '#0e0f11';
const TAIL_LENGTH = 0.32; // 拖尾
const GLOW = 0.16;
let particles = [];
let animationId;
let width = 0, height = 0, dpr = 1;
let mouse = { x: 0.5, y: 0.5, active: false };

function random3D() {
  // 生成 [-1,1] 的 3D 坐标
  let theta = Math.random() * 2 * Math.PI;
  let phi = Math.acos(2 * Math.random() - 1);
  let r = Math.pow(Math.random(), 0.7); // 更均匀分布
  return {
    x: Math.sin(phi) * Math.cos(theta) * r,
    y: Math.sin(phi) * Math.sin(theta) * r,
    z: Math.cos(phi) * r
  };
}

function createParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    let pos = random3D();
    let speed = 0.1 + Math.random() * 0.25;
    particles.push({
      base: { ...pos },
      x: pos.x, y: pos.y, z: pos.z,
      size: 1.2 + Math.random() * 2.1,
      phase: Math.random() * Math.PI * 2,
      speed,
      opacity: 0.34 + Math.random() * 0.32,
      tail: []
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

function project3D(x, y, z) {
  // 简单 3D->2D 投影
  const fov = 1.5;
  const viewer = 2.3;
  let scale = fov / (viewer - z);
  return {
    x: width / 2 + x * width * 0.42 * scale,
    y: height / 2 + y * height * 0.26 * scale
  };
}

function draw() {
  const ctx = canvasRef.value.getContext('2d');
  ctx.clearRect(0, 0, width * dpr, height * dpr);
  ctx.save();
  ctx.globalAlpha = 1;
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, width * dpr, height * dpr);
  ctx.restore();

  for (const p of particles) {
    // 拖尾
    if (p.tail.length > 8) p.tail.shift();
    p.tail.push({ x: p.x, y: p.y, z: p.z });
    // 画拖尾
    for (let i = 1; i < p.tail.length; i++) {
      let t1 = project3D(p.tail[i-1].x, p.tail[i-1].y, p.tail[i-1].z);
      let t2 = project3D(p.tail[i].x, p.tail[i].y, p.tail[i].z);
      ctx.save();
      ctx.globalAlpha = (p.opacity * TAIL_LENGTH) * (i / p.tail.length);
      ctx.strokeStyle = COLOR;
      ctx.lineWidth = dpr * (p.size * (0.45 - 0.33 * i/p.tail.length));
      ctx.beginPath();
      ctx.moveTo(t1.x * dpr, t1.y * dpr);
      ctx.lineTo(t2.x * dpr, t2.y * dpr);
      ctx.stroke();
      ctx.restore();
    }
    // 粒子本体
    let { x, y } = project3D(p.x, p.y, p.z);
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.shadowColor = COLOR;
    ctx.shadowBlur = p.size * dpr * 4 * GLOW;
    ctx.beginPath();
    ctx.arc(x * dpr, y * dpr, p.size * dpr, 0, 2 * Math.PI);
    ctx.fillStyle = COLOR;
    ctx.filter = 'blur(0.5px)';
    ctx.fill();
    ctx.restore();
  }
}

function animate(t) {
  for (const p of particles) {
    // 浮动动画
    let t1 = t * 0.00014 * p.speed + p.phase;
    let t2 = t * 0.00007 * p.speed + p.phase * 1.3;
    // 鼠标或滚动影响
    let mx = (mouse.x - 0.5) * 1.7;
    let my = (mouse.y - 0.5) * 1.1;
    let gather = mouse.active ? 0.16 : 0.07;
    p.x = p.base.x + Math.sin(t1) * 0.09 + mx * gather * (0.7 + p.z);
    p.y = p.base.y + Math.cos(t2) * 0.13 + my * gather * (0.7 + p.z);
    p.z = p.base.z + Math.sin(t1 + t2) * 0.03;
    // 透明度轻微波动
    p.opacity += (0.36 + Math.sin(t1 + t2 + p.phase) * 0.13 - p.opacity) * 0.07;
  }
  draw();
  animationId = requestAnimationFrame(animate);
}

function onPointer(e) {
  let x = 0.5, y = 0.5;
  if (e.touches && e.touches.length) {
    x = e.touches[0].clientX / width;
    y = e.touches[0].clientY / height;
  } else {
    x = e.clientX / width;
    y = e.clientY / height;
  }
  mouse.x = x;
  mouse.y = y;
  mouse.active = true;
  clearTimeout(mouse._timer);
  mouse._timer = setTimeout(() => { mouse.active = false; }, 900);
}

onMounted(() => {
  createParticles();
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('scroll', e => {
    mouse.x = 0.5 + (window.scrollY % 34) / 340;
    mouse.active = true;
    clearTimeout(mouse._timer);
    mouse._timer = setTimeout(() => { mouse.active = false; }, 500);
  });
  bgRef.value.addEventListener('pointermove', onPointer);
  bgRef.value.addEventListener('touchmove', onPointer);
  animationId = requestAnimationFrame(animate);
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', resize);
  if (bgRef.value) {
    bgRef.value.removeEventListener('pointermove', onPointer);
    bgRef.value.removeEventListener('touchmove', onPointer);
  }
  cancelAnimationFrame(animationId);
});
</script>

<style scoped>
.particle-bg {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  background: #0e0f11;
  overflow: hidden;
}
canvas {
  display: block;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}
</style>
