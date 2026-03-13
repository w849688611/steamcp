<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Shield, Eye, EyeOff, Lock, Mail, KeyRound, Users, Gamepad2, TrendingUp } from 'lucide-vue-next'

const router = useRouter()

const email = ref('')
const password = ref('')
const verifyCode = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const codeSent = ref(false)
const countdown = ref(0)

const sendCode = () => {
  if (!email.value || countdown.value > 0) return
  codeSent.value = true
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

const handleLogin = () => {
  router.push('/admin')
}

const stats = [
  { icon: Users, value: '5000W+', label: '分发触达玩家' },
  { icon: TrendingUp, value: '40%', label: '平均转化提升' },
  { icon: Gamepad2, value: '2000+', label: '合作发行商' }
]
</script>

<template>
  <div class="min-h-screen flex">
    <!-- Left Section - Value Proposition -->
    <div class="hidden lg:flex lg:w-[60%] relative overflow-hidden bg-[#080812]">
      <!-- Background Grid -->
      <div class="absolute inset-0 opacity-20">
        <svg class="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(34, 211, 238, 0.1)" stroke-width="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <!-- Globe Animation Placeholder -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-[500px] h-[500px] rounded-full border border-cyan-500/10 relative animate-spin" style="animation-duration: 60s;">
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full" />
          <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-pink-400 rounded-full" />
          <div class="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full" />
          <div class="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-400 rounded-full" />
        </div>
        <div class="absolute w-[350px] h-[350px] rounded-full border border-cyan-500/20" />
        <div class="absolute w-[200px] h-[200px] rounded-full border border-cyan-500/30" />
      </div>

      <!-- Content Overlay -->
      <div class="relative z-10 flex flex-col justify-between p-12 w-full">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <span class="text-white font-bold text-xl">S</span>
          </div>
          <div>
            <span class="text-white font-semibold text-xl tracking-wide">SteamCP</span>
            <span class="text-cyan-400 text-sm ml-2">for Developers</span>
          </div>
        </div>

        <!-- Slogan -->
        <div class="max-w-lg">
          <h1 class="text-4xl xl:text-5xl font-bold leading-tight">
            <span class="text-white">连接全球玩家</span>
            <br />
            <span class="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">引爆游戏销量</span>
          </h1>
          <p class="text-gray-400 mt-4 text-lg">
            为游戏发行商提供精准玩家触达与智能分发解决方案
          </p>

          <!-- Stats -->
          <div class="flex gap-6 mt-8">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
            >
              <component :is="stat.icon" class="w-5 h-5 text-cyan-400 mb-2" />
              <p class="text-2xl font-bold text-white">{{ stat.value }}</p>
              <p class="text-sm text-gray-400">{{ stat.label }}</p>
            </div>
          </div>
        </div>

        <!-- Trust Badges -->
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2 text-gray-400">
            <Shield class="w-5 h-5 text-emerald-400" />
            <span class="text-sm">企业级数据安全</span>
          </div>
          <div class="flex items-center gap-2 text-gray-400">
            <Lock class="w-5 h-5 text-blue-400" />
            <span class="text-sm">金融级支付认证</span>
          </div>
          <div class="flex items-center gap-2 text-gray-400">
            <KeyRound class="w-5 h-5 text-purple-400" />
            <span class="text-sm">严格访问鉴权</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Section - Login Form -->
    <div class="w-full lg:w-[40%] flex items-center justify-center p-8 bg-[#0a0a14]">
      <div class="w-full max-w-md">
        <!-- Mobile Logo -->
        <div class="lg:hidden flex items-center gap-3 mb-8">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <span class="text-white font-bold text-lg">S</span>
          </div>
          <span class="text-white font-semibold text-lg">SteamCP</span>
        </div>

        <div class="bg-[#12121a]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-white">欢迎回来，开发者</h2>
            <p class="text-gray-400 mt-2">登录您的发行商控制台</p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-5">
            <!-- Email -->
            <div>
              <label class="block text-sm text-gray-400 mb-2">企业邮箱</label>
              <div class="relative">
                <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  v-model="email"
                  type="email"
                  placeholder="name@company.com"
                  class="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm text-gray-400 mb-2">登录密码</label>
              <div class="relative">
                <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  class="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  <EyeOff v-if="showPassword" class="w-5 h-5" />
                  <Eye v-else class="w-5 h-5" />
                </button>
              </div>
            </div>

            <!-- Verification Code -->
            <div>
              <label class="block text-sm text-gray-400 mb-2">验证码</label>
              <div class="flex gap-3">
                <div class="relative flex-1">
                  <KeyRound class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    v-model="verifyCode"
                    type="text"
                    maxlength="6"
                    placeholder="6位验证码"
                    class="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors tracking-widest"
                  />
                </div>
                <button
                  type="button"
                  @click="sendCode"
                  :disabled="countdown > 0 || !email"
                  :class="[
                    'px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap',
                    countdown > 0 || !email
                      ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                      : 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'
                  ]"
                >
                  {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
                </button>
              </div>
              <p v-if="codeSent" class="text-xs text-emerald-400 mt-2">验证码已发送至您的邮箱</p>
            </div>

            <!-- Remember & Forgot -->
            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  v-model="rememberMe"
                  type="checkbox"
                  class="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500/50"
                />
                <span class="text-sm text-gray-400">记住我</span>
              </label>
              <a href="#" class="text-sm text-cyan-400 hover:underline">忘记密码?</a>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              class="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Shield class="w-5 h-5" />
              安全登入控制台
            </button>
          </form>

          <p class="text-center mt-6 text-sm text-gray-400">
            还没有发行商账号？
            <a href="#" class="text-cyan-400 hover:underline">申请入驻</a>
          </p>
        </div>

        <p class="text-center text-xs text-gray-500 mt-6">
          &copy; 2026 SteamCP. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</template>
