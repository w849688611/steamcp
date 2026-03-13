<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import PortalHeader from '@/components/portal/PortalHeader.vue'
import PortalFooter from '@/components/portal/PortalFooter.vue'
import { 
  Eye, 
  EyeOff, 
  Copy, 
  Check,
  Package,
  Truck,
  AlertTriangle,
  Clock
} from 'lucide-vue-next'

const activeTab = ref('all')
const showSteamId = ref(false)
const idCopied = ref(false)

// Mock user data
const user = {
  wechatNickname: '微信用户001',
  wechatAvatar: 'https://picsum.photos/seed/wechat/100/100',
  steamId: '76561198123456789',
  steamNickname: 'SteamPlayer001',
  steamAvatar: 'https://picsum.photos/seed/steam/100/100',
  steamLevel: 25,
  steamGamesCount: 128,
  isBanned: false,
  banReason: '',
  banExpireDate: '',
}

const stats = {
  totalSaved: 1580,
  dealsCount: 12,
}

const tabs = [
  { id: 'all', label: '全部订单' },
  { id: 'pending', label: '待提货', highlight: true },
  { id: 'delivered', label: '已发货' },
  { id: 'violation', label: '违规/退款', warning: true },
]

const orders = [
  {
    id: '1',
    game: { title: '赛博朋克2077', image: 'https://picsum.photos/seed/order1/200/280' },
    originalPrice: 298,
    paidPrice: 5,
    status: 'pending',
    redeemCode: 'CYBER-2077-XXXX-YYYY',
    expireTime: '2026-03-17',
    createTime: '2026-03-10',
  },
  {
    id: '2',
    game: { title: '艾尔登法环', image: 'https://picsum.photos/seed/order2/200/280' },
    originalPrice: 398,
    paidPrice: 9.9,
    status: 'delivered',
    createTime: '2026-03-05',
  },
  {
    id: '3',
    game: { title: '博德之门3', image: 'https://picsum.photos/seed/order3/200/280' },
    originalPrice: 298,
    paidPrice: 19.9,
    status: 'violation',
    violationReason: '检测到账号转让行为',
    createTime: '2026-02-20',
  },
]

const filteredOrders = ref(orders)

const filterOrders = (tab: string) => {
  activeTab.value = tab
  if (tab === 'all') {
    filteredOrders.value = orders
  } else {
    filteredOrders.value = orders.filter(o => o.status === tab)
  }
}

const copySteamId = () => {
  navigator.clipboard.writeText(user.steamId)
  idCopied.value = true
  setTimeout(() => {
    idCopied.value = false
  }, 2000)
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'pending':
      return { label: '待提货', class: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50', icon: Package }
    case 'delivered':
      return { label: '已发货', class: 'bg-green-500/20 text-green-400 border-green-500/50', icon: Truck }
    case 'violation':
      return { label: '违规', class: 'bg-red-500/20 text-red-400 border-red-500/50', icon: AlertTriangle }
    default:
      return { label: '未知', class: 'bg-muted text-muted-foreground', icon: Package }
  }
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <PortalHeader />
    
    <main class="pt-20 pb-12">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Ban Banner -->
        <div v-if="user.isBanned" class="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
          <div class="flex items-center gap-3">
            <AlertTriangle class="w-6 h-6 text-red-400 flex-shrink-0" />
            <div class="flex-1">
              <p class="font-medium text-red-400">您的账号已被限制购买</p>
              <p class="text-sm text-muted-foreground">
                原因: {{ user.banReason }} | 预计解封时间: {{ user.banExpireDate }}
              </p>
            </div>
            <button class="px-4 py-2 text-sm text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500/10">
              申诉
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <!-- Sidebar -->
          <div class="lg:col-span-1 space-y-6">
            <!-- WeChat Card -->
            <div class="bg-card border border-border rounded-xl p-6">
              <div class="flex items-center gap-4 mb-4">
                <img
                  :src="user.wechatAvatar"
                  :alt="user.wechatNickname"
                  class="w-16 h-16 rounded-full border-2 border-green-500/50"
                />
                <div>
                  <h2 class="font-semibold">{{ user.wechatNickname }}</h2>
                  <span class="inline-flex items-center gap-1 text-xs text-green-400">
                    <Check class="w-3 h-3" />
                    微信已授权
                  </span>
                </div>
              </div>
            </div>

            <!-- Steam Card -->
            <div class="bg-[#1b2838] border border-[#2a475e] rounded-xl p-6">
              <div class="flex items-center gap-4 mb-4">
                <img
                  :src="user.steamAvatar"
                  :alt="user.steamNickname"
                  class="w-14 h-14 rounded border border-[#2a475e]"
                />
                <div>
                  <h3 class="font-medium text-white">{{ user.steamNickname }}</h3>
                  <div class="flex items-center gap-2 text-xs text-gray-400">
                    <span>Lv.{{ user.steamLevel }}</span>
                    <span>|</span>
                    <span>{{ user.steamGamesCount }} 游戏</span>
                  </div>
                </div>
              </div>
              
              <div class="flex items-center gap-2 p-2 bg-black/30 rounded-lg">
                <span class="text-xs text-gray-400 font-mono flex-1 truncate">
                  {{ showSteamId ? user.steamId : '•••••••••••••' }}
                </span>
                <button
                  @click="showSteamId = !showSteamId"
                  class="p-1 text-gray-400 hover:text-white transition-colors"
                >
                  <component :is="showSteamId ? EyeOff : Eye" class="w-4 h-4" />
                </button>
                <button
                  @click="copySteamId"
                  class="p-1 text-gray-400 hover:text-white transition-colors"
                >
                  <component :is="idCopied ? Check : Copy" class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- Stats -->
            <div class="bg-card border border-border rounded-xl p-6">
              <h3 class="font-semibold mb-4">数据统计</h3>
              <div class="grid grid-cols-2 gap-4">
                <div class="text-center p-4 bg-muted/50 rounded-lg">
                  <p class="text-2xl font-bold text-primary">¥{{ stats.totalSaved }}</p>
                  <p class="text-xs text-muted-foreground">累计节省</p>
                </div>
                <div class="text-center p-4 bg-muted/50 rounded-lg">
                  <p class="text-2xl font-bold text-accent">{{ stats.dealsCount }}</p>
                  <p class="text-xs text-muted-foreground">参与次数</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Main Content -->
          <div class="lg:col-span-3">
            <!-- Tabs -->
            <div class="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="filterOrders(tab.id)"
                :class="[
                  'px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all',
                  activeTab === tab.id
                    ? tab.warning
                      ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                      : tab.highlight
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                      : 'bg-primary/20 text-primary border border-primary/50'
                    : 'bg-muted/50 text-muted-foreground hover:text-foreground'
                ]"
              >
                {{ tab.label }}
              </button>
            </div>

            <!-- Orders -->
            <div class="space-y-4">
              <div
                v-for="order in filteredOrders"
                :key="order.id"
                class="bg-card border border-border rounded-xl p-4 md:p-6"
              >
                <div class="flex gap-4">
                  <img
                    :src="order.game.image"
                    :alt="order.game.title"
                    class="w-16 h-22 md:w-20 md:h-28 object-cover rounded-lg"
                  />
                  
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2 mb-2">
                      <h3 class="font-semibold truncate">{{ order.game.title }}</h3>
                      <span
                        :class="[
                          'flex-shrink-0 px-2 py-1 text-xs font-medium rounded border',
                          getStatusConfig(order.status).class
                        ]"
                      >
                        {{ getStatusConfig(order.status).label }}
                      </span>
                    </div>
                    
                    <div class="flex items-baseline gap-2 mb-3">
                      <span class="text-muted-foreground line-through text-sm">
                        ¥{{ order.originalPrice }}
                      </span>
                      <span class="text-primary font-bold">
                        ¥{{ order.paidPrice }}
                      </span>
                      <span class="text-xs text-green-400">
                        节省 ¥{{ order.originalPrice - order.paidPrice }}
                      </span>
                    </div>

                    <!-- Pending Order: Show Redeem Code -->
                    <div v-if="order.status === 'pending'" class="p-3 bg-muted/50 rounded-lg mb-3">
                      <div class="flex items-center justify-between gap-2">
                        <div>
                          <p class="text-xs text-muted-foreground mb-1">提货码</p>
                          <p class="font-mono text-sm font-medium">{{ order.redeemCode }}</p>
                        </div>
                        <button class="p-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors">
                          <Copy class="w-4 h-4" />
                        </button>
                      </div>
                      <p class="text-xs text-yellow-400 mt-2 flex items-center gap-1">
                        <Clock class="w-3 h-3" />
                        有效期至 {{ order.expireTime }}
                      </p>
                    </div>

                    <!-- Violation Order: Show Reason -->
                    <div v-if="order.status === 'violation'" class="p-3 bg-red-500/10 border border-red-500/30 rounded-lg mb-3">
                      <p class="text-xs text-red-400">
                        <AlertTriangle class="w-3 h-3 inline mr-1" />
                        {{ order.violationReason }}
                      </p>
                    </div>

                    <div class="flex items-center justify-between">
                      <span class="text-xs text-muted-foreground">
                        {{ order.createTime }}
                      </span>
                      <RouterLink
                        :to="`/order/${order.id}`"
                        class="text-xs text-primary hover:underline"
                      >
                        查看详情
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Empty State -->
              <div v-if="filteredOrders.length === 0" class="text-center py-16">
                <Package class="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p class="text-muted-foreground">暂无订单</p>
                <RouterLink
                  to="/deals"
                  class="inline-block mt-4 text-sm text-primary hover:underline"
                >
                  去看看特惠福利
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <PortalFooter />
  </div>
</template>
