<template>
  <div>
    <NuxtNotifications position="top center" :speed="500" />
    <Navbar />
      <NuxtPage page-key="static" />
    <Footer />
  </div>
  
</template>

<script setup lang="ts">
useSeoMeta({
    title: 'Test RGB',
    ogTitle: 'Test RGB',
    description: 'Test Rolling Glory',
    ogDescription: 'Test Rolling Glory',
    ogImage: 'https://example.com/image.png',
    twitterCard: 'summary_large_image',
})
</script>