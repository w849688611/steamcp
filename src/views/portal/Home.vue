<script setup lang="ts">
import PortalHeader from '@/components/portal/PortalHeader.vue'
import PortalFooter from '@/components/portal/PortalFooter.vue'
import HeroCarousel from '@/components/portal/HeroCarousel.vue'
import MarqueeNotice from '@/components/portal/MarqueeNotice.vue'
import NewsFeed from '@/components/portal/NewsFeed.vue'
import HotDeals from '@/components/portal/HotDeals.vue'
</script>

<template>
  <div class="min-h-screen bg-background">
    <PortalHeader />
    
    <main class="pt-16">
      <!-- Hero Carousel -->
      <HeroCarousel />
      
      <!-- Marquee Notice -->
      <MarqueeNotice />
      
      <!-- Hot Deals -->
      <HotDeals />
      
      <!-- News Feed -->
      <NewsFeed />
    </main>
    
    <PortalFooter />
  </div>
</template>
