<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PortalHeader from '@/components/portal/PortalHeader.vue'
import PortalFooter from '@/components/portal/PortalFooter.vue'
import { 
  ArrowLeft,
  Check,
  X,
  AlertTriangle,
  ExternalLink,
  Heart,
  Share2,
  Clock,
  Shield
} from 'lucide-vue-next'

const route = useRoute()

// Mock game data
const game = {
  id: route.params.id,
  title: '赛博朋克2077',
  subtitle: '往日之影',
  description: '在夜之城这座权力、魅力和义体改造的都市中闯出自己的传奇。你是一名雇佣兵亡命徒，正在追寻一种独一无二的植入体——它是获得永生的关键。',
  images: [
    'https://picsum.photos/seed/game1-1/1920/1080',
    'https://picsum.photos/seed/game1-2/1920/1080',
    'https://picsum.photos/seed/game1-3/1920/1080',
    'https://picsum.photos/seed/game1-4/1920/1080',
  ],
  tags: ['RPG', '开放世界', '赛博朋克', '单人', '剧情丰富'],
  developer: 'CD PROJEKT RED',
  publisher: 'CD PROJEKT RED',
  originalPrice: 298,
  salePrice: 5,
  discount: 98,
  remainingCount: 15,
  totalCount: 1000,
  endTime: '2026-03-15 23:59:59',
}

// Mock eligibility check
const eligibility = ref({
  steamLevel: { required: 10, current: 25, passed: true },
  gamesCount: { required: 50, current: 128, passed: true },
  gamePreference: { 
    required: '拥有 [FPS] 或 [RPG] 标签的游戏',
    passed: true,
    matchedGames: ['巫师3', 'GTA5']
  },
  privacyPublic: true,
})

const allChecksPassed = computed(() => 
  eligibility.value.steamLevel.passed && 
  eligibility.value.gamesCount.passed && 
  eligibility.value.gamePreference.passed &&
  eligibility.value.privacyPublic
)

const selectedImage = ref(0)
</script>

<template>
  <div class="min-h-screen bg-background">
    <PortalHeader />
    
    <main class="pt-16 pb-24 lg:pb-8">
      <!-- Back Button -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <RouterLink
          to="/deals"
          class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft class="w-4 h-4" />
          返回福利大厅
        </RouterLink>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <!-- Left: Images -->
          <div class="lg:col-span-3">
            <!-- Main Image -->
            <div class="relative aspect-video rounded-xl overflow-hidden border border-border mb-4">
              <img
                :src="game.images[selectedImage]"
                :alt="game.title"
                class="w-full h-full object-cover"
              />
              
              <!-- Decorative corners -->
              <div class="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary" />
              <div class="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-primary" />
              <div class="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary" />
              <div class="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary" />
            </div>

            <!-- Thumbnails -->
            <div class="flex gap-2 overflow-x-auto pb-2">
              <button
                v-for="(img, index) in game.images"
                :key="index"
                @click="selectedImage = index"
                :class="[
                  'flex-shrink-0 w-24 h-14 rounded-lg overflow-hidden border-2 transition-all',
                  selectedImage === index
                    ? 'border-primary shadow-[0_0_10px_var(--neon-cyan)]'
                    : 'border-border opacity-60 hover:opacity-100'
                ]"
              >
                <img :src="img" :alt="`截图 ${index + 1}`" class="w-full h-full object-cover" />
              </button>
            </div>

            <!-- Game Info -->
            <div class="mt-8 space-y-6">
              <div>
                <h1 class="text-2xl md:text-3xl font-bold mb-2">{{ game.title }}</h1>
                <p class="text-lg text-primary font-semibold">{{ game.subtitle }}</p>
              </div>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in game.tags"
                  :key="tag"
                  class="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full"
                >
                  {{ tag }}
                </span>
              </div>

              <!-- Description -->
              <p class="text-muted-foreground leading-relaxed">
                {{ game.description }}
              </p>

              <!-- Developer Info -->
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-muted-foreground">开发商</span>
                  <p class="font-medium">{{ game.developer }}</p>
                </div>
                <div>
                  <span class="text-muted-foreground">发行商</span>
                  <p class="font-medium">{{ game.publisher }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Purchase Panel -->
          <div class="lg:col-span-2">
            <div class="lg:sticky lg:top-24 space-y-6">
              <!-- Price Card -->
              <div class="bg-card border border-border rounded-xl p-6">
                <div class="flex items-center gap-2 mb-4">
                  <span class="px-2 py-1 bg-accent text-accent-foreground text-sm font-bold rounded">
                    -{{ game.discount }}%
                  </span>
                  <span class="text-sm text-muted-foreground">限时特惠</span>
                </div>

                <div class="flex items-baseline gap-3 mb-4">
                  <span class="text-4xl font-bold text-primary neon-text">
                    ¥{{ game.salePrice }}
                  </span>
                  <span class="text-lg text-muted-foreground line-through">
                    ¥{{ game.originalPrice }}
                  </span>
                </div>

                <!-- Progress -->
                <div class="mb-4">
                  <div class="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      class="h-full bg-orange-500 rounded-full"
                      :style="{ width: `${((game.totalCount - game.remainingCount) / game.totalCount) * 100}%` }"
                    />
                  </div>
                  <div class="flex items-center justify-between mt-2 text-sm">
                    <span class="text-orange-400 font-medium">
                      仅剩 {{ game.remainingCount }} 份
                    </span>
                    <span class="text-muted-foreground flex items-center gap-1">
                      <Clock class="w-4 h-4" />
                      {{ game.endTime }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Eligibility Check -->
              <div class="bg-card border border-border rounded-xl overflow-hidden">
                <div class="p-4 border-b border-border flex items-center gap-2">
                  <Shield class="w-5 h-5 text-primary" />
                  <h3 class="font-semibold">特权购买资格校验</h3>
                </div>

                <div class="p-4 space-y-4">
                  <!-- Steam Level -->
                  <div class="flex items-start gap-3">
                    <div :class="[
                      'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0',
                      eligibility.steamLevel.passed 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    ]">
                      <Check v-if="eligibility.steamLevel.passed" class="w-4 h-4" />
                      <X v-else class="w-4 h-4" />
                    </div>
                    <div class="flex-1">
                      <p class="text-sm font-medium">Steam 等级 ≥ {{ eligibility.steamLevel.required }} 级</p>
                      <p class="text-xs text-muted-foreground">
                        当前等级: <span :class="eligibility.steamLevel.passed ? 'text-green-400' : 'text-red-400'">
                          {{ eligibility.steamLevel.current }} 级
                        </span>
                      </p>
                      <div class="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                        <div 
                          class="h-full bg-primary rounded-full"
                          :style="{ width: `${Math.min((eligibility.steamLevel.current / eligibility.steamLevel.required) * 100, 100)}%` }"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- Games Count -->
                  <div class="flex items-start gap-3">
                    <div :class="[
                      'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0',
                      eligibility.gamesCount.passed 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    ]">
                      <Check v-if="eligibility.gamesCount.passed" class="w-4 h-4" />
                      <X v-else class="w-4 h-4" />
                    </div>
                    <div class="flex-1">
                      <p class="text-sm font-medium">库存游戏数 ≥ {{ eligibility.gamesCount.required }} 个</p>
                      <p class="text-xs text-muted-foreground">
                        当前拥有: <span :class="eligibility.gamesCount.passed ? 'text-green-400' : 'text-red-400'">
                          {{ eligibility.gamesCount.current }} 个
                        </span>
                      </p>
                      <div class="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                        <div 
                          class="h-full bg-primary rounded-full"
                          :style="{ width: `${Math.min((eligibility.gamesCount.current / eligibility.gamesCount.required) * 100, 100)}%` }"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- Game Preference -->
                  <div class="flex items-start gap-3">
                    <div :class="[
                      'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0',
                      eligibility.gamePreference.passed 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    ]">
                      <Check v-if="eligibility.gamePreference.passed" class="w-4 h-4" />
                      <X v-else class="w-4 h-4" />
                    </div>
                    <div class="flex-1">
                      <p class="text-sm font-medium">游戏偏好检测</p>
                      <p class="text-xs text-muted-foreground">
                        {{ eligibility.gamePreference.required }}
                      </p>
                      <p v-if="eligibility.gamePreference.passed" class="text-xs text-green-400 mt-1">
                        匹配: {{ eligibility.gamePreference.matchedGames.join(', ') }}
                      </p>
                    </div>
                  </div>

                  <!-- Privacy Warning -->
                  <div v-if="!eligibility.privacyPublic" class="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <div class="flex items-start gap-2">
                      <AlertTriangle class="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      <div>
                        <p class="text-sm text-yellow-400 font-medium">隐私设置未公开</p>
                        <p class="text-xs text-muted-foreground mt-1">
                          检测到您的 Steam 隐私未公开，无法验证资格
                        </p>
                        <a 
                          href="#"
                          class="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:underline"
                        >
                          查看公开教程
                          <ExternalLink class="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Actions (Desktop) -->
              <div class="hidden lg:flex items-center gap-3">
                <button
                  :disabled="!allChecksPassed"
                  :class="[
                    'flex-1 py-4 font-bold rounded-lg transition-all flex items-center justify-center gap-2',
                    allChecksPassed
                      ? 'bg-primary text-primary-foreground hover:shadow-[0_0_30px_var(--neon-cyan)]'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  ]"
                >
                  <Shield class="w-5 h-5" />
                  {{ allChecksPassed ? `立即支付 ¥${game.salePrice}` : '不符合购买条件' }}
                </button>
                <button class="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <Heart class="w-5 h-5" />
                </button>
                <button class="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <Share2 class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Fixed CTA -->
      <div class="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-lg border-t border-border z-50">
        <div class="flex items-center gap-3">
          <button class="p-3 border border-border rounded-lg">
            <Heart class="w-5 h-5" />
          </button>
          <button
            :disabled="!allChecksPassed"
            :class="[
              'flex-1 py-3 font-bold rounded-lg transition-all flex items-center justify-center gap-2',
              allChecksPassed
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            ]"
          >
            {{ allChecksPassed ? `立即支付 ¥${game.salePrice}` : '不符合条件' }}
          </button>
        </div>
      </div>
    </main>
    
    <PortalFooter />
  </div>
</template>
