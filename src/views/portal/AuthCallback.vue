<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Loader as Loader2, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Mail, Lock, Shield, User } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

// 页面状态
const pageState = ref<'loading' | 'bind' | 'error'>('loading')
const loadingText = ref('正在安全登入系统...')
const errorMessage = ref('')

// 绑定表单数据
const bindForm = ref({
  email: '',
  password: '',
})

// URL 参数
const authData = ref({
  token: '',
  bindToken: '',
  provider: '',
  nickname: '',
  avatar: '',
})

// 表单提交状态
const isSubmitting = ref(false)

// Demo 配置
const deptId = 1001

// 错误信息映射
const errorMessages: Record<string, string> = {
  'account_abnormal': '账号状态异常，请联系客服处理',
  'system_error': '系统繁忙，请稍后重试',
  'auth_expired': '授权已过期，请重新登录',
  'bind_failed': '账号绑定失败，请检查信息后重试',
  'default': '未知错误，请返回重试',
}

// 解析错误信息
const getErrorMessage = (error: string): string => {
  return errorMessages[error] || errorMessages['default']
}

// 处理静默登录
const handleSilentLogin = async (token: string) => {
  pageState.value = 'loading'
  loadingText.value = '正在安全登入系统...'

  // 存储 token (这里应该存入 Pinia/localStorage)
  localStorage.setItem('auth_token', token)

  // 延迟 1 秒后跳转
  setTimeout(() => {
    router.push('/')
  }, 1000)
}

// 处理账号绑定
const handleBindSubmit = async () => {
  if (!bindForm.value.email || !bindForm.value.password) {
    alert('请填写完整的邮箱和密码')
    return
  }

  isSubmitting.value = true

  try {
    // TODO: 调用后端绑定接口
    // const response = await fetch('/api/auth/bind', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     bindToken: authData.value.bindToken,
    //     email: bindForm.value.email,
    //     password: bindForm.value.password,
    //     deptId: deptId,
    //     provider: authData.value.provider,
    //   })
    // })

    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 1500))

    // 绑定成功，跳转首页
    router.push('/')
  } catch (error) {
    console.error('绑定失败:', error)
    alert('绑定失败，请重试')
  } finally {
    isSubmitting.value = false
  }
}

// 返回登录页
const goToLogin = () => {
  router.push('/login')
}

// 页面加载时解析 URL 参数
onMounted(() => {
  const { action, token, bindToken, provider, nickname, avatar, error } = route.query

  // 1. 错误状态优先
  if (error) {
    pageState.value = 'error'
    errorMessage.value = getErrorMessage(error as string)
    return
  }

  // 2. 静默登录状态
  if (action === 'login' && token) {
    authData.value.token = token as string
    handleSilentLogin(token as string)
    return
  }

  // 3. 账号绑定状态
  if (action === 'bind' && bindToken) {
    pageState.value = 'bind'
    authData.value.bindToken = bindToken as string
    authData.value.provider = (provider as string) || 'steam'
    authData.value.nickname = (nickname as string) || '用户'
    authData.value.avatar = (avatar as string) || 'https://picsum.photos/seed/default/200/200'
    return
  }

  // 4. 参数不完整，显示错误
  pageState.value = 'error'
  errorMessage.value = '授权信息不完整，请重新登录'
})
</script>

<template>
  <div class="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
    <!-- 背景光晕效果 -->
    <div class="fixed top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style="animation-duration: 4s;" />
    <div class="fixed bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style="animation-duration: 5s;" />
    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />

    <!-- 背景网格 -->
    <div class="fixed inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />

    <!-- 内容容器 -->
    <div class="relative z-10 w-full max-w-md">
      <!-- 状态 1: 静默登录 Loading -->
      <div v-if="pageState === 'loading'" class="text-center">
        <!-- Loading 动画 -->
        <div class="mb-8 flex justify-center">
          <div class="relative">
            <!-- 外圈旋转光环 -->
            <div class="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <!-- 内圈脉冲 -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-16 h-16 rounded-full bg-primary/20 animate-pulse flex items-center justify-center">
                <Shield class="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>
        </div>

        <!-- 文字提示 -->
        <h2 class="text-2xl font-bold text-white mb-3">{{ loadingText }}</h2>
        <p class="text-muted-foreground text-sm">
          正在验证您的身份信息，请稍候...
        </p>

        <!-- 加载指示器 -->
        <div class="flex justify-center gap-2 mt-6">
          <div v-for="i in 3" :key="i"
            class="w-2 h-2 rounded-full bg-primary animate-bounce"
            :style="{ animationDelay: `${i * 0.15}s` }"
          />
        </div>
      </div>

      <!-- 状态 2: 账号绑定表单 -->
      <div v-if="pageState === 'bind'" class="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <!-- 顶部：用户信息展示 -->
        <div class="text-center mb-8">
          <!-- 头像 -->
          <div class="relative inline-block mb-4">
            <img
              :src="authData.avatar"
              :alt="authData.nickname"
              class="w-20 h-20 rounded-full border-4 border-primary/50 shadow-lg shadow-primary/20"
            />
            <div class="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-900 flex items-center justify-center">
              <CheckCircle class="w-4 h-4 text-white" />
            </div>
          </div>

          <!-- 欢迎文字 -->
          <h2 class="text-2xl font-bold text-white mb-2">
            授权成功！欢迎您，{{ authData.nickname }}
          </h2>
          <p class="text-sm text-slate-400 leading-relaxed">
            为了保障您的资产与交易安全，<br/>
            请为您的账号设置专属的登录邮箱与密码
          </p>

          <!-- Provider 标识 -->
          <div class="inline-flex items-center gap-2 mt-3 px-3 py-1.5 bg-slate-800/50 rounded-full">
            <div class="w-5 h-5 rounded-full bg-[#1b2838] flex items-center justify-center">
              <svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3H13v6.95c5.05-.5 9-4.76 9-9.95 0-5.52-4.48-10-10-10z"/>
              </svg>
            </div>
            <span class="text-xs text-slate-400">{{ authData.provider.toUpperCase() }} 账号</span>
          </div>
        </div>

        <!-- 绑定表单 -->
        <form @submit.prevent="handleBindSubmit" class="space-y-5">
          <!-- 邮箱输入框 -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">
              邮箱地址
            </label>
            <div class="relative">
              <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                v-model="bindForm.email"
                type="email"
                required
                placeholder="your@email.com"
                class="w-full pl-12 pr-4 py-3.5 bg-slate-950/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <!-- 密码输入框 -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">
              登录密码
            </label>
            <div class="relative">
              <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                v-model="bindForm.password"
                type="password"
                required
                placeholder="设置一个强密码"
                class="w-full pl-12 pr-4 py-3.5 bg-slate-950/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <p class="text-xs text-slate-500 mt-2">
              密码长度不少于 6 位，建议包含字母、数字和符号
            </p>
          </div>

          <!-- 提交按钮 -->
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
          >
            <Loader2 v-if="isSubmitting" class="w-5 h-5 animate-spin" />
            <Shield v-else class="w-5 h-5" />
            {{ isSubmitting ? '正在绑定中...' : '立即绑定并进入大厅' }}
          </button>
        </form>

        <!-- 安全提示 -->
        <div class="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <div class="flex items-start gap-3">
            <Shield class="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div class="text-xs text-slate-400 leading-relaxed">
              您的密码将通过 AES-256 加密存储，平台不会以任何形式泄露您的账号信息
            </div>
          </div>
        </div>
      </div>

      <!-- 状态 3: 错误异常 -->
      <div v-if="pageState === 'error'" class="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-2xl text-center">
        <!-- 错误图标 -->
        <div class="mb-6 flex justify-center">
          <div class="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
            <AlertCircle class="w-10 h-10 text-red-400" />
          </div>
        </div>

        <!-- 错误标题 -->
        <h2 class="text-2xl font-bold text-white mb-3">授权失败</h2>

        <!-- 错误信息 -->
        <p class="text-slate-400 mb-8 leading-relaxed">
          {{ errorMessage }}
        </p>

        <!-- 返回按钮 -->
        <button
          @click="goToLogin"
          class="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-colors"
        >
          返回登录页
        </button>

        <!-- 帮助链接 -->
        <div class="mt-6 text-sm">
          <span class="text-slate-500">遇到问题？</span>
          <a href="#" class="text-blue-400 hover:underline ml-2">联系客服</a>
        </div>
      </div>
    </div>
  </div>
</template>
