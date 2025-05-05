<template>
  <div class="card-glass-modern rounded-2xl p-8 flex flex-col items-center text-center hover:scale-[1.045] transition-transform duration-300 animate-fade-in shadow-xl">
    <div class="mb-5 text-4xl flex items-center justify-center">
      <span :class="icon" class="feature-icon-glow"></span>
    </div>
    <h3 class="text-xl font-semibold mb-2 text-glow-feature">{{ title }}</h3>
    <p class="text-gray-300 text-base">{{ desc }}</p>
  </div>
</template>

<script setup>
defineProps({
  icon: String,
  title: String,
  desc: String
});
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: none; }
}
.animate-fade-in {
  animation: fade-in 0.8s cubic-bezier(0.4,0,0.2,1) both;
}
.card-glass-modern {
  background: linear-gradient(180deg, rgba(38,41,52,0.80) 70%, rgba(28,30,36,0.92) 100%);
  border-radius: 1.2rem;
  box-shadow: 0 2px 10px 0 rgba(40,44,52,0.06); /* 极淡柔和，仅底部有轻微层次 */
  backdrop-filter: blur(14px) saturate(1.08);
  border: 1.5px solid rgba(80,90,120,0.06); /* 更淡更自然 */
  transition: box-shadow 0.28s cubic-bezier(0.4,0,0.2,1), border-color 0.22s, background 0.22s;
}
.card-glass-modern:hover {
  box-shadow: 0 6px 20px 0 rgba(95,127,255,0.10), 0 2px 8px 0 rgba(40,44,52,0.10);
  border-color: rgba(120,120,255,0.10);
  background: linear-gradient(180deg, rgba(38,41,52,0.92) 60%, rgba(28,30,36,0.98) 100%);
}
.feature-icon-glow {
  filter: drop-shadow(0 0 12px #5F7FFF) drop-shadow(0 0 4px #A970FF) drop-shadow(0 0 2px #fff8);
  color: #6C7AFF;
  font-size: 2.5rem;
}
.text-glow-feature {
  color: #f6f8ff;
  text-shadow: 0 0 16px #6c7aff55, 0 2px 8px #a970ff22, 0 0 2px #fff8;
}
</style>
