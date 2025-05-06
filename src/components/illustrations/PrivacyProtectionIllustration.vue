<template>
  <div class="illustration-container">
    <!-- 数据流动画 -->
    <div class="data-stream">
      <div class="data-packet" v-for="i in 12" :key="i"
        :style="{
          animationDelay: `${i * 0.2}s`,
          top: `${20 + (i % 3) * 20}%`
        }">
        <div class="packet-content">
          <div class="packet-line" v-for="j in 3" :key="j"></div>
        </div>
      </div>
    </div>

    <!-- 设备图标 -->
    <div class="device-container">
      <div class="device laptop">
        <div class="laptop-screen">
          <div class="screen-content">
            <div class="content-line" v-for="i in 4" :key="i"></div>
          </div>
        </div>
        <div class="laptop-base"></div>
      </div>

      <div class="device phone">
        <div class="phone-screen">
          <div class="screen-dot"></div>
        </div>
      </div>
    </div>

    <!-- 安全盾牌 -->
    <div class="shield-container">
      <div class="shield">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L4 5V11.5C4 16.5 7.5 21 12 22C16.5 21 20 16.5 20 11.5V5L12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 11V15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>

    <!-- 云服务器与阻止线 -->
    <div class="cloud-container">
      <div class="cloud">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 19C3.79086 19 2 17.2091 2 15C2 12.7909 3.79086 11 6 11C6 7.68629 8.68629 5 12 5C15.3137 5 18 7.68629 18 11C20.2091 11 22 12.7909 22 15C22 17.2091 20.2091 19 18 19H6Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="block-line"></div>
      </div>
    </div>

    <!-- 连接线 -->
    <div class="connection-line local"></div>
    <div class="connection-line cloud"></div>

    <!-- 背景效果 -->
    <div class="glow-circle device-glow"></div>
    <div class="glow-circle shield-glow"></div>
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

/* 设备容器 */
.device-container {
  position: absolute;
  left: 10%;
  display: flex;
  align-items: flex-end;
  gap: 20px;
  z-index: 3;
}

.device {
  position: relative;
  background: rgba(40, 44, 52, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  animation: float 3s ease-in-out infinite;
}

.laptop {
  width: 120px;
  height: 80px;
  animation-delay: 0.2s;
}

.laptop-screen {
  height: 70px;
  background: rgba(20, 22, 30, 0.8);
  border-radius: 4px 4px 0 0;
  padding: 6px;
  overflow: hidden;
}

.laptop-base {
  height: 10px;
  background: rgba(30, 32, 40, 0.9);
  border-radius: 0 0 4px 4px;
}

.screen-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
}

.content-line {
  height: 3px;
  background: rgba(95, 127, 255, 0.5);
  border-radius: 1.5px;
  width: 80%;
}

.content-line:nth-child(2) {
  width: 60%;
}

.content-line:nth-child(3) {
  width: 70%;
}

.phone {
  width: 40px;
  height: 70px;
  border-radius: 8px;
  animation-delay: 0.5s;
}

.phone-screen {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.screen-dot {
  width: 6px;
  height: 6px;
  background: rgba(95, 127, 255, 0.6);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

/* 数据流 */
.data-stream {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.data-packet {
  position: absolute;
  left: 15%;
  width: 30px;
  height: 16px;
  background: rgba(95, 127, 255, 0.2);
  border: 1px solid rgba(95, 127, 255, 0.4);
  border-radius: 4px;
  animation: move-right 4s linear infinite;
}

.packet-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 3px;
}

.packet-line {
  height: 2px;
  background: rgba(95, 127, 255, 0.6);
  border-radius: 1px;
}

@keyframes move-right {
  0% {
    transform: translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    transform: translateX(500px);
    opacity: 0;
  }
}

/* 盾牌容器 */
.shield-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
}

.shield {
  color: rgba(169, 112, 255, 0.8);
  animation: float 3s ease-in-out infinite;
}

/* 云服务器 */
.cloud-container {
  position: absolute;
  right: 15%;
  top: 30%;
  z-index: 3;
}

.cloud {
  position: relative;
  color: rgba(255, 255, 255, 0.5);
}

.block-line {
  position: absolute;
  width: 40px;
  height: 4px;
  background: rgba(255, 0, 0, 0.5);
  transform: rotate(-45deg);
  top: 50%;
  left: 0;
}

/* 连接线 */
.connection-line {
  position: absolute;
  height: 2px;
  background: rgba(95, 127, 255, 0.3);
  z-index: 2;
}

.connection-line.local {
  width: 15%;
  left: 25%;
  top: 50%;
  animation: pulse-opacity 2s ease-in-out infinite;
}

.connection-line.cloud {
  width: 15%;
  right: 25%;
  top: 50%;
  background: rgba(255, 0, 0, 0.2);
  animation: pulse-opacity 2s ease-in-out infinite 0.5s;
}

/* 背景效果 */
.glow-circle {
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  z-index: 1;
  animation: pulse 4s ease-in-out infinite;
}

.device-glow {
  left: 15%;
  background: radial-gradient(circle, rgba(95, 127, 255, 0.15) 0%, transparent 70%);
  animation-delay: 0.5s;
}

.shield-glow {
  left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(circle, rgba(169, 112, 255, 0.15) 0%, transparent 70%);
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.9);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.5;
  }
  100% {
    transform: scale(0.9);
    opacity: 0.3;
  }
}

@keyframes pulse-opacity {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 0.2;
  }
}
</style>
