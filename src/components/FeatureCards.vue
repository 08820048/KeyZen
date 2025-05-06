<template>
  <section class="feature-cards-section py-16 md:py-20 flex items-center justify-center">
    <div class="max-w-7xl w-full px-6 md:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        <!-- 无感验证卡片 -->
        <div class="feature-card group">
          <div class="feature-card-inner">
            <div class="feature-icon-wrapper seamless-auth">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="feature-icon">
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
        <div class="feature-card group">
          <div class="feature-card-inner">
            <div class="feature-icon-wrapper privacy-protection">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="feature-icon">
                <path d="M12 2L4 5V11.5C4 16.5 7.5 21 12 22C16.5 21 20 16.5 20 11.5V5L12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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
        <div class="feature-card group">
          <div class="feature-card-inner">
            <div class="feature-icon-wrapper security-trust">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="feature-icon">
                <path d="M12 2L4 5V11.5C4 16.5 7.5 21 12 22C16.5 21 20 16.5 20 11.5V5L12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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
        <div class="feature-card group">
          <div class="feature-card-inner">
            <div class="feature-icon-wrapper quick-integration">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="feature-icon">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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
</template>

<script setup>
// 无需额外逻辑
</script>

<style scoped>
.feature-cards-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  padding: 2rem;
  height: 100%;
  min-height: 240px;
  cursor: default;
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  will-change: transform;
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
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: rgba(40, 44, 52, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  overflow: hidden;
}

.feature-icon {
  position: relative;
  z-index: 2;
  color: #fff;
  opacity: 0.9;
  transition: color 0.3s ease, opacity 0.3s ease;
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
}

.feature-card:hover .icon-glow {
  opacity: 0.7;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #fff;
  letter-spacing: -0.01em;
}

.feature-desc {
  font-size: 0.95rem;
  line-height: 1.6;
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

/* 响应式调整 */
@media (max-width: 768px) {
  .feature-card {
    padding: 1.5rem;
    min-height: 200px;
  }
  
  .feature-icon-wrapper {
    width: 48px;
    height: 48px;
    margin-bottom: 1.25rem;
  }
  
  .feature-title {
    font-size: 1.125rem;
  }
  
  .feature-desc {
    font-size: 0.875rem;
  }
}
</style>
