<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import PortalHeader from '@/components/portal/PortalHeader.vue'
import PortalFooter from '@/components/portal/PortalFooter.vue'
import { 
  Search, 
  SlidersHorizontal, 
  Clock,
  ChevronDown,
  X
} from 'lucide-vue-next'

const searchQuery = ref('')
const activeTag = ref('all')
const sortBy = ref('newest')
const showFilterDrawer = ref(false)

const tags = [
  { id: 'all', label: '全部' },
  { id: 'fps', label: 'FPS射击' },
  { id: 'openworld', label: '开放世界' },
  { id: 'multiplayer', label: '多人联机' },
  { id: 'indie', label: '独立游戏' },
  { id: 'rpg', label: 'RPG' },
]

const sortOptions = [
  { id: 'newest', label: '最新上架' },
  { id: 'price-low', label: '价格最低' },
  { id: 'ending-soon', label: '即将售罄' },
]

const games = ref([
  {
    id: '1',
    title: '赛博朋克2077',
    image: 'https://picsum.photos/seed/deal1/600/800',
    originalPrice: 298,
    salePrice: 5,
    discount: 98,
    soldCount: 985,
    totalCount: 1000,
    endTime: '2026-03-15',
    tags: ['RPG', '开放世界'],
    tagIds: ['rpg', 'openworld'],
  },
  {
    id: '2',
    title: '艾尔登法环',
    image: 'https://picsum.photos/seed/deal2/600/800',
    originalPrice: 398,
    salePrice: 9.9,
    discount: 97,
    soldCount: 756,
    totalCount: 1000,
    endTime: '2026-03-14',
    tags: ['动作', 'RPG'],
    tagIds: ['rpg'],
  },
  {
    id: '3',
    title: '博德之门3',
    image: 'https://picsum.photos/seed/deal3/600/800',
    originalPrice: 298,
    salePrice: 19.9,
    discount: 93,
    soldCount: 412,
    totalCount: 500,
    endTime: '2026-03-16',
    tags: ['RPG', '回合制'],
    tagIds: ['rpg'],
  },
  {
    id: '4',
    title: '只狼：影逝二度',
    image: 'https://picsum.photos/seed/deal4/600/800',
    originalPrice: 268,
    salePrice: 8.8,
    discount: 96,
    soldCount: 890,
    totalCount: 1000,
    endTime: '2026-03-13',
    tags: ['动作', '魂系'],
    tagIds: [],
  },
  {
    id: '5',
    title: '使命召唤：现代战争3',
    image: 'https://picsum.photos/seed/deal5/600/800',
    originalPrice: 468,
    salePrice: 15,
    discount: 96,
    soldCount: 623,
    totalCount: 800,
    endTime: '2026-03-17',
    tags: ['FPS', '多人'],
    tagIds: ['fps', 'multiplayer'],
  },
  {
    id: '6',
    title: '荒野大镖客2',
    image: 'https://picsum.photos/seed/deal6/600/800',
    originalPrice: 279,
    salePrice: 12,
    discount: 95,
    soldCount: 445,
    totalCount: 600,
    endTime: '2026-03-18',
    tags: ['开放世界', '动作'],
    tagIds: ['openworld'],
  },
  {
    id: '7',
    title: '哈迪斯',
    image: 'https://picsum.photos/seed/deal7/600/800',
    originalPrice: 80,
    salePrice: 3,
    discount: 96,
    soldCount: 1890,
    totalCount: 2000,
    endTime: '2026-03-12',
    tags: ['Roguelike', '独立'],
    tagIds: ['indie'],
  },
  {
    id: '8',
    title: '战地2042',
    image: 'https://picsum.photos/seed/deal8/600/800',
    originalPrice: 398,
    salePrice: 6.6,
    discount: 98,
    soldCount: 567,
    totalCount: 1000,
    endTime: '2026-03-19',
    tags: ['FPS', '多人'],
    tagIds: ['fps', 'multiplayer'],
  },
])

const filteredGames = computed(() => {
  let result = [...games.value]
  
  // Filter by search
  if (searchQuery.value) {
    result = result.filter(g => 
      g.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  // Filter by tag
  if (activeTag.value !== 'all') {
    result = result.filter(g => g.tagIds.includes(activeTag.value))
  }
  
  // Sort
  switch (sortBy.value) {
    case 'price-low':
      result.sort((a, b) => a.salePrice - b.salePrice)
      break
    case 'ending-soon':
      result.sort((a, b) => (b.soldCount / b.totalCount) - (a.soldCount / a.totalCount))
      break
    default:
      // newest - keep original order
      break
  }
  
  return result
})

const getProgressColor = (progress: number) => {
  if (progress >= 90) return 'bg-red-500'
  if (progress >= 70) return 'bg-orange-500'
  return 'bg-primary'
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <PortalHeader />
    
    <main class="pt-16">
      <!-- Page Header -->
      <div class="relative py-16 px-4 overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0">
          <div class="absolute inset-0 bg-gradient-to-b from-accent/10 via-primary/5 to-transparent" />
          <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>
        
        <!-- Decorative Lines -->
        <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        
        <div class="relative max-w-7xl mx-auto text-center">
          <h1 class="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold mb-4 neon-text">
            福利大厅
          </h1>
          <p class="text-muted-foreground text-lg">
            限时限量特权抢购，错过再等一年
          </p>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="sticky top-16 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex flex-col md:flex-row gap-4">
            <!-- Search -->
            <div class="relative flex-1">
              <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索你想要白嫖的游戏..."
                class="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <!-- Tags (Desktop) -->
            <div class="hidden md:flex items-center gap-2 overflow-x-auto">
              <button
                v-for="tag in tags"
                :key="tag.id"
                @click="activeTag = tag.id"
                :class="[
                  'px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all',
                  activeTag === tag.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
                ]"
              >
                {{ tag.label }}
              </button>
            </div>

            <!-- Sort & Filter -->
            <div class="flex items-center gap-2">
              <!-- Sort Dropdown -->
              <div class="relative">
                <select
                  v-model="sortBy"
                  class="appearance-none pl-4 pr-10 py-2.5 bg-muted/50 border border-border rounded-lg focus:outline-none focus:border-primary text-sm cursor-pointer"
                >
                  <option v-for="opt in sortOptions" :key="opt.id" :value="opt.id">
                    {{ opt.label }}
                  </option>
                </select>
                <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>

              <!-- Mobile Filter Button -->
              <button
                @click="showFilterDrawer = true"
                class="md:hidden p-2.5 bg-muted/50 border border-border rounded-lg"
              >
                <SlidersHorizontal class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Games Grid -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <RouterLink
            v-for="game in filteredGames"
            :key="game.id"
            :to="`/games/${game.id}`"
            class="group relative rounded-xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.15)]"
          >
            <!-- Discount Badge -->
            <div class="absolute top-3 left-3 z-10 px-2 py-1 bg-neon-green text-background text-xs font-bold rounded">
              -{{ game.discount }}%
            </div>

            <!-- Image -->
            <div class="relative aspect-[3/4] overflow-hidden">
              <img
                :src="game.image"
                :alt="game.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            </div>

            <!-- Content -->
            <div class="p-3 md:p-4">
              <!-- Title -->
              <h3 class="font-semibold text-sm md:text-base mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                {{ game.title }}
              </h3>

              <!-- Tags -->
              <div class="flex flex-wrap gap-1 mb-3">
                <span
                  v-for="tag in game.tags.slice(0, 2)"
                  :key="tag"
                  class="px-1.5 py-0.5 text-[10px] md:text-xs bg-muted text-muted-foreground rounded"
                >
                  {{ tag }}
                </span>
              </div>

              <!-- Price -->
              <div class="flex items-baseline gap-2 mb-3">
                <span class="text-xl md:text-2xl font-bold text-primary">
                  ¥{{ game.salePrice }}
                </span>
                <span class="text-xs md:text-sm text-muted-foreground line-through">
                  ¥{{ game.originalPrice }}
                </span>
              </div>

              <!-- Progress Bar -->
              <div class="mb-3">
                <div class="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    :class="['h-full rounded-full transition-all', getProgressColor((game.soldCount / game.totalCount) * 100)]"
                    :style="{ width: `${(game.soldCount / game.totalCount) * 100}%` }"
                  />
                </div>
                <div class="flex items-center justify-between mt-1">
                  <span class="text-[10px] md:text-xs text-muted-foreground">
                    仅剩 {{ game.totalCount - game.soldCount }} 份
                  </span>
                  <span class="text-[10px] md:text-xs text-muted-foreground flex items-center gap-1">
                    <Clock class="w-3 h-3" />
                    {{ game.endTime }}
                  </span>
                </div>
              </div>

              <!-- Button -->
              <button class="w-full py-2.5 bg-primary/10 text-primary text-sm font-medium rounded-lg border border-primary/30 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                验资抢购
              </button>
            </div>

            <!-- Hover Glow -->
            <div class="absolute inset-0 pointer-events-none border border-primary/0 group-hover:border-primary/50 rounded-xl transition-colors" />
          </RouterLink>
        </div>

        <!-- Empty State -->
        <div v-if="filteredGames.length === 0" class="text-center py-16">
          <p class="text-muted-foreground">暂无符合条件的游戏</p>
        </div>

        <!-- Load More -->
        <div v-if="filteredGames.length > 0" class="mt-12 text-center">
          <button class="px-8 py-3 text-sm font-medium text-primary border border-primary/50 rounded-lg hover:bg-primary/10 transition-colors">
            加载更多
          </button>
        </div>
      </div>

      <!-- Mobile Filter Drawer -->
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showFilterDrawer"
          class="md:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          @click="showFilterDrawer = false"
        />
      </Transition>
      
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="translate-y-full"
        enter-to-class="translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="translate-y-0"
        leave-to-class="translate-y-full"
      >
        <div
          v-if="showFilterDrawer"
          class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border rounded-t-2xl p-6"
        >
          <div class="flex items-center justify-between mb-6">
            <h3 class="font-semibold">筛选标签</h3>
            <button @click="showFilterDrawer = false">
              <X class="w-5 h-5" />
            </button>
          </div>
          
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tag in tags"
              :key="tag.id"
              @click="activeTag = tag.id; showFilterDrawer = false"
              :class="[
                'px-4 py-2 text-sm font-medium rounded-full transition-all',
                activeTag === tag.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              ]"
            >
              {{ tag.label }}
            </button>
          </div>
        </div>
      </Transition>
    </main>
    
    <PortalFooter />
  </div>
</template>
