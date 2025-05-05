<template>
  <div class="decode-title-laser-wrap">
    <svg :width="svgWidth" :height="svgHeight" class="decode-title-svg" ref="svgRef">
      <defs>
        <filter id="blue-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <g>
        <text
          v-for="(char, idx) in displayChars"
          :key="idx"
          :x="charX(idx)"
          :y="svgHeight * 0.7"
          :class="['decode-char-svg', { 'decoded': decodedStates[idx], 'en-char': isEnglish }]"
          :filter="decodedStates[idx] ? 'url(#blue-glow)' : ''"
          >{{ char }}</text>
        <rect
          v-if="showLaser"
          class="laser-bar"
          :x="laserX"
          y="0"
          :width="laserWidth"
          :height="svgHeight"
        />
      </g>
    </svg>
    <span class="decode-cursor-underscore-svg" :class="{ active: cursorActive, 'en-mode': isEnglish }" aria-hidden="true">_</span>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

const CN_TEXT = '键入，即验证';
const EN_TEXT = 'Type to verify';
const RANDOM_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=[]{}|;:,.<>?/';
const DURATION = 2500; // 扫描总时长
const INTERVAL = 6400; // 每轮解码间隔
const CHAR_DELAY = 80; // 字符错落延迟
const LASER_WIDTH = 18; // px
const svgHeight = 56;
const svgWidth = ref(0);
const svgRef = ref(null);
const displayChars = ref([]);
const decodedStates = ref([]);
const laserX = ref(0);
const showLaser = ref(true);
const isEnglish = ref(false);
const cursorActive = ref(true);
let timer = null;
let cursorTimer = null;

function randomChar() {
  return RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];
}

function charX(idx) {
  return 36 + idx * 38;
}

function startLaserDecode() {
  isEnglish.value = !isEnglish.value;
  const TEXT = isEnglish.value ? EN_TEXT : CN_TEXT;
  displayChars.value = Array.from({ length: TEXT.length }, () => randomChar());
  decodedStates.value = Array(TEXT.length).fill(false);
  laserX.value = 0;
  showLaser.value = true;
  svgWidth.value = 36 + (TEXT.length - 1) * 38 + 36;
  let start = null;
  function animateLaser(ts) {
    if (!start) start = ts;
    let elapsed = ts - start;
    let progress = Math.min(1, elapsed / DURATION);
    laserX.value = 36 + (TEXT.length - 1) * 38 * progress;
    for (let i = 0; i < TEXT.length; i++) {
      let charPos = 36 + i * 38;
      if (laserX.value > charPos - LASER_WIDTH/2 - 6) {
        if (!decodedStates.value[i]) {
          decodedStates.value[i] = true;
          displayChars.value[i] = TEXT[i];
        }
      } else if (!decodedStates.value[i]) {
        displayChars.value[i] = randomChar();
      }
    }
    if (progress < 1) {
      requestAnimationFrame(animateLaser);
    } else {
      showLaser.value = false;
      timer = setTimeout(startLaserDecode, INTERVAL);
    }
  }
  requestAnimationFrame(animateLaser);
}

function startCursorBlink() {
  if (cursorTimer) clearInterval(cursorTimer);
  cursorActive.value = true;
  cursorTimer = setInterval(() => {
    cursorActive.value = !cursorActive.value;
  }, 540);
}

onMounted(() => {
  svgWidth.value = 36 + (CN_TEXT.length - 1) * 38 + 36;
  nextTick(() => {
    startLaserDecode();
    startCursorBlink();
  });
});

onBeforeUnmount(() => {
  showLaser.value = false;
  if (timer) clearTimeout(timer);
  if (cursorTimer) clearInterval(cursorTimer);
});
</script>

<style scoped>
.decode-title-laser-wrap {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 1.6rem;
  position: relative;
  min-height: 58px;
}
.decode-title-svg {
  width: 100%;
  height: 56px;
  overflow: visible;
}
.decode-char-svg {
  font-size: 2.5rem;
  font-family: 'JetBrains Mono', 'HarmonyOS Sans', 'Inter', ui-sans-serif, system-ui, sans-serif;
  font-weight: 900;
  fill: #bfe2ff;
  letter-spacing: 0.04em;
  transition: fill 0.28s, filter 0.4s, font-size 0.24s;
  filter: blur(0.5px);
  opacity: 0.91;
}
.decode-char-svg.decoded {
  fill: #fff;
  filter: drop-shadow(0 0 10px #5F7FFFcc) blur(0.2px) brightness(1.13);
  opacity: 1;
  transition: fill 0.32s, filter 0.4s, opacity 0.38s;
}
.decode-char-svg.en-char {
  font-family: 'JetBrains Mono', 'Fira Mono', 'Menlo', 'Consolas', 'monospace';
  font-weight: 700;
  letter-spacing: 0em;
  font-size: 2.18rem;
}
.laser-bar {
  fill: url(#laser-gradient);
  filter: blur(2.7px) brightness(1.15) drop-shadow(0 0 10px #5F7FFFcc);
  opacity: 0.81;
}
.decode-cursor-underscore-svg {
  display: inline-block;
  font-family: 'JetBrains Mono', 'Fira Mono', 'Menlo', 'Consolas', 'monospace';
  font-weight: 900;
  font-size: 1.7em;
  color: #fff;
  margin-left: 0.45em;
  margin-bottom: 0.12em;
  opacity: 0.89;
  vertical-align: bottom;
  letter-spacing: 0;
  transition: opacity 0.2s, font-size 0.2s, margin-left 0.2s;
  text-shadow: 0 0 6px #7cb3ff, 0 0 2px #5F7FFF;
  border-radius: 2px;
}
.decode-cursor-underscore-svg.en-mode {
  font-size: 1.38em;
  margin-left: 0.38em;
}
.decode-cursor-underscore-svg:not(.active) {
  opacity: 0;
}
</style>
