<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { ChevronLeft, ChevronRight, Play } from 'lucide-vue-next'

const slides = [
  {
    id: 1,
    title: '赛博朋克2077：往日之影',
    subtitle: '全新DLC震撼来袭',
    description: '在危机四伏的新区域中展开全新冒险，体验令人难忘的间谍惊悚故事',
    image: 'https://picsum.photos/seed/cyber2077/1920/1080',
    tag: '限时特惠',
    price: '¥5.00',
    originalPrice: '¥298.00',
    gameId: '1',
  },
  {
    id: 2,
    title: '艾尔登法环',
    subtitle: '黄金树之影',
    description: '由宫崎英高与乔治·R·R·马丁联手打造的全新黑暗奇幻世界',
    image: 'https://picsum.photos/seed/elden/1920/1080',
    tag: '新游上架',
    price: '¥9.90',
    originalPrice: '¥398.00',
    gameId: '2',
  },
  {
    id: 3,
    title: '博德之门3',
    subtitle: '年度最佳RPG',
    description: '在被遗忘的国度中开启史诗级冒险，做出改变命运的选择',
    image: 'https://picsum.photos/seed/bg3/1920/1080',
    tag: '口碑爆棚',
    price: '¥19.90',
    originalPrice: '¥298.00',
    gameId: '3',
  },
]

const currentIndex = ref(0)
let autoPlayTimer: ReturnType<typeof setInterval> | null = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.length) % slides.length
}

const goToSlide = (index: number) => {
  currentIndex.value = index
}

const startAutoPlay = () => {
  autoPlayTimer = setInterval(nextSlide, 5000)
}

const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = null
  }
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<template>
  <section
    class="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden"
    @mouseenter="stopAutoPlay"
    @mouseleave="startAutoPlay"
  >
    <!-- Slides -->
    <TransitionGroup
      tag="div"
      enter-active-class="transition-opacity duration-700"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-700 absolute inset-0"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-for="(slide, index) in slides"
        v-show="index === currentIndex"
        :key="slide.id"
        class="absolute inset-0"
      >
        <!-- Background Image -->
        <div class="absolute inset-0">
          <img
            :src="slide.image"
            :alt="slide.title"
            class="w-full h-full object-cover"
          />
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <!-- Scan Line Effect -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
          <div class="w-full h-px bg-primary/30 animate-[scan-line_4s_linear_infinite]" />
        </div>

        <!-- Content -->
        <div class="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div class="max-w-2xl">
            <!-- Tag -->
            <span class="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/20 border border-primary/50 rounded-full mb-4">
              {{ slide.tag }}
            </span>

            <!-- Title -->
            <h2 class="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-balance">
              {{ slide.title }}
            </h2>
            <p class="text-xl md:text-2xl text-primary font-semibold mb-4">
              {{ slide.subtitle }}
            </p>

            <!-- Description -->
            <p class="text-muted-foreground text-lg mb-6 max-w-lg">
              {{ slide.description }}
            </p>

            <!-- Price -->
            <div class="flex items-baseline gap-3 mb-6">
              <span class="text-3xl md:text-4xl font-bold text-primary neon-text">
                {{ slide.price }}
              </span>
              <span class="text-lg text-muted-foreground line-through">
                {{ slide.originalPrice }}
              </span>
            </div>

            <!-- Buttons -->
            <div class="flex flex-wrap gap-4">
              <RouterLink
                :to="`/games/${slide.gameId}`"
                class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_var(--neon-cyan)]"
              >
                <Play class="w-5 h-5" />
                立即抢购
              </RouterLink>
              <RouterLink
                :to="`/news/${slide.gameId}`"
                class="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-muted/50 transition-colors"
              >
                阅读详情
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>

    <!-- Navigation Arrows -->
    <button
      @click="prevSlide"
      class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-background/50 border border-border hover:bg-background/80 hover:border-primary transition-all group"
    >
      <ChevronLeft class="w-6 h-6 group-hover:text-primary transition-colors" />
    </button>
    <button
      @click="nextSlide"
      class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-background/50 border border-border hover:bg-background/80 hover:border-primary transition-all group"
    >
      <ChevronRight class="w-6 h-6 group-hover:text-primary transition-colors" />
    </button>

    <!-- Indicators -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
      <button
        v-for="(slide, index) in slides"
        :key="slide.id"
        @click="goToSlide(index)"
        :class="[
          'h-1 rounded-full transition-all duration-300',
          index === currentIndex
            ? 'w-8 bg-primary'
            : 'w-4 bg-muted-foreground/50 hover:bg-muted-foreground'
        ]"
      />
    </div>
  </section>
</template>
