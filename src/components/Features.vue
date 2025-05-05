<template>
  <section class="py-14 md:py-20 bg-transparent">
    <div class="max-w-5xl mx-auto px-6 grid gap-8 md:grid-cols-3">
      <FeatureCard
        icon="i-carbon:ibm-security"
        title="实时打字节奏识别"
        desc="精准捕捉每一次击键，实时分析用户独特节奏，实现无感身份验证。"
      />
      <FeatureCard
        icon="i-carbon:user-privacy"
        title="本地建模，保护用户隐私"
        desc="所有数据本地处理，隐私无忧，安全可靠，用户数据绝不上传云端。"
      />
      <FeatureCard
        icon="i-carbon:api"
        title="提供标准 API 快速接入"
        desc="标准化 API 设计，轻松集成到各类应用场景，开发者友好。"
      />
    </div>
  </section>
</template>

<script setup>
import FeatureCard from './FeatureCard.vue';
</script>
