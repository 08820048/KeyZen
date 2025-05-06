<template>
  <div class="illustration-container">
    <div class="shield-container">
      <div class="shield-outline">
        <div class="shield-inner">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="check-icon">
            <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
    
    <div class="pulse-rings">
      <div class="pulse-ring ring1"></div>
      <div class="pulse-ring ring2"></div>
      <div class="pulse-ring ring3"></div>
    </div>
    
    <div class="detection-line"></div>
    
    <div class="anomaly-dots">
      <div class="anomaly-dot" v-for="i in 5" :key="i"
        :style="{
          left: `${10 + i * 15}%`,
          top: `${30 + (i % 3) * 10}%`,
          animationDelay: `${i * 0.2}s`
        }">
      </div>
    </div>
    
    <div class="blocked-user">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M18 20C18 16.6863 15.3137 14 12 14C8.68629 14 6 16.6863 6 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4 21L20 5" stroke="#FF5555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
</template>

<script setup>
// No additional script needed
</script>

<style scoped>
.illustration-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(28, 30, 38, 0.8) 0%, rgba(40, 44, 52, 0.8) 100%);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.shield-container {
  position: relative;
  z-index: 3;
}

.shield-outline {
  width: 120px;
  height: 140px;
  background: linear-gradient(135deg, rgba(95, 127, 255, 0.3) 0%, rgba(169, 112, 255, 0.2) 100%);
  clip-path: path('M60 0L0 30V80C0 110 30 140 60 140C90 140 120 110 120 80V30L60 0Z');
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float 3s ease-in-out infinite;
}

.shield-inner {
  width: 100px;
  height: 120px;
  background: rgba(40, 44, 52, 0.8);
  clip-path: path('M50 10L5 35V75C5 100 30 125 50 125C70 125 95 100 95 75V35L50 10Z');
  display: flex;
  align-items: center;
  justify-content: center;
}

.check-icon {
  color: #5F7FFF;
  animation: pulse 2s ease-in-out infinite;
}

.pulse-rings {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.pulse-ring {
  position: absolute;
  border-radius: 50%;
  border: 2px solid rgba(95, 127, 255, 0.3);
  animation: ring-pulse 4s ease-in-out infinite;
}

.ring1 {
  width: 160px;
  height: 160px;
  animation-delay: 0s;
}

.ring2 {
  width: 200px;
  height: 200px;
  animation-delay: 1s;
}

.ring3 {
  width: 240px;
  height: 240px;
  animation-delay: 2s;
}

.detection-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, rgba(95, 127, 255, 0.7) 50%, transparent 100%);
  top: 50%;
  animation: scan 3s ease-in-out infinite;
  z-index: 2;
}

.anomaly-dots {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
}

.anomaly-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #FF5555;
  border-radius: 50%;
  animation: blink 1.5s ease-in-out infinite;
}

.blocked-user {
  position: absolute;
  bottom: 15%;
  right: 15%;
  color: rgba(255, 255, 255, 0.7);
  z-index: 3;
  animation: shake 4s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    opacity: 0.7;
    transform: scale(0.95);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    opacity: 0.7;
    transform: scale(0.95);
  }
}

@keyframes ring-pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1);
    opacity: 0.2;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
}

@keyframes scan {
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  25% {
    opacity: 0.8;
  }
  50% {
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    transform: translateY(-50px);
    opacity: 0;
  }
}

@keyframes blink {
  0% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
  100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-2px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(2px);
  }
}
</style>
