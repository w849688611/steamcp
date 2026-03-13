<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { 
  Menu, 
  X, 
  Home, 
  Newspaper, 
  Gift, 
  Package,
  User,
  LogOut,
  Settings,
  ChevronDown
} from 'lucide-vue-next'

const route = useRoute()
const mobileMenuOpen = ref(false)
const userMenuOpen = ref(false)

const navItems = [
  { href: '/', label: '首页', icon: Home },
  { href: '/news', label: '资讯', icon: Newspaper },
  { href: '/deals', label: '特惠福利', icon: Gift },
  { href: '/profile', label: '提货中心', icon: Package },
]

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

// Mock user data
const user = {
  isLoggedIn: true,
  avatar: 'https://picsum.photos/seed/user/100/100',
  nickname: '玩家001',
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2 group">
          <div class="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary/50 group-hover:border-primary transition-colors">
            <span class="text-primary font-bold font-[family-name:var(--font-display)]">S</span>
          </div>
          <span class="font-[family-name:var(--font-display)] text-lg font-bold tracking-wider">
            SteamCP<span class="text-primary">.</span>
          </span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-1">
          <RouterLink
            v-for="item in navItems"
            :key="item.href"
            :to="item.href"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              isActive(item.href)
                ? 'text-primary bg-primary/10 border border-primary/30'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            ]"
          >
            {{ item.label }}
          </RouterLink>
        </nav>

        <!-- User Menu (Desktop) -->
        <div class="hidden md:flex items-center gap-4">
          <template v-if="user.isLoggedIn">
            <div class="relative">
              <button
                @click="userMenuOpen = !userMenuOpen"
                class="flex items-center gap-2 p-1 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <img
                  :src="user.avatar"
                  :alt="user.nickname"
                  class="w-8 h-8 rounded-full border border-primary/50"
                />
                <span class="text-sm">{{ user.nickname }}</span>
                <ChevronDown class="w-4 h-4 text-muted-foreground" />
              </button>
              
              <!-- Dropdown -->
              <Transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div
                  v-if="userMenuOpen"
                  class="absolute right-0 mt-2 w-48 rounded-lg bg-card border border-border shadow-xl py-1"
                >
                  <RouterLink
                    to="/profile"
                    class="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted/50 transition-colors"
                    @click="userMenuOpen = false"
                  >
                    <User class="w-4 h-4" />
                    个人中心
                  </RouterLink>
                  <RouterLink
                    to="/profile"
                    class="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted/50 transition-colors"
                    @click="userMenuOpen = false"
                  >
                    <Settings class="w-4 h-4" />
                    账号设置
                  </RouterLink>
                  <hr class="my-1 border-border" />
                  <button
                    class="flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 w-full transition-colors"
                  >
                    <LogOut class="w-4 h-4" />
                    退出登录
                  </button>
                </div>
              </Transition>
            </div>
          </template>
          <template v-else>
            <RouterLink
              to="/login"
              class="px-4 py-2 text-sm font-medium text-primary border border-primary/50 rounded-lg hover:bg-primary/10 transition-colors"
            >
              登录
            </RouterLink>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
        >
          <Menu v-if="!mobileMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="mobileMenuOpen"
        class="md:hidden border-t border-border bg-background/95 backdrop-blur-lg"
      >
        <nav class="px-4 py-4 space-y-2">
          <RouterLink
            v-for="item in navItems"
            :key="item.href"
            :to="item.href"
            :class="[
              'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all',
              isActive(item.href)
                ? 'text-primary bg-primary/10 border border-primary/30'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            ]"
            @click="mobileMenuOpen = false"
          >
            <component :is="item.icon" class="w-5 h-5" />
            {{ item.label }}
          </RouterLink>
        </nav>
        
        <!-- Mobile User Section -->
        <div class="px-4 py-4 border-t border-border">
          <template v-if="user.isLoggedIn">
            <div class="flex items-center gap-3 mb-4">
              <img
                :src="user.avatar"
                :alt="user.nickname"
                class="w-10 h-10 rounded-full border border-primary/50"
              />
              <div>
                <p class="font-medium">{{ user.nickname }}</p>
                <p class="text-xs text-muted-foreground">已登录</p>
              </div>
            </div>
            <button
              class="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-destructive border border-destructive/30 rounded-lg hover:bg-destructive/10 transition-colors"
            >
              <LogOut class="w-4 h-4" />
              退出登录
            </button>
          </template>
          <template v-else>
            <RouterLink
              to="/login"
              class="block w-full text-center px-4 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
              @click="mobileMenuOpen = false"
            >
              登录 / 注册
            </RouterLink>
          </template>
        </div>
      </div>
    </Transition>
  </header>
</template>
