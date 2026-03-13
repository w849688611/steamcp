<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { ArrowLeft, Check, Loader2 } from 'lucide-vue-next'

const router = useRouter()
const step = ref(1)
const wechatLoading = ref(false)
const steamLoading = ref(false)

// Mock user info
const userInfo = ref({
  wechatNickname: '',
  wechatAvatar: '',
  steamId: '',
  steamNickname: '',
})

const loginWithWechat = () => {
  wechatLoading.value = true
  setTimeout(() => {
    userInfo.value.wechatNickname = '微信用户001'
    userInfo.value.wechatAvatar = 'https://picsum.photos/seed/wechat/100/100'
    wechatLoading.value = false
    step.value = 2
  }, 1500)
}

const bindSteam = () => {
  steamLoading.value = true
  setTimeout(() => {
    userInfo.value.steamId = '76561198123456789'
    userInfo.value.steamNickname = 'SteamPlayer001'
    steamLoading.value = false
    step.value = 3
  }, 1500)
}

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-background flex flex-col">
    <!-- Header -->
    <header class="p-4 flex items-center justify-between">
      <RouterLink
        to="/"
        class="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft class="w-5 h-5" />
        返回
      </RouterLink>
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded bg-primary/20 flex items-center justify-center border border-primary/50">
          <span class="text-primary text-xs font-bold font-[family-name:var(--font-display)]">S</span>
        </div>
        <span class="font-bold font-[family-name:var(--font-display)] text-sm">SteamCP</span>
      </div>
    </header>

    <!-- Progress -->
    <div class="px-8 py-6">
      <div class="flex items-center justify-center gap-4">
        <div v-for="i in 3" :key="i" class="flex items-center gap-4">
          <div
            :class="[
              'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all',
              step > i
                ? 'bg-green-500 border-green-500 text-white'
                : step === i
                ? 'border-primary text-primary animate-pulse'
                : 'border-muted text-muted-foreground'
            ]"
          >
            <Check v-if="step > i" class="w-5 h-5" />
            <span v-else class="text-sm font-bold">{{ i }}</span>
          </div>
          <div
            v-if="i < 3"
            :class="[
              'w-12 h-0.5',
              step > i ? 'bg-green-500' : 'bg-muted'
            ]"
          />
        </div>
      </div>
      <div class="flex justify-center gap-16 mt-3 text-xs text-muted-foreground">
        <span :class="step >= 1 && 'text-foreground'">微信登录</span>
        <span :class="step >= 2 && 'text-foreground'">Steam绑定</span>
        <span :class="step >= 3 && 'text-foreground'">完成</span>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 px-6 py-8">
      <!-- Step 1: WeChat Login -->
      <div v-if="step === 1" class="max-w-sm mx-auto text-center">
        <h1 class="text-2xl font-bold mb-2">微信快捷登录</h1>
        <p class="text-muted-foreground mb-8">使用微信账号登录平台</p>

        <!-- QR Code Placeholder -->
        <div class="w-48 h-48 mx-auto bg-white rounded-xl p-4 mb-6 relative overflow-hidden">
          <div class="w-full h-full bg-[repeating-linear-gradient(0deg,#000_0px,#000_2px,#fff_2px,#fff_4px)] opacity-20" />
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-32 h-32 border-2 border-primary/50 rounded-lg">
              <!-- Scan animation -->
              <div class="w-full h-1 bg-primary/50 animate-[scan-line_2s_linear_infinite]" />
            </div>
          </div>
        </div>

        <p class="text-sm text-muted-foreground mb-6">请使用微信扫描二维码</p>

        <button
          @click="loginWithWechat"
          :disabled="wechatLoading"
          class="w-full py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Loader2 v-if="wechatLoading" class="w-5 h-5 animate-spin" />
          {{ wechatLoading ? '登录中...' : '一键授权登录' }}
        </button>
      </div>

      <!-- Step 2: Steam Bind -->
      <div v-if="step === 2" class="max-w-sm mx-auto text-center">
        <h1 class="text-2xl font-bold mb-2">绑定 Steam 账号</h1>
        <p class="text-muted-foreground mb-8">绑定后即可享受特权福利</p>

        <!-- WeChat Info -->
        <div class="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg mb-6">
          <img
            :src="userInfo.wechatAvatar"
            :alt="userInfo.wechatNickname"
            class="w-10 h-10 rounded-full"
          />
          <div class="text-left">
            <p class="text-sm font-medium">{{ userInfo.wechatNickname }}</p>
            <p class="text-xs text-green-400">微信已授权</p>
          </div>
          <Check class="w-5 h-5 text-green-400 ml-auto" />
        </div>

        <button
          @click="bindSteam"
          :disabled="steamLoading"
          class="w-full py-3 bg-[#1b2838] text-white font-medium rounded-lg hover:bg-[#2a475e] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Loader2 v-if="steamLoading" class="w-5 h-5 animate-spin" />
          <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3H13v6.95c5.05-.5 9-4.76 9-9.95 0-5.52-4.48-10-10-10z"/>
          </svg>
          {{ steamLoading ? '正在跳转...' : '绑定 Steam 账号' }}
        </button>
      </div>

      <!-- Step 3: Complete -->
      <div v-if="step === 3" class="max-w-sm mx-auto text-center">
        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
          <Check class="w-10 h-10 text-green-400" />
        </div>

        <h1 class="text-2xl font-bold mb-2">绑定成功！</h1>
        <p class="text-muted-foreground mb-8">你已完成所有认证，可以开始探索了</p>

        <!-- Account Info -->
        <div class="space-y-3 mb-8">
          <div class="flex items-center gap-3 p-4 bg-card border border-border rounded-lg">
            <img
              :src="userInfo.wechatAvatar"
              :alt="userInfo.wechatNickname"
              class="w-10 h-10 rounded-full"
            />
            <div class="text-left">
              <p class="text-sm font-medium">{{ userInfo.wechatNickname }}</p>
              <p class="text-xs text-muted-foreground">微信账号</p>
            </div>
          </div>
          <div class="flex items-center gap-3 p-4 bg-card border border-border rounded-lg">
            <div class="w-10 h-10 rounded-full bg-[#1b2838] flex items-center justify-center">
              <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3H13v6.95c5.05-.5 9-4.76 9-9.95 0-5.52-4.48-10-10-10z"/>
              </svg>
            </div>
            <div class="text-left">
              <p class="text-sm font-medium">{{ userInfo.steamNickname }}</p>
              <p class="text-xs text-muted-foreground font-mono">{{ userInfo.steamId }}</p>
            </div>
          </div>
        </div>

        <button
          @click="goHome"
          class="w-full py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
        >
          开始探索
        </button>
      </div>
    </div>

    <!-- Warning -->
    <div class="p-4 mx-4 mb-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
      <p class="text-xs text-yellow-400 text-center">
        ⚠️ 绑定后 180 天内不可解绑或换绑，作为提货唯一凭证，请务必使用主号
      </p>
    </div>
  </div>
</template>
