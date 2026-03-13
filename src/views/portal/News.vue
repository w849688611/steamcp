<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import PortalHeader from '@/components/portal/PortalHeader.vue'
import PortalFooter from '@/components/portal/PortalFooter.vue'
import { Eye, MessageCircle, Clock, User } from 'lucide-vue-next'

const categories = [
  { id: 'all', label: '全部资讯' },
  { id: 'official', label: '官方公告' },
  { id: 'preview', label: '新游前瞻' },
  { id: 'interview', label: '厂商访谈' },
  { id: 'hot', label: '热门推荐' },
]

const activeCategory = ref('all')

const allNews = [
  {
    id: '1',
    title: '《艾尔登法环》DLC "黄金树之影" 正式公布',
    excerpt: '宫崎英高确认新DLC将带来超过30小时的全新内容，探索前所未见的神秘区域',
    image: 'https://picsum.photos/seed/news1/800/450',
    category: 'preview',
    author: 'SteamCP 编辑部',
    date: '2026-03-10',
    views: 12580,
    comments: 328,
    featured: true,
  },
  {
    id: '2',
    title: 'Steam 春季特卖即将开启',
    excerpt: '超过5000款游戏参与折扣，最低1折起，准备好你的钱包了吗？',
    image: 'https://picsum.photos/seed/news2/800/450',
    category: 'official',
    author: 'SteamCP 编辑部',
    date: '2026-03-09',
    views: 8920,
    comments: 156,
    featured: true,
  },
  {
    id: '3',
    title: '独立游戏《空洞骑士：丝之歌》发售日公布',
    excerpt: 'Team Cherry 终于确认续作将于今年夏季发售，粉丝们的等待终于有了结果',
    image: 'https://picsum.photos/seed/news3/800/450',
    category: 'preview',
    author: 'SteamCP 编辑部',
    date: '2026-03-08',
    views: 6750,
    comments: 89,
  },
  {
    id: '4',
    title: '如何安全地参与游戏特惠活动',
    excerpt: '平台安全团队教你识别常见骗局，保护账号安全',
    image: 'https://picsum.photos/seed/news4/800/450',
    category: 'official',
    author: 'SteamCP 编辑部',
    date: '2026-03-07',
    views: 4520,
    comments: 67,
  },
  {
    id: '5',
    title: '专访《黑神话：悟空》制作人冯骥',
    excerpt: '深度访谈游戏科学工作室，探讨国产3A大作的开发历程',
    image: 'https://picsum.photos/seed/news5/800/450',
    category: 'interview',
    author: 'SteamCP 编辑部',
    date: '2026-03-06',
    views: 15680,
    comments: 432,
  },
  {
    id: '6',
    title: '本周热门游戏推荐',
    excerpt: '精选本周最受玩家欢迎的十款游戏，总有一款适合你',
    image: 'https://picsum.photos/seed/news6/800/450',
    category: 'hot',
    author: 'SteamCP 编辑部',
    date: '2026-03-05',
    views: 7890,
    comments: 145,
  },
]

const filteredNews = computed(() => {
  if (activeCategory.value === 'all') return allNews
  return allNews.filter(n => n.category === activeCategory.value)
})

const featuredNews = computed(() => filteredNews.value.filter(n => n.featured))
const regularNews = computed(() => filteredNews.value.filter(n => !n.featured))

const getCategoryLabel = (category: string) => {
  return categories.find(c => c.id === category)?.label || category
}

const getCategoryClass = (category: string) => {
  switch (category) {
    case 'preview':
      return 'bg-primary/20 text-primary border-primary/50'
    case 'official':
      return 'bg-accent/20 text-accent border-accent/50'
    case 'interview':
      return 'bg-green-500/20 text-green-400 border-green-500/50'
    case 'hot':
      return 'bg-orange-500/20 text-orange-400 border-orange-500/50'
    default:
      return 'bg-muted text-muted-foreground border-border'
  }
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <PortalHeader />
    
    <main class="pt-16">
      <!-- Page Header -->
      <div class="relative py-16 px-4 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div class="relative max-w-7xl mx-auto text-center">
          <h1 class="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold mb-4">
            游戏资讯
          </h1>
          <p class="text-muted-foreground">最新游戏动态、开发者日志、行业深度分析</p>
        </div>
      </div>

      <!-- Category Tabs -->
      <div class="sticky top-16 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center gap-1 py-3 overflow-x-auto scrollbar-hide">
            <button
              v-for="cat in categories"
              :key="cat.id"
              @click="activeCategory = cat.id"
              :class="[
                'px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all',
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              ]"
            >
              {{ cat.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- News Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Featured -->
        <div v-if="featuredNews.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <RouterLink
            v-for="news in featuredNews"
            :key="news.id"
            :to="`/news/${news.id}`"
            class="group relative rounded-xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all"
          >
            <div class="aspect-video overflow-hidden">
              <img
                :src="news.image"
                :alt="news.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            </div>
            
            <div class="absolute bottom-0 left-0 right-0 p-6">
              <span
                :class="[
                  'inline-block px-2 py-1 text-xs font-medium rounded border mb-3',
                  getCategoryClass(news.category)
                ]"
              >
                {{ getCategoryLabel(news.category) }}
              </span>
              <h2 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {{ news.title }}
              </h2>
              <p class="text-sm text-muted-foreground mb-4 line-clamp-2">
                {{ news.excerpt }}
              </p>
              <div class="flex items-center gap-4 text-xs text-muted-foreground">
                <span class="flex items-center gap-1">
                  <User class="w-3 h-3" />
                  {{ news.author }}
                </span>
                <span class="flex items-center gap-1">
                  <Clock class="w-3 h-3" />
                  {{ news.date }}
                </span>
                <span class="flex items-center gap-1">
                  <Eye class="w-3 h-3" />
                  {{ news.views.toLocaleString() }}
                </span>
              </div>
            </div>
          </RouterLink>
        </div>

        <!-- Regular News Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <RouterLink
            v-for="news in regularNews"
            :key="news.id"
            :to="`/news/${news.id}`"
            class="group rounded-xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all"
          >
            <div class="aspect-video overflow-hidden relative">
              <img
                :src="news.image"
                :alt="news.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span
                :class="[
                  'absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded border',
                  getCategoryClass(news.category)
                ]"
              >
                {{ getCategoryLabel(news.category) }}
              </span>
            </div>
            
            <div class="p-4">
              <h3 class="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {{ news.title }}
              </h3>
              <p class="text-sm text-muted-foreground mb-4 line-clamp-2">
                {{ news.excerpt }}
              </p>
              <div class="flex items-center justify-between text-xs text-muted-foreground">
                <span>{{ news.date }}</span>
                <div class="flex items-center gap-3">
                  <span class="flex items-center gap-1">
                    <Eye class="w-3 h-3" />
                    {{ news.views.toLocaleString() }}
                  </span>
                  <span class="flex items-center gap-1">
                    <MessageCircle class="w-3 h-3" />
                    {{ news.comments }}
                  </span>
                </div>
              </div>
            </div>
            
            <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </RouterLink>
        </div>

        <!-- Load More -->
        <div class="mt-12 text-center">
          <button class="px-8 py-3 text-sm font-medium text-primary border border-primary/50 rounded-lg hover:bg-primary/10 transition-colors">
            加载更多
          </button>
        </div>
      </div>
    </main>
    
    <PortalFooter />
  </div>
</template>
