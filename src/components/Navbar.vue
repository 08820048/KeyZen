<template>
  <div class="fixed top-6 left-0 w-full z-[100] pointer-events-none flex justify-center">
    <nav
      class="navbar-extract pointer-events-auto max-w-6xl w-[94vw] md:w-[92vw] flex items-center justify-between py-3 px-4 md:py-4 md:px-10 rounded-lg shadow-xl bg-glass/85 backdrop-blur-lg border border-glass transition-all duration-500"
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
          <template v-if="!currentUser">
            <button @click="showAuthModal = true" class="nav-link-enhanced">登录</button>
          </template>
          <template v-else>
            <div class="relative group">
              <button class="nav-link-enhanced flex items-center gap-2">
                <span>{{ currentUser }}</span>
                <svg class="w-4 h-4 transition-transform group-hover:rotate-180" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="absolute right-0 mt-2 w-48 bg-glass/95 backdrop-blur-lg rounded-lg shadow-xl border border-glass/20 py-2 z-50 hidden group-hover:block transform origin-top-right transition-all duration-200 ease-out">
                <div class="px-4 py-2 border-b border-glass/10">
                  <p class="text-sm text-gray-300">欢迎回来</p>
                  <p class="text-sm font-medium text-white truncate">{{ currentUser }}</p>
                </div>
                <button 
                  @click="router.push('/dashboard')" 
                  class="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-glass/20 hover:text-white transition-colors duration-200 flex items-center gap-2"
                >
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  控制台
                </button>
                <button 
                  @click="handleLogout" 
                  class="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-200 flex items-center gap-2"
                >
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 16L21 12M21 12L17 8M21 12H9M9 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  退出登录
                </button>
              </div>
            </div>
          </template>
        </li>
        <li>
          <a href="#demo" class="ml-2 btn-white-download">立即体验</a>
        </li>
      </ul>
    </nav>
  </div>
  <div class="h-[84px] md:h-[92px]"></div> <!-- 占位，防止内容被 fixed 遮挡 -->

  <!-- 登录模态框 -->
  <AuthModal
    :show="showAuthModal"
    @close="showAuthModal = false"
    @complete="handleAuthComplete"
  />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthModal from './AuthModal.vue';

const showAuthModal = ref(false);
const currentUser = ref(localStorage.getItem('username') || '');
const router = useRouter();

const handleAuthComplete = (data) => {
  showAuthModal.value = false;
  if (data && data.username) {
    currentUser.value = data.username;
    localStorage.setItem('username', data.username);
    router.push('/dashboard');
  }
};

const handleLogout = () => {
  currentUser.value = '';
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
  router.push('/');
};
</script>

<style scoped>
.navbar-extract {
  background: rgba(16,17,18,0.38);
  box-shadow: 0 4px 24px 0 rgba(31, 38, 135, 0.07);
  backdrop-filter: blur(3.5px);
  -webkit-backdrop-filter: blur(3.5px);
  border-radius: 10px;
  border: 1.5px solid rgba(160,180,220,0.08);
  transition: background 0.28s cubic-bezier(0.4,0,0.2,1), box-shadow 0.28s, border-color 0.28s;
}
.logo-glow-soft {
  text-shadow: 0 0 2px #fff8;
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
  background: rgba(255,255,255,0.10);
  box-shadow: 0 1.5px 8px 0 #b3d3ff33;
  filter: brightness(1.22);
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

/* 添加新的样式 */
.bg-glass {
  background: rgba(16, 17, 18, 0.38);
}

.border-glass {
  border-color: rgba(160, 180, 220, 0.08);
}

/* 下拉菜单动画 */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.group:hover .group-hover\:block {
  animation: slideDown 0.2s ease-out;
}
</style>
