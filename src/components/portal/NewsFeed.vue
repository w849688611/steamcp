<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Eye, MessageCircle, ArrowRight } from 'lucide-vue-next'

const news = [
  {
    id: '1',
    title: '《艾尔登法环》DLC "黄金树之影" 正式公布',
    excerpt: '宫崎英高确认新DLC将带来超过30小时的全新内容...',
    image: 'https://picsum.photos/seed/news1/800/450',
    category: '新游前瞻',
    author: 'SteamCP 编辑部',
    date: '2026-03-10',
    views: 12580,
    comments: 328,
  },
  {
    id: '2',
    title: 'Steam 春季特卖即将开启',
    excerpt: '超过5000款游戏参与折扣，最低1折起...',
    image: 'https://picsum.photos/seed/news2/800/450',
    category: '官方公告',
    author: 'SteamCP 编辑部',
    date: '2026-03-09',
    views: 8920,
    comments: 156,
  },
  {
    id: '3',
    title: '独立游戏《空洞骑士：丝之歌》发售日公布',
    excerpt: 'Team Cherry 终于确认续作将于今年夏季发售...',
    image: 'https://picsum.photos/seed/news3/800/450',
    category: '新游前瞻',
    author: 'SteamCP 编辑部',
    date: '2026-03-08',
    views: 6750,
    comments: 89,
  },
  {
    id: '4',
    title: '如何安全地参与游戏特惠活动',
    excerpt: '平台安全团队教你识别常见骗局，保护账号安全...',
    image: 'https://picsum.photos/seed/news4/800/450',
    category: '安全指南',
    author: 'SteamCP 编辑部',
    date: '2026-03-07',
    views: 4520,
    comments: 67,
  },
]

const getCategoryClass = (category: string) => {
  switch (category) {
    case '新游前瞻':
      return 'bg-primary/20 text-primary border-primary/50'
    case '官方公告':
      return 'bg-accent/20 text-accent border-accent/50'
    case '安全指南':
      return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50'
    default:
      return 'bg-muted text-muted-foreground border-border'
  }
}
</script>

<template>
  <section class="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <!-- Section Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold">
          游戏资讯
        </h2>
        <p class="text-muted-foreground mt-1">最新游戏动态与开发者日志</p>
      </div>
      <RouterLink
        to="/news"
        class="hidden sm:flex items-center gap-2 text-sm text-primary hover:underline"
      >
        查看全部
        <ArrowRight class="w-4 h-4" />
      </RouterLink>
    </div>

    <!-- News Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <RouterLink
        v-for="(item, index) in news"
        :key="item.id"
        :to="`/news/${item.id}`"
        :class="[
          'group relative rounded-xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300',
          index === 0 ? 'md:col-span-2 md:row-span-2' : ''
        ]"
      >
        <!-- Image -->
        <div :class="['relative overflow-hidden', index === 0 ? 'aspect-video md:aspect-[4/3]' : 'aspect-video']">
          <img
            :src="item.image"
            :alt="item.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          
          <!-- Category Tag -->
          <span
            :class="[
              'absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded border',
              getCategoryClass(item.category)
            ]"
          >
            {{ item.category }}
          </span>
        </div>

        <!-- Content -->
        <div class="p-4">
          <h3 :class="[
            'font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors',
            index === 0 ? 'text-lg md:text-xl' : 'text-sm'
          ]">
            {{ item.title }}
          </h3>
          <p v-if="index === 0" class="text-muted-foreground text-sm mb-4 line-clamp-2">
            {{ item.excerpt }}
          </p>
          
          <!-- Meta -->
          <div class="flex items-center justify-between text-xs text-muted-foreground">
            <span>{{ item.date }}</span>
            <div class="flex items-center gap-3">
              <span class="flex items-center gap-1">
                <Eye class="w-3 h-3" />
                {{ item.views.toLocaleString() }}
              </span>
              <span class="flex items-center gap-1">
                <MessageCircle class="w-3 h-3" />
                {{ item.comments }}
              </span>
            </div>
          </div>
        </div>

        <!-- Hover Glow Line -->
        <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </RouterLink>
    </div>

    <!-- Mobile View All -->
    <RouterLink
      to="/news"
      class="sm:hidden flex items-center justify-center gap-2 mt-6 py-3 text-sm text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors"
    >
      查看全部资讯
      <ArrowRight class="w-4 h-4" />
    </RouterLink>
  </section>
</template>
