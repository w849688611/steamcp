<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import {
  LayoutDashboard,
  CreditCard,
  ListTodo,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  Wallet,
  LogOut,
  User,
  HelpCircle,
  Menu
} from 'lucide-vue-next'

const route = useRoute()
const collapsed = ref(false)
const mobileMenuOpen = ref(false)

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: '数据总览', description: '查看核心指标' },
  { href: '/admin/finance', icon: CreditCard, label: '资金与财务', description: '充值与账单明细' },
  { href: '/admin/campaigns', icon: ListTodo, label: '打榜任务', description: '创建推广任务' },
  { href: '/admin/analytics', icon: BarChart3, label: '数据分析', description: '深度数据洞察' },
  { href: '/admin/settings', icon: Settings, label: '系统设置', description: '账户与配置' },
]

const isActive = (href: string) => {
  if (href === '/admin') return route.path === '/admin'
  return route.path.startsWith(href)
}
</script>

<template>
  <div class="min-h-screen bg-[#0a0a12] flex">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed left-0 top-0 h-full bg-[#0d0d18] border-r border-white/5 z-40 transition-all duration-300',
        collapsed ? 'w-20' : 'w-64',
        'hidden lg:block'
      ]"
    >
      <!-- Logo -->
      <div class="h-16 flex items-center justify-between px-4 border-b border-white/5">
        <RouterLink to="/admin" class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <span class="text-white font-bold text-lg">S</span>
          </div>
          <span v-if="!collapsed" class="font-display text-lg text-cyan-400">SteamCP</span>
        </RouterLink>
        <button
          @click="collapsed = !collapsed"
          class="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft v-if="!collapsed" class="w-4 h-4" />
          <ChevronRight v-else class="w-4 h-4" />
        </button>
      </div>

      <!-- Navigation -->
      <nav class="p-4 space-y-2">
        <RouterLink
          v-for="item in navItems"
          :key="item.href"
          :to="item.href"
          :class="[
            'flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative',
            isActive(item.href)
              ? 'bg-cyan-500/10 text-cyan-400'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          ]"
        >
          <div
            v-if="isActive(item.href)"
            class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-400 rounded-r-full"
          />
          <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
          <div v-if="!collapsed" class="flex flex-col">
            <span class="text-sm font-medium">{{ item.label }}</span>
            <span class="text-xs text-gray-500">{{ item.description }}</span>
          </div>
        </RouterLink>
      </nav>
    </aside>

    <!-- Main Content -->
    <div :class="['flex-1 flex flex-col', collapsed ? 'lg:ml-20' : 'lg:ml-64']">
      <!-- Header -->
      <header class="h-16 bg-[#0d0d18]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30">
        <div class="flex items-center gap-4">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="lg:hidden p-2 rounded-lg hover:bg-white/5 text-gray-400"
          >
            <Menu class="w-5 h-5" />
          </button>
          <h1 class="text-lg font-medium text-white">游戏发行商控制台</h1>
        </div>

        <div class="flex items-center gap-4">
          <!-- Balance -->
          <div class="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <Wallet class="w-4 h-4 text-emerald-400" />
            <span class="text-emerald-400 font-medium">¥ 125,680.00</span>
          </div>

          <RouterLink
            to="/admin/finance"
            class="hidden sm:flex px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors text-sm font-medium"
          >
            充值
          </RouterLink>

          <button class="relative p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
            <Bell class="w-5 h-5" />
            <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <!-- User Avatar -->
          <div class="flex items-center gap-3 pl-4 border-l border-white/10">
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <User class="w-4 h-4 text-white" />
            </div>
            <div class="hidden sm:block">
              <p class="text-sm font-medium text-white">米哈游科技</p>
              <p class="text-xs text-gray-500">企业账户</p>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>

    <!-- Mobile Menu Overlay -->
    <div
      v-if="mobileMenuOpen"
      class="fixed inset-0 bg-black/60 z-50 lg:hidden"
      @click="mobileMenuOpen = false"
    >
      <aside
        class="w-64 h-full bg-[#0d0d18] border-r border-white/5"
        @click.stop
      >
        <div class="h-16 flex items-center px-4 border-b border-white/5">
          <RouterLink to="/admin" class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <span class="text-white font-bold text-lg">S</span>
            </div>
            <span class="font-display text-lg text-cyan-400">SteamCP</span>
          </RouterLink>
        </div>
        <nav class="p-4 space-y-2">
          <RouterLink
            v-for="item in navItems"
            :key="item.href"
            :to="item.href"
            @click="mobileMenuOpen = false"
            :class="[
              'flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200',
              isActive(item.href)
                ? 'bg-cyan-500/10 text-cyan-400'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            ]"
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span class="text-sm font-medium">{{ item.label }}</span>
          </RouterLink>
        </nav>
      </aside>
    </div>
  </div>
</template>
