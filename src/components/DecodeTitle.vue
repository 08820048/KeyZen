<template>
  <h1 class="decode-title" :class="{ 'decoded': isDecoded, 'en-mode': !isDecoded }">
    <span v-for="(char, idx) in displayChars" :key="idx" class="decode-char" :class="{ 'en-char': !isDecoded }">{{ char }}</span>
    <span class="decode-cursor-underscore" aria-hidden="true">_</span>
  </h1>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const EN_TEXT = 'Type to verify';
const CN_TEXT = '键入，即验证';
const DURATION = 3800;
const RANDOM_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=[]{}|;:,.<>?/';
const INTERVAL = 6400;
const displayChars = ref([]);
const isDecoded = ref(false);
let timer = null;

function randomChar() {
  return RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];
}

function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function startDecode() {
  const len = EN_TEXT.length;
  displayChars.value = Array.from({length: len}, () => randomChar());
  isDecoded.value = false;
  const start = performance.now();
  let revealed = Array(len).fill(false);
  function step(now) {
    const elapsed = now - start;
    let progress = Math.min(1, elapsed / DURATION);
    let smooth = easeInOut(progress);
    let smoothReveal = smooth * len;
    for (let i = 0; i < len; i++) {
      if (smoothReveal > i + 0.22) {
        displayChars.value[i] = EN_TEXT[i];
        revealed[i] = true;
      } else if (!revealed[i]) {
        displayChars.value[i] = randomChar();
      }
    }
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      displayChars.value = CN_TEXT.split('');
      isDecoded.value = true;
    }
  }
  requestAnimationFrame(step);
}

function scheduleLoop() {
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    startDecode();
  }, INTERVAL);
}

onMounted(() => {
  startDecode();
  scheduleLoop();
});
onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
.decode-title {
  font-size: 2.6rem;
  font-weight: 900;
  text-align: center;
  letter-spacing: 0.04em;
  margin-bottom: 1.6rem;
  line-height: 1.13;
  filter: brightness(1.08);
  transition: text-shadow 0.5s, filter 0.7s, letter-spacing 0.5s;
  opacity: 0.93;
  position: relative;
  white-space: pre;
}
.decode-title.en-mode {
  letter-spacing: 0.01em;
}
.decode-char {
  display: inline-block;
  min-width: 0.92em;
  transition: color 0.18s, filter 0.25s, letter-spacing 0.4s;
  color: #F8FAFF;
  filter: blur(0.5px);
  opacity: 0.97;
}
.en-char {
  font-family: 'JetBrains Mono', 'Fira Mono', 'Menlo', 'Consolas', 'monospace';
  font-weight: 700;
  letter-spacing: 0em;
  min-width: 0.78em;
  font-size: 1.03em;
}
.decode-title.decoded .decode-char {
  color: #FFFFFF;
  filter: drop-shadow(0 0 8px #e7eaf7cc) brightness(1.12);
  animation: glowIn 0.7s cubic-bezier(.4,0,.2,1);
  opacity: 1;
}
.decode-cursor-underscore {
  display: inline-block;
  font-family: 'JetBrains Mono', 'Fira Mono', 'Menlo', 'Consolas', 'monospace';
  font-weight: 800;
  font-size: 1.1em;
  color: #fff;
  margin-left: 0.04em;
  margin-bottom: -0.08em;
  opacity: 0.85;
  animation: blink-cursor-underscore 1.08s steps(1) infinite;
  vertical-align: -0.08em;
  letter-spacing: 0;
}
@keyframes blink-cursor-underscore {
  0%, 60% { opacity: 0.85; }
  70%, 100% { opacity: 0; }
}
@keyframes glowIn {
  from {
    filter: blur(2.5px) brightness(0.7);
    opacity: 0.18;
  }
  to {
    filter: drop-shadow(0 0 8px #e7eaf7cc) brightness(1.12);
    opacity: 1;
  }
}
</style>
