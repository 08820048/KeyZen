<template>
  <div class="illustration-container">
    <div class="typing-pattern">
      <div class="typing-line" v-for="(line, index) in typingLines" :key="index"
        :style="{ 
          height: `${line.height}px`, 
          left: `${line.position}%`,
          animationDelay: `${line.delay}s`,
          backgroundColor: line.color
        }">
      </div>
    </div>
    <div class="keyboard-outline">
      <div class="key-row">
        <div class="key" v-for="i in 10" :key="`row1-${i}`"></div>
      </div>
      <div class="key-row">
        <div class="key" v-for="i in 9" :key="`row2-${i}`"></div>
      </div>
      <div class="key-row">
        <div class="key" v-for="i in 7" :key="`row3-${i}`"></div>
      </div>
      <div class="key-row">
        <div class="spacebar"></div>
      </div>
    </div>
    <div class="pulse-circle"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 生成随机的打字节奏线条
const typingLines = ref([]);

onMounted(() => {
  // 生成20条随机高度和位置的线条
  for (let i = 0; i < 20; i++) {
    const height = Math.floor(Math.random() * 40) + 10; // 10-50px高度
    const position = Math.floor(Math.random() * 80) + 10; // 10-90%位置
    const delay = Math.random() * 2; // 0-2s延迟
    const color = i % 3 === 0 ? '#5F7FFF' : (i % 3 === 1 ? '#A970FF' : '#fef3c7');
    
    typingLines.value.push({
      height,
      position,
      delay,
      color
    });
  }
});
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

.typing-pattern {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.typing-line {
  position: absolute;
  width: 3px;
  border-radius: 1.5px;
  bottom: 30%;
  animation: typing-pulse 3s ease-in-out infinite;
  opacity: 0.7;
}

@keyframes typing-pulse {
  0% {
    transform: scaleY(0.7);
    opacity: 0.5;
  }
  50% {
    transform: scaleY(1);
    opacity: 0.8;
  }
  100% {
    transform: scaleY(0.7);
    opacity: 0.5;
  }
}

.keyboard-outline {
  position: absolute;
  bottom: 10%;
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
}

.key-row {
  display: flex;
  gap: 4px;
  width: 100%;
  justify-content: center;
}

.key {
  width: 8%;
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.spacebar {
  width: 40%;
  height: 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.pulse-circle {
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(95, 127, 255, 0.2) 0%, transparent 70%);
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.5;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.3;
  }
}
</style>
