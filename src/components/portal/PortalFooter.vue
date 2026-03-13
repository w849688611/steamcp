<script setup lang="ts">
import { RouterLink } from 'vue-router'

const footerLinks = {
  about: [
    { label: '关于我们', href: '/about' },
    { label: '联系方式', href: '/contact' },
    { label: '加入我们', href: '/careers' },
  ],
  support: [
    { label: '帮助中心', href: '/help' },
    { label: '防骗指南', href: '/security' },
    { label: '常见问题', href: '/faq' },
  ],
  legal: [
    { label: '用户协议', href: '/terms' },
    { label: '隐私政策', href: '/privacy' },
    { label: '退款政策', href: '/refund' },
  ],
}
</script>

<template>
  <footer class="border-t border-border bg-card/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="col-span-2 md:col-span-1">
          <RouterLink to="/" class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary/50">
              <span class="text-primary font-bold font-[family-name:var(--font-display)]">S</span>
            </div>
            <span class="font-[family-name:var(--font-display)] text-lg font-bold tracking-wider">
              SteamCP<span class="text-primary">.</span>
            </span>
          </RouterLink>
          <p class="text-sm text-muted-foreground mb-4">
            SteamCP - 你的下一款游戏从这里开始。探索独家游戏特惠，获取专属福利。
          </p>
        </div>

        <!-- Links -->
        <div>
          <h4 class="font-semibold mb-4 text-sm">关于</h4>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.about" :key="link.href">
              <RouterLink
                :to="link.href"
                class="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold mb-4 text-sm">支持</h4>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.support" :key="link.href">
              <RouterLink
                :to="link.href"
                class="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold mb-4 text-sm">法律</h4>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.legal" :key="link.href">
              <RouterLink
                :to="link.href"
                class="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-sm text-muted-foreground">
          &copy; 2026 SteamCP. All rights reserved.
        </p>
        <div class="flex items-center gap-4">
          <span class="text-xs text-muted-foreground">
            本平台与 Valve Corporation 无隶属关系
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>
