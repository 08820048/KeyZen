<template>
  <button
    class="fancy-glass-btn"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <span class="btn-label">
      <slot>立即体验</slot>
    </span>
    <svg
      class="drip-svg"
      :width="btnWidth"
      :height="dripHeight"
      :viewBox="`0 0 ${btnWidth} ${dripHeight}`"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient :id="'drip-gradient'" x1="0" y1="0" :x2="btnWidth" y2="0" gradientUnits="userSpaceOnUse">
          <stop stop-color="#6366f1"/>
          <stop offset="1" stop-color="#a78bfa"/>
        </linearGradient>
      </defs>
      <path
        :d="dripPath"
        fill="url(#drip-gradient)"
        :style="{ filter: 'blur(0.5px)' }"
      />
      <circle
        v-for="(drop, i) in drops"
        :key="i"
        :cx="drop.cx"
        :cy="drop.cy"
        :r="drop.r"
        fill="url(#drip-gradient)"
        :style="{ opacity: drop.opacity, filter: 'blur(0.2px)' }"
      />
    </svg>
  </button>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const hover = ref(false);
const btnWidth = 220;
const btnHeight = 56;
const dripHeight = 26;

// 更自然的波形（贝塞尔曲线）
const baseWave = [
  { x: 0, y: 8 },
  { x: 36, y: 18 },
  { x: 60, y: 8 },
  { x: 110, y: 22 },
  { x: 160, y: 8 },
  { x: 190, y: 16 },
  { x: 220, y: 8 }
];
const hoverWave = [
  { x: 0, y: 12 },
  { x: 36, y: 24 },
  { x: 60, y: 12 },
  { x: 110, y: 26 },
  { x: 160, y: 12 },
  { x: 190, y: 22 },
  { x: 220, y: 12 }
];

const dripPath = computed(() => {
  const wave = hover.value ? hoverWave : baseWave;
  let d = `M0,0`;
  d += ` L0,${wave[0].y}`;
  for (let i = 0; i < wave.length - 1; i++) {
    const p1 = wave[i];
    const p2 = wave[i + 1];
    const cpx = (p1.x + p2.x) / 2;
    d += ` Q${cpx},${p1.y} ${p2.x},${p2.y}`;
  }
  d += ` L${btnWidth},0 L${btnWidth},${dripHeight} L0,${dripHeight} Z`;
  return d;
});

// 液滴动画
const drops = ref([
  { cx: 40, cy: 22, r: 4, opacity: 0.7, base: 22, amp: 2.5, speed: 0.9 },
  { cx: 110, cy: 24, r: 2.8, opacity: 0.5, base: 24, amp: 2, speed: 1.2 },
  { cx: 180, cy: 18, r: 3.2, opacity: 0.6, base: 18, amp: 2.2, speed: 1.1 },
]);

let dripTimer;
watch(hover, (val) => {
  if (val) {
    dripTimer = setInterval(() => {
      const now = Date.now();
      drops.value.forEach((drop, i) => {
        drop.cy = drop.base + Math.sin(now / (320 + i * 80)) * drop.amp;
        drop.opacity = 0.5 + 0.3 * Math.abs(Math.sin(now / (500 + i * 120)));
      });
    }, 32);
  } else {
    clearInterval(dripTimer);
    drops.value = [
      { cx: 40, cy: 22, r: 4, opacity: 0.7, base: 22, amp: 2.5, speed: 0.9 },
      { cx: 110, cy: 24, r: 2.8, opacity: 0.5, base: 24, amp: 2, speed: 1.2 },
      { cx: 180, cy: 18, r: 3.2, opacity: 0.6, base: 18, amp: 2.2, speed: 1.1 },
    ];
  }
});
</script>

<style scoped>
.fancy-glass-btn {
  position: relative;
  display: inline-block;
  width: 220px;
  height: 56px;
  border: none;
  outline: none;
  border-radius: 18px;
  background: linear-gradient(90deg, #6366f1 0%, #a78bfa 100%);
  box-shadow: 0 2px 24px 0 rgba(99,102,241,0.18), 0 1.5px 0.5px 0 rgba(255,255,255,0.08) inset, 0 0 0 2px #a78bfa33;
  color: #fff;
  font-family: 'Orbitron', 'Inter', 'Montserrat', 'Arial', sans-serif;
  font-size: 1.18rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-align: center;
  cursor: pointer;
  overflow: visible;
  transition: box-shadow 0.25s, background 0.25s, filter 0.25s;
  filter: blur(0) saturate(1.1) brightness(1.08);
  backdrop-filter: blur(10px) saturate(1.2);
  -webkit-backdrop-filter: blur(10px) saturate(1.2);
}
.fancy-glass-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 18px;
  background: rgba(255,255,255,0.10);
  box-shadow: 0 0 32px 0 #a78bfa44, 0 0 0 2px #6366f133;
  pointer-events: none;
  z-index: 1;
}
.fancy-glass-btn:hover,
.fancy-glass-btn:focus {
  box-shadow: 0 6px 36px 0 #a78bfa77, 0 2px 8px 0 #6366f1cc;
  background: linear-gradient(90deg, #7c3aed 0%, #a78bfa 100%);
  filter: blur(0) saturate(1.2) brightness(1.13);
}
.btn-label {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: #fff;
  text-shadow: 0 2px 8px #6366f1cc, 0 1px 0 #fff2;
  font-family: 'Orbitron', 'Inter', 'Montserrat', 'Arial', sans-serif;
  font-weight: 700;
  font-size: 1.18rem;
  letter-spacing: 0.05em;
  user-select: none;
}
.drip-svg {
  position: absolute;
  left: 0;
  bottom: -26px;
  width: 220px;
  height: 26px;
  z-index: 2;
  pointer-events: none;
  transition: filter 0.25s;
}
.fancy-glass-btn:hover .drip-svg {
  filter: brightness(1.18) drop-shadow(0 2px 12px #a78bfa88);
}
</style> 