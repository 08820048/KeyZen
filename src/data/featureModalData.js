import SeamlessAuthIllustration from '../components/illustrations/SeamlessAuthIllustration.vue';
import PrivacyProtectionIllustration from '../components/illustrations/PrivacyProtectionIllustration.vue';
import SecurityTrustIllustration from '../components/illustrations/SecurityTrustIllustration.vue';
import QuickIntegrationIllustration from '../components/illustrations/QuickIntegrationIllustration.vue';

export const featureModalData = {
  seamlessAuth: {
    id: 'seamlessAuth',
    title: '无感验证 - 自然流畅的身份识别',
    illustration: SeamlessAuthIllustration,
    content: [
      {
        subtitle: '打字行为即身份',
        text: '每个人的打字节奏和习惯都如同指纹般独特。KeyZen 通过捕捉击键间隔、按键持续时间和打字模式，在用户无感知的情况下完成身份验证。'
      },
      {
        subtitle: '实时分析技术',
        text: '先进的机器学习算法能够在几秒内分析用户的打字行为，与存储的行为模型进行比对，提供即时的身份验证结果。'
      },
      {
        subtitle: '无需额外操作',
        text: '用户无需记忆复杂密码、输入验证码或使用指纹识别器，只需正常打字，系统便能在后台完成身份确认，大幅提升用户体验。'
      },
      {
        subtitle: '适应性学习',
        text: 'KeyZen 会持续学习用户的打字行为变化，随着时间推移不断优化识别模型，确保长期稳定的识别准确率。'
      }
    ]
  },
  
  privacyProtection: {
    id: 'privacyProtection',
    title: '隐私保护 - 数据安全始终在本地',
    illustration: PrivacyProtectionIllustration,
    content: [
      {
        subtitle: '本地建模与验证',
        text: 'KeyZen 的核心设计理念是"数据不出设备"。用户的打字行为模型完全在本地设备上构建和存储，无需担心敏感数据泄露风险。'
      },
      {
        subtitle: '零云端存储',
        text: '与传统生物识别方案不同，KeyZen 不会将用户的行为特征上传至云端服务器，杜绝了数据传输过程中的安全隐患。'
      },
      {
        subtitle: '加密保护',
        text: '即使在本地，所有行为模型数据也经过高强度加密存储，确保即使设备丢失，他人也无法提取或利用您的身份特征。'
      },
      {
        subtitle: '透明的数据处理',
        text: '我们提供完全透明的数据处理流程，用户可以随时查看、管理甚至删除自己的行为模型，掌握对个人数据的完全控制权。'
      }
    ]
  },
  
  securityTrust: {
    id: 'securityTrust',
    title: '安全可信 - 行为识别的防伪壁垒',
    illustration: SecurityTrustIllustration,
    content: [
      {
        subtitle: '行为模式难以复制',
        text: '与静态密码不同，打字行为包含数百个微观特征，形成独特的"行为指纹"，即使知道密码内容也无法模仿他人的打字节奏。'
      },
      {
        subtitle: '防止账号共享',
        text: 'KeyZen 能有效识别非授权用户，即使他们知道正确的登录凭证，系统也能通过打字行为差异发现异常，有效防止账号共享。'
      },
      {
        subtitle: '抵御自动化攻击',
        text: '系统内置反机器人机制，能够有效识别自动化脚本和模拟器，为应用提供额外的安全保障层。'
      },
      {
        subtitle: '持续安全监控',
        text: 'KeyZen 不仅在登录时验证身份，还能在整个会话过程中持续监控打字行为，一旦发现异常立即触发安全预警。'
      }
    ]
  },
  
  quickIntegration: {
    id: 'quickIntegration',
    title: '接入快捷 - 简单几步即可部署',
    illustration: QuickIntegrationIllustration,
    content: [
      {
        subtitle: '标准化 API 设计',
        text: 'KeyZen 提供简洁明了的 API 接口，开发者只需几行代码即可完成集成，无需深入了解复杂的机器学习原理。'
      },
      {
        subtitle: '多平台支持',
        text: '我们的 SDK 支持 Web、iOS、Android 和桌面应用，确保您的用户在任何平台上都能获得一致的身份验证体验。'
      },
      {
        subtitle: '灵活的配置选项',
        text: '根据应用场景需求，开发者可以自定义安全级别、验证阈值和响应行为，实现精细化的身份验证控制。'
      },
      {
        subtitle: '完善的开发文档',
        text: '我们提供详尽的开发文档、示例代码和最佳实践指南，帮助开发团队快速掌握 KeyZen 的各项功能和优化技巧。'
      }
    ]
  }
};
