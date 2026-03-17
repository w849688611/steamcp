import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// C端页面
import PortalHome from '@/views/portal/Home.vue'
import PortalNews from '@/views/portal/News.vue'
import PortalNewsDetail from '@/views/portal/NewsDetail.vue'
import PortalDeals from '@/views/portal/Deals.vue'
import PortalGameDetail from '@/views/portal/GameDetail.vue'
import PortalAuth from '@/views/portal/Auth.vue'
import PortalAuthCallback from '@/views/portal/AuthCallback.vue'
import PortalLogin from '@/views/portal/Login.vue'
import PortalOrder from '@/views/portal/Order.vue'
import PortalProfile from '@/views/portal/Profile.vue'

// B端页面
import AdminLogin from '@/views/admin/AdminLogin.vue'
import AdminDashboard from '@/views/admin/Dashboard.vue'
import AdminCampaigns from '@/views/admin/Campaigns.vue'
import AdminCampaignCreate from '@/views/admin/CampaignCreate.vue'
import AdminFinance from '@/views/admin/Finance.vue'

const routes: RouteRecordRaw[] = [
  // C端路由
  {
    path: '/',
    name: 'home',
    component: PortalHome,
  },
  {
    path: '/news',
    name: 'news',
    component: PortalNews,
  },
  {
    path: '/news/:id',
    name: 'news-detail',
    component: PortalNewsDetail,
  },
  {
    path: '/deals',
    name: 'deals',
    component: PortalDeals,
  },
  {
    path: '/games/:id',
    name: 'game-detail',
    component: PortalGameDetail,
  },
  {
    path: '/auth',
    name: 'auth',
    component: PortalAuth,
  },
  {
    path: '/auth/callback',
    name: 'auth-callback',
    component: PortalAuthCallback,
  },
  {
    path: '/login',
    name: 'login',
    component: PortalLogin,
  },
  {
    path: '/order/:id',
    name: 'order',
    component: PortalOrder,
  },
  {
    path: '/profile',
    name: 'profile',
    component: PortalProfile,
  },
  // B端路由
  {
    path: '/admin/login',
    name: 'admin-login',
    component: AdminLogin,
  },
  {
    path: '/admin',
    name: 'admin-dashboard',
    component: AdminDashboard,
  },
  {
    path: '/admin/campaigns',
    name: 'admin-campaigns',
    component: AdminCampaigns,
  },
  {
    path: '/admin/campaigns/create',
    name: 'admin-campaign-create',
    component: AdminCampaignCreate,
  },
  {
    path: '/admin/finance',
    name: 'admin-finance',
    component: AdminFinance,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
