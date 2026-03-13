<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowRight, Clock, Flame } from 'lucide-vue-next'

const deals = [
  {
    id: '1',
    title: '赛博朋克2077',
    image: 'https://picsum.photos/seed/game1/600/800',
    originalPrice: 298,
    salePrice: 5,
    discount: 98,
    soldCount: 985,
    totalCount: 1000,
    endTime: '2026-03-15',
    tags: ['RPG', '开放世界'],
  },
  {
    id: '2',
    title: '艾尔登法环',
    image: 'https://picsum.photos/seed/game2/600/800',
    originalPrice: 398,
    salePrice: 9.9,
    discount: 97,
    soldCount: 756,
    totalCount: 1000,
    endTime: '2026-03-14',
    tags: ['动作', 'RPG'],
  },
  {
    id: '3',
    title: '博德之门3',
    image: 'https://picsum.photos/seed/game3/600/800',
    originalPrice: 298,
    salePrice: 19.9,
    discount: 93,
    soldCount: 412,
    totalCount: 500,
    endTime: '2026-03-16',
    tags: ['RPG', '回合制'],
  },
  {
    id: '4',
    title: '只狼：影逝二度',
    image: 'https://picsum.photos/seed/game4/600/800',
    originalPrice: 268,
    salePrice: 8.8,
    discount: 96,
    soldCount: 890,
    totalCount: 1000,
    endTime: '2026-03-13',
    tags: ['动作', '魂系'],
  },
]

const getProgressColor = (progress: number) => {
  if (progress >= 90) return 'bg-red-500'
  if (progress >= 70) return 'bg-orange-500'
  return 'bg-primary'
}
</script>

<template>
  <section class="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <!-- Section Header -->
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center gap-3">
        <div class="p-2 rounded-lg bg-accent/20 border border-accent/50">
          <Flame class="w-6 h-6 text-accent" />
        </div>
        <div>
          <h2 class="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold">
            特惠福利
          </h2>
          <p class="text-muted-foreground mt-1">限时限量，手慢无！</p>
        </div>
      </div>
      <RouterLink
        to="/deals"
        class="hidden sm:flex items-center gap-2 text-sm text-primary hover:underline"
      >
        查看全部
        <ArrowRight class="w-4 h-4" />
      </RouterLink>
    </div>

    <!-- Deals Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      <RouterLink
        v-for="deal in deals"
        :key="deal.id"
        :to="`/games/${deal.id}`"
        class="group relative rounded-xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.1)]"
      >
        <!-- Discount Badge -->
        <div class="absolute top-3 left-3 z-10 px-2 py-1 bg-accent text-accent-foreground text-xs font-bold rounded">
          -{{ deal.discount }}%
        </div>

        <!-- Image -->
        <div class="relative aspect-[3/4] overflow-hidden">
          <img
            :src="deal.image"
            :alt="deal.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <!-- Content -->
        <div class="p-3 md:p-4">
          <!-- Title -->
          <h3 class="font-semibold text-sm md:text-base mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {{ deal.title }}
          </h3>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1 mb-3">
            <span
              v-for="tag in deal.tags"
              :key="tag"
              class="px-1.5 py-0.5 text-[10px] md:text-xs bg-muted text-muted-foreground rounded"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Price -->
          <div class="flex items-baseline gap-2 mb-3">
            <span class="text-xl md:text-2xl font-bold text-primary">
              ¥{{ deal.salePrice }}
            </span>
            <span class="text-xs md:text-sm text-muted-foreground line-through">
              ¥{{ deal.originalPrice }}
            </span>
          </div>

          <!-- Progress Bar -->
          <div class="mb-2">
            <div class="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                :class="['h-full rounded-full transition-all', getProgressColor((deal.soldCount / deal.totalCount) * 100)]"
                :style="{ width: `${(deal.soldCount / deal.totalCount) * 100}%` }"
              />
            </div>
            <div class="flex items-center justify-between mt-1">
              <span class="text-[10px] md:text-xs text-muted-foreground">
                仅剩 {{ deal.totalCount - deal.soldCount }} 份
              </span>
              <span class="text-[10px] md:text-xs text-muted-foreground flex items-center gap-1">
                <Clock class="w-3 h-3" />
                {{ deal.endTime }}
              </span>
            </div>
          </div>
        </div>

        <!-- Hover Button Overlay -->
        <div class="absolute inset-x-0 bottom-0 p-3 md:p-4 bg-gradient-to-t from-card via-card to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button class="w-full py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors">
            验资抢购
          </button>
        </div>
      </RouterLink>
    </div>

    <!-- Mobile View All -->
    <RouterLink
      to="/deals"
      class="sm:hidden flex items-center justify-center gap-2 mt-6 py-3 text-sm text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors"
    >
      查看全部特惠
      <ArrowRight class="w-4 h-4" />
    </RouterLink>
  </section>
</template>
