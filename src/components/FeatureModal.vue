<template>
  <Transition name="modal-fade">
    <div v-if="show" class="modal-overlay" @mouseenter="emit('modal-enter')" @mouseleave="emit('modal-leave')" @click.self="closeModal">
      <div class="modal-container">
        <button class="modal-close" @click="closeModal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <div class="modal-image-container">
          <component :is="featureData.illustration" class="modal-illustration" />
        </div>

        <h2 class="modal-title">{{ featureData.title }}</h2>

        <div class="modal-content">
          <div v-for="(paragraph, index) in featureData.content" :key="index" class="content-paragraph">
            <h3 v-if="paragraph.subtitle" class="paragraph-subtitle">{{ paragraph.subtitle }}</h3>
            <p class="paragraph-text">{{ paragraph.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  featureData: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close', 'modal-enter', 'modal-leave']);

const closeModal = () => {
  emit('close');
};

// 在组件挂载和卸载时处理滚动
import { onMounted, onBeforeUnmount, watch } from 'vue';

const preventScroll = (e) => {
  e.preventDefault();
};

const disableScroll = () => {
  document.body.style.overflow = 'hidden';
  // 防止触摸设备滚动
  document.addEventListener('touchmove', preventScroll, { passive: false });
};

const enableScroll = () => {
  document.body.style.overflow = '';
  document.removeEventListener('touchmove', preventScroll);
};

// 监听模态框显示状态变化
watch(() => props.show, (newVal) => {
  if (newVal) {
    disableScroll();
  } else {
    enableScroll();
  }
});

// 组件卸载时确保恢复滚动
onBeforeUnmount(() => {
  enableScroll();
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(24, 26, 36, 0.62);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 0;
  pointer-events: auto;
}

.modal-container {
  position: relative;
  width: 100%;
  max-width: 640px;
  max-height: calc(100vh - 48px);
  margin: 24px 0;
  overflow-y: auto;
  background: rgba(28, 30, 38, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  border: 1px solid rgba(95, 127, 255, 0.15);
  color: #fff;
  display: flex;
  flex-direction: column;
  will-change: transform, opacity;
  transform: translateY(-6vh);
}

.modal-container::-webkit-scrollbar {
  width: 6px;
}

.modal-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.modal-container::-webkit-scrollbar-thumb {
  background: rgba(95, 127, 255, 0.3);
  border-radius: 3px;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(40, 44, 52, 0.6);
  border: 1px solid rgba(95, 127, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
  padding: 0;
}

.modal-close:hover {
  background: rgba(95, 127, 255, 0.2);
  color: #fff;
  box-shadow: 0 0 12px rgba(95, 127, 255, 0.3);
}

.modal-image-container {
  width: 100%;
  height: 180px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 12px;
}

.modal-illustration {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #fff, #b5cfff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  letter-spacing: -0.01em;
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.content-paragraph {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.paragraph-subtitle {
  font-size: 1.125rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.25rem;
}

.paragraph-text {
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
}

/* 动画效果 */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.42s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(32px);
  filter: blur(8px);
}
.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
  filter: blur(0);
}

@media (max-width: 768px) {
  .modal-container {
    padding: 1.5rem;
  }

  .modal-image-container {
    height: 140px;
  }

  .modal-title {
    font-size: 1.5rem;
  }

  .paragraph-subtitle {
    font-size: 1rem;
  }

  .paragraph-text {
    font-size: 0.9375rem;
  }
}
</style>
