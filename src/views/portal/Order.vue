<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PortalHeader from '@/components/portal/PortalHeader.vue'
import PortalFooter from '@/components/portal/PortalFooter.vue'
import { 
  Shield, 
  Copy, 
  Check, 
  AlertTriangle, 
  ExternalLink,
  Clock,
  Package,
  CreditCard,
  CheckCircle
} from 'lucide-vue-next'

const route = useRoute()
const showSuccessAnimation = ref(true)
const codeCopied = ref(false)

// Mock order data
const order = {
  id: route.params.id,
  orderNo: 'ORD20260310123456',
  game: {
    title: '赛博朋克2077',
    image: 'https://picsum.photos/seed/game1/600/800',
    originalPrice: 298,
    paidPrice: 5,
  },
  redeemCode: 'CYBER-2077-XXXX-YYYY-ZZZZ',
  steamId: '76561198123456789',
  createTime: '2026-03-10 15:30:00',
  expireTime: '2026-03-17 15:30:00',
}

const timeline = [
  { icon: CreditCard, label: '订单创建', time: '2026-03-10 15:30:00', done: true },
  { icon: CheckCircle, label: '支付成功', time: '2026-03-10 15:30:05', done: true },
  { icon: Package, label: '提货码生成', time: '2026-03-10 15:30:06', done: true },
  { icon: Clock, label: '等待提货', time: '有效期至 2026-03-17', done: false },
]

const copyCode = () => {
  navigator.clipboard.writeText(order.redeemCode)
  codeCopied.value = true
  setTimeout(() => {
    codeCopied.value = false
  }, 2000)
}

onMounted(() => {
  setTimeout(() => {
    showSuccessAnimation.value = false
  }, 2000)
})
</script>

<template>
  <div class="min-h-screen bg-background">
    <PortalHeader />
    
    <!-- Success Animation Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-500"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showSuccessAnimation"
        class="fixed inset-0 z-50 bg-background/90 flex items-center justify-center"
      >
        <div class="text-center">
          <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
            <Shield class="w-12 h-12 text-green-400" />
          </div>
          <h2 class="text-2xl font-bold text-green-400">支付成功</h2>
        </div>
      </div>
    </Transition>
    
    <main class="pt-24 pb-24 lg:pb-12">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <RouterLink to="/" class="inline-flex items-center gap-2 mb-4">
            <div class="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary/50">
              <span class="text-primary font-bold font-[family-name:var(--font-display)]">S</span>
            </div>
            <span class="font-[family-name:var(--font-display)] text-lg font-bold">
              SteamCP<span class="text-primary">.</span>
            </span>
          </RouterLink>
          <h1 class="text-2xl font-bold">订单详情</h1>
          <p class="text-muted-foreground mt-1">订单号: {{ order.orderNo }}</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Game Card -->
            <div class="bg-card border border-border rounded-xl p-6 flex gap-4">
              <img
                :src="order.game.image"
                :alt="order.game.title"
                class="w-20 h-28 object-cover rounded-lg"
              />
              <div class="flex-1">
                <h3 class="font-semibold mb-2">{{ order.game.title }}</h3>
                <div class="flex items-baseline gap-2">
                  <span class="text-muted-foreground line-through text-sm">
                    ¥{{ order.game.originalPrice }}
                  </span>
                  <span class="text-primary font-bold">
                    实付 ¥{{ order.game.paidPrice }}
                  </span>
                </div>
                <p class="text-xs text-green-400 mt-2">
                  已节省 ¥{{ order.game.originalPrice - order.game.paidPrice }}
                </p>
              </div>
            </div>

            <!-- Redeem Code Card -->
            <div class="bg-card border border-border rounded-xl overflow-hidden">
              <div class="p-4 border-b border-border flex items-center gap-2">
                <Package class="w-5 h-5 text-primary" />
                <h3 class="font-semibold">提货码</h3>
              </div>
              
              <div class="p-6">
                <!-- Code Display -->
                <div class="relative p-6 bg-gradient-to-br from-primary/10 via-card to-accent/10 rounded-xl border border-primary/30 overflow-hidden">
                  <!-- Circuit Pattern -->
                  <div class="absolute inset-0 opacity-10">
                    <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <pattern id="circuit" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M0 10 H10 V0 M10 10 H20 M10 10 V20" stroke="currentColor" fill="none" stroke-width="0.5"/>
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#circuit)"/>
                    </svg>
                  </div>
                  
                  <!-- Scan Line -->
                  <div class="absolute inset-0 overflow-hidden pointer-events-none">
                    <div class="w-full h-px bg-primary/30 animate-[scan-line_3s_linear_infinite]" />
                  </div>

                  <!-- Corner Decorations -->
                  <div class="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-primary" />
                  <div class="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-primary" />
                  <div class="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-primary" />
                  <div class="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-primary" />

                  <div class="relative text-center">
                    <p class="text-xs text-muted-foreground mb-3">请妥善保管，切勿泄露</p>
                    <p class="font-mono text-xl md:text-2xl font-bold tracking-wider text-primary mb-4">
                      {{ order.redeemCode }}
                    </p>
                    <button
                      @click="copyCode"
                      :class="[
                        'inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all',
                        codeCopied
                          ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                          : 'bg-primary/20 text-primary border border-primary/50 hover:bg-primary/30'
                      ]"
                    >
                      <component :is="codeCopied ? Check : Copy" class="w-4 h-4" />
                      {{ codeCopied ? '已复制' : '复制提货码' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Security Warning -->
            <div class="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
              <div class="flex gap-4">
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <AlertTriangle class="w-6 h-6 text-red-400" />
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-red-400 mb-2">防黄牛安全警告</h4>
                  <p class="text-sm text-muted-foreground mb-3">
                    ⚠️ <span class="text-red-400 font-medium">拦截机制启动</span>：此提货码已与您的 SteamID 
                    (<span class="font-mono text-red-400">{{ order.steamId }}</span>) 硬件级绑定！
                  </p>
                  <p class="text-sm text-muted-foreground">
                    仅限该账号提取，填入其他账号将<span class="text-red-400 font-medium">发货失败、不可找回且不予退款</span>。
                  </p>
                </div>
              </div>
            </div>

            <!-- Redeem Instructions -->
            <div class="bg-card border border-border rounded-xl p-6">
              <h3 class="font-semibold mb-4">提货指引</h3>
              <div class="space-y-4">
                <div v-for="(step, i) in ['复制上方提货码', '点击下方按钮前往提货网站', '登录绑定的Steam账号', '粘贴提货码完成提取']" :key="i" class="flex items-start gap-3">
                  <div class="w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {{ i + 1 }}
                  </div>
                  <p class="text-sm text-muted-foreground">{{ step }}</p>
                </div>
              </div>
              
              <a
                href="#"
                target="_blank"
                class="mt-6 w-full py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                前往提货
                <ExternalLink class="w-4 h-4" />
              </a>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <div class="lg:sticky lg:top-24 space-y-6">
              <!-- Order Timeline -->
              <div class="bg-card border border-border rounded-xl p-6">
                <h3 class="font-semibold mb-4">订单状态</h3>
                <div class="space-y-4">
                  <div v-for="(item, i) in timeline" :key="i" class="flex gap-3">
                    <div class="flex flex-col items-center">
                      <div :class="[
                        'w-8 h-8 rounded-full flex items-center justify-center',
                        item.done ? 'bg-green-500/20 text-green-400' : 'bg-muted text-muted-foreground'
                      ]">
                        <component :is="item.icon" class="w-4 h-4" />
                      </div>
                      <div v-if="i < timeline.length - 1" :class="['w-px h-8 my-1', item.done ? 'bg-green-500/50' : 'bg-muted']" />
                    </div>
                    <div>
                      <p :class="['text-sm font-medium', item.done ? 'text-foreground' : 'text-muted-foreground']">
                        {{ item.label }}
                      </p>
                      <p class="text-xs text-muted-foreground">{{ item.time }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Bound Account -->
              <div class="bg-card border border-border rounded-xl p-6">
                <h3 class="font-semibold mb-4">绑定账号</h3>
                <div class="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div class="w-10 h-10 rounded-full bg-[#1b2838] flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3H13v6.95c5.05-.5 9-4.76 9-9.95 0-5.52-4.48-10-10-10z"/>
                    </svg>
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-medium truncate">Steam 账号</p>
                    <p class="text-xs text-muted-foreground font-mono truncate">{{ order.steamId }}</p>
                  </div>
                </div>
              </div>

              <!-- Help -->
              <div class="bg-card border border-border rounded-xl p-6">
                <h3 class="font-semibold mb-4">需要帮助？</h3>
                <div class="space-y-2">
                  <a href="#" class="block text-sm text-primary hover:underline">提货遇到问题？</a>
                  <a href="#" class="block text-sm text-primary hover:underline">如何申请退款？</a>
                  <a href="#" class="block text-sm text-primary hover:underline">联系客服</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <!-- Mobile Fixed CTA -->
    <div class="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-lg border-t border-border z-40">
      <div class="flex gap-3">
        <button
          @click="copyCode"
          class="flex-1 py-3 bg-muted text-foreground font-medium rounded-lg flex items-center justify-center gap-2"
        >
          <Copy class="w-4 h-4" />
          复制提货码
        </button>
        <a
          href="#"
          target="_blank"
          class="flex-1 py-3 bg-primary text-primary-foreground font-medium rounded-lg flex items-center justify-center gap-2"
        >
          前往提货
          <ExternalLink class="w-4 h-4" />
        </a>
      </div>
    </div>
    
    <PortalFooter />
  </div>
</template>
