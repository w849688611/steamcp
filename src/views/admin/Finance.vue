<script setup lang="ts">
import { ref } from 'vue'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import {
  Wallet,
  Lock,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  RotateCcw,
  CreditCard,
  Search,
  Filter,
  Download,
  X
} from 'lucide-vue-next'

const showRechargeModal = ref(false)
const rechargeAmount = ref(1000)
const paymentMethod = ref<'wechat' | 'alipay'>('wechat')
const typeFilter = ref('all')
const searchQuery = ref('')

const balanceCards = [
  { label: '可用余额', value: '¥ 125,680.00', icon: Wallet, color: 'emerald', glow: true },
  { label: '冻结金额', value: '¥ 35,000.00', icon: Lock, color: 'yellow' },
  { label: '累计充值', value: '¥ 500,000.00', icon: TrendingUp, color: 'cyan' },
  { label: '累计消耗', value: '¥ 339,320.00', icon: TrendingDown, color: 'pink' }
]

const transactions = [
  {
    id: 'TXN2026031301',
    time: '2026-03-13 14:32:18',
    type: 'recharge',
    amount: '+10,000.00',
    balance: '125,680.00',
    relatedTask: null,
    status: 'success',
    desc: '微信充值'
  },
  {
    id: 'TXN2026031302',
    time: '2026-03-13 12:15:33',
    type: 'deduct',
    amount: '-400.00',
    balance: '115,680.00',
    relatedTask: 'TASK-2026-0312',
    status: 'success',
    desc: '任务扣费 - 赛博朋克2077 x20份'
  },
  {
    id: 'TXN2026031303',
    time: '2026-03-12 18:45:21',
    type: 'refund',
    amount: '+60.00',
    balance: '116,080.00',
    relatedTask: 'TASK-2026-0308',
    status: 'success',
    desc: '拦截返还 - 验资失败退回 x3份'
  },
  {
    id: 'TXN2026031304',
    time: '2026-03-12 10:00:00',
    type: 'freeze',
    amount: '-20,000.00',
    balance: '116,020.00',
    relatedTask: 'TASK-2026-0312',
    status: 'pending',
    desc: '任务冻结 - 艾尔登法环 1000份'
  }
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'recharge': return { icon: ArrowDownLeft, color: 'text-emerald-400', bg: 'bg-emerald-500/10' }
    case 'deduct': return { icon: ArrowUpRight, color: 'text-red-400', bg: 'bg-red-500/10' }
    case 'refund': return { icon: RotateCcw, color: 'text-blue-400', bg: 'bg-blue-500/10' }
    case 'freeze': return { icon: Lock, color: 'text-yellow-400', bg: 'bg-yellow-500/10' }
    default: return { icon: CreditCard, color: 'text-gray-400', bg: 'bg-gray-500/10' }
  }
}

const getTypeName = (type: string) => {
  switch (type) {
    case 'recharge': return '充值'
    case 'deduct': return '任务扣费'
    case 'refund': return '拦截返还'
    case 'freeze': return '任务冻结'
    default: return '其他'
  }
}

const presetAmounts = [500, 1000, 2000, 5000, 10000, 50000]
</script>

<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-white">资金与财务</h1>
          <p class="text-gray-400 mt-1">管理账户余额与查看交易记录</p>
        </div>
        <button
          @click="showRechargeModal = true"
          class="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-medium rounded-xl transition-all"
        >
          <Wallet class="w-4 h-4" />
          立即充值
        </button>
      </div>

      <!-- Balance Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="card in balanceCards"
          :key="card.label"
          :class="[
            'bg-[#12121a] border rounded-2xl p-5 transition-all',
            card.glow ? 'border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 'border-white/5'
          ]"
        >
          <div class="flex items-start justify-between mb-3">
            <div
              :class="[
                'w-10 h-10 rounded-xl flex items-center justify-center',
                card.color === 'emerald' ? 'bg-emerald-500/10' : '',
                card.color === 'yellow' ? 'bg-yellow-500/10' : '',
                card.color === 'cyan' ? 'bg-cyan-500/10' : '',
                card.color === 'pink' ? 'bg-pink-500/10' : ''
              ]"
            >
              <component
                :is="card.icon"
                :class="[
                  'w-5 h-5',
                  card.color === 'emerald' ? 'text-emerald-400' : '',
                  card.color === 'yellow' ? 'text-yellow-400' : '',
                  card.color === 'cyan' ? 'text-cyan-400' : '',
                  card.color === 'pink' ? 'text-pink-400' : ''
                ]"
              />
            </div>
            <button
              v-if="card.glow"
              @click="showRechargeModal = true"
              class="text-xs text-cyan-400 hover:underline"
            >
              充值
            </button>
          </div>
          <p
            :class="[
              'text-2xl font-bold',
              card.color === 'emerald' ? 'text-emerald-400' : 'text-white'
            ]"
          >
            {{ card.value }}
          </p>
          <p class="text-sm text-gray-400 mt-1">{{ card.label }}</p>
        </div>
      </div>

      <!-- Transactions -->
      <div class="bg-[#12121a] border border-white/5 rounded-2xl">
        <div class="p-6 border-b border-white/5">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 class="text-lg font-semibold text-white">流水账单明细</h2>
            <div class="flex gap-2">
              <button class="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl text-gray-400 hover:text-white transition-colors text-sm">
                <Download class="w-4 h-4" />
                导出
              </button>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 mt-4">
            <div class="relative flex-1">
              <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索流水号或任务号..."
                class="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <select
              v-model="typeFilter"
              class="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none"
            >
              <option value="all">全部类型</option>
              <option value="recharge">充值</option>
              <option value="deduct">任务扣费</option>
              <option value="refund">拦截返还</option>
              <option value="freeze">任务冻结</option>
            </select>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-white/5">
                <th class="text-left px-6 py-4 text-sm font-medium text-gray-400">流水号</th>
                <th class="text-left px-6 py-4 text-sm font-medium text-gray-400">时间</th>
                <th class="text-left px-6 py-4 text-sm font-medium text-gray-400">类型</th>
                <th class="text-left px-6 py-4 text-sm font-medium text-gray-400">变动金额</th>
                <th class="text-left px-6 py-4 text-sm font-medium text-gray-400">余额</th>
                <th class="text-left px-6 py-4 text-sm font-medium text-gray-400">关联任务</th>
                <th class="text-left px-6 py-4 text-sm font-medium text-gray-400">说明</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="tx in transactions"
                :key="tx.id"
                class="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
              >
                <td class="px-6 py-4">
                  <span class="text-white font-mono text-sm">{{ tx.id }}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-gray-400 text-sm">{{ tx.time }}</span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <div :class="['w-7 h-7 rounded-lg flex items-center justify-center', getTypeIcon(tx.type).bg]">
                      <component :is="getTypeIcon(tx.type).icon" :class="['w-4 h-4', getTypeIcon(tx.type).color]" />
                    </div>
                    <span class="text-white text-sm">{{ getTypeName(tx.type) }}</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span
                    :class="[
                      'font-medium',
                      tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
                    ]"
                  >
                    {{ tx.amount }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-white">¥ {{ tx.balance }}</span>
                </td>
                <td class="px-6 py-4">
                  <RouterLink
                    v-if="tx.relatedTask"
                    :to="`/admin/campaigns`"
                    class="text-cyan-400 hover:underline text-sm"
                  >
                    {{ tx.relatedTask }}
                  </RouterLink>
                  <span v-else class="text-gray-500">-</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-gray-400 text-sm">{{ tx.desc }}</span>
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

    <!-- Recharge Modal -->
    <Teleport to="body">
      <div
        v-if="showRechargeModal"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        @click.self="showRechargeModal = false"
      >
        <div class="bg-[#12121a] border border-white/10 rounded-2xl w-full max-w-md">
          <div class="flex items-center justify-between p-6 border-b border-white/5">
            <h3 class="text-lg font-semibold text-white">账户充值</h3>
            <button
              @click="showRechargeModal = false"
              class="p-2 rounded-lg hover:bg-white/5 text-gray-400"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <div class="p-6 space-y-6">
            <!-- Payment Method -->
            <div>
              <label class="block text-sm text-gray-400 mb-3">支付方式</label>
              <div class="grid grid-cols-2 gap-3">
                <button
                  @click="paymentMethod = 'wechat'"
                  :class="[
                    'p-4 rounded-xl border transition-all flex items-center justify-center gap-2',
                    paymentMethod === 'wechat'
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-white/10 hover:border-white/20'
                  ]"
                >
                  <div class="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center text-white text-xs font-bold">微</div>
                  <span :class="paymentMethod === 'wechat' ? 'text-emerald-400' : 'text-gray-400'">微信支付</span>
                </button>
                <button
                  @click="paymentMethod = 'alipay'"
                  :class="[
                    'p-4 rounded-xl border transition-all flex items-center justify-center gap-2',
                    paymentMethod === 'alipay'
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-white/10 hover:border-white/20'
                  ]"
                >
                  <div class="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">支</div>
                  <span :class="paymentMethod === 'alipay' ? 'text-blue-400' : 'text-gray-400'">支付宝</span>
                </button>
              </div>
            </div>

            <!-- Amount -->
            <div>
              <label class="block text-sm text-gray-400 mb-3">充值金额</label>
              <div class="grid grid-cols-3 gap-2 mb-3">
                <button
                  v-for="amount in presetAmounts"
                  :key="amount"
                  @click="rechargeAmount = amount"
                  :class="[
                    'py-2 rounded-lg text-sm font-medium transition-colors',
                    rechargeAmount === amount
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'bg-white/5 text-gray-400 border border-white/10'
                  ]"
                >
                  ¥{{ amount.toLocaleString() }}
                </button>
              </div>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">¥</span>
                <input
                  v-model.number="rechargeAmount"
                  type="number"
                  class="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-lg focus:outline-none focus:border-cyan-500/50"
                />
              </div>
            </div>

            <!-- QR Code Placeholder -->
            <div class="p-6 bg-white rounded-xl flex items-center justify-center">
              <div class="w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                <span class="text-gray-400 text-sm">扫码支付</span>
              </div>
            </div>

            <p class="text-center text-sm text-gray-400">
              请使用{{ paymentMethod === 'wechat' ? '微信' : '支付宝' }}扫描二维码完成支付
            </p>
          </div>
        </div>
      </div>
    </Teleport>
  </AdminLayout>
</template>
