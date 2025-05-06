<template>
  <DynamicGridBg />
  <div class="min-h-screen flex flex-col bg-darkBg text-darkText font-sans overflow-x-hidden">
    <BackgroundEffect />
    <Navbar />
    <main class="flex-1 relative">
      <Swiper
        direction="vertical"
        :modules="modules"
        :mousewheel="{ forceToAxis: true, sensitivity: 1 }"
        :pagination="false"
        class="h-screen w-full swiper-vertical"
        @slideChange="onSlideChange"
        ref="mainSwiper"
      >
        <SwiperSlide>
          <Hero />
        </SwiperSlide>
        <SwiperSlide>
          <FeatureCard
            icon="i-carbon:ibm-security"
            title="实时打字节奏识别"
            desc="精准捕捉每一次击键，分析用户打字节奏，实现无感身份验证。"
          />
        </SwiperSlide>
        <SwiperSlide>
          <FeatureCard
            icon="i-carbon:user-privacy"
            title="本地建模，保护用户隐私"
            desc="所有数据本地处理，用户数据绝不上云。"
          />
        </SwiperSlide>
        <SwiperSlide>
          <FeatureCard
            icon="i-carbon:api"
            title="提供标准 API 快速接入"
            desc="标准化设计，快速集成，开发者友好。"
          />
        </SwiperSlide>
      </Swiper>
      <Transition name="float-fade">
        <div v-if="showSwipeTip" class="absolute left-1/2 -translate-x-1/2 bottom-16 md:bottom-20 flex flex-col items-center select-none z-50 swipe-tip-container group" @click="scrollToNextSlide">
          <div class="scroll-tip-button">
            <div class="scroll-tip-inner">
              <svg width="16" height="16" viewBox="0 0 16 16" class="opacity-85 group-hover:opacity-100 transition-all duration-300 scroll-arrow">
                <path d="M8 3v7m0 0l-3-3M8 10l3-3" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="scroll-tip-glow"></div>
          </div>
        </div>
      </Transition>
    </main>
    <!-- <Footer /> removed for minimal design -->
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import FeatureCard from './components/FeatureCard.vue';
import BackgroundEffect from './components/BackgroundEffect.vue';
import DynamicGridBg from './components/DynamicGridBg.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { Mousewheel } from 'swiper/modules';
const modules = [Mousewheel];
const mainSwiper = ref();
const activeIndex = ref(0);
const showSwipeTip = ref(true);
const onSlideChange = (swiper) => {
  activeIndex.value = swiper.activeIndex;
  showSwipeTip.value = swiper.activeIndex === 0;
};

const scrollToNextSlide = () => {
  if (mainSwiper.value && mainSwiper.value.swiper) {
    mainSwiper.value.swiper.slideNext();
  }
};

provide('showSwipeTip', showSwipeTip);
</script>

<style>
body {
  background: #0d1117 !important;
}
.swiper-vertical {
  height: 100vh;
  width: 100vw;
}
.drop-shadow-glow {
  filter: drop-shadow(0 0 12px #818cf8bb);
}

@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(4px); }
  100% { transform: translateY(0); }
}

@keyframes pulse-glow {
  0% { opacity: 0.4; transform: scale(0.97); }
  50% { opacity: 0.7; transform: scale(1.03); }
  100% { opacity: 0.4; transform: scale(0.97); }
}

@keyframes sweep-light {
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
}

.float-fade-enter-active, .float-fade-leave-active {
  transition: opacity 0.5s;
}
.float-fade-enter-from, .float-fade-leave-to {
  opacity: 0;
}
.float-fade-enter-to, .float-fade-leave-from {
  opacity: 1;
}

.swipe-tip-container {
  will-change: transform, opacity;
  cursor: pointer;
  pointer-events: auto;
}

.scroll-tip-button {
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(24, 26, 32, 0.75);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(99, 102, 241, 0.15);
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.12), 0 0 1px rgba(255, 255, 255, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.scroll-tip-inner {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.scroll-arrow {
  animation: float 2.5s ease-in-out infinite;
  transform-origin: center;
}

.group:hover .scroll-arrow {
  animation: float 1.5s ease-in-out infinite;
}

.scroll-tip-glow {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
  opacity: 0.4;
  z-index: 1;
  animation: pulse-glow 3s ease-in-out infinite;
}

.group:hover .scroll-tip-button {
  border-color: rgba(99, 102, 241, 0.35);
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.25), 0 0 5px rgba(254, 243, 199, 0.15);
  background: rgba(28, 30, 38, 0.85);
  transform: translateY(-2px);
}

.group:hover .scroll-tip-button::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  animation: sweep-light 1.5s ease-in-out;
  z-index: 1;
}
</style>
