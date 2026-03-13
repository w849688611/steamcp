<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { Check, Loader2 } from 'lucide-vue-next'

const router = useRouter()
const step = ref(1)
const wechatLoading = ref(false)
const steamLoading = ref(false)

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
  <div class="min-h-screen bg-background flex items-center justify-center p-8">
    <!-- Background Grid -->
    <div class="fixed inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
    
    <!-- Glow Effects -->
    <div class="fixed top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
    <div class="fixed bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

    <div class="relative z-10 w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <RouterLink to="/" class="inline-flex items-center gap-3">
          <div class="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/50">
            <span class="text-primary text-xl font-bold font-[family-name:var(--font-display)]">S</span>
          </div>
          <span class="font-[family-name:var(--font-display)] text-2xl font-bold">
            SteamCP<span class="text-primary">.</span>
          </span>
        </RouterLink>
      </div>

      <!-- Card -->
      <div class="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-8">
        <!-- Progress -->
        <div class="flex items-center justify-center gap-4 mb-8">
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
                'w-16 h-0.5',
                step > i ? 'bg-green-500' : 'bg-muted'
              ]"
            />
          </div>
        </div>

        <!-- Step 1: WeChat -->
        <div v-if="step === 1" class="text-center">
          <h2 class="text-xl font-bold mb-2">微信快捷登录</h2>
          <p class="text-sm text-muted-foreground mb-6">使用微信账号登录平台</p>

          <div class="w-48 h-48 mx-auto bg-white rounded-xl p-4 mb-6 relative overflow-hidden">
            <div class="w-full h-full bg-[repeating-linear-gradient(0deg,#000_0px,#000_2px,#fff_2px,#fff_4px)] opacity-20" />
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-32 h-32 border-2 border-primary/50 rounded-lg overflow-hidden">
                <div class="w-full h-1 bg-primary/50 animate-[scan-line_2s_linear_infinite]" />
              </div>
            </div>
          </div>

          <button
            @click="loginWithWechat"
            :disabled="wechatLoading"
            class="w-full py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Loader2 v-if="wechatLoading" class="w-5 h-5 animate-spin" />
            {{ wechatLoading ? '登录中...' : '一键授权登录' }}
          </button>
        </div>

        <!-- Step 2: Steam -->
        <div v-if="step === 2" class="text-center">
          <h2 class="text-xl font-bold mb-2">绑定 Steam 账号</h2>
          <p class="text-sm text-muted-foreground mb-6">绑定后即可享受特权福利</p>

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
            {{ steamLoading ? '正在跳转...' : '绑定 Steam 账号' }}
          </button>
        </div>

        <!-- Step 3: Complete -->
        <div v-if="step === 3" class="text-center">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
            <Check class="w-8 h-8 text-green-400" />
          </div>

          <h2 class="text-xl font-bold mb-2">绑定成功！</h2>
          <p class="text-sm text-muted-foreground mb-6">你已完成所有认证</p>

          <div class="space-y-3 mb-6">
            <div class="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
              <img
                :src="userInfo.wechatAvatar"
                :alt="userInfo.wechatNickname"
                class="w-8 h-8 rounded-full"
              />
              <div class="text-left text-sm">
                <p class="font-medium">{{ userInfo.wechatNickname }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
              <div class="w-8 h-8 rounded-full bg-[#1b2838] flex items-center justify-center">
                <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3H13v6.95c5.05-.5 9-4.76 9-9.95 0-5.52-4.48-10-10-10z"/>
                </svg>
              </div>
              <div class="text-left text-sm">
                <p class="font-medium">{{ userInfo.steamNickname }}</p>
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

        <!-- Warning -->
        <div class="mt-6 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p class="text-xs text-yellow-400 text-center">
            ⚠️ 绑定后 180 天内不可解绑或换绑，作为提货唯一凭证，请务必使用主号
          </p>
        </div>
      </div>

      <!-- Footer Links -->
      <div class="text-center mt-6">
        <RouterLink to="/" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
          返回首页
        </RouterLink>
      </div>
    </div>
  </div>
</template>
