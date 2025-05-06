<template>
  <section class="flex flex-col items-center justify-start text-center py-16 md:py-24 pb-24 md:pb-32 select-none relative min-h-screen">
    <!--<DecodeTitle />-->
    <div class="mt-8 md:mt-12 mb-8 md:mb-12">
      <DecodeTitleLaser />
    </div>
    <p class="text-lg md:text-2xl text-gray-300 mb-12 md:mb-16 animate-fade-in delay-100 max-w-3xl">
      KeyZen 利用每个人独特的打字行为，提供无感、隐私、安全的身份验证。
    </p>
    <div class="flex flex-col md:flex-row gap-4 justify-center mb-16 md:mb-20">
      <a href="#demo" class="btn-modern-primary animate-fade-in delay-200"><span>立即体验</span></a>
      <a href="#docs" class="btn-modern-outline animate-fade-in delay-300"><span>查看文档</span></a>
    </div>

    <!-- 四个主题卡片 -->
    <div class="w-full max-w-7xl px-6 md:px-8 animate-fade-in delay-400">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <!-- 无感验证卡片 -->
        <div class="feature-card group" @mouseenter="handleMouseEnter('seamlessAuth')" @mouseleave="handleMouseLeave">
          <div class="feature-card-inner">
            <div class="feature-icon-wrapper seamless-auth">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="feature-icon">
                <path d="M12 4L12 14M12 14L8 10M12 14L16 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path class="typing-wave" d="M4 18C6 15 8 15 10 18C12 21 14 21 16 18C18 15 20 15 22 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              <div class="icon-glow"></div>
            </div>
            <h3 class="feature-title">无感验证</h3>
            <p class="feature-desc">用户无需额外操作，凭打字节奏即可完成身份识别</p>
          </div>
          <div class="card-bg"></div>
          <div class="card-border"></div>
          <div class="card-hover-effect"></div>
        </div>

        <!-- 隐私保护卡片 -->
        <div class="feature-card group" @mouseenter="handleMouseEnter('privacyProtection')" @mouseleave="handleMouseLeave">
          <div class="feature-card-inner">
            <div class="feature-icon-wrapper privacy-protection">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="feature-icon">
                <path d="M12 2L4 5V11.5C4 16.5 7.5 21 12 22C16.5 21 20 16.5 20 11.5V5L12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="shield-pulse"/>
                <path d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 11V15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <div class="icon-glow"></div>
            </div>
            <h3 class="feature-title">隐私保护</h3>
            <p class="feature-desc">本地建模，所有打字数据不上传云端，安全可控</p>
          </div>
          <div class="card-bg"></div>
          <div class="card-border"></div>
          <div class="card-hover-effect"></div>
        </div>

        <!-- 安全可信卡片 -->
        <div class="feature-card group" @mouseenter="handleMouseEnter('securityTrust')" @mouseleave="handleMouseLeave">
          <div class="feature-card-inner">
            <div class="feature-icon-wrapper security-trust">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="feature-icon">
                <path d="M12 2L4 5V11.5C4 16.5 7.5 21 12 22C16.5 21 20 16.5 20 11.5V5L12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="shield-pulse"/>
                <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="check-mark"/>
              </svg>
              <div class="icon-glow"></div>
            </div>
            <h3 class="feature-title">安全可信</h3>
            <p class="feature-desc">基于行为模式识别，防止模拟器与账号共享操作</p>
          </div>
          <div class="card-bg"></div>
          <div class="card-border"></div>
          <div class="card-hover-effect"></div>
        </div>

        <!-- 接入快捷卡片 -->
        <div class="feature-card group" @mouseenter="handleMouseEnter('quickIntegration')" @mouseleave="handleMouseLeave">
          <div class="feature-card-inner">
            <div class="feature-icon-wrapper quick-integration">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="feature-icon">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lightning-flash"/>
              </svg>
              <div class="icon-glow"></div>
            </div>
            <h3 class="feature-title">接入快捷</h3>
            <p class="feature-desc">标准化 API，支持多平台集成，几行代码即可部署</p>
          </div>
          <div class="card-bg"></div>
          <div class="card-border"></div>
          <div class="card-hover-effect"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- 特性模态框 -->
  <FeatureModal
    :show="showModal"
    :feature-data="currentFeature"
    @close="closeModal"
    @modal-enter="onModalEnter"
    @modal-leave="onModalLeave"
  />
</template>

<script setup>
import { ref, inject } from 'vue';
import DecodeTitleLaser from './DecodeTitleLaser.vue';
import FeatureModal from './FeatureModal.vue';
import { featureModalData } from '../data/featureModalData.js';
import FancyGlassButton from './FancyGlassButton.vue';

// 注入全局状态
const isSwiperEnabled = inject('isSwiperEnabled');

// 悬停状态管理
const showModal = ref(false);
const currentFeature = ref(null);
const isHoveringCard = ref(false);
const isHoveringModal = ref(false);
let closeTimeout = null;

const handleMouseEnter = (featureId) => {
  isHoveringCard.value = true;
  clearTimeout(closeTimeout);
  currentFeature.value = featureModalData[featureId];
  showModal.value = true;
  isSwiperEnabled.value = false;
};

const handleMouseLeave = () => {
  isHoveringCard.value = false;
  tryCloseModal();
};

const onModalEnter = () => {
  isHoveringModal.value = true;
  clearTimeout(closeTimeout);
};
const onModalLeave = () => {
  isHoveringModal.value = false;
  tryCloseModal();
};

function tryCloseModal() {
  clearTimeout(closeTimeout);
  closeTimeout = setTimeout(() => {
    if (!isHoveringCard.value && !isHoveringModal.value) {
      showModal.value = false;
      isSwiperEnabled.value = true;
    }
  }, 180);
}

const closeModal = () => {
  showModal.value = false;
  // 恢复 Swiper 滑动
  isSwiperEnabled.value = true;
};
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: none; }
}
.animate-fade-in {
  animation: fade-in 0.8s cubic-bezier(0.4,0,0.2,1) both;
}
@keyframes fade-in-glow {
  from { opacity: 0; filter: blur(8px) brightness(1.2); }
  to { opacity: 1; filter: blur(0) brightness(1); }
}
.animate-fade-in-glow {
  animation: fade-in-glow 1.2s cubic-bezier(0.4,0,0.2,1) both;
}
.text-glow-hero {
  color: #f6f8ff;
  text-shadow: 0 0 36px #6c7aff77, 0 2px 12px #a970ff33, 0 0 2px #fff8;
  position: relative;
  letter-spacing: -0.01em;
}
.glow-bg {
  z-index: -1;
  border-radius: 2.4rem;
  background: radial-gradient(ellipse 60% 60% at 50% 60%, #5F7FFF33 0%, #A970FF11 60%, transparent 100%);
  filter: blur(18px);
}

.btn-modern-primary {
  display: inline-block;
  background: linear-gradient(90deg, #5F7FFF 0%, #23262F 100%);
  color: #b5cfff;
  font-weight: 700;
  border-radius: 0.85em;
  padding: 0.66em 2.3em;
  border: 1.5px solid #6C7AFF;
  box-shadow: 0 0.5px 0.5px 0 #5F7FFF11 inset, 0 2px 8px 0 #23262F33 inset;
  outline: none;
  font-size: 1.13rem;
  transition: background 0.58s cubic-bezier(0.4,0,0.2,1), box-shadow 0.48s cubic-bezier(0.4,0,0.2,1), color 0.48s, border-color 0.48s, filter 0.48s, transform 0.58s cubic-bezier(0.4,0,0.2,1);
  filter: none;
  position: relative;
  overflow: hidden;
}

.btn-modern-outline {
  display: inline-block;
  background: linear-gradient(90deg, #23262F 0%, #23262F 100%);
  color: #7cb3ff;
  font-weight: 700;
  border-radius: 0.85em;
  padding: 0.66em 2.3em;
  border: 1.5px solid #5F7FFF;
  font-size: 1.13rem;
  box-shadow: 0 0.5px 2px 0 #5F7FFF11 inset;
  outline: none;
  transition: background 0.52s cubic-bezier(0.4,0,0.2,1), box-shadow 0.36s cubic-bezier(0.4,0,0.2,1), border-color 0.36s, color 0.36s, transform 0.44s cubic-bezier(0.4,0,0.2,1);
  position: relative;
  overflow: hidden;
}

.btn-modern-primary:after,
.btn-modern-outline:after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(90deg, #7cb3ff33 0%, #a970ff22 100%);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.48s cubic-bezier(0.4,0,0.2,1);
}
.btn-modern-primary:hover,
.btn-modern-primary:focus {
  background: linear-gradient(90deg, #6C7AFF 0%, #3c4166 100%);
  color: #eaf2ff;
  border-color: #A970FF;
  box-shadow: 0 4px 24px 0 #6C7AFF33, 0 0.5px 2px 0 #A970FF22 inset;
  transform: translateY(-2px) scale(1.035);
}
.btn-modern-primary:hover::after,
.btn-modern-primary:focus::after {
  opacity: 0.15;
}
.btn-modern-outline:hover,
.btn-modern-outline:focus {
  color: #eaf2ff;
  border-color: #A970FF;
  background: linear-gradient(90deg, #2a2e3f 0%, #353a4e 100%);
  box-shadow: 0 4px 18px 0 #6C7AFF22, 0 0.5px 2px 0 #A970FF22 inset;
  transform: translateY(-2px) scale(1.028);
}
.btn-modern-outline:hover::after,
.btn-modern-outline:focus::after {
  opacity: 0.11;
}

.btn-modern-primary:active {
  background: linear-gradient(90deg, #5F7FFF 0%, #23262F 100%);
  color: #b5cfff;
  border-color: #6C7AFF;
  box-shadow: 0 1px 4px 0 #23262F33;
  transform: scale(0.98);
}

.btn-modern-outline:active {
  color: #7cb3ff;
  border-color: #5F7FFF;
  background: linear-gradient(90deg, #23262F 0%, #23262F 100%);
  box-shadow: 0 1px 4px 0 #23262F33;
  transform: scale(0.98);
}

/* 字体发光动画 */
@keyframes text-glow {
  0% { text-shadow: 0 0 8px #7cb3ff88, 0 0 2px #fff8; }
  100% { text-shadow: 0 0 18px #a970ff77, 0 0 2px #fff8; }
}
.btn-modern-primary:hover span,
.btn-modern-outline:hover span {
  animation: text-glow 0.7s alternate infinite;
  color: #eaf2ff;
}

.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-400 { animation-delay: 0.4s; }

/* 特性卡片样式 */
.feature-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  padding: 1.5rem;
  height: 100%;
  min-height: 220px;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease;
  will-change: transform, box-shadow;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.feature-card-inner {
  position: relative;
  z-index: 10;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-bg {
  position: absolute;
  inset: 0;
  background: rgba(30, 32, 40, 0.65);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 1;
  transition: background 0.3s ease;
}

.card-border {
  position: absolute;
  inset: 0;
  border-radius: 12px;
  padding: 1px;
  background: linear-gradient(
    to bottom right,
    rgba(95, 127, 255, 0.15),
    rgba(169, 112, 255, 0.05)
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: 2;
  transition: opacity 0.3s ease;
}

.card-hover-effect {
  position: absolute;
  inset: 0;
  z-index: 3;
  border-radius: 12px;
  opacity: 0;
  background: linear-gradient(
    120deg,
    rgba(95, 127, 255, 0.05) 0%,
    rgba(169, 112, 255, 0.05) 100%
  );
  transition: opacity 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12), 0 0 10px rgba(95, 127, 255, 0.1);
}

.feature-card:active {
  transform: translateY(-2px);
  transition: transform 0.1s;
}

.feature-card:hover .card-hover-effect {
  opacity: 1;
}

.feature-card:hover .card-border {
  background: linear-gradient(
    to bottom right,
    rgba(95, 127, 255, 0.3),
    rgba(169, 112, 255, 0.1)
  );
}

.feature-icon-wrapper {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: rgba(40, 44, 52, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
  overflow: hidden;
}

.feature-icon {
  position: relative;
  z-index: 2;
  color: #fff;
  opacity: 0.9;
  transition: color 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
}

.icon-glow {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0.4;
  transition: opacity 0.3s ease;
}

.feature-card:hover .feature-icon {
  opacity: 1;
  color: #fff;
  transform: translateY(-2px);
}

.feature-card:hover .icon-glow {
  opacity: 0.7;
}

.feature-title {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.625rem;
  color: #fff;
  letter-spacing: -0.01em;
}

.feature-desc {
  font-size: 0.875rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}

/* 特定图标样式 */
.seamless-auth .icon-glow {
  background: radial-gradient(circle at center, rgba(95, 127, 255, 0.3) 0%, transparent 70%);
}

.privacy-protection .icon-glow {
  background: radial-gradient(circle at center, rgba(169, 112, 255, 0.3) 0%, transparent 70%);
}

.security-trust .icon-glow {
  background: radial-gradient(circle at center, rgba(254, 243, 199, 0.2) 0%, transparent 70%);
}

.quick-integration .icon-glow {
  background: radial-gradient(circle at center, rgba(95, 127, 255, 0.3) 0%, transparent 70%);
}

/* 打字波浪动画 */
@keyframes wave {
  0% {
    d: path('M4 18C6 15 8 15 10 18C12 21 14 21 16 18C18 15 20 15 22 18');
  }
  50% {
    d: path('M4 18C6 21 8 21 10 18C12 15 14 15 16 18C18 21 20 21 22 18');
  }
  100% {
    d: path('M4 18C6 15 8 15 10 18C12 21 14 21 16 18C18 15 20 15 22 18');
  }
}

.typing-wave {
  animation: wave 2s ease-in-out infinite;
}

/* 盾牌脉冲动画 */
@keyframes shield-pulse-animation {
  0% {
    stroke-width: 1.5;
    stroke-opacity: 0.8;
  }
  50% {
    stroke-width: 2;
    stroke-opacity: 1;
  }
  100% {
    stroke-width: 1.5;
    stroke-opacity: 0.8;
  }
}

.shield-pulse {
  animation: shield-pulse-animation 2s ease-in-out infinite;
  transform-origin: center;
}

/* 对勾动画 */
@keyframes check-animation {
  0% {
    stroke-dasharray: 0, 100;
    stroke-opacity: 0.7;
  }
  50% {
    stroke-dasharray: 100, 0;
    stroke-opacity: 1;
  }
  100% {
    stroke-dasharray: 100, 0;
    stroke-opacity: 0.7;
  }
}

.check-mark {
  animation: check-animation 3s ease-in-out infinite;
  stroke-dasharray: 100;
  stroke-dashoffset: 0;
}

/* 闪电动画 */
@keyframes lightning-animation {
  0% {
    stroke-opacity: 0.6;
    filter: drop-shadow(0 0 0px rgba(95, 127, 255, 0));
  }
  50% {
    stroke-opacity: 1;
    filter: drop-shadow(0 0 3px rgba(95, 127, 255, 0.6));
  }
  100% {
    stroke-opacity: 0.6;
    filter: drop-shadow(0 0 0px rgba(95, 127, 255, 0));
  }
}

.lightning-flash {
  animation: lightning-animation 2s ease-in-out infinite;
}

/* 卡片悬停效果 */
@keyframes pulse-glow {
  0% { opacity: 0.4; }
  50% { opacity: 0.7; }
  100% { opacity: 0.4; }
}

.feature-card:hover .icon-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .feature-card {
    padding: 1.25rem;
    min-height: 200px;
  }

  .feature-icon-wrapper {
    width: 40px;
    height: 40px;
    margin-bottom: 1rem;
  }

  .feature-title {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .feature-desc {
    font-size: 0.8125rem;
  }
}

</style>
