<template>
  <section class="flex flex-col items-center justify-center text-center py-20 md:py-32 select-none relative">
    <!--<DecodeTitle />-->
    <DecodeTitleLaser />
    <p class="text-lg md:text-2xl text-gray-300 mb-10 animate-fade-in delay-100">
      KeyZen 利用每个人独特的打字行为，提供无感、隐私、安全的身份验证方式。
    </p>
    <div class="flex flex-col md:flex-row gap-4 justify-center">
      <a href="#demo" class="btn-modern-primary animate-fade-in delay-200"><span>立即体验</span></a>
      <a href="#docs" class="btn-modern-outline animate-fade-in delay-300"><span>查看文档</span></a>
    </div>
  </section>
</template>

<script setup>
import DecodeTitleLaser from './DecodeTitleLaser.vue';
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


</style>
