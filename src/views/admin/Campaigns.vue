<script setup lang="ts">
import { ref } from 'vue'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import {
  Search,
  Filter,
  Plus,
  Play,
  Pause,
  MoreHorizontal,
  TrendingUp,
  Clock,
  ArrowUpDown
} from 'lucide-vue-next'

const searchQuery = ref('')
const statusFilter = ref('all')
const sortBy = ref('newest')

const campaigns = [
  {
    id: 1,
    appId: '1091500',
    name: '赛博朋克2077',
    cover: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=120&fit=crop',
    target: 1000,
    delivered: 780,
    remaining: 220,
    spent: '¥ 15,600',
    status: 'active',
    deadline: '2026-03-20'
  },
  {
    id: 2,
    appId: '1245620',
    name: '艾尔登法环',
    cover: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=200&h=120&fit=crop',
    target: 1000,
    delivered: 450,
    remaining: 550,
    spent: '¥ 9,000',
    status: 'active',
    deadline: '2026-03-25'
  },
  {
    id: 3,
    appId: '814380',
    name: '只狼：影逝二度',
    cover: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0f?w=200&h=120&fit=crop',
    target: 1000,
    delivered: 1000,
    remaining: 0,
    spent: '¥ 20,000',
    status: 'completed',
    deadline: '2026-03-15'
  },
  {
    id: 4,
    appId: '292030',
    name: '巫师3：狂猎',
    cover: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=200&h=120&fit=crop',
    target: 500,
    delivered: 200,
    remaining: 300,
    spent: '¥ 4,000',
    status: 'paused',
    deadline: '2026-04-01'
  }
]

const stats = [
  { label: '进行中任务', value: '12', color: 'cyan' },
  { label: '本月发放量', value: '15,680', color: 'purple' },
  { label: '本月消耗', value: '¥ 313,600', color: 'pink' },
  { label: '平均转化率', value: '78.5%', color: 'emerald' }
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active': return { text: '进行中', class: 'bg-emerald-500/20 text-emerald-400' }
    case 'completed': return { text: '已完成', class: 'bg-blue-500/20 text-blue-400' }
    case 'paused': return { text: '已暂停', class: 'bg-yellow-500/20 text-yellow-400' }
    default: return { text: '未知', class: 'bg-gray-500/20 text-gray-400' }
  }
}
</script>

<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-white">营销任务管理</h1>
          <p class="text-gray-400 mt-1">创建和管理游戏分发任务</p>
        </div>
        <RouterLink
          to="/admin/campaigns/create"
          class="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-xl transition-colors"
        >
          <Plus class="w-4 h-4" />
          创建新任务
        </RouterLink>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="bg-[#12121a] border border-white/5 rounded-xl p-4"
        >
          <p
            :class="[
              'text-2xl font-bold',
              stat.color === 'cyan' ? 'text-cyan-400' : '',
              stat.color === 'purple' ? 'text-purple-400' : '',
              stat.color === 'pink' ? 'text-pink-400' : '',
              stat.color === 'emerald' ? 'text-emerald-400' : ''
            ]"
          >
            {{ stat.value }}
          </p>
          <p class="text-sm text-gray-400 mt-1">{{ stat.label }}</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="relative flex-1">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索 AppID 或游戏名称..."
            class="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="statusFilter"
            class="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
          >
            <option value="all">全部状态</option>
            <option value="active">进行中</option>
            <option value="completed">已完成</option>
            <option value="paused">已暂停</option>
          </select>
          <select
            v-model="sortBy"
            class="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
          >
            <option value="newest">最新上架</option>
            <option value="progress">按进度</option>
            <option value="spent">按消耗</option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-[#12121a] border border-white/5 rounded-2xl overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-white/5">
                <th class="text-left px-6 py-4 text-sm font-medium text-gray-400">游戏</th>
                <th class="text-left px-6 py-4 text-sm font-medium text-gray-400">投放进度</th>
                <th class="text-left px-6 py-4 text-sm font-medium text-gray-400">消耗金额</th>
                <th class="text-left px-6 py-4 text-sm font-medium text-gray-400">状态</th>
                <th class="text-left px-6 py-4 text-sm font-medium text-gray-400">截止日期</th>
                <th class="text-right px-6 py-4 text-sm font-medium text-gray-400">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="campaign in campaigns"
                :key="campaign.id"
                class="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
              >
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <img
                      :src="campaign.cover"
                      :alt="campaign.name"
                      class="w-16 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <p class="text-white font-medium">{{ campaign.name }}</p>
                      <p class="text-xs text-gray-500">AppID: {{ campaign.appId }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="w-40">
                    <div class="flex justify-between text-xs mb-1">
                      <span class="text-gray-400">{{ campaign.delivered }} / {{ campaign.target }}</span>
                      <span class="text-cyan-400">{{ Math.round(campaign.delivered / campaign.target * 100) }}%</span>
                    </div>
                    <div class="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        class="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                        :style="{ width: (campaign.delivered / campaign.target * 100) + '%' }"
                      />
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span class="text-white font-medium">{{ campaign.spent }}</span>
                </td>
                <td class="px-6 py-4">
                  <span
                    :class="[
                      'px-2.5 py-1 rounded-full text-xs font-medium',
                      getStatusBadge(campaign.status).class
                    ]"
                  >
                    {{ getStatusBadge(campaign.status).text }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-1 text-gray-400 text-sm">
                    <Clock class="w-4 h-4" />
                    {{ campaign.deadline }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      v-if="campaign.status === 'active'"
                      class="p-2 rounded-lg hover:bg-white/5 text-yellow-400 transition-colors"
                      title="暂停"
                    >
                      <Pause class="w-4 h-4" />
                    </button>
                    <button
                      v-else-if="campaign.status === 'paused'"
                      class="p-2 rounded-lg hover:bg-white/5 text-emerald-400 transition-colors"
                      title="恢复"
                    >
                      <Play class="w-4 h-4" />
                    </button>
                    <button class="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                      <MoreHorizontal class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between px-6 py-4 border-t border-white/5">
          <p class="text-sm text-gray-400">显示 1-4 共 4 条</p>
          <div class="flex gap-2">
            <button class="px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 text-sm">上一页</button>
            <button class="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 text-sm">1</button>
            <button class="px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 text-sm">下一页</button>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
