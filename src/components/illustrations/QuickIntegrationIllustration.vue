<template>
  <div class="illustration-container">
    <div class="code-editor">
      <div class="editor-header">
        <div class="header-dot red"></div>
        <div class="header-dot yellow"></div>
        <div class="header-dot green"></div>
      </div>
      <div class="editor-content">
        <pre class="code-block"><code>
<span class="keyword">import</span> { <span class="class-name">KeyZen</span> } <span class="keyword">from</span> <span class="string">"keyzen-sdk"</span>;

<span class="comment">// 初始化 KeyZen</span>
<span class="keyword">const</span> <span class="variable">keyzen</span> = <span class="keyword">new</span> <span class="class-name">KeyZen</span>({
  <span class="property">apiKey</span>: <span class="string">"your_api_key"</span>,
  <span class="property">mode</span>: <span class="string">"local"</span>
});

<span class="comment">// 开始监听打字行为</span>
<span class="variable">keyzen</span>.<span class="function">startMonitoring</span>();<span class="cursor">|</span>
        </code></pre>
      </div>
    </div>

    <div class="connection-lines">
      <div class="connection-line" v-for="i in 3" :key="i"
        :style="{
          top: `${30 + i * 15}%`,
          animationDelay: `${i * 0.3}s`
        }">
      </div>
    </div>

    <div class="platforms">
      <div class="platform-icon web">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 12H22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="platform-icon mobile">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 18H12.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 2H16C17.1046 2 18 2.89543 18 4V20C18 21.1046 17.1046 22 16 22H8C6.89543 22 6 21.1046 6 20V4C6 2.89543 6.89543 2 8 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="platform-icon desktop">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 21H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 17V21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4 3H20C21.1046 3 22 3.89543 22 5V15C22 16.1046 21.1046 17 20 17H4C2.89543 17 2 16.1046 2 15V5C2 3.89543 2.89543 3 4 3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>

    <div class="lightning">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
</template>

<script setup>
// 不需要额外的脚本逻辑
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

.code-editor {
  position: relative;
  width: 280px;
  height: 200px;
  background: rgba(20, 22, 30, 0.95);
  border-radius: 8px;
  overflow: hidden;
  z-index: 3;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(95, 127, 255, 0.1);
  animation: float 3s ease-in-out infinite;
  backdrop-filter: blur(4px);
}

.editor-header {
  height: 24px;
  background: rgba(40, 44, 52, 0.9);
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 6px;
}

.header-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.red {
  background: #FF5F56;
}

.yellow {
  background: #FFBD2E;
}

.green {
  background: #27C93F;
}

.editor-content {
  padding: 0;
  background: linear-gradient(to bottom, rgba(30, 32, 40, 0.95), rgba(20, 22, 30, 0.95));
  height: calc(100% - 24px);
  overflow: auto;
}

.code-block {
  margin: 0;
  padding: 12px 10px;
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  font-size: 10px;
  color: #E4E4E4;
  line-height: 1.6;
  white-space: pre;
  counter-reset: line;
}

.code-block code {
  display: block;
}

.keyword {
  color: #C678DD;
  font-weight: 600;
}

.string {
  color: #98C379;
}

.comment {
  color: #7F848E;
  font-style: italic;
}

.function {
  color: #61AFEF;
  font-weight: 500;
}

.property {
  color: #E06C75;
}

.class-name {
  color: #E5C07B;
  font-weight: 500;
}

.variable {
  color: #ABB2BF;
}

.cursor {
  color: #fff;
  animation: blink 1s step-end infinite;
  font-weight: normal;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.connection-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
}

.connection-line {
  position: absolute;
  height: 2px;
  width: 0;
  background: linear-gradient(90deg, rgba(95, 127, 255, 0.7) 0%, rgba(169, 112, 255, 0.7) 100%);
  right: 20%;
  animation: line-grow 3s ease-in-out infinite;
}

.platforms {
  position: absolute;
  right: 10%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  z-index: 3;
}

.platform-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgba(40, 44, 52, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(95, 127, 255, 0.3);
}

.web {
  animation: pulse 2s ease-in-out infinite;
}

.mobile {
  animation: pulse 2s ease-in-out infinite 0.7s;
}

.desktop {
  animation: pulse 2s ease-in-out infinite 1.4s;
}

.lightning {
  position: absolute;
  bottom: 15%;
  left: 15%;
  color: #5F7FFF;
  z-index: 3;
  animation: glow 2s ease-in-out infinite;
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

@keyframes line-grow {
  0% {
    width: 0;
    opacity: 0;
  }
  50% {
    width: 30%;
    opacity: 1;
  }
  100% {
    width: 0;
    opacity: 0;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(95, 127, 255, 0.3);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 6px rgba(95, 127, 255, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(95, 127, 255, 0);
  }
}

@keyframes glow {
  0% {
    filter: drop-shadow(0 0 2px rgba(95, 127, 255, 0.5));
    opacity: 0.7;
  }
  50% {
    filter: drop-shadow(0 0 8px rgba(95, 127, 255, 0.8));
    opacity: 1;
  }
  100% {
    filter: drop-shadow(0 0 2px rgba(95, 127, 255, 0.5));
    opacity: 0.7;
  }
}
</style>
