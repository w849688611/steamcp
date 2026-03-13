<script setup lang="ts">
import { AlertTriangle, Info, Bell } from 'lucide-vue-next'

const notices = [
  { id: 1, type: 'warning', text: '防骗提醒：官方不会通过任何方式索要您的账号密码，请谨防诈骗！' },
  { id: 2, type: 'info', text: '系统维护公告：3月15日凌晨2:00-4:00进行系统升级，届时暂停服务' },
  { id: 3, type: 'notice', text: '新功能上线：支持Steam愿望单一键导入，快来体验吧！' },
]

const getIcon = (type: string) => {
  switch (type) {
    case 'warning':
      return AlertTriangle
    case 'info':
      return Info
    default:
      return Bell
  }
}

const getIconClass = (type: string) => {
  switch (type) {
    case 'warning':
      return 'text-yellow-500'
    case 'info':
      return 'text-blue-400'
    default:
      return 'text-primary'
  }
}
</script>

<template>
  <div class="bg-muted/50 border-y border-border py-2 overflow-hidden">
    <div class="animate-marquee flex whitespace-nowrap">
      <div
        v-for="notice in [...notices, ...notices]"
        :key="`${notice.id}-${Math.random()}`"
        class="inline-flex items-center gap-2 mx-8"
      >
        <component
          :is="getIcon(notice.type)"
          :class="['w-4 h-4 flex-shrink-0', getIconClass(notice.type)]"
        />
        <span class="text-sm text-muted-foreground">{{ notice.text }}</span>
      </div>
    </div>
  </div>
</template>
