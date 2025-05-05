<template>
  <div class="feature-glass-card">
    <div class="feature-icon-area">
      <span :class="icon" class="feature-icon-glow"></span>
    </div>
    <h3 class="feature-title">{{ title }}</h3>
    <p class="feature-desc">{{ desc }}</p>
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
.feature-glass-card {
  background: linear-gradient(120deg, rgba(38,44,60,0.68) 70%, rgba(28,32,44,0.92) 100%);
  border-radius: 1.3rem;
  box-shadow: 0 2px 18px 0 rgba(40,44,52,0.10);
  backdrop-filter: blur(16px) saturate(1.12);
  border: 1.8px solid #6C7AFF33;
  transition: box-shadow 0.28s cubic-bezier(0.4,0,0.2,1), border-color 0.22s, background 0.22s, transform 0.22s;
  padding: 2.3rem 1.7rem 2.1rem 1.7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: default;
}
.feature-glass-card:hover {
  box-shadow: 0 10px 32px 0 #5F7FFF33, 0 2px 8px 0 #A970FF22;
  border-color: #5F7FFF99;
  background: linear-gradient(120deg, rgba(38,44,60,0.88) 65%, rgba(28,32,44,0.98) 100%);
  transform: translateY(-6px) scale(1.032);
}
.feature-icon-area {
  margin-bottom: 1.45rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.feature-icon-glow {
  filter: drop-shadow(0 0 12px #5F7FFF) drop-shadow(0 0 4px #A970FF) drop-shadow(0 0 2px #fff8);
  color: #6C7AFF;
  font-size: 2.6rem;
}
.feature-title {
  font-size: 1.23rem;
  font-weight: 800;
  color: #f7faff;
  margin-bottom: 0.56rem;
  letter-spacing: 0.01em;
  font-family: 'Inter', 'HarmonyOS Sans', ui-sans-serif, system-ui, sans-serif;
}
.feature-desc {
  font-size: 1.01rem;
  color: #b4b8c7;
  font-weight: 400;
  line-height: 1.7;
  letter-spacing: 0.01em;
  font-family: 'Inter', 'HarmonyOS Sans', ui-sans-serif, system-ui, sans-serif;
}
</style>
