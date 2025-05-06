<template>
  <div class="keyboard-rhythm-background">
    <canvas ref="canvas" class="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const canvas = ref(null);
let ctx;
let animationFrameId;
let width = 1920;
let height = 1080;

// 键盘参数
const keyRows = 5;
const keyCols = 14;
const keyW = 36;
const keyH = 36;
const keyGap = 10;
const kbW = keyCols * (keyW + keyGap) - keyGap;
const kbH = keyRows * (keyH + keyGap) - keyGap;
let keyboardCenter = { x: 0, y: 0 };
let keys = [];
let activeKey = null;

// 键盘按键字符
const keyChars = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '⌫'],
  ['⇥', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
  ['⇪', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', '↵'],
  ['⇧', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', '⇧'],
  ['⌃', '⌘', '⌥', '', '', '', '', '', '', '⌥', '⌘', '⌃']
];

// 高亮框对象
let highlightBox = {
  x: 0, y: 0, w: keyW, h: keyH, targetX: 0, targetY: 0, moving: false, targetIdx: 0
};

// 粒子
let particles = [];

// 环绕元素类型（全部具象安全相关图标）
const iconTypes = ['key', 'lock', 'folder', 'file', 'password', 'clip', 'shield', 'qr'];
let floatingIcons = [];

// 颜色
const mainBlue = '#6366f1';
const softPurple = '#a78bfa';
const gold = '#fef3c7';
const bgColor = '#0d1117';
const folderGreen = '#4b7c7d';
const fileWhite = '#f3f4f6';

// 缓动插值
function lerp(a, b, t) { return a + (b - a) * t; }

// 初始化键盘按键
function initKeyboard() {
  keys = [];
  const startX = keyboardCenter.x - kbW / 2;
  const startY = keyboardCenter.y - kbH / 2;
  for (let r = 0; r < keyRows; r++) {
    for (let c = 0; c < keyCols; c++) {
      // 透视偏移
      const px = startX + c * (keyW + keyGap) + (r - keyRows / 2) * 8;
      const py = startY + r * (keyH + keyGap) + Math.abs(c - keyCols / 2) * 2;
      keys.push({
        x: px,
        y: py,
        w: keyW,
        h: keyH,
        idx: r * keyCols + c,
        char: keyChars[r][c] || ''
      });
    }
  }
  // 初始化高亮框到第一个按键
  highlightBox.x = keys[0].x;
  highlightBox.y = keys[0].y;
  highlightBox.targetX = keys[0].x;
  highlightBox.targetY = keys[0].y;
  highlightBox.w = keyW;
  highlightBox.h = keyH;
  highlightBox.targetIdx = 0;
  highlightBox.moving = false;
}

// 环绕元素初始化
function initFloatingIcons() {
  floatingIcons = [];
  const count = iconTypes.length;
  for (let i = 0; i < count; i++) {
    floatingIcons.push({
      type: iconTypes[i],
      angle: (Math.PI * 2 / count) * i,
      radius: kbW * 0.7 + 80,
      alpha: 0.18,
      targetAngle: (Math.PI * 2 / count) * i,
      targetRadius: kbW * 0.7 + 80,
      highlight: 0 // 击键时高亮/光束
    });
  }
}

// 随机模拟击键
function triggerKey() {
  // 随机选择新按键
  let newIdx = Math.floor(Math.random() * keys.length);
  highlightBox.targetX = keys[newIdx].x;
  highlightBox.targetY = keys[newIdx].y;
  highlightBox.targetIdx = newIdx;
  highlightBox.moving = true;
  // 选一个环绕元素高亮并产生光束/粒子
  const iconIdx = Math.floor(Math.random() * floatingIcons.length);
  floatingIcons.forEach((icon, i) => {
    icon.highlight = i === iconIdx ? 1 : 0;
  });
}

// 绘制立体感键盘
function drawKeyboard() {
  ctx.save();
  ctx.globalAlpha = 0.82;
  // 键盘外轮廓
  ctx.beginPath();
  ctx.moveTo(keyboardCenter.x - kbW / 2 - 16, keyboardCenter.y - kbH / 2 - 24);
  ctx.lineTo(keyboardCenter.x + kbW / 2 + 16, keyboardCenter.y - kbH / 2 - 24);
  ctx.lineTo(keyboardCenter.x + kbW / 2 + 32, keyboardCenter.y + kbH / 2 + 32);
  ctx.lineTo(keyboardCenter.x - kbW / 2 - 32, keyboardCenter.y + kbH / 2 + 32);
  ctx.closePath();
  ctx.strokeStyle = 'rgba(99,102,241,0.18)';
  ctx.lineWidth = 8;
  ctx.shadowColor = mainBlue;
  ctx.shadowBlur = 24;
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
  // 绘制所有按键
  keys.forEach((key, i) => {
    ctx.save();
    ctx.beginPath();
    ctx.rect(key.x, key.y, key.w, key.h);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.5;
    ctx.stroke();
    // 绘制按键字符
    if (key.char) {
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(key.char, key.x + key.w/2, key.y + key.h/2);
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  });
  // 绘制高亮框
  ctx.save();
  ctx.beginPath();
  ctx.rect(highlightBox.x, highlightBox.y, highlightBox.w, highlightBox.h);
  ctx.strokeStyle = softPurple;
  ctx.lineWidth = 3.5;
  ctx.globalAlpha = 0.95;
  ctx.shadowColor = softPurple;
  ctx.shadowBlur = 16;
  ctx.stroke();
  // 高亮框内的字符
  const activeKey = keys[highlightBox.targetIdx];
  if (activeKey && activeKey.char) {
    ctx.font = '12px "JetBrains Mono", monospace';
    ctx.fillStyle = softPurple;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(activeKey.char, highlightBox.x + highlightBox.w/2, highlightBox.y + highlightBox.h/2);
  }
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
  ctx.restore();
  ctx.restore();
}

// 绘制粒子
function drawParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.restore();
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.025;
    if (p.alpha < 0.05) particles.splice(i, 1);
  }
}

// 绘制环绕元素（全部具象安全相关图标）
function drawFloatingIcons(t) {
  floatingIcons.forEach((icon, i) => {
    // 平滑插值运动
    icon.angle = lerp(icon.angle, icon.targetAngle + Math.sin(t / 4000 + i) * 0.18, 0.08);
    icon.radius = lerp(icon.radius, icon.targetRadius + Math.sin(t / 3000 + i) * 12, 0.08);
    icon.alpha = lerp(icon.alpha, icon.highlight ? 0.38 : 0.18, 0.1);
    ctx.save();
    const x = keyboardCenter.x + Math.cos(icon.angle) * icon.radius;
    const y = keyboardCenter.y + Math.sin(icon.angle) * icon.radius * 0.55;
    ctx.translate(x, y);
    ctx.rotate(icon.angle + t / 3000);
    ctx.globalAlpha = icon.alpha;
    switch (icon.type) {
      case 'key': drawKeyIcon(); break;
      case 'lock': drawLockIcon(); break;
      case 'folder': drawFolderIcon(); break;
      case 'file': drawFileIcon(); break;
      case 'password': drawPasswordIcon(); break;
      case 'clip': drawClipIcon(); break;
      case 'shield': drawShieldIcon(); break;
      case 'qr': drawQRIcon(); break;
    }
    ctx.restore();
    // 光束/粒子流动
    if (icon.highlight > 0.1) {
      drawBeamToKeyboard(x, y, t, icon.type);
    }
  });
}

// 光束/粒子流动
function drawBeamToKeyboard(x, y, t, type) {
  ctx.save();
  const cx = keyboardCenter.x;
  const cy = keyboardCenter.y;
  const steps = 18;
  for (let i = 0; i < steps; i++) {
    const p = i / steps;
    const bx = lerp(x, cx, p) + Math.sin(t / 300 + i) * 2;
    const by = lerp(y, cy, p) + Math.cos(t / 300 + i) * 2;
    ctx.beginPath();
    ctx.arc(bx, by, 2.2 - p * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = type === 'shield' ? softPurple : mainBlue;
    ctx.globalAlpha = 0.18 + 0.5 * (1 - p);
    ctx.shadowColor = type === 'shield' ? softPurple : mainBlue;
    ctx.shadowBlur = 8;
    ctx.fill();
  }
  ctx.restore();
}

// 钥匙
function drawKeyIcon() {
  ctx.save();
  ctx.strokeStyle = gold;
  ctx.lineWidth = 2.5;
  ctx.shadowColor = gold;
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.arc(-6, 0, 7, 0, Math.PI * 2);
  ctx.moveTo(1, 0);
  ctx.lineTo(18, 0);
  ctx.moveTo(13, -3);
  ctx.lineTo(13, 3);
  ctx.moveTo(16, -3);
  ctx.lineTo(16, 3);
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.restore();
}
// 锁
function drawLockIcon() {
  ctx.save();
  ctx.strokeStyle = softPurple;
  ctx.lineWidth = 2.2;
  ctx.shadowColor = softPurple;
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.arc(0, -6, 7, Math.PI, 0);
  ctx.moveTo(-7, -6);
  ctx.lineTo(-7, 8);
  ctx.lineTo(7, 8);
  ctx.lineTo(7, -6);
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.restore();
}
// 文件夹
function drawFolderIcon() {
  ctx.save();
  ctx.fillStyle = folderGreen;
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.moveTo(-16, 8);
  ctx.lineTo(-16, -8);
  ctx.lineTo(-6, -12);
  ctx.lineTo(16, -12);
  ctx.lineTo(16, 12);
  ctx.lineTo(-16, 12);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.restore();
}
// 文件
function drawFileIcon() {
  ctx.save();
  ctx.fillStyle = fileWhite;
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  ctx.moveTo(-10, -14);
  ctx.lineTo(10, -14);
  ctx.lineTo(10, 14);
  ctx.lineTo(-10, 14);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.strokeStyle = '#bbb';
  ctx.lineWidth = 1.1;
  ctx.stroke();
  ctx.restore();
}
// 密码条（星号）
function drawPasswordIcon() {
  ctx.save();
  ctx.strokeStyle = mainBlue;
  ctx.lineWidth = 2.2;
  ctx.shadowColor = mainBlue;
  ctx.shadowBlur = 8;
  for (let i = -12; i <= 12; i += 12) {
    ctx.save();
    ctx.translate(i, 0);
    for (let a = 0; a < 6; a++) {
      ctx.rotate(Math.PI / 3);
      ctx.beginPath();
      ctx.moveTo(0, -4);
      ctx.lineTo(0, 4);
      ctx.stroke();
    }
    ctx.restore();
  }
  ctx.shadowBlur = 0;
  ctx.restore();
}
// 回形针
function drawClipIcon() {
  ctx.save();
  ctx.strokeStyle = softPurple;
  ctx.lineWidth = 2.2;
  ctx.shadowColor = softPurple;
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.moveTo(-8, 0);
  ctx.arcTo(-8, -8, 0, -8, 8);
  ctx.arcTo(8, -8, 8, 0, 8);
  ctx.arcTo(8, 8, 0, 8, 8);
  ctx.arcTo(-8, 8, -8, 0, 8);
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.restore();
}
// 盾牌
function drawShieldIcon() {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, -18);
  ctx.bezierCurveTo(14, -12, 12, 16, 0, 24);
  ctx.bezierCurveTo(-12, 16, -14, -12, 0, -18);
  ctx.closePath();
  ctx.strokeStyle = mainBlue;
  ctx.lineWidth = 2.5;
  ctx.shadowColor = mainBlue;
  ctx.shadowBlur = 8;
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.restore();
}
// 二维码
function drawQRIcon() {
  ctx.save();
  ctx.strokeStyle = gold;
  ctx.lineWidth = 2;
  ctx.shadowColor = gold;
  ctx.shadowBlur = 8;
  for (let i = -8; i <= 8; i += 8) {
    for (let j = -8; j <= 8; j += 8) {
      ctx.strokeRect(i, j, 4, 4);
    }
  }
  ctx.shadowBlur = 0;
  ctx.restore();
}

// 数据流/频谱
function drawSpectrum(t) {
  ctx.save();
  const baseY = keyboardCenter.y + kbH / 2 + 48;
  for (let i = 0; i < 32; i++) {
    const x = keyboardCenter.x - kbW / 2 + i * (kbW / 32);
    const h = 18 + Math.sin(t / 400 + i) * 12;
    ctx.beginPath();
    ctx.moveTo(x, baseY);
    ctx.lineTo(x, baseY + h);
    ctx.strokeStyle = i % 4 === 0 ? gold : mainBlue;
    ctx.globalAlpha = 0.18 + 0.12 * Math.sin(t / 800 + i);
    ctx.lineWidth = 3.5;
    ctx.shadowColor = mainBlue;
    ctx.shadowBlur = 8;
    ctx.stroke();
  }
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
  ctx.restore();
}

// 动画主循环
function animate(t = 0) {
  ctx.clearRect(0, 0, width, height);

  // 背景渐变
  let bgGrad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width*0.7);
  bgGrad.addColorStop(0, '#181c2b');
  bgGrad.addColorStop(1, bgColor);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 网格背景（放在渐变之上）
  drawGridBg();

  // 环绕安全元素
  drawFloatingIcons(t);
  // 频谱/数据流
  drawSpectrum(t);
  // 粒子
  drawParticles();
  // 键盘
  drawKeyboard();

  // 高亮框平滑移动
  highlightBox.x = lerp(highlightBox.x, highlightBox.targetX, 0.18);
  highlightBox.y = lerp(highlightBox.y, highlightBox.targetY, 0.18);
  // 到达目标按键中心时触发粒子爆发
  if (highlightBox.moving && Math.abs(highlightBox.x - highlightBox.targetX) < 1 && Math.abs(highlightBox.y - highlightBox.targetY) < 1) {
    highlightBox.x = highlightBox.targetX;
    highlightBox.y = highlightBox.targetY;
    highlightBox.moving = false;
    // 粒子爆发
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 1.5;
      particles.push({
        x: highlightBox.x + keyW / 2,
        y: highlightBox.y + keyH / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: Math.random() > 0.5 ? mainBlue : softPurple
      });
    }
  }

  animationFrameId = requestAnimationFrame(animate);
}

// 极简网格背景
function drawGridBg() {
  ctx.save();
  const gridGap = 56;
  ctx.strokeStyle = 'rgba(99,102,241,0.12)';
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += gridGap) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += gridGap) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.restore();
}

// 画布自适应
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  width = window.innerWidth;
  height = window.innerHeight;
  const canvasEl = canvas.value;
  canvasEl.width = width * dpr;
  canvasEl.height = height * dpr;
  canvasEl.style.width = width + 'px';
  canvasEl.style.height = height + 'px';
  ctx = canvasEl.getContext('2d');
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
  keyboardCenter = { x: width / 2, y: height / 2 };
  initKeyboard();
  initFloatingIcons();
}

onMounted(() => {
  resizeCanvas();
  animate();
  window.addEventListener('resize', resizeCanvas);
  setInterval(triggerKey, 1800); // 移动频率调慢
});
onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener('resize', resizeCanvas);
});
</script>

<style scoped>
.keyboard-rhythm-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background: #0d1117;
  pointer-events: none;
}
.canvas {
  width: 100vw;
  height: 100vh;
  display: block;
}
</style> 