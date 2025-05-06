<template>
  <Transition name="modal">
    <div v-if="show" class="modal-overlay" @click="handleClose">
      <div class="modal-container" @click.stop>
        <!-- 全局错误提示，放在模态框顶部 -->
        <div v-if="globalError" class="global-error global-error-top">{{ globalError }}</div>
        <!-- 步骤指示器 -->
        <div class="step-indicator">
          <div class="step" :class="{ active: currentStep === 1 }">1</div>
          <div class="step-line" :class="{ active: currentStep > 1 }"></div>
          <div class="step" :class="{ active: currentStep === 2 }">2</div>
        </div>

        <!-- 第一步：用户名和密码 -->
        <div v-if="currentStep === 1" class="step-content">
          <h2 class="title">{{ isLogin ? '欢迎回来' : '创建账号' }}</h2>
          <p class="subtitle">{{ isLogin ? '使用您的账号继续' : '开始您的键盘指纹之旅' }}</p>
          
          <form @submit.prevent="handleStep1Submit" class="form">
            <div class="form-group">
              <input
                v-model="formData.username"
                type="text"
                placeholder="用户名"
                class="input"
                :class="{ 'error': errors.username }"
                @focus="errors.username = ''"
                :disabled="isSubmitting"
              />
              <span v-if="errors.username" class="error-text">{{ errors.username }}</span>
            </div>
            
            <div class="form-group">
              <input
                v-model="formData.password"
                type="password"
                placeholder="密码"
                class="input"
                :class="{ 'error': errors.password }"
                @focus="errors.password = ''"
                :disabled="isSubmitting"
              />
              <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  v-model="formData.useKeyboardFingerprint"
                  class="checkbox"
                  :disabled="isSubmitting"
                />
                <span>使用键盘指纹验证</span>
              </label>
            </div>

            <div class="button-group">
              <button type="button" class="btn-secondary" @click="handleClose" :disabled="isSubmitting">关闭</button>
              <button type="submit" class="btn-primary" :disabled="isSubmitting">
                {{ isSubmitting ? '处理中...' : '下一步' }}
              </button>
            </div>

            <div class="switch-mode">
              <span>{{ isLogin ? '还没有账号？' : '已有账号？' }}</span>
              <button type="button" class="link-button" @click="toggleMode" :disabled="isSubmitting">
                {{ isLogin ? '立即注册' : '去登录' }}
              </button>
            </div>
          </form>
        </div>

        <!-- 第二步：键盘指纹验证 -->
        <div v-if="currentStep === 2" class="step-content">
          <h2 class="title">键盘指纹验证</h2>
          <p class="subtitle">{{ isLogin ? '请输入下方文本以验证身份' : '请输入下方文本以录入指纹' }}</p>
          
          <div class="keyboard-fingerprint">
            <div class="fingerprint-instructions">
              <p>请输入以下文本：</p>
              <div class="sample-text">{{ sampleText }}</div>
            </div>
            
            <div class="form-group">
              <input
                ref="fingerprintInputRef"
                v-model="formData.fingerprintInput"
                type="text"
                placeholder="我正在验证身份"
                class="input"
                :class="{ 'error': errors.fingerprint }"
                @focus="errors.fingerprint = ''"
                @keydown="handleKeyDown"
                @keyup="handleKeyUp"
                :disabled="isSubmitting"
              />
              <span v-if="errors.fingerprint" class="error-text">{{ errors.fingerprint }}</span>
            </div>

            <div v-if="keyprintData" class="keyprint-stats">
              <div class="stat-item">
                <span class="stat-label">输入时长：</span>
                <span class="stat-value">{{ keyprintData.duration }}ms</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">退格次数：</span>
                <span class="stat-value">{{ keyprintData.backspace_count }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">按键间隔：</span>
                <span class="stat-value">{{ keyprintData.intervals.length }}个</span>
              </div>
            </div>
          </div>

          <div class="button-group">
            <button type="button" class="btn-secondary" @click="currentStep = 1" :disabled="isSubmitting">返回</button>
            <button type="button" class="btn-primary" @click="handleStep2Submit" :disabled="isSubmitting">
              {{ isSubmitting ? '处理中...' : '完成' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, reactive, computed, nextTick } from 'vue';
import { login, register, checkKeyprintStatus } from '../api/auth';
import { createKeyprint, validateKeyprint, isKeyprintMatch } from '../api/keyprint';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close', 'complete']);

const currentStep = ref(1);
const isLogin = ref(true);
const isSubmitting = ref(false);
const sampleText = ref('我正在验证身份');

// 键盘指纹数据
const keyTimestamps = ref([]);
const keyprintData = ref(null);

const formData = reactive({
  username: '',
  password: '',
  useKeyboardFingerprint: false,
  fingerprintInput: ''
});

const errors = reactive({
  username: '',
  password: '',
  fingerprint: ''
});

const globalError = ref('');

const fingerprintInputRef = ref(null);

const validateStep1 = () => {
  let isValid = true;
  
  if (!formData.username) {
    errors.username = '请输入用户名';
    isValid = false;
  }
  
  if (!formData.password) {
    errors.password = '请输入密码';
    isValid = false;
  } else if (formData.password.length < 6) {
    errors.password = '密码长度至少为6位';
    isValid = false;
  }
  
  return isValid;
};

const validateStep2 = () => {
  if (!formData.useKeyboardFingerprint) {
    return true;
  }

  if (!formData.fingerprintInput) {
    errors.fingerprint = '请输入验证文本';
    return false;
  }

  if (!validateKeyprint(keyprintData.value)) {
    errors.fingerprint = '请完成键盘指纹录入';
    return false;
  }

  return true;
};

const handleKeyDown = (event) => {
  if (!formData.fingerprintInput && event.key !== 'Backspace') {
    // 第一次输入，重置时间戳
    keyTimestamps.value = [];
    keyprintData.value = null;
  }
  if (event.key === 'Backspace') {
    keyprintData.value = {
      ...keyprintData.value,
      backspace_count: (keyprintData.value?.backspace_count || 0) + 1
    };
  }
  keyTimestamps.value.push(Date.now());
};

const handleKeyUp = () => {
  if (formData.fingerprintInput && keyTimestamps.value.length >= 2) {
    keyprintData.value = createKeyprint(
      keyTimestamps.value,
      keyprintData.value?.backspace_count || 0
    );
  }
};

const handleStep1Submit = async () => {
  if (!validateStep1()) return;
  
  try {
    isSubmitting.value = true;
    globalError.value = '';

    if (isLogin.value) {
      // 登录流程
      const { data: statusData } = await checkKeyprintStatus(formData.username);
      if (statusData.code === 0) {
        const { enable_keyprint, has_keyprint } = statusData.data;
        if (enable_keyprint && has_keyprint) {
          currentStep.value = 2;
          keyTimestamps.value = [];
          keyprintData.value = null;
          return;
        } else {
          await handleSubmit();
        }
      } else if (statusData.code === 1004) {
        // 需要指纹，跳到第二步
        currentStep.value = 2;
        keyTimestamps.value = [];
        keyprintData.value = null;
        return;
      } else if (statusData.code === 404) {
        errors.username = '用户不存在';
      } else {
        globalError.value = statusData.message || '检查键盘指纹状态失败';
      }
    } else {
      // 注册流程
      if (formData.useKeyboardFingerprint) {
        currentStep.value = 2;
        keyTimestamps.value = [];
        keyprintData.value = null;
      } else {
        await handleSubmit();
      }
    }
  } catch (error) {
    console.error('操作失败:', error);
    globalError.value = '网络错误，请稍后重试';
  } finally {
    isSubmitting.value = false;
  }
};

const handleStep2Submit = async () => {
  if (!validateStep2()) {
    await resetFingerprintInput();
    return;
  }
  await handleSubmit();
};

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    globalError.value = '';
    
    const requestData = {
      username: formData.username,
      password: formData.password
    };

    if (isLogin.value) {
      // 登录请求
      if (currentStep.value === 2 && keyprintData.value) {
        requestData.keyprint = keyprintData.value;
      }
      const response = await login(requestData);
      if (response.data.code === 0) {
        const { token, user_id, username, similarity } = response.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user_id', user_id);
        localStorage.setItem('username', username);
        if (similarity !== undefined && !isKeyprintMatch(similarity)) {
          await resetFingerprintInput();
          globalError.value = '键盘指纹验证失败，请重新输入';
          isSubmitting.value = false;
          return;
        }
        emit('complete', response.data.data);
        handleClose();
      } else if (response.data.code === 1004) {
        // 再次要求指纹，跳到第二步
        currentStep.value = 2;
        keyTimestamps.value = [];
        keyprintData.value = null;
        globalError.value = response.data.message || '请录入键盘指纹';
        return;
      } else {
        handleErrorResponse(response.data);
      }
    } else {
      // 注册请求
      requestData.enable_keyprint = formData.useKeyboardFingerprint;
      if (formData.useKeyboardFingerprint && keyprintData.value) {
        requestData.keyprint = keyprintData.value;
      }
      const response = await register(requestData);
      if (response.data.code === 0) {
        emit('complete', response.data.data);
        handleClose();
      } else {
        handleErrorResponse(response.data);
      }
    }
  } catch (error) {
    console.error('操作失败:', error);
    handleNetworkError(error);
  } finally {
    isSubmitting.value = false;
  }
};

const handleErrorResponse = (data) => {
  switch (data.code) {
    case 401:
      errors.password = '密码错误或键盘指纹验证失败';
      break;
    case 404:
      errors.username = '用户不存在';
      break;
    case 400:
      errors.username = '用户名已存在';
      break;
    default:
      globalError.value = data.message || '操作失败';
  }
};

const handleNetworkError = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        globalError.value = '认证失败，请重新登录';
        break;
      case 404:
        globalError.value = '服务器未找到';
        break;
      case 500:
        globalError.value = '服务器错误，请稍后重试';
        break;
      default:
        globalError.value = '网络错误，请检查网络连接';
    }
  } else if (error.request) {
    globalError.value = '无法连接到服务器，请检查网络连接';
  } else {
    globalError.value = '操作失败，请稍后重试';
  }
};

const toggleMode = () => {
  isLogin.value = !isLogin.value;
  formData.username = '';
  formData.password = '';
  formData.useKeyboardFingerprint = false;
  formData.fingerprintInput = '';
  Object.keys(errors).forEach(key => errors[key] = '');
};

const handleClose = () => {
  currentStep.value = 1;
  isLogin.value = true;
  formData.username = '';
  formData.password = '';
  formData.useKeyboardFingerprint = false;
  formData.fingerprintInput = '';
  keyTimestamps.value = [];
  keyprintData.value = null;
  Object.keys(errors).forEach(key => errors[key] = '');
  emit('close');
};

const resetFingerprintInput = async () => {
  formData.fingerprintInput = '';
  keyTimestamps.value = [];
  keyprintData.value = null;
  await nextTick();
  if (fingerprintInputRef.value) fingerprintInputRef.value.blur();
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background: rgba(28, 30, 38, 0.95);
  border-radius: 16px;
  padding: 2rem;
  width: 90%;
  max-width: 420px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
  text-align: center;
}

.subtitle {
  color: #a0a0a0;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 0.95rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.875rem 1rem;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.input:focus {
  outline: none;
  border-color: #4ade80;
  box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.2);
}

.input.error {
  border-color: #ef4444;
}

.error-text {
  color: #ef4444;
  font-size: 0.875rem;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-primary {
  background: #4ade80;
  color: #000;
  padding: 0.875rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  flex: 1;
}

.btn-primary:hover {
  background: #22c55e;
  transform: translateY(-1px);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 0.875rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  flex: 1;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #a0a0a0;
  cursor: pointer;
  user-select: none;
}

.checkbox {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  appearance: none;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.checkbox:checked {
  background: #4ade80;
  border-color: #4ade80;
}

.checkbox:checked::after {
  content: '✓';
  position: absolute;
  color: #000;
  font-size: 0.875rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.step-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

.step {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: #a0a0a0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  transition: all 0.3s ease;
}

.step.active {
  background: #4ade80;
  color: #000;
}

.step-line {
  width: 3rem;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 0.5rem;
  transition: all 0.3s ease;
}

.step-line.active {
  background: #4ade80;
}

.keyboard-fingerprint {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.fingerprint-instructions {
  margin-bottom: 1.5rem;
}

.sample-text {
  background: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 8px;
  margin-top: 0.75rem;
  font-family: monospace;
  color: #4ade80;
  text-align: center;
}

/* 动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: translateY(20px);
}

.switch-mode {
  text-align: center;
  margin-top: 1rem;
  color: #a0a0a0;
  font-size: 0.9rem;
}

.link-button {
  background: none;
  border: none;
  color: #4ade80;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.25rem 0.5rem;
  margin-left: 0.5rem;
  transition: color 0.2s ease;
}

.link-button:hover {
  color: #22c55e;
  text-decoration: underline;
}

.keyprint-stats {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.stat-item:last-child {
  margin-bottom: 0;
}

.stat-label {
  color: #a0a0a0;
}

.stat-value {
  color: #4ade80;
  font-family: monospace;
}

.btn-primary:disabled {
  background: #4ade8080;
  cursor: not-allowed;
  transform: none;
}

.global-error {
  color: #ef4444;
  font-size: 0.95rem;
  border-radius: 8px;
  text-align: center;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.18);
  box-shadow: 0 2px 8px 0 rgba(239,68,68,0.06);
}

.global-error-top {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  margin-bottom: 1.5rem;
  z-index: 10;
}

.btn-primary:disabled,
.btn-secondary:disabled,
.link-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.checkbox:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style> 