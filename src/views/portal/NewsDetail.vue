<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PortalHeader from '@/components/portal/PortalHeader.vue'
import PortalFooter from '@/components/portal/PortalFooter.vue'
import { 
  ArrowLeft, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2, 
  Clock,
  User,
  Play,
  Copy,
  Check
} from 'lucide-vue-next'

const route = useRoute()

// Mock article data
const article = {
  id: route.params.id,
  title: '《艾尔登法环》DLC "黄金树之影" 正式公布',
  subtitle: '宫崎英高确认新DLC将带来超过30小时的全新内容',
  image: 'https://picsum.photos/seed/article1/1920/1080',
  category: '新游前瞻',
  author: 'SteamCP 编辑部',
  authorAvatar: 'https://picsum.photos/seed/author/100/100',
  date: '2026-03-10',
  views: 12580,
  likes: 2340,
  comments: 328,
}

// Mock related game
const relatedGame = {
  id: '2',
  title: '艾尔登法环',
  image: 'https://picsum.photos/seed/game2/600/800',
  originalPrice: 398,
  salePrice: 9.9,
  discount: 97,
  remainingCount: 244,
  totalCount: 1000,
  endTime: '2026-03-14',
}

const liked = ref(false)
const copied = ref(false)

const toggleLike = () => {
  liked.value = !liked.value
}

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <PortalHeader />
    
    <main class="pt-16">
      <!-- Hero Image -->
      <div class="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          :src="article.image"
          :alt="article.title"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        <!-- Scan Line -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
          <div class="w-full h-px bg-primary/20 animate-[scan-line_4s_linear_infinite]" />
        </div>

        <!-- Back Button -->
        <RouterLink
          to="/news"
          class="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-background/50 backdrop-blur-sm rounded-lg border border-border hover:bg-background/80 transition-colors"
        >
          <ArrowLeft class="w-4 h-4" />
          返回资讯
        </RouterLink>
      </div>

      <!-- Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <!-- Article Header -->
            <div class="bg-card border border-border rounded-xl p-6 md:p-8 mb-6">
              <span class="inline-block px-3 py-1 text-xs font-medium bg-primary/20 text-primary border border-primary/50 rounded-full mb-4">
                {{ article.category }}
              </span>
              
              <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-balance">
                {{ article.title }}
              </h1>
              
              <p class="text-lg text-muted-foreground mb-6">
                {{ article.subtitle }}
              </p>

              <!-- Author & Meta -->
              <div class="flex flex-wrap items-center gap-4 pb-6 border-b border-border">
                <div class="flex items-center gap-3">
                  <img
                    :src="article.authorAvatar"
                    :alt="article.author"
                    class="w-10 h-10 rounded-full border border-primary/50"
                  />
                  <div>
                    <p class="font-medium text-sm">{{ article.author }}</p>
                    <p class="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock class="w-3 h-3" />
                      {{ article.date }}
                    </p>
                  </div>
                </div>
                
                <div class="flex items-center gap-4 text-sm text-muted-foreground ml-auto">
                  <span class="flex items-center gap-1">
                    <Eye class="w-4 h-4" />
                    {{ article.views.toLocaleString() }}
                  </span>
                  <span class="flex items-center gap-1">
                    <Heart class="w-4 h-4" />
                    {{ article.likes.toLocaleString() }}
                  </span>
                  <span class="flex items-center gap-1">
                    <MessageCircle class="w-4 h-4" />
                    {{ article.comments }}
                  </span>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex items-center gap-3 pt-6">
                <button
                  @click="toggleLike"
                  :class="[
                    'flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors',
                    liked
                      ? 'bg-accent/20 border-accent/50 text-accent'
                      : 'border-border hover:bg-muted/50'
                  ]"
                >
                  <Heart :class="['w-4 h-4', liked ? 'fill-current' : '']" />
                  {{ liked ? '已点赞' : '点赞' }}
                </button>
                <button
                  @click="copyLink"
                  class="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <component :is="copied ? Check : Copy" class="w-4 h-4" />
                  {{ copied ? '已复制' : '分享' }}
                </button>
              </div>
            </div>

            <!-- Article Body -->
            <div class="bg-card border border-border rounded-xl p-6 md:p-8 prose prose-invert max-w-none">
              <p class="lead">
                FromSoftware 和 Bandai Namco 正式公布了《艾尔登法环》的首个大型DLC"黄金树之影"，
                这款备受期待的扩展内容将于今年夏季发售。
              </p>

              <h2>超过30小时的全新内容</h2>
              <p>
                在接受媒体采访时，游戏总监宫崎英高表示，新DLC将带来超过30小时的全新游戏内容，
                包括全新的区域、Boss、武器和法术。玩家将探索一片从未见过的神秘土地，
                揭开黄金树背后隐藏的秘密。
              </p>

              <!-- Video Placeholder -->
              <div class="relative aspect-video bg-muted rounded-lg overflow-hidden my-8 group cursor-pointer">
                <img
                  src="https://picsum.photos/seed/video/1280/720"
                  alt="预告片"
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-background/50 flex items-center justify-center group-hover:bg-background/40 transition-colors">
                  <div class="w-16 h-16 rounded-full bg-primary/20 border border-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play class="w-8 h-8 text-primary fill-primary" />
                  </div>
                </div>
                <span class="absolute bottom-4 left-4 text-sm text-muted-foreground">
                  官方预告片 - 点击播放
                </span>
              </div>

              <h2>全新的挑战等待着你</h2>
              <p>
                "黄金树之影"将带来前所未有的挑战。新增的Boss战将考验玩家的技术极限，
                而全新的武器和法术系统也将为战斗带来更多可能性。
              </p>

              <blockquote>
                "我们希望给玩家带来一个既熟悉又全新的体验。黄金树之影将揭示许多玩家
                一直想知道的故事真相。" —— 宫崎英高
              </blockquote>

              <h2>发售信息</h2>
              <p>
                《艾尔登法环：黄金树之影》预计于2026年夏季发售，届时将登陆PC、
                PlayStation 5和Xbox Series X|S平台。
              </p>
            </div>

            <!-- Comments Section -->
            <div class="bg-card border border-border rounded-xl p-6 md:p-8 mt-6">
              <h3 class="text-lg font-semibold mb-6 flex items-center gap-2">
                <MessageCircle class="w-5 h-5" />
                评论 ({{ article.comments }})
              </h3>
              
              <!-- Comment Input -->
              <div class="flex gap-4 mb-8">
                <img
                  src="https://picsum.photos/seed/user/100/100"
                  alt="用户头像"
                  class="w-10 h-10 rounded-full border border-border"
                />
                <div class="flex-1">
                  <textarea
                    placeholder="发表你的看法..."
                    rows="3"
                    class="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg resize-none focus:outline-none focus:border-primary transition-colors"
                  />
                  <div class="flex justify-end mt-2">
                    <button class="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
                      发表评论
                    </button>
                  </div>
                </div>
              </div>

              <!-- Comments List -->
              <div class="space-y-6">
                <div v-for="i in 3" :key="i" class="flex gap-4">
                  <img
                    :src="`https://picsum.photos/seed/user${i}/100/100`"
                    alt="用户头像"
                    class="w-10 h-10 rounded-full border border-border"
                  />
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="font-medium text-sm">玩家{{ i }}号</span>
                      <span class="text-xs text-muted-foreground">3小时前</span>
                    </div>
                    <p class="text-sm text-muted-foreground">
                      期待已久的DLC终于来了！希望难度不要太离谱...
                    </p>
                    <div class="flex items-center gap-4 mt-2">
                      <button class="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                        <Heart class="w-3 h-3" />
                        {{ 42 + i * 10 }}
                      </button>
                      <button class="text-xs text-muted-foreground hover:text-foreground">
                        回复
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <!-- Related Game Card -->
            <div class="sticky top-24">
              <div class="bg-card border border-border rounded-xl overflow-hidden">
                <div class="p-4 border-b border-border">
                  <h3 class="font-semibold text-sm text-muted-foreground">相关特惠</h3>
                </div>
                
                <RouterLink :to="`/games/${relatedGame.id}`" class="block group">
                  <div class="relative aspect-[3/4] overflow-hidden">
                    <img
                      :src="relatedGame.image"
                      :alt="relatedGame.title"
                      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                    
                    <!-- Discount Badge -->
                    <div class="absolute top-3 right-3 px-2 py-1 bg-accent text-accent-foreground text-sm font-bold rounded">
                      -{{ relatedGame.discount }}%
                    </div>
                  </div>
                  
                  <div class="p-4">
                    <h4 class="font-semibold mb-3 group-hover:text-primary transition-colors">
                      {{ relatedGame.title }}
                    </h4>
                    
                    <!-- Price -->
                    <div class="flex items-baseline gap-2 mb-4">
                      <span class="text-2xl font-bold text-primary">
                        ¥{{ relatedGame.salePrice }}
                      </span>
                      <span class="text-sm text-muted-foreground line-through">
                        ¥{{ relatedGame.originalPrice }}
                      </span>
                    </div>

                    <!-- Progress -->
                    <div class="mb-4">
                      <div class="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          class="h-full bg-orange-500 rounded-full"
                          :style="{ width: `${((relatedGame.totalCount - relatedGame.remainingCount) / relatedGame.totalCount) * 100}%` }"
                        />
                      </div>
                      <p class="text-xs text-muted-foreground mt-1">
                        仅剩 {{ relatedGame.remainingCount }} 份
                      </p>
                    </div>

                    <button class="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                      立即抢购
                    </button>
                  </div>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Fixed CTA -->
      <div class="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-lg border-t border-border z-50">
        <RouterLink
          :to="`/games/${relatedGame.id}`"
          class="flex items-center justify-between"
        >
          <div>
            <p class="text-sm font-medium">{{ relatedGame.title }}</p>
            <div class="flex items-baseline gap-2">
              <span class="text-lg font-bold text-primary">¥{{ relatedGame.salePrice }}</span>
              <span class="text-xs text-muted-foreground line-through">¥{{ relatedGame.originalPrice }}</span>
            </div>
          </div>
          <button class="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg">
            立即抢购
          </button>
        </RouterLink>
      </div>
    </main>
    
    <PortalFooter />
  </div>
</template>

<style scoped>
@reference "@/assets/styles/main.css";

.prose {
  color: var(--foreground);
}

.prose h2 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: var(--foreground);
}

.prose p {
  margin-bottom: 1rem;
  line-height: 1.625;
  color: var(--muted-foreground);
}

.prose .lead {
  font-size: 1.125rem;
  color: var(--foreground);
  margin-bottom: 1.5rem;
}

.prose blockquote {
  border-left: 4px solid var(--primary);
  padding-left: 1rem;
  font-style: italic;
  margin: 1.5rem 0;
  color: var(--muted-foreground);
}
</style>
