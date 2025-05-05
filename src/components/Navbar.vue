<template>
  <div class="fixed top-6 left-0 w-full z-[100] pointer-events-none flex justify-center">
    <nav
      class="navbar-extract pointer-events-auto max-w-6xl w-[94vw] md:w-[92vw] flex items-center justify-between py-3 px-4 md:py-4 md:px-10 rounded-2xl shadow-xl bg-glass/85 backdrop-blur-lg border border-glass transition-all duration-500"
    >
      <div class="flex items-center">
        <span class="text-2xl md:text-3xl font-extrabold tracking-widest select-none text-white logo-glow-soft relative overflow-visible leading-none">
          KeyZen
        </span>
      </div>
      <ul class="flex items-center space-x-6 md:space-x-10 text-base font-medium tracking-wider">
        <li>
          <a href="#demo" class="nav-link-enhanced">功能演示</a>
        </li>
        <li>
          <a href="#docs" class="nav-link-enhanced">开发文档</a>
        </li>
        <li>
          <a href="#login" class="nav-link-enhanced">登录</a>
        </li>
        <li>
          <a href="#demo" class="ml-2 btn-white-download">立即体验</a>
        </li>
      </ul>
    </nav>
  </div>
  <div class="h-[84px] md:h-[92px]"></div> <!-- 占位，防止内容被 fixed 遮挡 -->
</template>

<script setup>
// 已用 fixed，无需滚动事件
</script>

<style scoped>
.navbar-extract {
  /* 移除明显阴影与发灰边框，提升沉稳感 */
  box-shadow: 0 2px 12px 0 rgba(40,44,52,0.05); /* 极淡柔和，仅底部有轻微层次 */
  border: 1.5px solid rgba(80,90,120,0.07); /* 更淡更自然 */
  background: linear-gradient(180deg, rgba(38,41,52,0.82) 70%, rgba(28,30,36,0.90) 100%);
  backdrop-filter: blur(28px) saturate(1.12);
  border-radius: 1.25rem;
  transition: background 0.28s cubic-bezier(0.4,0,0.2,1), box-shadow 0.28s, border-color 0.28s;
}
.logo-glow-soft {
  text-shadow: 0 0 18px #6c7aff99, 0 0 6px #a970ff55, 0 0 2px #fff8;
  position: relative;
}
.nav-link-enhanced {
  color: #e3e6f2;
  letter-spacing: 0.08em;
  padding: 0.25em 0.8em;
  border-radius: 0;
  transition: color 0.22s, text-shadow 0.22s;
  text-shadow: 0 0 2px #23262f99;
  position: relative;
  font-weight: 500;
  outline: none;
  overflow: hidden;
  background: none !important;
  box-shadow: none !important;
  border: none !important;
}
.nav-link-enhanced::after {
  content: '';
  display: block;
  position: absolute;
  left: 24%;
  right: 24%;
  bottom: 0.18em;
  height: 2.5px;
  background: linear-gradient(90deg, #5F7FFF 0%, #A970FF 100%);
  border-radius: 2px;
  opacity: 0;
  transform: scaleX(0.5);
  transition: opacity 0.28s cubic-bezier(0.4,0,0.2,1), transform 0.38s cubic-bezier(0.4,0,0.2,1);
  pointer-events: none;
  z-index: 1;
}
.nav-link-enhanced:hover::after,
.nav-link-enhanced:focus::after {
  opacity: 1;
  transform: scaleX(1);
}
.nav-link-enhanced:hover,
.nav-link-enhanced:focus {
  color: #fff;
  text-shadow: 0 0 12px #5F7FFF, 0 0 3px #A970FF;
}
.nav-link-enhanced:active {
  color: #A970FF;
}

.btn-white-download {
  display: inline-flex;
  align-items: center;
  background: #f7f8fa;
  color: #23262F;
  font-weight: 600;
  border-radius: 0.75rem;
  padding: 0.6em 1.8em;
  box-shadow: 0 2px 12px 0 rgba(30,32,40,0.13);
  border: 1.5px solid #ececf1;
  outline: none;
  font-size: 1.08rem;
  transition: background 0.52s cubic-bezier(0.4,0,0.2,1), box-shadow 0.36s cubic-bezier(0.4,0,0.2,1), border-color 0.36s, color 0.36s, transform 0.44s cubic-bezier(0.4,0,0.2,1);
}
.btn-white-download:hover,
.btn-white-download:focus {
  background: #e6e9f2; /* 明显加深的白色 */
  color: #181A20;
  box-shadow: 0 6px 22px 0 rgba(30,32,40,0.17);
  border-color: #d8e0f3;
  transform: translateY(-2px) scale(1.035);
}
.btn-white-download:active {
  background: #d3d7e3;
  color: #181A20;
  box-shadow: 0 2px 8px 0 rgba(30,32,40,0.11);
  border-color: #e3e6f2;
  transform: scale(0.98);
}
</style>
