<script setup lang="ts">
import { ref, computed } from 'vue'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import {
  Search,
  CheckCircle,
  AlertCircle,
  Users,
  Gamepad2,
  Tag,
  DollarSign,
  ArrowLeft
} from 'lucide-vue-next'

const appId = ref('')
const gameFound = ref(false)
const quota = ref(1000)
const unitPrice = ref(20)
const displayPrice = ref(5)
const minSteamLevel = ref(10)
const minGames = ref(50)
const requiredAppIds = ref('')
const selectedTags = ref<string[]>(['FPS'])

const availableTags = ['FPS', '开放世界', 'RPG', '动作', '冒险', '独立', '多人', '策略', '模拟', '竞速']

const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
}

const totalBudget = computed(() => quota.value * unitPrice.value)
const estimatedRevenue = computed(() => quota.value * displayPrice.value)
const netCost = computed(() => totalBudget.value - estimatedRevenue.value)

const searchGame = () => {
  if (appId.value.length > 5) {
    gameFound.value = true
  }
}
</script>

<template>
  <AdminLayout>
    <div class="max-w-5xl mx-auto space-y-6">
      <!-- Header -->
      <div class="flex items-center gap-4">
        <RouterLink
          to="/admin/campaigns"
          class="p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft class="w-5 h-5" />
        </RouterLink>
        <div>
          <h1 class="text-2xl font-bold text-white">创建营销任务</h1>
          <p class="text-gray-400 mt-1">配置游戏分发任务参数</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Form -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Game Selection -->
          <div class="bg-[#12121a] border border-white/5 rounded-2xl p-6">
            <h2 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Gamepad2 class="w-5 h-5 text-cyan-400" />
              选择游戏
            </h2>

            <div class="space-y-4">
              <div class="relative">
                <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  v-model="appId"
                  @input="searchGame"
                  type="text"
                  placeholder="输入 Steam AppID..."
                  class="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <!-- Game Card -->
              <div v-if="gameFound" class="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <div class="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=120&h=70&fit=crop"
                    alt="Game"
                    class="w-20 h-12 rounded-lg object-cover"
                  />
                  <div class="flex-1">
                    <div class="flex items-center gap-2">
                      <CheckCircle class="w-4 h-4 text-emerald-400" />
                      <span class="text-white font-medium">赛博朋克2077</span>
                    </div>
                    <p class="text-sm text-gray-400">AppID: {{ appId }} | CD Projekt Red</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pricing -->
          <div class="bg-[#12121a] border border-white/5 rounded-2xl p-6">
            <h2 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <DollarSign class="w-5 h-5 text-cyan-400" />
              计费与配额
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm text-gray-400 mb-2">投放数量</label>
                <input
                  v-model.number="quota"
                  type="number"
                  class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                />
                <div class="flex gap-2 mt-2">
                  <button
                    v-for="q in [500, 1000, 2000]"
                    :key="q"
                    @click="quota = q"
                    :class="[
                      'px-3 py-1 text-xs rounded-lg transition-colors',
                      quota === q ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-gray-400'
                    ]"
                  >
                    {{ q }}份
                  </button>
                </div>
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-2">单份扣费 (给平台)</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
                  <input
                    v-model.number="unitPrice"
                    type="number"
                    class="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-2">展示售价 (玩家付)</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
                  <input
                    v-model.number="displayPrice"
                    type="number"
                    class="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Targeting -->
          <div class="bg-[#12121a] border border-white/5 rounded-2xl p-6">
            <h2 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Users class="w-5 h-5 text-cyan-400" />
              受众精准定向
            </h2>

            <div class="space-y-6">
              <!-- Steam Level -->
              <div>
                <div class="flex justify-between mb-2">
                  <label class="text-sm text-gray-400">最低 Steam 等级</label>
                  <span class="text-cyan-400 font-medium">{{ minSteamLevel }} 级</span>
                </div>
                <input
                  v-model.number="minSteamLevel"
                  type="range"
                  min="0"
                  max="50"
                  class="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <!-- Min Games -->
              <div>
                <div class="flex justify-between mb-2">
                  <label class="text-sm text-gray-400">最低库存游戏数</label>
                  <span class="text-cyan-400 font-medium">{{ minGames }} 款</span>
                </div>
                <input
                  v-model.number="minGames"
                  type="range"
                  min="0"
                  max="200"
                  class="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <!-- Required AppIDs -->
              <div>
                <label class="block text-sm text-gray-400 mb-2">必须拥有的游戏 (AppID，逗号分隔)</label>
                <input
                  v-model="requiredAppIds"
                  type="text"
                  placeholder="例如：1091500, 1245620"
                  class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <!-- Tags -->
              <div>
                <label class="block text-sm text-gray-400 mb-3 flex items-center gap-2">
                  <Tag class="w-4 h-4" />
                  游戏偏好标签
                </label>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="tag in availableTags"
                    :key="tag"
                    @click="toggleTag(tag)"
                    :class="[
                      'px-3 py-1.5 rounded-full text-sm transition-colors',
                      selectedTags.includes(tag)
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20'
                    ]"
                  >
                    {{ tag }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Budget Summary -->
        <div class="lg:col-span-1">
          <div class="bg-[#12121a] border border-white/5 rounded-2xl p-6 sticky top-24">
            <h2 class="text-lg font-semibold text-white mb-4">预算预估</h2>

            <div class="space-y-4">
              <div class="flex justify-between py-3 border-b border-white/5">
                <span class="text-gray-400">投放数量</span>
                <span class="text-white font-medium">{{ quota }} 份</span>
              </div>
              <div class="flex justify-between py-3 border-b border-white/5">
                <span class="text-gray-400">单份成本</span>
                <span class="text-white font-medium">¥ {{ unitPrice }}</span>
              </div>
              <div class="flex justify-between py-3 border-b border-white/5">
                <span class="text-gray-400">冻结预算</span>
                <span class="text-pink-400 font-bold text-lg">¥ {{ totalBudget.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between py-3 border-b border-white/5">
                <span class="text-gray-400">预计回收</span>
                <span class="text-emerald-400 font-medium">¥ {{ estimatedRevenue.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between py-3">
                <span class="text-gray-400">净成本</span>
                <span class="text-cyan-400 font-bold">¥ {{ netCost.toLocaleString() }}</span>
              </div>
            </div>

            <div class="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <div class="flex gap-2">
                <AlertCircle class="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <p class="text-sm text-yellow-400/80">
                  创建任务后将立即冻结预算金额，任务完成或取消后多余金额将返还。
                </p>
              </div>
            </div>

            <button
              class="w-full mt-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold rounded-xl transition-all"
            >
              确认创建并支付
            </button>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
