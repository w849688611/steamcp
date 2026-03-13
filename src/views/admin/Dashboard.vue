<script setup lang="ts">
import { ref } from 'vue'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Gamepad2,
  Users,
  Target,
  ArrowUpRight,
  Clock,
  Plus
} from 'lucide-vue-next'

const chartView = ref<'shipments' | 'spending'>('shipments')

const stats = [
  {
    label: '累计消耗营销费用',
    value: '¥ 2,458,960',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'cyan'
  },
  {
    label: '成功发放游戏总数',
    value: '156,789',
    change: '+8.2%',
    trend: 'up',
    icon: Gamepad2,
    color: 'purple'
  },
  {
    label: '获取高质量玩家数',
    value: '89,432',
    change: '+15.3%',
    trend: 'up',
    icon: Users,
    color: 'pink'
  },
  {
    label: '平均获客成本',
    value: '¥ 27.50',
    change: '-5.8%',
    trend: 'down',
    icon: Target,
    color: 'emerald'
  }
]

const activeCampaigns = [
  {
    id: 1,
    name: '赛博朋克2077',
    cover: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=60&fit=crop',
    progress: 78,
    delivered: 780,
    total: 1000,
    spent: '¥ 15,600',
    deadline: '2026-03-20'
  },
  {
    id: 2,
    name: '艾尔登法环',
    cover: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=100&h=60&fit=crop',
    progress: 45,
    delivered: 450,
    total: 1000,
    spent: '¥ 9,000',
    deadline: '2026-03-25'
  },
  {
    id: 3,
    name: '只狼：影逝二度',
    cover: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0f?w=100&h=60&fit=crop',
    progress: 92,
    delivered: 920,
    total: 1000,
    spent: '¥ 18,400',
    deadline: '2026-03-15'
  }
]

const quickStats = [
  { label: '今日发货', value: '1,234' },
  { label: '今日消耗', value: '¥ 24,680' },
  { label: '新增玩家', value: '856' },
  { label: '活跃任务', value: '12' }
]
</script>

<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Page Title -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-white">数据总览</h1>
          <p class="text-gray-400 mt-1">实时监控您的营销任务表现</p>
        </div>
        <RouterLink
          to="/admin/campaigns/create"
          class="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-xl transition-colors"
        >
          <Plus class="w-4 h-4" />
          创建任务
        </RouterLink>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="bg-[#12121a] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors"
        >
          <div class="flex items-start justify-between">
            <div
              :class="[
                'w-10 h-10 rounded-xl flex items-center justify-center',
                stat.color === 'cyan' ? 'bg-cyan-500/10' : '',
                stat.color === 'purple' ? 'bg-purple-500/10' : '',
                stat.color === 'pink' ? 'bg-pink-500/10' : '',
                stat.color === 'emerald' ? 'bg-emerald-500/10' : ''
              ]"
            >
              <component
                :is="stat.icon"
                :class="[
                  'w-5 h-5',
                  stat.color === 'cyan' ? 'text-cyan-400' : '',
                  stat.color === 'purple' ? 'text-purple-400' : '',
                  stat.color === 'pink' ? 'text-pink-400' : '',
                  stat.color === 'emerald' ? 'text-emerald-400' : ''
                ]"
              />
            </div>
            <div
              :class="[
                'flex items-center gap-1 text-xs font-medium',
                stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
              ]"
            >
              <TrendingUp v-if="stat.trend === 'up'" class="w-3 h-3" />
              <TrendingDown v-else class="w-3 h-3" />
              {{ stat.change }}
            </div>
          </div>
          <div class="mt-4">
            <p class="text-2xl font-bold text-white">{{ stat.value }}</p>
            <p class="text-sm text-gray-400 mt-1">{{ stat.label }}</p>
          </div>
        </div>
      </div>

      <!-- Chart & Campaigns -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Chart -->
        <div class="lg:col-span-2 bg-[#12121a] border border-white/5 rounded-2xl p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-semibold text-white">趋势分析</h2>
            <div class="flex gap-2">
              <button
                @click="chartView = 'shipments'"
                :class="[
                  'px-3 py-1.5 text-sm rounded-lg transition-colors',
                  chartView === 'shipments'
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'text-gray-400 hover:text-white'
                ]"
              >
                发货量
              </button>
              <button
                @click="chartView = 'spending'"
                :class="[
                  'px-3 py-1.5 text-sm rounded-lg transition-colors',
                  chartView === 'spending'
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'text-gray-400 hover:text-white'
                ]"
              >
                资金消耗
              </button>
            </div>
          </div>

          <!-- Chart Placeholder -->
          <div class="h-64 flex items-end justify-between gap-2 px-4">
            <div
              v-for="(height, i) in [40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 50]"
              :key="i"
              class="flex-1 bg-gradient-to-t from-cyan-500/20 to-cyan-500/5 rounded-t-lg relative group"
              :style="{ height: height + '%' }"
            >
              <div
                class="absolute inset-x-0 top-0 h-1 bg-cyan-400 rounded-t-lg"
              />
              <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1a1a2e] px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {{ Math.round(height * 100) }}
              </div>
            </div>
          </div>

          <div class="flex justify-between mt-4 px-4 text-xs text-gray-500">
            <span>3月1日</span>
            <span>3月7日</span>
            <span>3月13日</span>
          </div>
        </div>

        <!-- Active Campaigns -->
        <div class="bg-[#12121a] border border-white/5 rounded-2xl p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-white">进行中的任务</h2>
            <RouterLink to="/admin/campaigns" class="text-cyan-400 text-sm hover:underline flex items-center gap-1">
              查看全部 <ArrowUpRight class="w-3 h-3" />
            </RouterLink>
          </div>

          <div class="space-y-4">
            <div
              v-for="campaign in activeCampaigns"
              :key="campaign.id"
              class="p-4 bg-white/5 rounded-xl hover:bg-white/[0.07] transition-colors"
            >
              <div class="flex items-center gap-3 mb-3">
                <img
                  :src="campaign.cover"
                  :alt="campaign.name"
                  class="w-12 h-8 rounded object-cover"
                />
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-white truncate">{{ campaign.name }}</p>
                  <div class="flex items-center gap-1 text-xs text-gray-500">
                    <Clock class="w-3 h-3" />
                    {{ campaign.deadline }}
                  </div>
                </div>
              </div>

              <div class="space-y-2">
                <div class="flex justify-between text-xs">
                  <span class="text-gray-400">{{ campaign.delivered }} / {{ campaign.total }}</span>
                  <span class="text-cyan-400">{{ campaign.progress }}%</span>
                </div>
                <div class="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                    :style="{ width: campaign.progress + '%' }"
                  />
                </div>
                <p class="text-xs text-gray-500">已消耗 {{ campaign.spent }}</p>
              </div>
            </div>
          </div>

          <RouterLink
            to="/admin/campaigns/create"
            class="flex items-center justify-center gap-2 mt-4 p-3 border border-dashed border-white/10 rounded-xl text-gray-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-colors"
          >
            <Plus class="w-4 h-4" />
            <span class="text-sm">创建新任务</span>
          </RouterLink>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="stat in quickStats"
          :key="stat.label"
          class="bg-[#12121a] border border-white/5 rounded-xl p-4 text-center"
        >
          <p class="text-xl font-bold text-white">{{ stat.value }}</p>
          <p class="text-sm text-gray-400 mt-1">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
